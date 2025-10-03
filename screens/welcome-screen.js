import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { AuthContext } from '../context/auth-context';
import { testDeepSeekAPI, callDeepSeekAPI } from '../services/deepseek-api';
import { ACCESSIBILITY_LABELS, ACCESSIBILITY_HINTS, ACCESSIBILITY_ROLES } from '../constants/accessibility';

export default function WelcomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [apiTested, setApiTested] = useState(false);

  // Test API on component mount
  useEffect(() => {
    testAPI();
  }, []);

  const testAPI = async () => {
    setLoading(true);
    setApiTested(false);
    try {
      const result = await testDeepSeekAPI();
      setApiResult(result);
      setApiTested(true);
      
      if (result.success) {
        Alert.alert(
          'Successo',
          'La chiamata API DeepSeek è andata a buon fine!\n\nRisposta: ' + result.message
        );
      } else {
        Alert.alert(
          'Errore API',
          'La chiamata API DeepSeek è fallita.\n\nErrore: ' + result.error
        );
      }
    } catch (error) {
      setApiResult({ success: false, error: error.message });
      setApiTested(true);
      Alert.alert('Errore', 'Errore durante il test API: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler uscire?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Esci',
          style: 'destructive',
          onPress: () => logout()
        }
      ]
    );
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScrollView 
      style={styles.container}
      accessibilityRole={ACCESSIBILITY_ROLES.HEADER}
    >
      <View style={styles.content}>
        <Text 
          style={styles.title}
          accessibilityRole={ACCESSIBILITY_ROLES.HEADER}
          accessibilityLabel={ACCESSIBILITY_LABELS.WELCOME_TITLE}
        >
          Benvenuto!
        </Text>
        <Text 
          style={styles.subtitle}
          accessibilityLabel={`Utente connesso: ${user?.email || 'Utente'}`}
        >
          {user?.email || 'Utente'}
        </Text>

        <View 
          style={styles.card}
          accessibilityRole="summary"
          accessibilityLabel="Login completato con successo"
        >
          <Text style={styles.cardTitle}>✓ Login completato con successo</Text>
          <Text style={styles.cardText}>
            Hai effettuato l'accesso alla piattaforma Docente Plus.
          </Text>
        </View>

        <View 
          style={styles.card}
          accessibilityRole="summary"
        >
          <Text 
            style={styles.cardTitle}
            accessibilityLabel={`Test API DeepSeek - ${loading ? 'In corso' : apiTested ? (apiResult?.success ? 'Completato con successo' : 'Fallito') : 'Non ancora eseguito'}`}
          >
            {loading ? '⏳' : apiTested ? (apiResult?.success ? '✓' : '✗') : '🔄'} Test API DeepSeek
          </Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator 
                size="large" 
                color="#007AFF" 
                accessibilityLabel="Test API in corso"
              />
              <Text style={styles.loadingText}>Test in corso...</Text>
            </View>
          ) : apiTested && apiResult ? (
            <View accessible={true}>
              <Text style={[
                styles.statusText,
                apiResult.success ? styles.successText : styles.errorText
              ]}>
                {apiResult.success ? 'Successo' : 'Fallito'}
              </Text>
              
              {apiResult.success ? (
                <View 
                  style={styles.resultBox}
                  accessible={true}
                  accessibilityLabel={`Risposta API: ${apiResult.message}`}
                >
                  <Text style={styles.resultLabel}>Risposta API:</Text>
                  <Text style={styles.resultText}>{apiResult.message}</Text>
                </View>
              ) : (
                <View 
                  style={styles.resultBox}
                  accessible={true}
                  accessibilityLabel={`Errore API: ${apiResult.error}`}
                >
                  <Text style={styles.resultLabel}>Errore:</Text>
                  <Text style={styles.errorText}>{apiResult.error}</Text>
                </View>
              )}
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={testAPI}
            disabled={loading}
            accessibilityLabel={ACCESSIBILITY_LABELS.WELCOME_TEST_API_BUTTON}
            accessibilityHint={ACCESSIBILITY_HINTS.WELCOME_TEST_API_BUTTON}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
            accessibilityState={{ disabled: loading, busy: loading }}
          >
            <Text style={styles.buttonSecondaryText}>
              {loading ? 'Test in corso...' : 'Ripeti test API'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={goToProfile}
            accessibilityLabel={ACCESSIBILITY_LABELS.WELCOME_PROFILE_BUTTON}
            accessibilityHint={ACCESSIBILITY_HINTS.WELCOME_PROFILE_BUTTON}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
          >
            <Text style={styles.buttonText}>Vai al profilo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ClassList')}
            accessibilityLabel={ACCESSIBILITY_LABELS.WELCOME_CLASSES_BUTTON}
            accessibilityHint={ACCESSIBILITY_HINTS.WELCOME_CLASSES_BUTTON}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
          >
            <Text style={styles.buttonText}>Le Mie Classi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Materials')}
            accessibilityLabel={ACCESSIBILITY_LABELS.WELCOME_MATERIALS_BUTTON}
            accessibilityHint={ACCESSIBILITY_HINTS.WELCOME_MATERIALS_BUTTON}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
          >
            <Text style={styles.buttonText}>Materiali Didattici</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Reports')}
            accessibilityLabel="Vai ai Report PDP/BES"
            accessibilityHint="Apre la schermata di gestione report PDP/BES"
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
          >
            <Text style={styles.buttonText}>Report PDP/BES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonLogout]}
            onPress={handleLogout}
            accessibilityLabel={ACCESSIBILITY_LABELS.WELCOME_LOGOUT_BUTTON}
            accessibilityHint={ACCESSIBILITY_HINTS.WELCOME_LOGOUT_BUTTON}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
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
  content: {
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666'
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  successText: {
    color: '#34C759'
  },
  errorText: {
    color: '#FF3B30'
  },
  resultBox: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4
  },
  resultText: {
    fontSize: 14,
    color: '#333'
  },
  actions: {
    marginTop: 20
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 44, // WCAG minimum touch target
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF'
  },
  buttonLogout: {
    backgroundColor: '#FF3B30'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonSecondaryText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
