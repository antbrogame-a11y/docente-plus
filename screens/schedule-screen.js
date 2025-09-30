import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { TeacherContext } from '../context/teacher-context';
import DragDropSchedule from '../components/DragDropSchedule';

export default function ScheduleScreen({ navigation }) {
  const { teacher, setTeacher } = useContext(TeacherContext);

  function handleUpdateSchedule(newSchedule) {
    setTeacher({ ...teacher, schedule: newSchedule });
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Orario settimanale</Text>
      <DragDropSchedule schedule={teacher.schedule} onUpdate={handleUpdateSchedule} />
      <Button title="Conferma orario" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}