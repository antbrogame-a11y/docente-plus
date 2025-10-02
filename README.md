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

- **Dashboard demo**  
  Panoramica base delle attività.

---

## Stato attuale del progetto

Questa versione è **demo/mock**:
- I dati sono gestiti localmente in memoria (NO database)
- Le funzionalità sono di esempio e la UI è in sviluppo
- La navigation è aggiornata per le schermate principali

---

## Roadmap

- [ ] Persistenza dati tramite database locale
- [ ] Gestione materiali didattici per classe/studente
- [ ] Moduli per normative e report PDP/BES (PDF)
- [ ] Backup, esportazione e sincronizzazione dati
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

## Note

- Il progetto è in fase di prototipazione.
- Tutte le funzionalità sono modificabili e ampliabili secondo necessità.
- Per richieste o segnalazioni usa la sezione Issues di GitHub.
