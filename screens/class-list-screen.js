import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import ClassCard from '../components/ClassCard'; // Assicurati che il percorso sia corretto
import { useNavigation } from '@react-navigation/native';

const ClassListScreen = () => {
    const [classes, setClasses] = useState([]);
    const navigation = useNavigation();

    const addClass = () => {
        const newClass = { id: Math.random().toString(), name: `Classe ${classes.length + 1}` };
        setClasses(currentClasses => [...currentClasses, newClass]);
    };

    const removeClass = (id) => {
        setClasses(currentClasses => currentClasses.filter(classItem => classItem.id !== id));
    };

    const renderClassItem = ({ item }) => (
        <ClassCard
            className={item.name}
            onPress={() => navigation.navigate('ClassDetail', { classId: item.id })}
            onRemove={() => removeClass(item.id)}
        />
    );

    return (
        <View>
            <Button title="Aggiungi Classe" onPress={addClass} />
            <FlatList
                data={classes}
                renderItem={renderClassItem}
                keyExtractor={item => item.id}
            />
            {classes.length === 0 && <Text>Nessuna classe disponibile.</Text>}
        </View>
    );
};

export default ClassListScreen;