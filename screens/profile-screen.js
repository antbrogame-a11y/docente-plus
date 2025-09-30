import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TeacherContext } from '../context/teacher-context';

export default function ProfileScreen({ navigation }) {
  const { teacher, setTeacher } = useContext(TeacherContext);
  const [name, setName] = useState(teacher.name);
  const [school, setSchool] = useState(teacher.school);
  const [subjects, setSubjects] = useState(teacher.subjects);

  function handleSave() {
    setTeacher({ ...teacher, name, school, subjects });
    navigation.navigate('Schedule');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Insegnante</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Scuola</Text>
      <TextInput style={styles.input} value={school} onChangeText={setSchool} />
      <Text style={styles.label}>Discipline</Text>
      <TextInput style={styles.input} value={subjects} onChangeText={setSubjects} />
      <Button title="Salva e vai all'orario" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 8, borderRadius: 4, marginTop: 4 }
});
