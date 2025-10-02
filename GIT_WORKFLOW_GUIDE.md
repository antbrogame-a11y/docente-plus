# Guida al Workflow Git - Docente Plus

## Cosa Devi Fare Dopo l'Aggiunta di File

Questa guida spiega il processo completo di commit in Git, rispondendo alla domanda "che devo fare" (what should I do) quando hai file da committare.

---

## 🔄 Il Processo di Commit in 3 Passi

### 1. Verificare lo Stato dei File
```bash
git status
```

Questo comando mostra:
- ✅ **File modificati** (in rosso se non aggiunti)
- ✅ **File pronti per il commit** (in verde se già aggiunti con `git add`)
- ✅ **File non tracciati** (nuovi file non ancora in Git)

### 2. Aggiungere i File al Commit
```bash
# Aggiungere un singolo file
git add nomefile.txt

# Aggiungere tutti i file modificati
git add .

# Aggiungere file specifici
git add file1.js file2.js
```

### 3. Creare il Commit
```bash
# Commit con messaggio in linea
git commit -m "Descrizione delle modifiche"

# Oppure: commit che apre l'editor per il messaggio
git commit
```

Quando usi `git commit` senza `-m`, si apre l'editor con il file `.git/COMMIT_EDITMSG` dove puoi:
- Scrivere una descrizione dettagliata
- Le righe che iniziano con `#` sono commenti (non verranno incluse)
- Salvare e chiudere l'editor per confermare il commit

---

## 📋 Workflow Completo per Questo Progetto

### Scenario 1: Primo Setup del Progetto
```bash
# 1. Clona il repository
git clone https://github.com/antbrogame-a11y/docente-plus.git
cd docente-plus

# 2. Installa dipendenze
npm install

# 3. Configura l'ambiente (opzionale)
cp .env.example .env
# Modifica .env con la tua API key se necessario

# 4. Avvia il progetto
npm start
```

### Scenario 2: Aggiungere Nuove Funzionalità
```bash
# 1. Crea un nuovo branch
git checkout -b feature/nome-funzionalita

# 2. Lavora sui file
# ... modifica i file necessari ...

# 3. Verifica le modifiche
git status
git diff

# 4. Aggiungi i file modificati
git add .

# 5. Crea il commit
git commit -m "feat: Aggiunta nuova funzionalità X"

# 6. Push del branch
git push origin feature/nome-funzionalita

# 7. Crea una Pull Request su GitHub
```

### Scenario 3: Modifiche Rapide
```bash
# 1. Verifica di essere sul branch corretto
git branch

# 2. Modifica i file necessari
# ... lavora sui file ...

# 3. Aggiungi e committa in un colpo
git add .
git commit -m "fix: Corretto bug nella login"

# 4. Push delle modifiche
git push
```

---

## 📝 Convenzioni per i Messaggi di Commit

### Formato Raccomandato
```
tipo: Breve descrizione (max 50 caratteri)

Descrizione dettagliata opzionale che spiega:
- Cosa è stato modificato
- Perché è stato modificato
- Come è stato modificato
```

### Tipi di Commit Comuni
- **feat**: Nuova funzionalità
  - Esempio: `feat: Aggiunto sistema di login`
- **fix**: Correzione di bug
  - Esempio: `fix: Risolto errore nella validazione email`
- **docs**: Modifiche alla documentazione
  - Esempio: `docs: Aggiornato README con istruzioni setup`
- **style**: Modifiche di formattazione (non influenzano il codice)
  - Esempio: `style: Corretta indentazione in App.js`
- **refactor**: Refactoring del codice
  - Esempio: `refactor: Migliorata struttura auth-context`
- **test**: Aggiunta o modifica di test
  - Esempio: `test: Aggiunti test per login-screen`
- **chore**: Modifiche di manutenzione
  - Esempio: `chore: Aggiornate dipendenze`

---

## 🔍 Comandi Git Utili

### Verificare lo Stato
```bash
# Stato corrente
git status

# Differenze non committate
git diff

# Differenze già aggiunte per il commit
git diff --staged

# Storia dei commit
git log --oneline -10
```

### Gestione dei File
```bash
# Rimuovere file dall'area di staging (ma mantenerli modificati)
git reset HEAD nomefile.txt

# Scartare modifiche non committate
git checkout -- nomefile.txt

# Rimuovere file non tracciati
git clean -fd
```

### Lavorare con i Branch
```bash
# Vedere tutti i branch
git branch -a

# Creare e passare a un nuovo branch
git checkout -b nuovo-branch

# Passare a un branch esistente
git checkout nome-branch

# Eliminare un branch locale
git branch -d nome-branch
```

### Sincronizzare con il Repository Remoto
```bash
# Scaricare le modifiche dal repository remoto
git pull

# Scaricare senza applicare le modifiche
git fetch

# Inviare le modifiche al repository remoto
git push

# Inviare un nuovo branch
git push -u origin nome-branch
```

---

## 🎯 Cosa Fare in Situazioni Specifiche

### Ho modificato file ma non voglio committarli tutti
```bash
# Aggiungi solo i file che vuoi committare
git add file1.js file2.js
git commit -m "Modifiche specifiche"

# Gli altri file rimarranno modificati ma non committati
```

### Ho fatto un commit ma voglio modificare il messaggio
```bash
# Se NON hai ancora fatto push
git commit --amend -m "Nuovo messaggio corretto"

# Se hai già fatto push (sconsigliato se altri lavorano sul branch)
git commit --amend -m "Nuovo messaggio"
git push --force
```

### Ho committato file per errore
```bash
# Annullare l'ultimo commit ma mantenere le modifiche
git reset --soft HEAD~1

# Ora puoi rifare il commit correttamente
git add file-corretto.js
git commit -m "Commit corretto"
```

### Voglio vedere cosa ho modificato prima di committare
```bash
# Vedere tutte le modifiche
git diff

# Vedere modifiche di un file specifico
git diff nomefile.txt

# Vedere modifiche già in staging
git diff --staged
```

---

## 📦 File Importanti da Conoscere

### `.gitignore`
- Specifica quali file Git deve **ignorare**
- Già configurato per escludere:
  - `node_modules/` (dipendenze npm)
  - `.env` (file con credenziali sensibili)
  - File temporanei e di build

**Non modificare** `.gitignore` a meno che tu non sappia cosa stai facendo!

### `package-lock.json`
- Blocca le versioni esatte delle dipendenze npm
- **Deve essere committato** nel repository
- Assicura che tutti usino le stesse versioni delle librerie

### `.git/COMMIT_EDITMSG`
- File temporaneo usato da Git per scrivere i messaggi di commit
- **Non committare mai** questo file (è già in `.gitignore`)
- Si apre automaticamente quando fai `git commit` senza `-m`

---

## ✅ Checklist Prima di Fare Push

Prima di inviare le tue modifiche al repository remoto, verifica:

- [ ] Ho testato le modifiche localmente? (`npm start`)
- [ ] Tutti i file necessari sono stati aggiunti? (`git status`)
- [ ] Il messaggio di commit è chiaro e descrittivo?
- [ ] Non sto committando file sensibili? (controlla `.env`, password, ecc.)
- [ ] Non sto committando file generati? (`node_modules`, `dist`, ecc.)
- [ ] Ho fatto pull delle ultime modifiche? (`git pull`)

---

## 🆘 Problemi Comuni e Soluzioni

### "Inserisci email e password" in Git
Se Git chiede credenziali:
```bash
# Configurare nome e email (una volta sola)
git config --global user.name "Tuo Nome"
git config --global user.email "tua.email@example.com"
```

### "Conflict" durante il pull
Se ci sono conflitti:
```bash
# 1. Git ti dirà quali file hanno conflitti
git status

# 2. Apri i file e risolvi i conflitti manualmente
# Cerca le sezioni con <<<<<<< HEAD

# 3. Dopo aver risolto:
git add file-risolto.txt
git commit -m "Risolti conflitti"
```

### "Push rejected"
Se il push viene rifiutato:
```bash
# Prima scarica le modifiche remote
git pull

# Poi riprova il push
git push
```

---

## 📚 Risorse Aggiuntive

### Documentazione di Questo Progetto
- **README.md** - Panoramica generale del progetto
- **QUICKSTART.md** - Guida rapida per iniziare (5 minuti)
- **TEST_LOGIN_API.md** - Come testare login e API DeepSeek
- **IMPLEMENTATION_SUMMARY.md** - Dettagli tecnici dell'implementazione

### Documentazione Git
- [Pro Git Book (Italiano)](https://git-scm.com/book/it/v2)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

### Supporto
Per domande specifiche su questo progetto:
- Apri una [Issue su GitHub](https://github.com/antbrogame-a11y/docente-plus/issues)
- Consulta la documentazione esistente nella cartella principale

---

## 🎓 Riepilogo: "Che Devo Fare?"

Se ti trovi con file modificati e ti chiedi "che devo fare", segui questi passi:

1. **Verifica lo stato**: `git status`
2. **Aggiungi i file**: `git add .` (o specifica i file)
3. **Crea il commit**: `git commit -m "Descrizione"`
4. **Invia le modifiche**: `git push`

**È tutto!** 🎉

Se qualcosa non è chiaro, consulta le sezioni specifiche sopra o chiedi aiuto aprendo una Issue.
