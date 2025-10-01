import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import ClassCard from '../components/ClassCard';
import { useNavigation } from '@react-navigation/native';
import { ClassesContext } from '../context/classes-context';

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
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Caricamento classi...</Text>
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
            <View style={styles.addSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome della nuova classe"
                    value={newClassName}
                    onChangeText={setNewClassName}
                />
                <Button title="Aggiungi Classe" onPress={handleAddClass} />
            </View>
            <FlatList
                data={classes}
                renderItem={renderClassItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />
            {classes.length === 0 && (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nessuna classe disponibile.</Text>
                    <Text style={styles.emptySubText}>Aggiungi una classe per iniziare!</Text>
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
        backgroundColor: '#fff',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16
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