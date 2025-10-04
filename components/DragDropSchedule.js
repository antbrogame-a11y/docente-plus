import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal
} from 'react-native';

const DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const TIME_SLOTS = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00'
];

export default function DragDropSchedule({ schedule = [], onUpdate }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [lessonData, setLessonData] = useState({ subject: '', class: '', room: '' });

  // Get lesson for a specific day and time slot
  const getLesson = (day, timeSlot) => {
    return schedule.find(lesson => lesson.day === day && lesson.time === timeSlot);
  };

  // Handle cell press
  const handleCellPress = (day, timeSlot) => {
    const existingLesson = getLesson(day, timeSlot);
    
    if (existingLesson) {
      setLessonData({
        subject: existingLesson.subject || '',
        class: existingLesson.class || '',
        room: existingLesson.room || ''
      });
    } else {
      setLessonData({ subject: '', class: '', room: '' });
    }
    
    setSelectedSlot({ day, timeSlot });
    setModalVisible(true);
  };

  // Save lesson
  const handleSaveLesson = () => {
    if (!selectedSlot) return;

    const { day, timeSlot } = selectedSlot;
    const newSchedule = schedule.filter(
      lesson => !(lesson.day === day && lesson.time === timeSlot)
    );

    // Only add if at least one field is filled
    if (lessonData.subject || lessonData.class || lessonData.room) {
      newSchedule.push({
        day,
        time: timeSlot,
        subject: lessonData.subject,
        class: lessonData.class,
        room: lessonData.room
      });
    }

    onUpdate(newSchedule);
    setModalVisible(false);
    setLessonData({ subject: '', class: '', room: '' });
    setSelectedSlot(null);
  };

  // Delete lesson
  const handleDeleteLesson = () => {
    if (!selectedSlot) return;

    Alert.alert(
      'Elimina lezione',
      'Sei sicuro di voler eliminare questa lezione?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => {
            const { day, timeSlot } = selectedSlot;
            const newSchedule = schedule.filter(
              lesson => !(lesson.day === day && lesson.time === timeSlot)
            );
            onUpdate(newSchedule);
            setModalVisible(false);
            setLessonData({ subject: '', class: '', room: '' });
            setSelectedSlot(null);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View>
          {/* Header with days */}
          <View style={styles.headerRow}>
            <View style={styles.timeColumn}>
              <Text style={styles.headerText}>Orario</Text>
            </View>
            {DAYS.map(day => (
              <View key={day} style={styles.dayColumn}>
                <Text style={styles.headerText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Time slots grid */}
          {TIME_SLOTS.map(timeSlot => (
            <View key={timeSlot} style={styles.row}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{timeSlot}</Text>
              </View>
              {DAYS.map(day => {
                const lesson = getLesson(day, timeSlot);
                return (
                  <TouchableOpacity
                    key={`${day}-${timeSlot}`}
                    style={[styles.cell, lesson && styles.cellFilled]}
                    onPress={() => handleCellPress(day, timeSlot)}
                    accessibilityLabel={
                      lesson
                        ? `${day} ${timeSlot}: ${lesson.subject || 'Materia'} - Classe ${lesson.class || ''}`
                        : `${day} ${timeSlot}: vuoto`
                    }
                    accessibilityHint="Tocca per modificare o aggiungere lezione"
                    accessibilityRole="button"
                  >
                    {lesson ? (
                      <View>
                        <Text style={styles.lessonSubject} numberOfLines={1}>
                          {lesson.subject}
                        </Text>
                        <Text style={styles.lessonClass} numberOfLines={1}>
                          {lesson.class}
                        </Text>
                        {lesson.room && (
                          <Text style={styles.lessonRoom} numberOfLines={1}>
                            Aula {lesson.room}
                          </Text>
                        )}
                      </View>
                    ) : (
                      <Text style={styles.emptyCell}>+</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal for editing lesson */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedSlot ? `${selectedSlot.day} - ${selectedSlot.timeSlot}` : 'Modifica lezione'}
            </Text>

            <Text style={styles.label}>Materia</Text>
            <TextInput
              style={styles.input}
              value={lessonData.subject}
              onChangeText={text => setLessonData({ ...lessonData, subject: text })}
              placeholder="Es. Matematica"
              accessibilityLabel="Materia"
              accessibilityHint="Inserisci il nome della materia"
            />

            <Text style={styles.label}>Classe</Text>
            <TextInput
              style={styles.input}
              value={lessonData.class}
              onChangeText={text => setLessonData({ ...lessonData, class: text })}
              placeholder="Es. 1A"
              accessibilityLabel="Classe"
              accessibilityHint="Inserisci la classe"
            />

            <Text style={styles.label}>Aula (opzionale)</Text>
            <TextInput
              style={styles.input}
              value={lessonData.room}
              onChangeText={text => setLessonData({ ...lessonData, room: text })}
              placeholder="Es. 203"
              accessibilityLabel="Aula"
              accessibilityHint="Inserisci il numero dell'aula"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                accessibilityLabel="Annulla"
                accessibilityRole="button"
              >
                <Text style={styles.buttonText}>Annulla</Text>
              </TouchableOpacity>

              {getLesson(selectedSlot?.day, selectedSlot?.timeSlot) && (
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDeleteLesson}
                  accessibilityLabel="Elimina lezione"
                  accessibilityRole="button"
                >
                  <Text style={styles.buttonText}>Elimina</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveLesson}
                accessibilityLabel="Salva lezione"
                accessibilityRole="button"
              >
                <Text style={styles.buttonText}>Salva</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderBottomWidth: 2,
    borderBottomColor: '#005BBB'
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  timeColumn: {
    width: 100,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRightWidth: 1,
    borderRightColor: '#ddd'
  },
  dayColumn: {
    width: 120,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cell: {
    width: 120,
    minHeight: 70,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    backgroundColor: '#fff'
  },
  cellFilled: {
    backgroundColor: '#E3F2FD'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff'
  },
  timeText: {
    fontSize: 12,
    color: '#333'
  },
  lessonSubject: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#007AFF',
    textAlign: 'center'
  },
  lessonClass: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 2
  },
  lessonRoom: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 2
  },
  emptyCell: {
    fontSize: 24,
    color: '#ccc'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 44
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 8
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center'
  },
  cancelButton: {
    backgroundColor: '#999'
  },
  deleteButton: {
    backgroundColor: '#FF3B30'
  },
  saveButton: {
    backgroundColor: '#007AFF'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});