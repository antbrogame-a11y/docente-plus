# Git Quick Reference - Riferimento Rapido

Comandi Git essenziali per il progetto Docente Plus.

## 🚀 Comandi Base (I Più Usati)

```bash
# Vedere lo stato dei file
git status

# Aggiungere tutti i file modificati
git add .

# Creare un commit
git commit -m "Descrizione modifiche"

# Inviare le modifiche
git push

# Scaricare le modifiche remote
git pull
```

## 📝 Workflow Tipico

```bash
# 1. Verifica stato
git status

# 2. Aggiungi file
git add .

# 3. Commit
git commit -m "feat: Aggiunta nuova funzionalità"

# 4. Push
git push
```

## 🔀 Lavorare con i Branch

```bash
# Creare un nuovo branch
git checkout -b feature/nome-funzione

# Vedere i branch esistenti
git branch

# Passare a un altro branch
git checkout main

# Eliminare un branch
git branch -d feature/nome-funzione
```

## 🔍 Vedere le Modifiche

```bash
# Vedere tutte le modifiche non committate
git diff

# Vedere le modifiche in staging
git diff --staged

# Vedere la storia dei commit
git log --oneline -10
```

## ⚠️ Annullare Modifiche

```bash
# Rimuovere file da staging (ma mantenerli modificati)
git reset HEAD nomefile.txt

# Scartare modifiche non committate
git checkout -- nomefile.txt

# Annullare l'ultimo commit (mantenendo le modifiche)
git reset --soft HEAD~1
```

## 📦 Setup Progetto

```bash
# Clonare il progetto
git clone https://github.com/antbrogame-a11y/docente-plus.git
cd docente-plus

# Installare dipendenze
npm install

# Avviare il progetto
npm start
```

## ✅ Prima di Fare Push

- [ ] Testato localmente con `npm start`
- [ ] Verificato stato con `git status`
- [ ] Messaggio di commit chiaro
- [ ] Nessun file sensibile (.env, password)
- [ ] Fatto `git pull` per ultime modifiche

## 🆘 Problemi Comuni

### Conflitti dopo pull
```bash
# 1. Vedi quali file hanno conflitti
git status

# 2. Apri e risolvi i conflitti nei file
# 3. Aggiungi i file risolti
git add file-risolto.txt

# 4. Completa il merge
git commit -m "Risolti conflitti"
```

### Push rifiutato
```bash
# Scarica le modifiche remote prima
git pull
git push
```

### Modificare ultimo commit
```bash
# Solo se NON hai ancora fatto push
git commit --amend -m "Nuovo messaggio"
```

## 📖 Documentazione Completa

Per una guida dettagliata, consulta: **[GIT_WORKFLOW_GUIDE.md](GIT_WORKFLOW_GUIDE.md)**

## 💡 Risposta Rapida: "Che Devo Fare?"

Hai modificato dei file e non sai cosa fare?

```bash
git status          # Vedi cosa è cambiato
git add .           # Aggiungi tutti i file
git commit -m "..."  # Crea il commit
git push            # Invia al repository
```

**Fatto!** ✅
