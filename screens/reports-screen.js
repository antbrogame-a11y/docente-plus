import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Modal
} from 'react-native';
import { ReportsContext } from '../context/reports-context';
import { ClassesContext } from '../context/classes-context';
import { getStudentById, getAllStudents } from '../db/database';
import { generateReportPDF, shareReportPDF } from '../services/pdf-generator';

export default function ReportsScreen({ navigation }) {
  const { reports, loading, addReport, removeReport, modifyReport, refreshReports } = useContext(ReportsContext);
  const { classes } = useContext(ClassesContext);
  
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  
  // Form fields
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reportType, setReportType] = useState('PDP');
  const [schoolYear, setSchoolYear] = useState('2024/2025');
  const [diagnosis, setDiagnosis] = useState('');
  const [strengths, setStrengths] = useState('');
  const [difficulties, setDifficulties] = useState('');
  const [teachingStrategies, setTeachingStrategies] = useState('');
  const [evaluationTools, setEvaluationTools] = useState('');
  const [objectives, setObjectives] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadStudents();
    refreshReports();
  }, []);

  const loadStudents = async () => {
    try {
      const allStudents = await getAllStudents();
      setStudents(allStudents);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const resetForm = () => {
    setSelectedStudent(null);
    setReportType('PDP');
    setSchoolYear('2024/2025');
    setDiagnosis('');
    setStrengths('');
    setDifficulties('');
    setTeachingStrategies('');
    setEvaluationTools('');
    setObjectives('');
    setNotes('');
    setEditingReport(null);
  };

  const openForm = (report = null) => {
    if (report) {
      // Edit mode
      setEditingReport(report);
      const student = students.find(s => s.id === report.student_id);
      setSelectedStudent(student);
      setReportType(report.report_type);
      setSchoolYear(report.school_year);
      setDiagnosis(report.diagnosis || '');
      setStrengths(report.strengths || '');
      setDifficulties(report.difficulties || '');
      setTeachingStrategies(report.teaching_strategies || '');
      setEvaluationTools(report.evaluation_tools || '');
      setObjectives(report.objectives || '');
      setNotes(report.notes || '');
    } else {
      resetForm();
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleSaveReport = async () => {
    if (!selectedStudent) {
      Alert.alert('Errore', 'Seleziona uno studente');
      return;
    }

    if (!schoolYear.trim()) {
      Alert.alert('Errore', "Inserisci l'anno scolastico");
      return;
    }

    try {
      const reportData = {
        student_id: selectedStudent.id,
        report_type: reportType,
        school_year: schoolYear.trim(),
        diagnosis: diagnosis.trim() || null,
        strengths: strengths.trim() || null,
        difficulties: difficulties.trim() || null,
        teaching_strategies: teachingStrategies.trim() || null,
        evaluation_tools: evaluationTools.trim() || null,
        objectives: objectives.trim() || null,
        notes: notes.trim() || null
      };

      if (editingReport) {
        await modifyReport(editingReport.id, reportData);
        Alert.alert('Successo', 'Report aggiornato con successo');
      } else {
        await addReport(reportData);
        Alert.alert('Successo', 'Report creato con successo');
      }

      closeForm();
    } catch (error) {
      Alert.alert('Errore', 'Impossibile salvare il report: ' + error.message);
    }
  };

  const handleDeleteReport = (report) => {
    Alert.alert(
      'Conferma Eliminazione',
      'Sei sicuro di voler eliminare questo report?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeReport(report.id);
              Alert.alert('Successo', 'Report eliminato');
            } catch (error) {
              Alert.alert('Errore', 'Impossibile eliminare il report');
            }
          }
        }
      ]
    );
  };

  const handleGeneratePDF = async (report) => {
    try {
      setGeneratingPDF(true);
      
      // Get student data with class info
      const student = await getStudentById(report.student_id);
      const studentClass = classes.find(c => c.id === student.class_id);
      
      const studentData = {
        ...student,
        class_name: studentClass?.name || 'N/D'
      };

      // Generate PDF
      const pdfPath = await generateReportPDF(report, studentData);
      
      // Update report with PDF path
      await modifyReport(report.id, { pdf_path: pdfPath });
      
      Alert.alert(
        'PDF Generato',
        'Il report PDF è stato generato con successo. Vuoi esportarlo?',
        [
          { text: 'Annulla', style: 'cancel' },
          {
            text: 'Esporta',
            onPress: async () => {
              try {
                await shareReportPDF(pdfPath);
              } catch (error) {
                Alert.alert('Errore', 'Impossibile esportare il PDF');
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Errore', 'Impossibile generare il PDF: ' + error.message);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleExportPDF = async (report) => {
    if (!report.pdf_path) {
      Alert.alert('Attenzione', 'Genera prima il PDF');
      return;
    }

    try {
      await shareReportPDF(report.pdf_path);
    } catch (error) {
      Alert.alert('Errore', 'Impossibile esportare il PDF');
    }
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student?.name || 'N/D';
  };

  const renderReportItem = (report) => (
    <View key={report.id} style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportType}>{report.report_type}</Text>
        <Text style={styles.schoolYear}>{report.school_year}</Text>
      </View>
      <Text style={styles.studentName}>{getStudentName(report.student_id)}</Text>
      <Text style={styles.reportDate}>
        Creato: {new Date(report.created_at).toLocaleDateString('it-IT')}
      </Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => openForm(report)}
        >
          <Text style={styles.actionButtonText}>✏️ Modifica</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.pdfButton]}
          onPress={() => handleGeneratePDF(report)}
          disabled={generatingPDF}
        >
          <Text style={styles.actionButtonText}>📄 Genera PDF</Text>
        </TouchableOpacity>
        
        {report.pdf_path && (
          <TouchableOpacity
            style={[styles.actionButton, styles.exportButton]}
            onPress={() => handleExportPDF(report)}
          >
            <Text style={styles.actionButtonText}>📤 Esporta</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteReport(report)}
        >
          <Text style={styles.actionButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStudentPicker = () => (
    <View style={styles.field}>
      <Text style={styles.label}>Studente *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.studentPicker}>
        {students.map(student => (
          <TouchableOpacity
            key={student.id}
            style={[
              styles.studentChip,
              selectedStudent?.id === student.id && styles.studentChipSelected
            ]}
            onPress={() => setSelectedStudent(student)}
          >
            <Text style={[
              styles.studentChipText,
              selectedStudent?.id === student.id && styles.studentChipTextSelected
            ]}>
              {student.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Indietro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => openForm()}>
          <Text style={styles.addButtonText}>+ Nuovo Report</Text>
        </TouchableOpacity>
      </View>

      {loading && !generatingPDF ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {reports.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>Nessun report PDP/BES</Text>
              <Text style={styles.emptySubtext}>
                Crea il primo report per uno studente
              </Text>
            </View>
          ) : (
            reports.map(renderReportItem)
          )}
        </ScrollView>
      )}

      {/* Form Modal */}
      <Modal
        visible={showForm}
        animationType="slide"
        onRequestClose={closeForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingReport ? 'Modifica Report' : 'Nuovo Report'}
            </Text>
            <TouchableOpacity onPress={closeForm}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            {renderStudentPicker()}

            <View style={styles.field}>
              <Text style={styles.label}>Tipo Report *</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[styles.typeButton, reportType === 'PDP' && styles.typeButtonSelected]}
                  onPress={() => setReportType('PDP')}
                >
                  <Text style={[styles.typeButtonText, reportType === 'PDP' && styles.typeButtonTextSelected]}>
                    PDP
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeButton, reportType === 'BES' && styles.typeButtonSelected]}
                  onPress={() => setReportType('BES')}
                >
                  <Text style={[styles.typeButtonText, reportType === 'BES' && styles.typeButtonTextSelected]}>
                    BES
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Anno Scolastico *</Text>
              <TextInput
                style={styles.input}
                value={schoolYear}
                onChangeText={setSchoolYear}
                placeholder="es. 2024/2025"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Diagnosi/Certificazione</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={diagnosis}
                onChangeText={setDiagnosis}
                placeholder="Inserisci diagnosi o certificazione..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Punti di Forza</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={strengths}
                onChangeText={setStrengths}
                placeholder="Descrivi i punti di forza dello studente..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Difficoltà Riscontrate</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={difficulties}
                onChangeText={setDifficulties}
                placeholder="Descrivi le difficoltà riscontrate..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Strategie Didattiche</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={teachingStrategies}
                onChangeText={setTeachingStrategies}
                placeholder="Descrivi le strategie didattiche da adottare..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Strumenti di Valutazione</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={evaluationTools}
                onChangeText={setEvaluationTools}
                placeholder="Descrivi gli strumenti di valutazione..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Obiettivi Didattici</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={objectives}
                onChangeText={setObjectives}
                placeholder="Elenca gli obiettivi didattici..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Note Aggiuntive</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Aggiungi eventuali note..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeForm}>
                <Text style={styles.cancelButtonText}>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveReport}>
                <Text style={styles.saveButtonText}>
                  {editingReport ? 'Aggiorna' : 'Salva'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {generatingPDF && (
        <View style={styles.pdfGeneratingOverlay}>
          <View style={styles.pdfGeneratingBox}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.pdfGeneratingText}>Generazione PDF in corso...</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  backButton: {
    padding: 8
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  content: {
    flex: 1,
    padding: 15
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666'
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  reportType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF'
  },
  schoolYear: {
    fontSize: 14,
    color: '#666'
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  reportDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8
  },
  editButton: {
    backgroundColor: '#007AFF'
  },
  pdfButton: {
    backgroundColor: '#34C759'
  },
  exportButton: {
    backgroundColor: '#FF9500'
  },
  deleteButton: {
    backgroundColor: '#FF3B30'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  closeButton: {
    fontSize: 24,
    color: '#666'
  },
  formContainer: {
    flex: 1,
    padding: 16
  },
  field: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top'
  },
  studentPicker: {
    flexDirection: 'row'
  },
  studentChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  studentChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  studentChipText: {
    fontSize: 14,
    color: '#333'
  },
  studentChipTextSelected: {
    color: '#fff',
    fontWeight: '600'
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  typeButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  typeButtonTextSelected: {
    color: '#fff'
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center'
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center'
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  pdfGeneratingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pdfGeneratingBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 200
  },
  pdfGeneratingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333'
  }
});
