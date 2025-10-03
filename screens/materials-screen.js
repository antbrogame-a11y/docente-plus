import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { MaterialsContext } from '../context/materials-context';
import { ClassesContext } from '../context/classes-context';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const MaterialsScreen = () => {
  const { materials, loading, error, addMaterial, removeMaterial, refreshMaterials } = useContext(MaterialsContext);
  const { classes } = useContext(ClassesContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [materialType, setMaterialType] = useState('link'); // 'link', 'pdf', 'image', 'document'
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    refreshMaterials();
  }, []);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      setSelectedFile(file);
      
      // Auto-detect material type based on file MIME type
      if (file.mimeType) {
        if (file.mimeType.startsWith('image/')) {
          setMaterialType('image');
        } else if (file.mimeType === 'application/pdf') {
          setMaterialType('pdf');
        } else {
          setMaterialType('document');
        }
      }

      // Use file name as title if not set
      if (!title && file.name) {
        setTitle(file.name);
      }
    } catch (err) {
      Alert.alert('Errore', 'Impossibile selezionare il file: ' + err.message);
    }
  };

  const handleAddMaterial = async () => {
    if (!title.trim()) {
      Alert.alert('Errore', 'Inserisci un titolo per il materiale');
      return;
    }

    if (materialType === 'link' && !url.trim()) {
      Alert.alert('Errore', 'Inserisci un URL per il link');
      return;
    }

    if (materialType !== 'link' && !selectedFile) {
      Alert.alert('Errore', 'Seleziona un file da caricare');
      return;
    }

    try {
      let filePath = null;

      // Save file to permanent location if it's not a link
      if (materialType !== 'link' && selectedFile) {
        const fileName = `material_${Date.now()}_${selectedFile.name}`;
        const destinationPath = `${FileSystem.documentDirectory}materials/${fileName}`;
        
        // Create materials directory if it doesn't exist
        const materialsDir = `${FileSystem.documentDirectory}materials`;
        const dirInfo = await FileSystem.getInfoAsync(materialsDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(materialsDir, { intermediates: true });
        }

        // Copy file to permanent location
        await FileSystem.copyAsync({
          from: selectedFile.uri,
          to: destinationPath
        });

        filePath = destinationPath;
      }

      await addMaterial(
        title.trim(),
        materialType,
        filePath,
        materialType === 'link' ? url.trim() : null,
        description.trim() || null,
        selectedClassId,
        null
      );

      // Reset form
      setTitle('');
      setDescription('');
      setUrl('');
      setSelectedFile(null);
      setSelectedClassId(null);
      setMaterialType('link');
      setShowForm(false);

      Alert.alert('Successo', 'Materiale aggiunto con successo');
    } catch (err) {
      Alert.alert('Errore', 'Impossibile aggiungere il materiale: ' + err.message);
    }
  };

  const handleRemoveMaterial = (id, title) => {
    Alert.alert(
      'Conferma eliminazione',
      `Sei sicuro di voler eliminare "${title}"?`,
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeMaterial(id);
              Alert.alert('Successo', 'Materiale eliminato con successo');
            } catch (err) {
              Alert.alert('Errore', 'Impossibile eliminare il materiale: ' + err.message);
            }
          }
        }
      ]
    );
  };

  const handleOpenMaterial = async (material) => {
    try {
      if (material.type === 'link' && material.url) {
        const canOpen = await Linking.canOpenURL(material.url);
        if (canOpen) {
          await Linking.openURL(material.url);
        } else {
          Alert.alert('Errore', 'Impossibile aprire il link');
        }
      } else if (material.file_path) {
        // For files, we could implement a viewer or share functionality
        Alert.alert('File', `File salvato in: ${material.file_path}`);
      }
    } catch (err) {
      Alert.alert('Errore', 'Impossibile aprire il materiale: ' + err.message);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'image': return '🖼️';
      case 'link': return '🔗';
      case 'document': return '📎';
      default: return '📁';
    }
  };

  const renderMaterialItem = ({ item }) => (
    <View style={styles.materialCard}>
      <TouchableOpacity
        style={styles.materialContent}
        onPress={() => handleOpenMaterial(item)}
      >
        <Text style={styles.typeIcon}>{getTypeIcon(item.type)}</Text>
        <View style={styles.materialInfo}>
          <Text style={styles.materialTitle}>{item.title}</Text>
          {item.description && (
            <Text style={styles.materialDescription}>{item.description}</Text>
          )}
          {item.class_id && (
            <Text style={styles.materialMeta}>
              Classe: {classes.find(c => c.id === item.class_id)?.name || 'N/A'}
            </Text>
          )}
          <Text style={styles.materialDate}>
            {new Date(item.created_at).toLocaleDateString('it-IT')}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveMaterial(item.id, item.title)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Caricamento materiali...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Errore: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!showForm ? (
        <>
          <View style={styles.header}>
            <Button title="+ Aggiungi Materiale" onPress={() => setShowForm(true)} />
          </View>
          <FlatList
            data={materials}
            renderItem={renderMaterialItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nessun materiale disponibile.</Text>
                <Text style={styles.emptySubText}>Aggiungi materiali didattici per iniziare!</Text>
              </View>
            }
          />
        </>
      ) : (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.formTitle}>Aggiungi Nuovo Materiale</Text>

          <Text style={styles.label}>Titolo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Titolo del materiale"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Descrizione</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrizione opzionale"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Tipo di Materiale</Text>
          <View style={styles.typeSelector}>
            {['link', 'pdf', 'image', 'document'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  materialType === type && styles.typeButtonSelected
                ]}
                onPress={() => setMaterialType(type)}
              >
                <Text style={styles.typeButtonText}>
                  {type === 'link' ? '🔗 Link' : type === 'pdf' ? '📄 PDF' : type === 'image' ? '🖼️ Immagine' : '📎 Documento'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {materialType === 'link' ? (
            <>
              <Text style={styles.label}>URL *</Text>
              <TextInput
                style={styles.input}
                placeholder="https://esempio.com"
                value={url}
                onChangeText={setUrl}
                keyboardType="url"
                autoCapitalize="none"
              />
            </>
          ) : (
            <View style={styles.filePickerSection}>
              <Button title="📎 Seleziona File" onPress={handlePickDocument} />
              {selectedFile && (
                <Text style={styles.selectedFileName}>
                  File selezionato: {selectedFile.name}
                </Text>
              )}
            </View>
          )}

          <Text style={styles.label}>Classe (opzionale)</Text>
          <View style={styles.classSelector}>
            <TouchableOpacity
              style={[
                styles.classButton,
                !selectedClassId && styles.classButtonSelected
              ]}
              onPress={() => setSelectedClassId(null)}
            >
              <Text style={styles.classButtonText}>Nessuna</Text>
            </TouchableOpacity>
            {classes.map(cls => (
              <TouchableOpacity
                key={cls.id}
                style={[
                  styles.classButton,
                  selectedClassId === cls.id && styles.classButtonSelected
                ]}
                onPress={() => setSelectedClassId(cls.id)}
              >
                <Text style={styles.classButtonText}>{cls.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.formButtons}>
            <View style={styles.formButton}>
              <Button title="Annulla" onPress={() => {
                setShowForm(false);
                setTitle('');
                setDescription('');
                setUrl('');
                setSelectedFile(null);
                setSelectedClassId(null);
              }} color="#999" />
            </View>
            <View style={styles.formButton}>
              <Button title="Aggiungi" onPress={handleAddMaterial} />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listContent: {
    padding: 15,
  },
  materialCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  materialContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  materialDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  materialMeta: {
    fontSize: 12,
    color: '#999',
    marginBottom: 3,
  },
  materialDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    fontSize: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  typeButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 14,
  },
  filePickerSection: {
    marginTop: 10,
  },
  selectedFileName: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  classSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  classButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  classButtonSelected: {
    backgroundColor: '#34c759',
    borderColor: '#34c759',
  },
  classButtonText: {
    fontSize: 14,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
    gap: 10,
  },
  formButton: {
    flex: 1,
  },
});

export default MaterialsScreen;
