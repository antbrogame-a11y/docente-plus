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

- **Dashboard demo**  
  Panoramica base delle attività.

---

## Stato attuale del progetto

Questa versione implementa **persistenza dati con SQLite**:
- I dati sono gestiti tramite database SQLite locale
- CRUD completo per tutte le entità (insegnanti, classi, studenti, orario, materiali)
- Funzionalità di backup e ripristino database
- Export/import dati in formato JSON
- Gestione completa materiali didattici (PDF, immagini, link, documenti)
- **Accessibilità migliorata** con supporto screen reader e tastiera
- Test automatici per tutte le funzionalità (83 test, inclusi 18 test accessibilità)

---

## Roadmap

- [x] Persistenza dati tramite database locale (SQLite)
- [x] Backup, esportazione e sincronizzazione dati
- [x] Gestione materiali didattici per classe/studente
- [x] Moduli per normative e report PDP/BES (PDF)
- [ ] Miglioramento accessibilità UI
- [ ] Dashboard avanzata con analytics e suggerimenti
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

Per contribuire con nuove funzionalità o fix:

1. Crea un nuovo branch per le tue modifiche
2. Lavora sulle modifiche necessarie
3. Testa le modifiche localmente
4. Committa con messaggi descrittivi (vedi `GIT_WORKFLOW_GUIDE.md`)
5. Crea una Pull Request

**Nuovo a Git?** Consulta la [Guida al Workflow Git](GIT_WORKFLOW_GUIDE.md) per istruzioni dettagliate.

---

## 📚 Documentazione e Guide

### Guide Essenziali
- **[GIT_WORKFLOW_GUIDE.md](GIT_WORKFLOW_GUIDE.md)** - Workflow Git completo per principianti
- **[GIT_QUICK_REF.md](GIT_QUICK_REF.md)** - Riferimento rapido comandi Git
- **[QUICKSTART.md](QUICKSTART.md)** - Guida rapida per iniziare
- **[ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md)** - ♿ Guida accessibilità e test

### Backup e Ripristino
- **[EMERGENCY_QUICK_REF.md](EMERGENCY_QUICK_REF.md)** - 🚨 Guida emergenza (azioni rapide)
- **[BACKUP_GUIDE.md](BACKUP_GUIDE.md)** - Guida completa backup e automazione
- **[RIPRISTINO_COMPLETO.md](RIPRISTINO_COMPLETO.md)** - Stato ripristino repository

### Documentazione Tecnica
- **[UI_FLOW.md](UI_FLOW.md)** - Flusso interfaccia utente
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Riepilogo implementazione
- **[REPORTS_DOCUMENTATION.md](REPORTS_DOCUMENTATION.md)** - Documentazione completa Report PDP/BES
- **[REPORTS_UI_FLOW.md](REPORTS_UI_FLOW.md)** - Flusso UI Report PDP/BES

---

## Note

- Il progetto è in fase di prototipazione.
- Tutte le funzionalità sono modificabili e ampliabili secondo necessità.
- Per richieste o segnalazioni usa la sezione Issues di GitHub.
- **In caso di emergenza o perdita dati:** consulta [EMERGENCY_QUICK_REF.md](EMERGENCY_QUICK_REF.md)
