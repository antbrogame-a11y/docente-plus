# Changelog - Docente Plus

Tutte le modifiche notevoli a questo progetto saranno documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/it/1.0.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/lang/it/).

---

## [1.1.0] - 2025-10-04

### Aggiunto
- **Componente DragDropSchedule completo:** Implementata funzionalità completa per la gestione dell'orario settimanale
  - Griglia interattiva con giorni della settimana e fasce orarie
  - Modal per aggiunta/modifica/eliminazione lezioni
  - Supporto per materia, classe e aula
  - Accessibilità completa (label ARIA, hint, touch target 44x44)
  - Conferma prima dell'eliminazione
  - Design responsive e scrollabile orizzontalmente

- **PROJECT_REVIEW.md:** Documento completo di revisione generale del progetto
  - Analisi stato attuale (116 test, WCAG 2.1 AA)
  - Identificazione 5 aree di miglioramento
  - Piano d'azione in 3 fasi
  - Metriche qualità codice
  - Strumenti raccomandati

- **CHANGELOG.md:** File changelog per tracciare tutte le modifiche future

### Modificato
- **screens/schedule-screen.js:** Migliorata UI con titolo, sottotitolo e ScrollView
- **components/DragDropSchedule.js:** Componente completamente riscritto (da 12 a 428 linee)

### Rimosso
- TODO nel componente DragDropSchedule

### Test
- ✅ Tutti i 116 test continuano a passare
- Nessuna regressione introdotta

### Accessibilità
- ✅ Conformità WCAG 2.1 AA mantenuta
- ✅ Touch target minimi 44x44 rispettati
- ✅ Label descrittive per screen reader
- ✅ Hint appropriati per interazioni

---

## [1.0.0] - 2024-10-01

### Versione Iniziale Completa

#### Funzionalità Implementate
- Gestione profilo insegnante
- Orario settimanale (base)
- Gestione classi (CRUD completo)
- Gestione studenti con BES/DSA
- Gestione materiali didattici
- Report PDP/BES con generazione PDF
- Dashboard analytics avanzata
- Database SQLite con backup/restore
- Export/import dati JSON

#### Tecnologie
- React Native 0.81.4
- Expo SDK 54
- SQLite per persistenza
- React Navigation
- Jest per testing

#### Test
- 116 test automatici
- Coverage database operations: 100%
- Test accessibilità
- Test backup/restore

#### Accessibilità
- Conformità WCAG 2.1 AA
- Supporto screen reader
- Touch target appropriati
- Contrasto colori verificato

#### Documentazione
- 35 file markdown
- Guide complete per contributori
- Documentazione tecnica dettagliata
- Diagrammi UI flow

---

## Link Utili

- [README.md](README.md) - Panoramica progetto
- [PROJECT_REVIEW.md](PROJECT_REVIEW.md) - Revisione generale ottobre 2025
- [QUICKSTART.md](QUICKSTART.md) - Guida rapida per iniziare
- [GIT_WORKFLOW_GUIDE.md](GIT_WORKFLOW_GUIDE.md) - Workflow Git
- [ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md) - Guida accessibilità
