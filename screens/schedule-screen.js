import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TeacherContext } from '../context/teacher-context';
import DragDropSchedule from '../components/DragDropSchedule';

export default function ScheduleScreen({ navigation }) {
  const { teacher, setTeacher } = useContext(TeacherContext);

  function handleUpdateSchedule(newSchedule) {
    setTeacher({ ...teacher, schedule: newSchedule });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Orario settimanale</Text>
      <Text style={styles.subtitle}>
        Tocca una cella per aggiungere o modificare una lezione
      </Text>
      <DragDropSchedule 
        schedule={teacher.schedule || []} 
        onUpdate={handleUpdateSchedule} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: 16,
    paddingBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
    paddingBottom: 8
  }
});