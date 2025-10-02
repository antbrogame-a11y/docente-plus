# 🚨 Guida Emergenza Ripristino - Quick Reference

**Per situazioni urgenti di perdita dati**

---

## ⚡ Azioni Immediate (in ordine di priorità)

### 1. NON PANICO! 
- ✅ Il repository Git è un backup distribuito
- ✅ I dati possono quasi sempre essere recuperati
- ✅ Segui le procedure sotto

---

## 🔥 Scenari Comuni e Soluzioni Rapide

### ❌ Ho cancellato file per errore (NON committati)

```bash
# Ripristina TUTTI i file cancellati
git checkout -- .

# Ripristina UN file specifico
git checkout -- path/to/file.js
```

### ❌ Ho committato file cancellati

```bash
# 1. Trova il commit prima della cancellazione
git log --oneline -10

# 2. Annulla il commit di cancellazione
git revert <commit-hash-cancellazione>

# 3. Push le modifiche
git push
```

### ❌ Ho cancellato tutto il database (deleteAllClasses)

```javascript
// Se l'app è ancora aperta e NON hai chiuso il database:

// 1. Crea backup emergenza del database corrente
import { createDatabaseBackup, listDatabaseBackups, restoreDatabaseFromBackup } from './db/database';
await createDatabaseBackup();

// 2. Lista backup disponibili
const backups = await listDatabaseBackups();
console.log(backups);

// 3. Ripristina dal PENULTIMO backup (l'ultimo è quello vuoto che hai appena creato)
if (backups.length > 1) {
  await restoreDatabaseFromBackup(backups[1].path);
}

// 4. Riavvia l'app
```

### ❌ Repository in stato inconsistente

```bash
# 1. Salva modifiche correnti (se importanti)
git stash save "Emergenza - salvataggio rapido"

# 2. Torna all'ultimo stato pulito
git reset --hard origin/main

# 3. Recupera modifiche salvate (se necessario)
git stash pop
```

### ❌ Modifiche non volute committate su main

```bash
# 1. NON usare git reset --hard se hai già pushato!
# Usa invece git revert per creare un nuovo commit che annulla le modifiche

# 2. Trova il commit da annullare
git log --oneline -10

# 3. Annulla il commit (crea nuovo commit di revert)
git revert <commit-hash>

# 4. Push
git push
```

---

## 🔧 Comandi Git Essenziali di Emergenza

```bash
# Vedere storia commit
git log --oneline -20

# Vedere differenze
git diff

# Vedere file modificati
git status

# Ripristinare file specifico da commit
git checkout <commit-hash> -- path/to/file.js

# Tornare a commit precedente (ATTENZIONE!)
git reset --hard <commit-hash>

# Vedere tutti i branch
git branch -a

# Vedere file in un commit specifico
git show <commit-hash>:path/to/file.js
```

---

## 📱 Database SQLite - Comandi Rapidi

### Backup Immediato

```javascript
import { createDatabaseBackup } from './db/database';

// Crea backup ora
const backupPath = await createDatabaseBackup();
console.log('Backup salvato in:', backupPath);
```

### Lista Backup Disponibili

```javascript
import { listDatabaseBackups } from './db/database';

const backups = await listDatabaseBackups();
backups.forEach((backup, index) => {
  console.log(`${index}: ${backup.filename}`);
  console.log(`   Dimensione: ${backup.size} bytes`);
  console.log(`   Data: ${new Date(backup.modificationTime).toLocaleString()}`);
});
```

### Ripristino Rapido

```javascript
import { restoreDatabaseFromBackup } from './db/database';

// Ripristina da percorso specifico
await restoreDatabaseFromBackup('/percorso/al/backup.db');

// Riavvia l'app dopo il ripristino
```

---

## 🛡️ Prevenzione - Fai SEMPRE Prima

### Prima di Operazioni Rischiose

```bash
# 1. Crea branch di backup
git checkout -b backup-emergency-$(date +%Y%m%d-%H%M)
git push -u origin backup-emergency-$(date +%Y%m%d-%H%M)

# 2. Torna al branch principale
git checkout main

# 3. Ora puoi lavorare sicuro - hai un backup su GitHub
```

### Prima di Usare deleteAllClasses

```javascript
// SEMPRE fare backup prima!
await createDatabaseBackup();

// POI eseguire l'operazione
await deleteAllClasses('CONFIRM_DELETE_ALL_CLASSES');
```

---

## 📞 Quando Chiedere Aiuto

Se nessuna soluzione sopra funziona:

1. **NON fare altri tentativi casuali**
2. Apri un Issue su GitHub con:
   - Descrizione del problema
   - Ultimi comandi eseguiti
   - Output di `git log --oneline -10`
   - Output di `git status`
3. Aspetta supporto prima di procedere

---

## 🔍 Diagnostica Rapida

### Verificare Integrità Repository

```bash
cd /percorso/repository
git status
git log --oneline -5
ls -la
```

### Verificare Database

```javascript
import { initDatabase } from './db/database';

try {
  await initDatabase();
  console.log('✅ Database OK');
} catch (error) {
  console.error('❌ Database ha problemi:', error);
}
```

---

## 📚 Link Documentazione Completa

- **RIPRISTINO_COMPLETO.md** - Guida dettagliata ripristino
- **BACKUP_GUIDE.md** - Guida completa backup e automazione
- **GIT_WORKFLOW_GUIDE.md** - Workflow Git best practices
- **GIT_QUICK_REF.md** - Riferimento rapido Git

---

## ✅ Stato Attuale Repository (Verifica)

```bash
# Esegui per verificare che tutto sia OK
cd /home/runner/work/docente-plus/docente-plus
git status
ls -la db/
ls -la screens/
ls -la context/
```

**Se tutti i comandi sopra funzionano: il repository è OK! ✅**

---

## 🎯 Checklist Post-Emergenza

Dopo aver risolto un'emergenza:

- [ ] Verifica che tutti i file siano presenti
- [ ] Testa l'applicazione (npm start)
- [ ] Crea backup immediato del database
- [ ] Committa lo stato corretto
- [ ] Crea tag di versione stabile
- [ ] Documenta cosa è successo (per evitare ripetizioni)
- [ ] Aggiorna procedure di sicurezza se necessario

---

## 💡 Promemoria Importante

**3 Regole d'Oro:**

1. 🔄 **Backup regolari** - Crea backup PRIMA di modifiche rischiose
2. 📝 **Commit frequenti** - Committa spesso con messaggi chiari
3. 🌿 **Usa branch** - Non lavorare mai direttamente su main per feature importanti

---

**Salvati questo file nei preferiti!**

Per emergenze, parti SEMPRE da questa guida prima di cercare soluzioni altrove.

---

**Ultima revisione:** 2 Ottobre 2025  
**Versione:** 1.0 - Quick Reference
