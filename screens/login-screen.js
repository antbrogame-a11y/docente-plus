import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { AuthContext } from '../context/auth-context';
import { ACCESSIBILITY_LABELS, ACCESSIBILITY_HINTS, ACCESSIBILITY_ROLES } from '../constants/accessibility';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Errore', 'Inserisci email e password');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        // Navigation will happen automatically through the navigation logic
      } else {
        Alert.alert('Errore', result.error || 'Login fallito');
      }
    } catch (error) {
      Alert.alert('Errore', 'Si è verificato un errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      accessibilityRole={ACCESSIBILITY_ROLES.HEADER}
    >
      <View style={styles.content}>
        <Text 
          style={styles.title}
          accessibilityRole={ACCESSIBILITY_ROLES.HEADER}
          accessibilityLabel="Docente Plus - Applicazione per insegnanti"
        >
          Docente Plus
        </Text>
        <Text style={styles.subtitle}>Accedi alla tua area</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Inserisci la tua email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            accessibilityLabel={ACCESSIBILITY_LABELS.LOGIN_EMAIL_INPUT}
            accessibilityHint={ACCESSIBILITY_HINTS.LOGIN_EMAIL_INPUT}
            accessibilityRole={ACCESSIBILITY_ROLES.TEXT_INPUT}
            autoComplete="email"
            textContentType="emailAddress"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Inserisci la tua password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            accessibilityLabel={ACCESSIBILITY_LABELS.LOGIN_PASSWORD_INPUT}
            accessibilityHint={ACCESSIBILITY_HINTS.LOGIN_PASSWORD_INPUT}
            accessibilityRole={ACCESSIBILITY_ROLES.TEXT_INPUT}
            autoComplete="password"
            textContentType="password"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            accessibilityLabel={ACCESSIBILITY_LABELS.LOGIN_SUBMIT_BUTTON}
            accessibilityHint={ACCESSIBILITY_HINTS.LOGIN_SUBMIT_BUTTON}
            accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
            accessibilityState={{ disabled: loading, busy: loading }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" accessibilityLabel="Caricamento in corso" />
            ) : (
              <Text style={styles.buttonText}>Accedi</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    minHeight: 44, // WCAG minimum touch target
  },
  buttonDisabled: {
    backgroundColor: '#999'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
