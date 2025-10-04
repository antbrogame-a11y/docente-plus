import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import ClassCard from '../components/ClassCard';
import { useNavigation } from '@react-navigation/native';
import { ClassesContext } from '../context/classes-context';
import { ACCESSIBILITY_ROLES } from '../constants/accessibility';

const ClassListScreen = () => {
    const { classes, loading, error, addClass, removeClass } = useContext(ClassesContext);
    const [newClassName, setNewClassName] = useState('');
    const navigation = useNavigation();

    const handleAddClass = async () => {
        if (!newClassName.trim()) {
            Alert.alert('Errore', 'Inserisci un nome per la classe');
            return;
        }

        try {
            await addClass(newClassName.trim());
            setNewClassName('');
            Alert.alert('Successo', 'Classe aggiunta con successo');
        } catch (err) {
            Alert.alert('Errore', 'Impossibile aggiungere la classe: ' + err.message);
        }
    };

    const handleRemoveClass = (id, name) => {
        Alert.alert(
            'Conferma eliminazione',
            `Sei sicuro di voler eliminare la classe "${name}"?`,
            [
                { text: 'Annulla', style: 'cancel' },
                {
                    text: 'Elimina',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await removeClass(id);
                            Alert.alert('Successo', 'Classe eliminata con successo');
                        } catch (err) {
                            Alert.alert('Errore', 'Impossibile eliminare la classe: ' + err.message);
                        }
                    }
                }
            ]
        );
    };

    const renderClassItem = ({ item }) => (
        <ClassCard
            className={item.name}
            studentCount={item.student_count}
            onPress={() => navigation.navigate('ClassDetail', { classId: item.id })}
            onRemove={() => handleRemoveClass(item.id, item.name)}
        />
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator 
                    size="large" 
                    color="#007AFF" 
                    accessibilityLabel="Caricamento classi in corso"
                />
                <Text 
                    style={styles.loadingText}
                    accessibilityRole={ACCESSIBILITY_ROLES.TEXT}
                >
                    Caricamento classi...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text 
                    style={styles.errorText}
                    accessibilityRole={ACCESSIBILITY_ROLES.ALERT}
                    accessibilityLabel={`Errore nel caricamento classi: ${error}`}
                >
                    Errore: {error}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.addSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome della nuova classe"
                    value={newClassName}
                    onChangeText={setNewClassName}
                    accessibilityLabel="Nome della nuova classe"
                    accessibilityHint="Inserisci il nome per creare una nuova classe"
                    accessibilityRole={ACCESSIBILITY_ROLES.TEXT_INPUT}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddClass}
                    accessibilityLabel="Aggiungi nuova classe"
                    accessibilityHint="Tocca per aggiungere una nuova classe con il nome inserito"
                    accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
                >
                    <Text style={styles.addButtonText}>Aggiungi Classe</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={classes}
                renderItem={renderClassItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                accessibilityLabel={`Lista di ${classes.length} ${classes.length === 1 ? 'classe' : 'classi'}`}
            />
            {classes.length === 0 && (
                <View style={styles.emptyContainer}>
                    <Text 
                        style={styles.emptyText}
                        accessibilityRole={ACCESSIBILITY_ROLES.TEXT}
                    >
                        Nessuna classe disponibile.
                    </Text>
                    <Text 
                        style={styles.emptySubText}
                        accessibilityRole={ACCESSIBILITY_ROLES.TEXT}
                    >
                        Aggiungi una classe per iniziare!
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    addSection: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginRight: 8,
        fontSize: 16
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 44,
        minWidth: 100
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    listContent: {
        paddingVertical: 8
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center'
    },
    emptySubText: {
        fontSize: 14,
        color: '#bbb',
        textAlign: 'center',
        marginTop: 8
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666'
    },
    errorText: {
        fontSize: 16,
        color: '#ff3b30',
        textAlign: 'center'
    }
});

export default ClassListScreen;