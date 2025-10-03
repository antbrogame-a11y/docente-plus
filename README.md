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
- Test automatici per tutte le funzionalità (116 test, inclusi 18 test dashboard e 18 test accessibilità)

---

## Roadmap

- [x] Persistenza dati tramite database locale (SQLite)
- [x] Backup, esportazione e sincronizzazione dati
- [x] Gestione materiali didattici per classe/studente
- [x] Moduli per normative e report PDP/BES (PDF)
- [x] Miglioramento accessibilità UI
- [x] Dashboard avanzata con analytics e suggerimenti
- [x] CI/CD automation con GitHub Actions
- [ ] Test e rilascio versione beta

---

## 🚀 CI/CD e Automazione

Il progetto utilizza **GitHub Actions** per automazione completa di build, test e deploy.

### Status Build

![CI Status](https://github.com/antbrogame-a11y/docente-plus/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![Deploy Status](https://github.com/antbrogame-a11y/docente-plus/workflows/CD%20-%20Deploy%20to%20Staging/badge.svg)
![E2E Status](https://github.com/antbrogame-a11y/docente-plus/workflows/E2E%20Tests/badge.svg)

### Workflow Configurati

#### 1. **CI - Build and Test** 
Eseguito automaticamente su ogni push e pull request:
- ✅ Installazione dipendenze
- ✅ Linting del codice (se disponibile)
- ✅ Esecuzione test unitari (116 test)
- ✅ Generazione coverage report
- ✅ Build dell'applicazione Expo
- ✅ Archiviazione artifacts

**Trigger**: Push su `main`, `develop`, `copilot/**` e tutte le PR

#### 2. **CD - Deploy to Staging**
Deploy automatico su ambiente di test:
- 🚀 Deploy su Expo (canale staging)
- 🧪 Test pre-deploy obbligatori
- 📝 Summary dettagliato del deployment
- 🔔 Notifiche automatiche su commit

**Trigger**: Push su `main` o manualmente via workflow_dispatch

**Opzioni**:
- Staging (default)
- Production (manuale)

#### 3. **E2E Tests**
Test end-to-end dell'applicazione web:
- 🌐 Build versione web con Expo
- 🧪 Test automatici su piattaforma web
- 📸 Screenshot automatici in caso di failure
- ⏰ Esecuzione programmata giornaliera (2 AM UTC)

**Trigger**: Push su `main`/`develop`, PR, schedule giornaliero, o manuale

#### 4. **Notifications**
Notifiche automatiche per tutti i workflow:
- ✅ Status summary per ogni workflow
- 💬 Commenti automatici su PR in caso di failure
- 📊 Report dettagliati sui risultati

### Come Usare i Workflow

#### Eseguire Deploy Manuale

```bash
# Via GitHub UI
1. Vai su Actions → CD - Deploy to Staging
2. Click "Run workflow"
3. Seleziona environment (staging/production)
4. Click "Run workflow"
```

#### Visualizzare Risultati Test

```bash
# I risultati sono disponibili in:
- Actions → [Nome Workflow] → Artifacts
- Test coverage: codecov reports
- E2E screenshots: artifacts in caso di failure
```

#### Setup Secrets (per Deploy)

Per abilitare il deploy automatico su Expo, configura questi secrets nel repository:

```
EXPO_TOKEN=<your-expo-token>
EXPO_USERNAME=<your-expo-username>
```

Ottieni un token da: https://expo.dev/accounts/[username]/settings/access-tokens

### Struttura Workflow

```
.github/workflows/
├── ci.yml              # Build e test continui
├── deploy.yml          # Deploy automatico
├── e2e.yml            # Test end-to-end
└── notifications.yml   # Notifiche risultati
```

### Best Practices CI/CD

1. **Branch Protection**: I workflow verificano tutte le PR prima del merge
2. **Test Obbligatori**: Il deploy fallisce se i test non passano
3. **Artifacts**: Build e report salvati per 7-30 giorni
4. **Notifications**: Feedback immediato su ogni workflow
5. **Scheduled Tests**: E2E tests giornalieri per rilevare regressioni

Per maggiori dettagli sulla configurazione CI/CD, consulta i file workflow in `.github/workflows/`.

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
- **[DASHBOARD_DOCUMENTATION.md](DASHBOARD_DOCUMENTATION.md)** - 📊 Documentazione Dashboard Analytics

---

## Note

- Il progetto è in fase di prototipazione.
- Tutte le funzionalità sono modificabili e ampliabili secondo necessità.
- Per richieste o segnalazioni usa la sezione Issues di GitHub.
- **In caso di emergenza o perdita dati:** consulta [EMERGENCY_QUICK_REF.md](EMERGENCY_QUICK_REF.md)
