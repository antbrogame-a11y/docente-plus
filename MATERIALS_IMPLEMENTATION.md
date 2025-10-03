# Implementazione Modulo Materiali Didattici

## 📋 Riepilogo delle Modifiche

Questo documento descrive l'implementazione del modulo per la gestione dei materiali didattici nel progetto Docente Plus.

## ✅ Funzionalità Implementate

### 1. Schema Database
**File: `db/schema.js`**

Aggiunta nuova tabella `materials` con i seguenti campi:
- `id` - Chiave primaria auto-incrementante
- `title` - Titolo del materiale (obbligatorio)
- `type` - Tipo di materiale: 'pdf', 'image', 'link', 'document' (obbligatorio)
- `file_path` - Percorso del file sul dispositivo (per file locali)
- `url` - URL per materiali di tipo link
- `description` - Descrizione opzionale del materiale
- `class_id` - Riferimento alla classe (foreign key opzionale)
- `student_id` - Riferimento allo studente (foreign key opzionale)
- `created_at` - Data e ora di creazione (obbligatorio)

### 2. Operazioni CRUD Database
**File: `db/database.js`**

Implementate le seguenti funzioni:

#### Create
- `createMaterial(title, type, filePath, url, description, classId, studentId)` - Crea un nuovo materiale

#### Read
- `getAllMaterials()` - Ottiene tutti i materiali ordinati per data di creazione
- `getMaterialById(id)` - Ottiene un materiale specifico per ID
- `getMaterialsByClassId(classId)` - Ottiene tutti i materiali associati a una classe
- `getMaterialsByStudentId(studentId)` - Ottiene tutti i materiali associati a uno studente

#### Update
- `updateMaterial(id, title, type, filePath, url, description, classId, studentId)` - Aggiorna un materiale esistente

#### Delete
- `deleteMaterial(id)` - Elimina un materiale (e il file associato se presente)

#### Export/Import
- Aggiornate le funzioni `exportAllDataToJSON` e `importDataFromJSON` per includere i materiali

### 3. Context Provider
**File: `context/materials-context.js`**

Implementato `MaterialsContext` che fornisce:
- `materials` - Array di tutti i materiali
- `loading` - Stato di caricamento
- `error` - Stato di errore
- `addMaterial()` - Aggiunge un nuovo materiale
- `modifyMaterial()` - Modifica un materiale esistente
- `removeMaterial()` - Rimuove un materiale
- `getMaterialsForClass()` - Ottiene materiali per una classe specifica
- `getMaterialsForStudent()` - Ottiene materiali per uno studente specifico
- `refreshMaterials()` - Ricarica i materiali dal database

### 4. Schermata Materiali
**File: `screens/materials-screen.js`**

Implementata interfaccia utente completa con:

#### Vista Lista
- Visualizzazione di tutti i materiali con icone per tipo
- Informazioni: titolo, descrizione, classe associata, data di creazione
- Pulsante per eliminare ogni materiale
- Click sul materiale per aprirlo (link esterni o mostrare percorso file)

#### Form di Aggiunta
- Campo titolo (obbligatorio)
- Campo descrizione (opzionale)
- Selezione tipo di materiale (link, PDF, immagine, documento)
- Per link: campo URL
- Per file: pulsante per selezionare file dal dispositivo
- Selezione classe (opzionale)
- Pulsanti Annulla e Aggiungi

#### Funzionalità
- Upload file tramite `expo-document-picker`
- Salvataggio file in directory dedicata
- Rilevamento automatico tipo file da MIME type
- Apertura link esterni tramite `Linking`
- Conferma eliminazione con alert

### 5. Navigazione
**File: `navigation/app-navigation.js`**

Aggiunta schermata Materials al navigator:
```javascript
<Stack.Screen 
  name="Materials" 
  component={MaterialsScreen} 
  options={{ title: 'Materiali Didattici' }} 
/>
```

**File: `screens/welcome-screen.js`**

Aggiunto pulsante "Materiali Didattici" nella schermata di benvenuto.

### 6. Provider nell'App
**File: `App.js`**

Integrato MaterialsProvider nella gerarchia dei provider:
```javascript
<MaterialsProvider>
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
</MaterialsProvider>
```

### 7. Dipendenze
**File: `package.json`**

Aggiunta dipendenza:
- `expo-document-picker: ~13.0.2` - Per la selezione di file dal dispositivo

### 8. Test
**File: `__tests__/database-materials.test.js`**

Implementati 17 test che verificano:
- Creazione di materiali (link, PDF, con/senza associazioni)
- Lettura di materiali (tutti, per ID, per classe, per studente)
- Aggiornamento di materiali
- Eliminazione di materiali
- Supporto per tutti i tipi di materiali

**File: `__tests__/database-backup.test.js`**

Aggiornato test di import/export per includere i materiali.

## 📊 Risultati Test

```
Test Suites: 3 passed, 3 total
Tests:       65 passed, 65 total
```

Tutti i test passano con successo, inclusi:
- 17 nuovi test per materiali
- 48 test esistenti (database CRUD e backup)

## 🎯 Tipi di Materiali Supportati

1. **Link (🔗)** - URL a risorse esterne (video, siti web, ecc.)
2. **PDF (📄)** - Documenti PDF
3. **Immagine (🖼️)** - File immagine (JPG, PNG, ecc.)
4. **Documento (📎)** - Altri tipi di documento (Word, Excel, ecc.)

## 🔗 Associazioni

I materiali possono essere associati a:
- **Classi** - Materiali condivisi con tutta la classe
- **Studenti** - Materiali personalizzati per studenti specifici (es. PDP, materiali BES/DSA)
- **Nessuna associazione** - Materiali generali del docente

## 💾 Gestione File

- I file caricati vengono salvati in `/documentDirectory/materials/`
- Il nome del file include timestamp per evitare conflitti
- All'eliminazione di un materiale, viene eliminato anche il file associato
- I materiali sono inclusi nelle funzionalità di backup/export

## 🚀 Utilizzo

### Aggiungere un Link
```javascript
await addMaterial(
  'Tutorial JavaScript',
  'link',
  null,
  'https://example.com/js-tutorial',
  'Tutorial completo su JavaScript',
  classId
);
```

### Aggiungere un File
```javascript
// Dopo aver selezionato il file con DocumentPicker
await addMaterial(
  'Dispensa Matematica',
  'pdf',
  filePath,
  null,
  'Dispensa per il corso',
  classId
);
```

### Ottenere Materiali di una Classe
```javascript
const materials = await getMaterialsForClass(classId);
```

## 📱 Interfaccia Utente

L'interfaccia è stata progettata seguendo i principi di accessibilità:
- Icone semantiche per tipo di materiale
- Contrasto colori adeguato
- Touch targets sufficientemente grandi
- Conferme per azioni distruttive
- Messaggi di errore chiari
- Loading states per operazioni asincrone

## 🔄 Integrazione con Sistema Esistente

Il modulo si integra perfettamente con:
- **SQLite database** - Persistenza dati
- **Context API** - State management
- **Navigation** - Navigazione tra schermate
- **Backup/Export** - Inclusi in tutte le operazioni di backup
- **Classes/Students** - Associazioni tramite foreign keys

## 📝 Note Tecniche

1. Il modulo utilizza il pattern già esistente nel progetto (Context + Database)
2. Tutti i file seguono lo stile di codice del progetto
3. Le funzioni database seguono lo stesso pattern di error handling
4. I test utilizzano mock per expo modules come gli altri test del progetto
5. La schermata è responsive e funziona su diverse dimensioni di schermo

## ✨ Funzionalità Future Possibili

- Visualizzazione anteprima per PDF e immagini
- Condivisione materiali via email o app esterne
- Ricerca e filtri per materiali
- Categorizzazione con tag
- Cronologia accessi ai materiali
- Statistiche di utilizzo
- Caricamento multiplo di file
- Integrazione con cloud storage (Google Drive, Dropbox)
