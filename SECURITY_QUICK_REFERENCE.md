# Guida Rapida - Sicurezza e Validazione

Riferimento veloce per sviluppatori su come utilizzare le utility di sicurezza e validazione nel progetto Docente Plus.

---

## 🔒 Validazione Input

### Import
```javascript
import {
  sanitizeText,
  isValidEmail,
  isValidUrl,
  validateField,
  ALLOWED_MIME_TYPES
} from '../utils/validation';
```

### Sanitizzare Testo
```javascript
// Base - max 500 caratteri, rimuove < >
const clean = sanitizeText(userInput);

// Con lunghezza personalizzata
const clean = sanitizeText(userInput, 200);

// Esempio pratico
const handleSave = async () => {
  const cleanName = sanitizeText(className, 100);
  await saveClass(cleanName);
};
```

### Validare Email
```javascript
if (!isValidEmail(email)) {
  Alert.alert('Errore', 'Email non valida');
  return;
}
```

### Validare URL
```javascript
// Solo http:// e https://
if (!isValidUrl(url)) {
  Alert.alert('Errore', 'URL non valido');
  return;
}
```

### Validare Campo Completo
```javascript
const result = validateField(value, {
  required: true,      // Campo obbligatorio
  minLength: 3,        // Min 3 caratteri
  maxLength: 100,      // Max 100 caratteri
  type: 'text'         // 'text', 'email', 'url', 'number'
});

if (!result.isValid) {
  Alert.alert('Errore', result.error);
  return;
}

// Usa il valore sanitizzato
await save(result.sanitized);
```

### Validare File Upload
```javascript
import { isValidFileSize, isValidMimeType, ALLOWED_MIME_TYPES } from '../utils/validation';

// Picker con tipi sicuri
const result = await DocumentPicker.getDocumentAsync({
  type: ALLOWED_MIME_TYPES,
  copyToCacheDirectory: true
});

const file = result.assets[0];

// Validare dimensione (max 10MB)
if (!isValidFileSize(file.size, 10)) {
  Alert.alert('Errore', 'File troppo grande (max 10MB)');
  return;
}

// Validare tipo MIME
if (!isValidMimeType(file.mimeType)) {
  Alert.alert('Errore', 'Tipo file non supportato');
  return;
}
```

---

## 📝 Logging

### Import
```javascript
import logger from '../utils/logger';
```

### Livelli Log
```javascript
// DEBUG - solo development
logger.debug('Dettaglio implementazione', { data });

// INFO - solo development
logger.info('Operazione completata');

// WARN - development e production
logger.warn('Limite quasi raggiunto', { count });

// ERROR - sempre
logger.error('Errore critico', error);
```

### Log Specializzati
```javascript
// Database operations
logger.database('createClass', { className });

// API calls
logger.api('POST /classes', { status: 200 });

// Security events (sempre registrati)
logger.security('Tentativo accesso non autorizzato', { userId });
```

### Best Practice
```javascript
// ❌ NON fare
console.log('User data:', userData);  // Leak in produzione

// ✅ FARE
logger.debug('User data:', userData);  // Solo development
```

---

## ♿ Accessibilità

### Import
```javascript
import { ACCESSIBILITY_ROLES } from '../constants/accessibility';
```

### TextInput
```javascript
<TextInput
  accessibilityLabel="Nome della classe"
  accessibilityHint="Inserisci il nome per la nuova classe"
  accessibilityRole={ACCESSIBILITY_ROLES.TEXT_INPUT}
/>
```

### Button/TouchableOpacity
```javascript
<TouchableOpacity
  accessibilityLabel="Salva modifiche"
  accessibilityHint="Tocca per salvare le modifiche effettuate"
  accessibilityRole={ACCESSIBILITY_ROLES.BUTTON}
  accessibilityState={{ disabled: loading }}
  style={{ minHeight: 44, minWidth: 44 }}  // WCAG minimum
>
  <Text>Salva</Text>
</TouchableOpacity>
```

### ActivityIndicator
```javascript
<ActivityIndicator
  accessibilityLabel="Caricamento in corso"
/>
```

### Errori
```javascript
<Text
  accessibilityRole={ACCESSIBILITY_ROLES.ALERT}
  accessibilityLabel={`Errore: ${errorMessage}`}
>
  Errore: {errorMessage}
</Text>
```

### Liste
```javascript
<FlatList
  data={items}
  accessibilityLabel={`Lista di ${items.length} elementi`}
  renderItem={renderItem}
/>
```

---

## 🔐 Operazioni Pericolose

### deleteAllClasses
```javascript
// ❌ NON funziona più
await deleteAllClasses();

// ✅ Richiede token
await deleteAllClasses('CONFIRM_DELETE_ALL_CLASSES');
```

### Pattern per Nuove Funzioni Pericolose
```javascript
export const dangerousOperation = async (confirmationToken) => {
  // Validazione token
  if (confirmationToken !== 'CONFIRM_TOKEN_VALUE') {
    throw new Error('Operazione richiede token di conferma');
  }
  
  // Log sicurezza
  logger.security('Operazione pericolosa richiesta', { operation: 'name' });
  
  // Esegui operazione
  await performOperation();
  
  logger.info('Operazione pericolosa completata');
};
```

---

## 📋 Checklist Pre-Commit

Prima di committare codice che gestisce input utente:

- [ ] Input sanitizzato con `sanitizeText()`
- [ ] Email validata con `isValidEmail()`
- [ ] URL validato con `isValidUrl()`
- [ ] File validati (size + MIME type)
- [ ] Usato `logger.*` invece di `console.*`
- [ ] Aggiunte accessibility labels
- [ ] Touch targets minimo 44x44
- [ ] Test scritti per nuove funzioni
- [ ] Documentazione JSDoc aggiornata

---

## ⚠️ Pattern da Evitare

### ❌ Input Non Validato
```javascript
// PERICOLOSO
await saveToDatabase(userInput);
```

### ✅ Input Validato
```javascript
// SICURO
const clean = sanitizeText(userInput, 100);
await saveToDatabase(clean);
```

---

### ❌ File Upload Non Validato
```javascript
// PERICOLOSO
const result = await DocumentPicker.getDocumentAsync({
  type: '*/*'  // Accetta qualsiasi file
});
```

### ✅ File Upload Validato
```javascript
// SICURO
import { ALLOWED_MIME_TYPES, isValidFileSize, isValidMimeType } from '../utils/validation';

const result = await DocumentPicker.getDocumentAsync({
  type: ALLOWED_MIME_TYPES
});

const file = result.assets[0];
if (!isValidFileSize(file.size, 10)) return;
if (!isValidMimeType(file.mimeType)) return;
```

---

### ❌ Console in Produzione
```javascript
// EVITARE
console.log('User password:', password);  // Leak in produzione
```

### ✅ Logger Configurabile
```javascript
// PREFERIRE
logger.debug('Login attempt', { userId });  // Solo development
```

---

### ❌ Operazioni Pericolose Non Protette
```javascript
// PERICOLOSO
export const deleteAll = async () => {
  await database.runAsync('DELETE FROM users');
};
```

### ✅ Operazioni Pericolose Protette
```javascript
// SICURO
export const deleteAll = async (confirmationToken) => {
  if (confirmationToken !== 'CONFIRM_DELETE_ALL') {
    throw new Error('Token richiesto');
  }
  logger.security('Delete all requested');
  await database.runAsync('DELETE FROM users');
};
```

---

## 📚 Riferimenti Rapidi

### ALLOWED_MIME_TYPES
```javascript
[
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]
```

### ACCESSIBILITY_ROLES
```javascript
{
  HEADER: 'header',
  BUTTON: 'button',
  TEXT_INPUT: 'none',
  LINK: 'link',
  IMAGE: 'image',
  ALERT: 'alert',
  TEXT: 'text'
}
```

### File Size Limits
- Default: 10MB
- Personalizzabile: `isValidFileSize(size, maxMB)`

---

## 🆘 Troubleshooting

### Validation fallisce sempre
```javascript
// Controlla tipo input
console.log(typeof value);  // Deve essere 'string'

// Prova con trim
const trimmed = value.trim();
```

### Logger non mostra nulla
```javascript
// Verifica ambiente
console.log(__DEV__);  // true = development

// In production solo ERROR e SECURITY
logger.error('Questo si vede sempre');
```

### Accessibility warnings
```javascript
// Assicurati di avere TUTTI gli attributi
<TouchableOpacity
  accessibilityLabel="..."     // Obbligatorio
  accessibilityHint="..."       // Raccomandato
  accessibilityRole="button"    // Obbligatorio
  style={{ minHeight: 44 }}     // WCAG
/>
```

---

**Per domande o dubbi, consulta:**
- `SECURITY_ACCESSIBILITY_AUDIT.md` - Audit completo
- `SECURITY_IMPLEMENTATION_SUMMARY.md` - Implementazione dettagliata
- `utils/validation.js` - Codice sorgente con JSDoc
- `utils/logger.js` - Codice sorgente con JSDoc

