# Guida al Backup e Ripristino - Docente Plus

Una guida pratica per proteggere i dati dell'applicazione Docente Plus.

---

## 📋 Indice

1. [Backup Repository Git](#backup-repository-git)
2. [Backup Database SQLite](#backup-database-sqlite)
3. [Ripristino da Backup](#ripristino-da-backup)
4. [Automazione Backup](#automazione-backup)
5. [Procedure di Emergenza](#procedure-di-emergenza)

---

## 🔄 Backup Repository Git

### Backup Manuale Completo

```bash
# 1. Clonare il repository in una cartella di backup
cd /percorso/backup
git clone https://github.com/antbrogame-a11y/docente-plus.git docente-plus-backup-$(date +%Y%m%d)

# 2. Verificare il backup
cd docente-plus-backup-$(date +%Y%m%d)
git status
```

### Creare Tag per Versioni Stabili

```bash
# Quando raggiungi una versione stabile o milestone importante
git tag -a v1.0.0 -m "Prima versione stabile - $(date +%Y-%m-%d)"
git push origin v1.0.0

# Lista di tutti i tag
git tag -l

# Ripristinare da un tag specifico
git checkout tags/v1.0.0
```

### Branch di Sicurezza

```bash
# Prima di modifiche rischiose, crea un branch di backup
git checkout -b backup-before-risky-change-$(date +%Y%m%d)
git push -u origin backup-before-risky-change-$(date +%Y%m%d)

# Torna al branch principale
git checkout main

# Se qualcosa va storto, recupera dal backup
git checkout backup-before-risky-change-20251002
```

---

## 🗄️ Backup Database SQLite

### Opzione 1: Funzioni di Backup Integrate (Raccomandata)

Aggiungi queste funzioni a `db/database.js`:

```javascript
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

/**
 * Crea backup del database SQLite
 * @returns {Promise<string>} Percorso del file di backup
 */
export const createDatabaseBackup = async () => {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const dbPath = `${FileSystem.documentDirectory}SQLite/docente_plus.db`;
    const backupPath = `${FileSystem.documentDirectory}docente_plus_backup_${timestamp}.db`;
    
    // Verifica che il database esista
    const dbInfo = await FileSystem.getInfoAsync(dbPath);
    if (!dbInfo.exists) {
      throw new Error('Database non trovato');
    }
    
    // Copia il database
    await FileSystem.copyAsync({
      from: dbPath,
      to: backupPath
    });
    
    console.log('✅ Backup creato:', backupPath);
    return backupPath;
  } catch (error) {
    console.error('❌ Errore creazione backup:', error);
    throw error;
  }
};

/**
 * Esporta backup del database per condivisione
 * @returns {Promise<string>} Percorso del file esportato
 */
export const exportDatabaseBackup = async () => {
  try {
    const backupPath = await createDatabaseBackup();
    
    // Verifica se la condivisione è disponibile
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(backupPath, {
        mimeType: 'application/x-sqlite3',
        dialogTitle: 'Esporta Backup Database Docente Plus'
      });
    }
    
    return backupPath;
  } catch (error) {
    console.error('❌ Errore esportazione backup:', error);
    throw error;
  }
};

/**
 * Lista tutti i backup disponibili
 * @returns {Promise<Array>} Array di oggetti backup con info
 */
export const listDatabaseBackups = async () => {
  try {
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    
    const backups = files
      .filter(file => file.startsWith('docente_plus_backup_') && file.endsWith('.db'))
      .map(async (file) => {
        const filePath = `${FileSystem.documentDirectory}${file}`;
        const info = await FileSystem.getInfoAsync(filePath);
        return {
          filename: file,
          path: filePath,
          size: info.size,
          modificationTime: info.modificationTime
        };
      });
    
    return await Promise.all(backups);
  } catch (error) {
    console.error('❌ Errore lista backup:', error);
    throw error;
  }
};

/**
 * Ripristina database da backup
 * @param {string} backupPath - Percorso del file di backup
 * @returns {Promise<boolean>} True se ripristinato con successo
 */
export const restoreDatabaseFromBackup = async (backupPath) => {
  try {
    const dbPath = `${FileSystem.documentDirectory}SQLite/docente_plus.db`;
    
    // Verifica che il backup esista
    const backupInfo = await FileSystem.getInfoAsync(backupPath);
    if (!backupInfo.exists) {
      throw new Error('File di backup non trovato');
    }
    
    // Crea backup del database corrente prima di sovrascrivere
    const emergencyBackupPath = `${FileSystem.documentDirectory}docente_plus_before_restore_${Date.now()}.db`;
    const currentDbInfo = await FileSystem.getInfoAsync(dbPath);
    if (currentDbInfo.exists) {
      await FileSystem.copyAsync({
        from: dbPath,
        to: emergencyBackupPath
      });
      console.log('🔄 Backup di emergenza creato:', emergencyBackupPath);
    }
    
    // Ripristina dal backup
    await FileSystem.copyAsync({
      from: backupPath,
      to: dbPath
    });
    
    console.log('✅ Database ripristinato da:', backupPath);
    return true;
  } catch (error) {
    console.error('❌ Errore ripristino database:', error);
    throw error;
  }
};

/**
 * Elimina backup vecchi (mantiene solo gli ultimi N)
 * @param {number} keepCount - Numero di backup da mantenere
 * @returns {Promise<number>} Numero di backup eliminati
 */
export const cleanOldBackups = async (keepCount = 5) => {
  try {
    const backups = await listDatabaseBackups();
    
    // Ordina per data (più recenti prima)
    backups.sort((a, b) => b.modificationTime - a.modificationTime);
    
    // Elimina i backup oltre il limite
    const toDelete = backups.slice(keepCount);
    
    for (const backup of toDelete) {
      await FileSystem.deleteAsync(backup.path);
      console.log('🗑️ Eliminato backup vecchio:', backup.filename);
    }
    
    return toDelete.length;
  } catch (error) {
    console.error('❌ Errore pulizia backup:', error);
    throw error;
  }
};
```

### Installare Dipendenze Necessarie

```bash
# Installare expo-file-system e expo-sharing se non già presenti
npx expo install expo-file-system expo-sharing
```

### Opzione 2: Esportazione Dati in JSON

Aggiungi a `db/database.js`:

```javascript
/**
 * Esporta tutti i dati in formato JSON
 * @returns {Promise<Object>} Oggetto con tutti i dati
 */
export const exportAllDataToJSON = async () => {
  try {
    const database = getDatabase();
    
    // Esporta tutte le tabelle
    const classes = await database.getAllAsync('SELECT * FROM classes');
    const students = await database.getAllAsync('SELECT * FROM students');
    const schedule = await database.getAllAsync('SELECT * FROM schedule');
    const assessments = await database.getAllAsync('SELECT * FROM assessments');
    const teachers = await database.getAllAsync('SELECT * FROM teachers');
    
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      data: {
        classes,
        students,
        schedule,
        assessments,
        teachers
      }
    };
    
    return exportData;
  } catch (error) {
    console.error('❌ Errore esportazione dati:', error);
    throw error;
  }
};

/**
 * Salva esportazione JSON su file
 * @returns {Promise<string>} Percorso del file JSON
 */
export const saveJSONExport = async () => {
  try {
    const data = await exportAllDataToJSON();
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const filePath = `${FileSystem.documentDirectory}docente_plus_export_${timestamp}.json`;
    
    await FileSystem.writeAsStringAsync(
      filePath,
      JSON.stringify(data, null, 2),
      { encoding: FileSystem.EncodingType.UTF8 }
    );
    
    console.log('✅ Esportazione JSON salvata:', filePath);
    
    // Condividi il file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filePath, {
        mimeType: 'application/json',
        dialogTitle: 'Esporta Dati Docente Plus (JSON)'
      });
    }
    
    return filePath;
  } catch (error) {
    console.error('❌ Errore salvataggio JSON:', error);
    throw error;
  }
};
```

### Uso delle Funzioni di Backup

Esempio di implementazione in una screen:

```javascript
import React from 'react';
import { View, Button, Alert } from 'react-native';
import {
  createDatabaseBackup,
  exportDatabaseBackup,
  listDatabaseBackups,
  restoreDatabaseFromBackup,
  saveJSONExport
} from '../db/database';

export default function BackupScreen() {
  const handleCreateBackup = async () => {
    try {
      const backupPath = await createDatabaseBackup();
      Alert.alert('Successo', `Backup creato: ${backupPath}`);
    } catch (error) {
      Alert.alert('Errore', error.message);
    }
  };
  
  const handleExportBackup = async () => {
    try {
      await exportDatabaseBackup();
      Alert.alert('Successo', 'Backup esportato');
    } catch (error) {
      Alert.alert('Errore', error.message);
    }
  };
  
  const handleExportJSON = async () => {
    try {
      await saveJSONExport();
      Alert.alert('Successo', 'Dati esportati in JSON');
    } catch (error) {
      Alert.alert('Errore', error.message);
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Button title="Crea Backup Database" onPress={handleCreateBackup} />
      <Button title="Esporta e Condividi Backup" onPress={handleExportBackup} />
      <Button title="Esporta Dati in JSON" onPress={handleExportJSON} />
    </View>
  );
}
```

---

## 🔄 Ripristino da Backup

### Ripristino File Git

```bash
# 1. Identificare il commit da cui ripristinare
git log --oneline -20

# 2. Ripristinare file specifico
git checkout <commit-hash> -- path/to/file.js

# 3. Verificare le modifiche
git status
git diff

# 4. Committare il ripristino
git add path/to/file.js
git commit -m "Ripristina file da commit <commit-hash>"
git push
```

### Ripristino Database

```javascript
// Usando le funzioni di backup
import { restoreDatabaseFromBackup, listDatabaseBackups } from '../db/database';

// Lista backup disponibili
const backups = await listDatabaseBackups();
console.log('Backup disponibili:', backups);

// Ripristina da backup più recente
const latestBackup = backups[0];
await restoreDatabaseFromBackup(latestBackup.path);
```

---

## ⚙️ Automazione Backup

### Backup Automatico all'Avvio

Aggiungi al tuo `App.js`:

```javascript
import { useEffect } from 'react';
import { createDatabaseBackup, cleanOldBackups } from './db/database';

function App() {
  useEffect(() => {
    // Backup automatico all'avvio dell'app
    const autoBackup = async () => {
      try {
        // Crea backup
        await createDatabaseBackup();
        console.log('✅ Backup automatico completato');
        
        // Mantieni solo gli ultimi 5 backup
        const deleted = await cleanOldBackups(5);
        console.log(`🗑️ Eliminati ${deleted} backup vecchi`);
      } catch (error) {
        console.error('❌ Errore backup automatico:', error);
      }
    };
    
    autoBackup();
  }, []);
  
  // ... resto del componente
}
```

### Backup Programmato

```javascript
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { createDatabaseBackup } from './db/database';

function useAutoBackup(intervalHours = 24) {
  useEffect(() => {
    const BACKUP_INTERVAL = intervalHours * 60 * 60 * 1000; // Converti ore in ms
    
    // Backup quando app torna in foreground
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        const lastBackup = await AsyncStorage.getItem('lastBackupTime');
        const now = Date.now();
        
        if (!lastBackup || (now - parseInt(lastBackup)) > BACKUP_INTERVAL) {
          try {
            await createDatabaseBackup();
            await AsyncStorage.setItem('lastBackupTime', now.toString());
            console.log('✅ Backup programmato completato');
          } catch (error) {
            console.error('❌ Errore backup programmato:', error);
          }
        }
      }
    });
    
    return () => subscription.remove();
  }, [intervalHours]);
}

// Uso nel componente App
function App() {
  useAutoBackup(24); // Backup ogni 24 ore
  // ... resto del componente
}
```

---

## 🚨 Procedure di Emergenza

### Scenario 1: Database Corrotto

```javascript
// 1. Tentare di aprire il database
try {
  await initDatabase();
} catch (error) {
  console.error('Database corrotto:', error);
  
  // 2. Ripristinare da backup più recente
  const backups = await listDatabaseBackups();
  if (backups.length > 0) {
    await restoreDatabaseFromBackup(backups[0].path);
    await initDatabase(); // Reinizializza
  } else {
    // 3. Nessun backup disponibile - reinizializza database vuoto
    console.warn('Nessun backup disponibile - inizializzazione database vuoto');
    await FileSystem.deleteAsync(
      `${FileSystem.documentDirectory}SQLite/docente_plus.db`
    );
    await initDatabase();
  }
}
```

### Scenario 2: Dati Cancellati per Errore

```javascript
// Se hai cancellato tutte le classi per errore
// E il database è ancora in memoria (non chiuso)

// 1. NON chiudere l'app immediatamente
// 2. Creare backup del database corrente (anche se vuoto)
await createDatabaseBackup(); // Questo salva lo stato attuale

// 3. Ripristinare da backup precedente
const backups = await listDatabaseBackups();
// Scegli il penultimo backup (l'ultimo è quello che hai appena creato)
if (backups.length > 1) {
  await restoreDatabaseFromBackup(backups[1].path);
}
```

### Scenario 3: Repository Git in Stato Inconsistente

```bash
# 1. Verificare lo stato
git status
git log --oneline -10

# 2. Se hai modifiche non committate che vuoi salvare
git stash save "Salvataggio emergenza prima di reset"

# 3. Tornare all'ultimo commit stabile
git reset --hard origin/main

# 4. Se servivano le modifiche salvate
git stash list
git stash pop

# 5. Se il problema persiste, clonare nuovamente
cd ..
mv docente-plus docente-plus-problematico
git clone https://github.com/antbrogame-a11y/docente-plus.git
```

---

## 📊 Checklist di Sicurezza

### Prima di Modifiche Importanti

- [ ] Backup database creato
- [ ] Commit Git aggiornato
- [ ] Branch di backup creato
- [ ] Tag versione se necessario
- [ ] Testato in ambiente di sviluppo

### Routine Settimanale

- [ ] Verificare presenza backup recenti
- [ ] Pulire backup vecchi (mantieni ultimi 5)
- [ ] Verificare integrità database
- [ ] Committare modifiche pendenti
- [ ] Sincronizzare con repository remoto

### Routine Mensile

- [ ] Esportare dati in JSON
- [ ] Salvare backup completo offline
- [ ] Creare tag di versione stabile
- [ ] Verificare `.gitignore` aggiornato
- [ ] Documentare modifiche importanti

---

## 📞 Risorse Utili

- **GIT_WORKFLOW_GUIDE.md** - Guida workflow Git completa
- **GIT_QUICK_REF.md** - Riferimento rapido comandi Git
- **RIPRISTINO_COMPLETO.md** - Guida ripristino completa
- **RESTORATION_VERIFICATION.md** - Verifica ripristino precedente

---

## ✅ Conclusione

Questa guida fornisce tutti gli strumenti necessari per:
- ✅ Creare backup automatici e manuali
- ✅ Ripristinare dati in caso di problemi
- ✅ Prevenire perdite di dati
- ✅ Gestire situazioni di emergenza

**Ricorda:** Il backup è la tua assicurazione contro la perdita di dati. Crea backup regolarmente!

---

**Ultimo aggiornamento:** 2 Ottobre 2025  
**Versione:** 1.0
