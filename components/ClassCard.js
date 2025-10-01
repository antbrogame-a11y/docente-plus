import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ClassCard = ({ className, onPress, onRemove, studentCount }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <Text style={styles.className}>{className}</Text>
        {studentCount !== undefined && studentCount !== null && (
          <Text style={styles.studentCount}>
            {studentCount} {studentCount === 1 ? 'studente' : 'studenti'}
          </Text>
        )}
      </TouchableOpacity>
      {onRemove && (
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center'
  },
  content: {
    flex: 1
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  studentCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default ClassCard;
