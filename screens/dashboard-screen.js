import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { DashboardContext } from '../context/dashboard-context';
import { ACCESSIBILITY_ROLES } from '../constants/accessibility';

export default function DashboardScreen({ navigation }) {
  const {
    statistics,
    classStats,
    recentActivities,
    besDistribution,
    materialsStats,
    loading,
    error,
    refreshDashboard,
    exportData
  } = useContext(DashboardContext);

  const [exporting, setExporting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
  };

  const handleExportData = async () => {
    try {
      setExporting(true);
      
      const jsonData = await exportData();
      const filename = `dashboard_export_${new Date().toISOString().split('T')[0]}.json`;
      const filePath = `${FileSystem.documentDirectory}${filename}`;
      
      await FileSystem.writeAsStringAsync(filePath, jsonData);
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: 'application/json',
          dialogTitle: 'Esporta Dati Dashboard'
        });
        Alert.alert('Successo', 'Dati esportati con successo');
      } else {
        Alert.alert('Info', `Dati salvati in: ${filename}`);
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile esportare i dati: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  const renderStatCard = (title, value, icon, color, accessibilityLabel) => (
    <View
      style={[styles.statCard, { borderLeftColor: color }]}
      accessible={true}
      accessibilityRole={ACCESSIBILITY_ROLES.SUMMARY}
      accessibilityLabel={accessibilityLabel || `${title}: ${value}`}
    >
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderClassStatsRow = (classData) => {
    const besPercentage = classData.actual_student_count > 0
      ? Math.round((classData.bes_count / classData.actual_student_count) * 100)
      : 0;

    return (
      <View
        key={classData.id}
        style={styles.tableRow}
        accessible={true}
        accessibilityLabel={`Classe ${classData.name}: ${classData.actual_student_count} studenti, ${classData.bes_count} con BES/DSA (${besPercentage}%), ${classData.materials_count} materiali, ${classData.reports_count} report`}
      >
        <Text style={[styles.tableCell, styles.classCellName]}>{classData.name}</Text>
        <Text style={styles.tableCell}>{classData.actual_student_count}</Text>
        <Text style={[styles.tableCell, classData.bes_count > 0 ? styles.besHighlight : null]}>
          {classData.bes_count}
        </Text>
        <Text style={styles.tableCell}>{classData.materials_count}</Text>
        <Text style={styles.tableCell}>{classData.reports_count}</Text>
      </View>
    );
  };

  const renderActivityItem = (activity) => {
    const icon = activity.type === 'material' ? '📚' : '📄';
    const date = new Date(activity.date).toLocaleDateString('it-IT');
    const context = activity.class_name || activity.student_name || 'N/D';

    return (
      <View
        key={`${activity.type}-${activity.id}`}
        style={styles.activityItem}
        accessible={true}
        accessibilityLabel={`${icon} ${activity.name}, ${context}, ${date}`}
      >
        <Text style={styles.activityIcon}>{icon}</Text>
        <View style={styles.activityContent}>
          <Text style={styles.activityName}>{activity.name}</Text>
          <Text style={styles.activityContext}>{context}</Text>
        </View>
        <Text style={styles.activityDate}>{date}</Text>
      </View>
    );
  };

  const renderBESChart = () => {
    if (!besDistribution || besDistribution.length === 0) {
      return (
        <Text style={styles.noDataText}>Nessun dato BES/DSA disponibile</Text>
      );
    }

    const maxStudents = Math.max(...besDistribution.map(d => d.total_students));

    return besDistribution.map((item) => {
      const percentage = maxStudents > 0 ? (item.total_students / maxStudents) * 100 : 0;
      const besPercentage = item.total_students > 0 
        ? Math.round((item.bes_students / item.total_students) * 100) 
        : 0;

      return (
        <View
          key={item.id}
          style={styles.chartItem}
          accessible={true}
          accessibilityLabel={`${item.class_name}: ${item.bes_students} studenti BES/DSA su ${item.total_students} (${besPercentage}%)`}
        >
          <Text style={styles.chartLabel}>{item.class_name}</Text>
          <View style={styles.chartBarContainer}>
            <View style={[styles.chartBar, { width: `${percentage}%` }]}>
              <View
                style={[
                  styles.chartBarInner,
                  { width: `${besPercentage}%`, backgroundColor: '#FF9500' }
                ]}
              />
            </View>
          </View>
          <Text style={styles.chartValue}>
            {item.bes_students}/{item.total_students}
          </Text>
        </View>
      );
    });
  };

  const renderMaterialsChart = () => {
    if (!materialsStats || materialsStats.length === 0) {
      return (
        <Text style={styles.noDataText}>Nessun materiale disponibile</Text>
      );
    }

    const total = materialsStats.reduce((sum, item) => sum + item.count, 0);

    return materialsStats.map((item, index) => {
      const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
      const typeLabels = {
        pdf: '📄 PDF',
        image: '🖼️ Immagini',
        link: '🔗 Link',
        document: '📝 Documenti'
      };

      return (
        <View
          key={index}
          style={styles.pieItem}
          accessible={true}
          accessibilityLabel={`${typeLabels[item.type] || item.type}: ${item.count} (${percentage}%)`}
        >
          <Text style={styles.pieLabel}>{typeLabels[item.type] || item.type}</Text>
          <View style={styles.pieBarContainer}>
            <View style={[styles.pieBar, { width: `${percentage}%` }]} />
          </View>
          <Text style={styles.pieValue}>{item.count} ({percentage}%)</Text>
        </View>
      );
    });
  };

  const renderSuggestions = () => {
    if (!statistics) return null;

    const suggestions = [];

    // Check for classes without students
    const emptyClasses = classStats.filter(c => c.actual_student_count === 0).length;
    if (emptyClasses > 0) {
      suggestions.push({
        icon: '⚠️',
        text: `${emptyClasses} classe${emptyClasses > 1 ? 'i' : ''} senza studenti`,
        action: 'ClassList',
        color: '#FF9500'
      });
    }

    // Check for BES students without reports
    const besStudentsWithoutReports = besDistribution.reduce((sum, item) => {
      return sum + Math.max(0, item.bes_students - item.total_reports);
    }, 0);
    
    if (besStudentsWithoutReports > 0) {
      suggestions.push({
        icon: '📋',
        text: `${besStudentsWithoutReports} student${besStudentsWithoutReports > 1 ? 'i' : 'e'} BES/DSA senza report`,
        action: 'Reports',
        color: '#FF3B30'
      });
    }

    // Check for classes with high BES percentage
    const highBESClasses = besDistribution.filter(item => {
      const percentage = item.total_students > 0 
        ? (item.bes_students / item.total_students) * 100 
        : 0;
      return percentage > 30;
    }).length;

    if (highBESClasses > 0) {
      suggestions.push({
        icon: '💡',
        text: `${highBESClasses} classe${highBESClasses > 1 ? 'i' : ''} con alta % BES/DSA (>30%)`,
        action: null,
        color: '#007AFF'
      });
    }

    // Check if there are few materials
    if (statistics.totalMaterials < statistics.totalClasses * 3) {
      suggestions.push({
        icon: '📚',
        text: 'Considera di aggiungere più materiali didattici',
        action: 'Materials',
        color: '#34C759'
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        icon: '✅',
        text: 'Tutto in ordine! Nessun suggerimento al momento.',
        action: null,
        color: '#34C759'
      });
    }

    return suggestions.map((suggestion, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.suggestionCard, { borderLeftColor: suggestion.color }]}
        onPress={() => suggestion.action && navigation.navigate(suggestion.action)}
        disabled={!suggestion.action}
        accessible={true}
        accessibilityRole={suggestion.action ? ACCESSIBILITY_ROLES.BUTTON : 'text'}
        accessibilityLabel={suggestion.text}
        accessibilityHint={suggestion.action ? `Vai a ${suggestion.action}` : undefined}
      >
        <Text style={styles.suggestionIcon}>{suggestion.icon}</Text>
        <Text style={styles.suggestionText}>{suggestion.text}</Text>
        {suggestion.action && <Text style={styles.suggestionArrow}>→</Text>}
      </TouchableOpacity>
    ));
  };

  if (loading && !statistics) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Caricamento dashboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Errore: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshDashboard}>
          <Text style={styles.retryButtonText}>Riprova</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      accessible={true}
      accessibilityRole={ACCESSIBILITY_ROLES.MAIN}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard Docente Plus</Text>
          <Text style={styles.headerSubtitle}>Analytics e Statistiche</Text>
        </View>

        {/* Main Statistics Cards */}
        <Text style={styles.sectionTitle}>Panoramica</Text>
        <View style={styles.statsGrid}>
          {renderStatCard(
            'Classi',
            statistics?.totalClasses || 0,
            '🎓',
            '#007AFF',
            `Totale classi: ${statistics?.totalClasses || 0}`
          )}
          {renderStatCard(
            'Studenti',
            statistics?.totalStudents || 0,
            '👨‍🎓',
            '#34C759',
            `Totale studenti: ${statistics?.totalStudents || 0}`
          )}
          {renderStatCard(
            'BES/DSA',
            statistics?.besStudents || 0,
            '📋',
            '#FF9500',
            `Studenti con BES/DSA: ${statistics?.besStudents || 0}`
          )}
          {renderStatCard(
            'Materiali',
            statistics?.totalMaterials || 0,
            '📚',
            '#5856D6',
            `Totale materiali didattici: ${statistics?.totalMaterials || 0}`
          )}
          {renderStatCard(
            'Report PDP',
            statistics?.pdpReports || 0,
            '📄',
            '#FF2D55',
            `Report PDP: ${statistics?.pdpReports || 0}`
          )}
          {renderStatCard(
            'Report BES',
            statistics?.besReports || 0,
            '📋',
            '#AF52DE',
            `Report BES: ${statistics?.besReports || 0}`
          )}
        </View>

        {/* Suggestions */}
        <Text style={styles.sectionTitle}>Suggerimenti Automatici</Text>
        <View style={styles.suggestionsContainer}>
          {renderSuggestions()}
        </View>

        {/* Class Statistics Table */}
        <Text style={styles.sectionTitle}>Statistiche per Classe</Text>
        <View
          style={styles.tableContainer}
          accessible={true}
          accessibilityLabel="Tabella statistiche classi"
        >
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.classCellName]}>Classe</Text>
            <Text style={styles.tableHeaderCell}>Stud.</Text>
            <Text style={styles.tableHeaderCell}>BES</Text>
            <Text style={styles.tableHeaderCell}>Mat.</Text>
            <Text style={styles.tableHeaderCell}>Rep.</Text>
          </View>
          {classStats && classStats.length > 0 ? (
            classStats.map(renderClassStatsRow)
          ) : (
            <Text style={styles.noDataText}>Nessuna classe disponibile</Text>
          )}
        </View>

        {/* BES/DSA Distribution Chart */}
        <Text style={styles.sectionTitle}>Distribuzione BES/DSA per Classe</Text>
        <View style={styles.chartContainer}>
          {renderBESChart()}
        </View>

        {/* Materials Distribution */}
        <Text style={styles.sectionTitle}>Distribuzione Materiali per Tipo</Text>
        <View style={styles.pieContainer}>
          {renderMaterialsChart()}
        </View>

        {/* Recent Activities */}
        <Text style={styles.sectionTitle}>Attività Recenti</Text>
        <View style={styles.activitiesContainer}>
          {recentActivities && recentActivities.length > 0 ? (
            recentActivities.map(renderActivityItem)
          ) : (
            <Text style={styles.noDataText}>Nessuna attività recente</Text>
          )}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Azioni Rapide</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ClassList')}
            accessible={true}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
            accessibilityLabel="Vai a Gestione Classi"
          >
            <Text style={styles.actionIcon}>🎓</Text>
            <Text style={styles.actionText}>Classi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Materials')}
            accessible={true}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
            accessibilityLabel="Vai a Materiali"
          >
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={styles.actionText}>Materiali</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Reports')}
            accessible={true}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
            accessibilityLabel="Vai a Report"
          >
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionText}>Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleExportData}
            disabled={exporting}
            accessible={true}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
            accessibilityLabel="Esporta dati dashboard"
            accessibilityState={{ disabled: exporting }}
          >
            <Text style={styles.actionIcon}>{exporting ? '⏳' : '📤'}</Text>
            <Text style={styles.actionText}>
              {exporting ? 'Esportazione...' : 'Esporta'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Dashboard aggiornata: {new Date().toLocaleString('it-IT')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

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
  content: {
    padding: 16
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
    paddingLeft: 4
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  statCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase'
  },
  suggestionsContainer: {
    marginBottom: 10
  },
  suggestionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  suggestionIcon: {
    fontSize: 24,
    marginRight: 12
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    color: '#333'
  },
  suggestionArrow: {
    fontSize: 20,
    color: '#007AFF',
    marginLeft: 8
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    paddingBottom: 8,
    marginBottom: 8
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    flex: 1
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    flex: 1
  },
  classCellName: {
    flex: 2,
    textAlign: 'left',
    fontWeight: '600'
  },
  besHighlight: {
    color: '#FF9500',
    fontWeight: 'bold'
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  chartItem: {
    marginBottom: 16
  },
  chartLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  chartBarContainer: {
    backgroundColor: '#f0f0f0',
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 4
  },
  chartBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    position: 'relative'
  },
  chartBarInner: {
    height: '100%',
    borderRadius: 12
  },
  chartValue: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right'
  },
  pieContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  pieItem: {
    marginBottom: 12
  },
  pieLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  pieBarContainer: {
    backgroundColor: '#f0f0f0',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 4
  },
  pieBar: {
    height: '100%',
    backgroundColor: '#5856D6',
    borderRadius: 10
  },
  pieValue: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right'
  },
  activitiesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12
  },
  activityContent: {
    flex: 1
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2
  },
  activityContext: {
    fontSize: 12,
    color: '#666'
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  actionButton: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 44
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
    fontStyle: 'italic'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666'
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 12,
    color: '#999'
  }
});
