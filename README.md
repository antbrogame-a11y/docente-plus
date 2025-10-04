# Didactos Docente Plus

Applicazione demo/mock per la gestione semplificata delle attività didattiche degli insegnanti.

---

## Funzionalità principali

- **Gestione profilo insegnante**  
  Visualizzazione e modifica dati personali, scuola, materie.

- **Orario settimanale**  
  Visualizzazione e modifica dell’orario delle lezioni (funzionalità base).

- **Gestione delle classi**  
  - Elenco classi  
  - Aggiunta, modifica ed eliminazione classe

- **Gestione degli studenti**  
  - Elenco studenti per classe  
  - Aggiunta/modifica/eliminazione studente  
  - Gestione BES/DSA per ogni studente

- **Gestione materiali didattici**  
  - Upload e gestione di PDF, immagini, documenti
  - Collegamento link esterni a risorse online
  - Associazione materiali a classi e studenti
  - Visualizzazione e download materiali

- **Report PDP/BES** ⭐ NUOVO ⭐  
  - Creazione guidata report Piano Didattico Personalizzato (PDP)
  - Creazione guidata report Bisogni Educativi Speciali (BES)
  - Compilazione campi normativi conformi alle direttive ministeriali
  - Generazione automatica PDF professionale
  - Esportazione e condivisione documenti
  - Collegamento report a studenti e classi
  - Storico completo report per studente

- **Dashboard Analytics** ⭐ NUOVO ⭐  
  - Statistiche in tempo reale su classi, studenti, BES/DSA
  - Analytics avanzate con visualizzazioni grafiche
  - Suggerimenti automatici basati sull'analisi dei dati
  - Distribuzione BES/DSA per classe con grafici
  - Monitoraggio attività recenti (materiali e report)
  - Esportazione dati statistici in formato JSON
  - UI interattiva e accessibile con pull-to-refresh

---

## Stato attuale del progetto

Questa versione implementa **persistenza dati con SQLite**:
- I dati sono gestiti tramite database SQLite locale
- CRUD completo per tutte le entità (insegnanti, classi, studenti, orario, materiali)
- Funzionalità di backup e ripristino database
- Export/import dati in formato JSON
- Gestione completa materiali didattici (PDF, immagini, link, documenti)
- **Accessibilità migliorata** con supporto screen reader e tastiera
- **Dashboard avanzata** con analytics, statistiche e suggerimenti automatici
- **Compatibilità verificata** con Expo SDK 54 e React Native 0.81.4
- Test automatici per tutte le funzionalità (116 test, inclusi 18 test dashboard e 18 test accessibilità)

---

## Roadmap

- [x] Persistenza dati tramite database locale (SQLite)
- [x] Backup, esportazione e sincronizzazione dati
- [x] Gestione materiali didattici per classe/studente
- [x] Moduli per normative e report PDP/BES (PDF)
- [x] Miglioramento accessibilità UI
- [x] Dashboard avanzata con analytics e suggerimenti
- [ ] Test e rilascio versione beta

---

## Sviluppo & Contributi

### Setup Iniziale

1. Clona il repository  
   `git clone https://github.com/antbrogame-a11y/docente-plus.git`

2. Installa le dipendenze  
   `npm install` oppure `yarn`

3. Configura l'API DeepSeek (opzionale)  
   - Copia `.env.example` in `.env`
   - Inserisci la tua API key DeepSeek nel file `.env`
   - Ottieni una API key da [DeepSeek Platform](https://platform.deepseek.com/)

4. Avvia la versione demo/mock  
   `npm start`

### Contribuire al Progetto

**Vuoi contribuire?** 🎉 Leggi la [Guida Completa per Contributori](CONTRIBUTING.md)!

Quick summary:
1. Crea un branch per le tue modifiche
2. Segui gli standard di codice e accessibilità
3. Scrivi test per le nuove funzionalità
4. Committa con messaggi descrittivi
5. Crea una Pull Request

**Nuovo a Git?** Consulta la [Guida al Workflow Git](GIT_WORKFLOW_GUIDE.md) per istruzioni dettagliate.

---

## 📚 Documentazione e Guide

### 🚀 Per Iniziare
- **[QUICKSTART.md](QUICKSTART.md)** - Guida rapida per iniziare subito
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - 🎉 Come contribuire al progetto

### 📖 Guide Essenziali
- **[GIT_WORKFLOW_GUIDE.md](GIT_WORKFLOW_GUIDE.md)** - Workflow Git completo per principianti
- **[GIT_QUICK_REF.md](GIT_QUICK_REF.md)** - Riferimento rapido comandi Git
- **[ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md)** - ♿ Guida accessibilità e test

### 🛡️ Backup e Ripristino
- **[EMERGENCY_QUICK_REF.md](EMERGENCY_QUICK_REF.md)** - 🚨 Guida emergenza (azioni rapide)
- **[BACKUP_GUIDE.md](BACKUP_GUIDE.md)** - Guida completa backup e automazione

### 📊 Documentazione Features
- **[REPORTS_DOCUMENTATION.md](REPORTS_DOCUMENTATION.md)** - Documentazione completa Report PDP/BES
- **[DASHBOARD_DOCUMENTATION.md](DASHBOARD_DOCUMENTATION.md)** - 📊 Documentazione Dashboard Analytics

### 🔧 Documentazione Tecnica
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Riepilogo implementazione
- **[NAVIGATION_VERIFICATION.md](NAVIGATION_VERIFICATION.md)** - ✅ Verifica compatibilità navigazione
- **[UI_FLOW.md](UI_FLOW.md)** - Flusso interfaccia utente
- **[CHANGELOG.md](CHANGELOG.md)** - 📝 Storico modifiche progetto
- **[PROJECT_REVIEW.md](PROJECT_REVIEW.md)** - 🔍 Revisione generale progetto (Ottobre 2025)

### 📋 Piani e Proposte
- **[DOCS_REORGANIZATION_PLAN.md](DOCS_REORGANIZATION_PLAN.md)** - Piano riorganizzazione documentazione

> **Nota:** È in corso un piano di riorganizzazione della documentazione per migliorare la navigabilità.  
> Consulta [DOCS_REORGANIZATION_PLAN.md](DOCS_REORGANIZATION_PLAN.md) per dettagli.

---

## Note

- Il progetto è in fase di prototipazione.
- Tutte le funzionalità sono modificabili e ampliabili secondo necessità.
- Per richieste o segnalazioni usa la sezione Issues di GitHub.
- **In caso di emergenza o perdita dati:** consulta [EMERGENCY_QUICK_REF.md](EMERGENCY_QUICK_REF.md)
