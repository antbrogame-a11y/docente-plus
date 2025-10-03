# Report PDP/BES - Documentazione Completa

Documentazione completa per il modulo di generazione e gestione di report PDP (Piano Didattico Personalizzato) e BES (Bisogni Educativi Speciali) in formato PDF.

---

## 📋 Indice

1. [Panoramica](#panoramica)
2. [Funzionalità](#funzionalità)
3. [Database Schema](#database-schema)
4. [API e Funzioni](#api-e-funzioni)
5. [Interfaccia Utente](#interfaccia-utente)
6. [Generazione PDF](#generazione-pdf)
7. [Casi d'Uso](#casi-duso)
8. [Testing](#testing)

---

## 📖 Panoramica

Il modulo Report PDP/BES consente agli insegnanti di creare, gestire ed esportare documenti conformi alle normative scolastiche italiane per studenti con bisogni educativi speciali.

### Caratteristiche Principali

- ✅ Creazione guidata di report PDP e BES
- ✅ Compilazione campi normativi obbligatori e opzionali
- ✅ Generazione automatica PDF professionale
- ✅ Esportazione e condivisione PDF
- ✅ Collegamento a studenti e classi
- ✅ Storico report per studente
- ✅ Template conforme alle normative scolastiche

---

## 🎯 Funzionalità

### Gestione Report

1. **Creazione Report**
   - Selezione studente
   - Scelta tipo report (PDP/BES)
   - Anno scolastico
   - Campi normativi dettagliati

2. **Modifica Report**
   - Aggiornamento dati esistenti
   - Versioning automatico (updated_at)
   - Preservazione storico modifiche

3. **Eliminazione Report**
   - Cancellazione con conferma
   - Rimozione automatica PDF associati
   - Pulizia completa file system

4. **Visualizzazione**
   - Lista tutti i report
   - Filtro per studente
   - Ordinamento per data

### Generazione PDF

1. **Template Professionale**
   - Intestazione con tipo report e anno scolastico
   - Dati studente e classe
   - Sezioni strutturate per campo
   - Spazi per firme (docente e genitore)
   - Footer con data generazione

2. **Esportazione**
   - Condivisione nativa del sistema operativo
   - Salvataggio permanente in directory dedicata
   - Nome file descrittivo

---

## 🗄️ Database Schema

### Tabella `pdp_bes_reports`

```sql
CREATE TABLE IF NOT EXISTS pdp_bes_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  report_type TEXT NOT NULL,           -- 'PDP' o 'BES'
  school_year TEXT NOT NULL,           -- es. '2024/2025'
  diagnosis TEXT,                      -- Diagnosi/Certificazione
  strengths TEXT,                      -- Punti di forza
  difficulties TEXT,                   -- Difficoltà riscontrate
  teaching_strategies TEXT,            -- Strategie didattiche
  evaluation_tools TEXT,               -- Strumenti di valutazione
  objectives TEXT,                     -- Obiettivi didattici
  notes TEXT,                          -- Note aggiuntive
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  pdf_path TEXT,                       -- Path del PDF generato
  FOREIGN KEY (student_id) REFERENCES students(id)
);
```

### Campi

| Campo | Tipo | Obbligatorio | Descrizione |
|-------|------|--------------|-------------|
| `id` | INTEGER | Sì (auto) | ID univoco del report |
| `student_id` | INTEGER | Sì | ID dello studente |
| `report_type` | TEXT | Sì | Tipo report: 'PDP' o 'BES' |
| `school_year` | TEXT | Sì | Anno scolastico (es. '2024/2025') |
| `diagnosis` | TEXT | No | Diagnosi o certificazione medica |
| `strengths` | TEXT | No | Punti di forza dello studente |
| `difficulties` | TEXT | No | Difficoltà riscontrate |
| `teaching_strategies` | TEXT | No | Strategie didattiche da adottare |
| `evaluation_tools` | TEXT | No | Strumenti di valutazione personalizzati |
| `objectives` | TEXT | No | Obiettivi didattici |
| `notes` | TEXT | No | Note aggiuntive |
| `created_at` | TEXT | Sì (auto) | Data/ora creazione (ISO 8601) |
| `updated_at` | TEXT | Sì (auto) | Data/ora ultimo aggiornamento (ISO 8601) |
| `pdf_path` | TEXT | No | Path al file PDF generato |

---

## 🔧 API e Funzioni

### Database Operations (`db/database.js`)

#### `createPdpBesReport(reportData)`

Crea un nuovo report PDP/BES.

```javascript
const reportData = {
  student_id: 1,
  report_type: 'PDP',
  school_year: '2024/2025',
  diagnosis: 'DSA - Dislessia certificata',
  strengths: 'Buone capacità logiche',
  difficulties: 'Difficoltà nella lettura',
  teaching_strategies: 'Uso di mappe concettuali',
  evaluation_tools: 'Prove orali',
  objectives: 'Migliorare la velocità di lettura',
  notes: 'Studente molto motivato'
};

const report = await createPdpBesReport(reportData);
```

#### `getAllPdpBesReports()`

Ottiene tutti i report ordinati per data decrescente.

```javascript
const reports = await getAllPdpBesReports();
```

#### `getPdpBesReportsByStudentId(studentId)`

Ottiene tutti i report di uno studente specifico.

```javascript
const studentReports = await getPdpBesReportsByStudentId(1);
```

#### `getPdpBesReportById(id)`

Ottiene un report specifico per ID.

```javascript
const report = await getPdpBesReportById(1);
```

#### `updatePdpBesReport(id, reportData)`

Aggiorna un report esistente.

```javascript
const updated = await updatePdpBesReport(1, {
  diagnosis: 'Diagnosi aggiornata',
  strengths: 'Nuovi punti di forza identificati'
});
```

#### `deletePdpBesReport(id)`

Elimina un report e il suo PDF associato.

```javascript
await deletePdpBesReport(1);
```

### Context API (`context/reports-context.js`)

```javascript
const {
  reports,              // Array di tutti i report
  loading,              // Stato di caricamento
  error,                // Eventuale errore
  addReport,            // Crea nuovo report
  modifyReport,         // Modifica report esistente
  removeReport,         // Elimina report
  getReportsForStudent, // Ottiene report per studente
  getReportById,        // Ottiene report per ID
  refreshReports        // Ricarica lista report
} = useContext(ReportsContext);
```

### PDF Generation (`services/pdf-generator.js`)

#### `generateReportPDF(reportData, studentData)`

Genera un PDF da dati report.

```javascript
const studentData = {
  name: 'Mario Rossi',
  class_name: '3A'
};

const pdfPath = await generateReportPDF(report, studentData);
```

#### `shareReportPDF(pdfPath)`

Condivide/esporta un PDF.

```javascript
await shareReportPDF(pdfPath);
```

---

## 🎨 Interfaccia Utente

### Schermata Report (`screens/reports-screen.js`)

#### Layout Principale

```
┌─────────────────────────────────────────┐
│ ← Indietro              + Nuovo Report │
├─────────────────────────────────────────┤
│                                         │
│  ┌────────────────────────────────┐    │
│  │ PDP          2024/2025         │    │
│  │ Mario Rossi                    │    │
│  │ Creato: 15/10/2024             │    │
│  │                                │    │
│  │ [✏️ Modifica] [📄 Genera PDF]  │    │
│  │ [📤 Esporta] [🗑️]              │    │
│  └────────────────────────────────┘    │
│                                         │
│  ┌────────────────────────────────┐    │
│  │ BES          2024/2025         │    │
│  │ Lucia Verdi                    │    │
│  │ Creato: 10/10/2024             │    │
│  │                                │    │
│  │ [✏️ Modifica] [📄 Genera PDF]  │    │
│  └────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

#### Form Report (Modal)

```
┌─────────────────────────────────────────┐
│ Nuovo Report                         ✕ │
├─────────────────────────────────────────┤
│                                         │
│ Studente *                              │
│ [Mario] [Lucia] [Giovanni] ...          │
│                                         │
│ Tipo Report *                           │
│ [PDP] [BES]                             │
│                                         │
│ Anno Scolastico *                       │
│ [2024/2025________________]             │
│                                         │
│ Diagnosi/Certificazione                 │
│ [_____________________________]         │
│                                         │
│ Punti di Forza                          │
│ [_____________________________]         │
│                                         │
│ Difficoltà Riscontrate                  │
│ [_____________________________]         │
│                                         │
│ Strategie Didattiche                    │
│ [_____________________________]         │
│                                         │
│ ... (altri campi)                       │
│                                         │
│ [Annulla]              [Salva]          │
│                                         │
└─────────────────────────────────────────┘
```

### Stati UI

1. **Vuoto**: Messaggio guida per creare primo report
2. **Caricamento**: Spinner durante operazioni async
3. **Lista**: Visualizzazione card report
4. **Form**: Modal per creazione/modifica
5. **PDF Generation**: Overlay durante generazione PDF

---

## 📄 Generazione PDF

### Template HTML

Il PDF viene generato da un template HTML professionale con:

1. **Intestazione**
   - Tipo report (PDP/BES)
   - Anno scolastico

2. **Dati Studente**
   - Nome e cognome
   - Classe

3. **Sezioni Strutturate**
   - Diagnosi/Certificazione
   - Punti di forza
   - Difficoltà riscontrate
   - Strategie didattiche
   - Strumenti di valutazione
   - Obiettivi didattici
   - Note aggiuntive

4. **Firme**
   - Spazio firma docente
   - Spazio firma genitore/tutore

5. **Footer**
   - Data generazione
   - "Documento generato da Docente Plus"

### Stile PDF

- Font: Times New Roman (professionale)
- Dimensione base: 12pt
- Layout: margini 40px, spaziatura sezioni
- Colori: palette sobria (nero, grigi)
- Bordi: linee discrete per sezioni
- Background: grigio chiaro per campi dati

### Directory PDF

I PDF vengono salvati in:
```
{FileSystem.documentDirectory}reports/
```

Formato nome file:
```
{report_type}_{student_name}_{school_year}_{timestamp}.pdf
```

Esempio:
```
PDP_Mario_Rossi_2024_2025_1696950123456.pdf
```

---

## 💼 Casi d'Uso

### Caso 1: Creazione PDP per Studente DSA

```javascript
// 1. Navigare alla schermata Reports
navigation.navigate('Reports');

// 2. Click "Nuovo Report"
// 3. Selezionare studente
// 4. Compilare form:
const reportData = {
  student_id: 1,
  report_type: 'PDP',
  school_year: '2024/2025',
  diagnosis: 'DSA - Dislessia certificata con diagnosi n. 123/2024',
  strengths: 'Ottime capacità logico-matematiche, creatività, pensiero laterale',
  difficulties: 'Difficoltà nella decodifica, lentezza nella lettura, errori ortografici',
  teaching_strategies: 'Uso di mappe concettuali, sintesi vocale, tempi aggiuntivi (30%)',
  evaluation_tools: 'Prove orali privilegiate, interrogazioni programmate, uso PC',
  objectives: 'Migliorare velocità lettura, ridurre errori ortografici del 50%',
  notes: 'Studente molto motivato, collaborazione attiva con famiglia'
};

// 5. Salvare report
await addReport(reportData);

// 6. Generare PDF
await handleGeneratePDF(report);

// 7. Esportare/condividere
await shareReportPDF(pdfPath);
```

### Caso 2: Aggiornamento Report BES

```javascript
// 1. Aprire lista report
const reports = await getAllPdpBesReports();

// 2. Selezionare report da modificare
const reportToEdit = reports.find(r => r.id === 5);

// 3. Aprire form modifica
openForm(reportToEdit);

// 4. Aggiornare campi
const updates = {
  strengths: 'Miglioramento nella concentrazione, maggiore autonomia',
  objectives: 'Completare compiti in autonomia, partecipazione più attiva'
};

// 5. Salvare modifiche
await modifyReport(reportToEdit.id, updates);

// 6. Rigenerare PDF con dati aggiornati
const updatedReport = await getPdpBesReportById(reportToEdit.id);
await handleGeneratePDF(updatedReport);
```

### Caso 3: Visualizzazione Storico Studente

```javascript
// Ottiene tutti i report di uno studente
const studentId = 1;
const studentReports = await getReportsForStudent(studentId);

// Risultato: array ordinato per data (più recenti prima)
studentReports.forEach(report => {
  console.log(`${report.report_type} - ${report.school_year}`);
  console.log(`Creato: ${new Date(report.created_at).toLocaleDateString()}`);
  console.log(`Ultimo aggiornamento: ${new Date(report.updated_at).toLocaleDateString()}`);
});
```

---

## 🧪 Testing

### Test Database (`__tests__/database-reports.test.js`)

#### Test Coverage

- ✅ Creazione report PDP
- ✅ Creazione report BES
- ✅ Creazione con campi minimi
- ✅ Recupero tutti i report
- ✅ Recupero report per studente
- ✅ Recupero report per ID
- ✅ Aggiornamento campi report
- ✅ Eliminazione report
- ✅ Gestione campi opzionali
- ✅ Ordinamento per data

#### Eseguire Test

```bash
npm test -- database-reports.test.js
```

### Test Manuali Consigliati

1. **Creazione Report**
   - Creare PDP con tutti i campi compilati
   - Creare BES con campi minimi
   - Verificare validazione campi obbligatori

2. **Generazione PDF**
   - Generare PDF e verificare contenuto
   - Verificare layout e formattazione
   - Controllare nome file generato

3. **Esportazione**
   - Testare condivisione PDF
   - Verificare compatibilità viewer PDF
   - Controllare qualità stampa

4. **Gestione Dati**
   - Modificare report esistente
   - Eliminare report con PDF
   - Verificare integrità database

---

## 📊 Statistiche Implementazione

### File Creati/Modificati

```
11 file modificati, ~1750 righe aggiunte

Nuovi file:
- context/reports-context.js (127 righe)
- screens/reports-screen.js (686 righe)
- services/pdf-generator.js (310 righe)
- __tests__/database-reports.test.js (320 righe)

File modificati:
- db/schema.js (+18 righe)
- db/database.js (+175 righe)
- navigation/app-navigation.js (+6 righe)
- screens/welcome-screen.js (+10 righe)
- App.js (+3 righe)
- package.json (+1 dipendenza)
```

### Dipendenze Aggiunte

- `expo-print` - Generazione e stampa PDF

---

## 🔐 Conformità Normativa

Il modulo è stato progettato tenendo conto delle normative italiane per:

- **Legge 170/2010** - Nuove norme in materia di DSA
- **Direttiva Ministeriale 27/12/2012** - Strumenti d'intervento BES
- **Circolare Ministeriale n. 8 del 6/03/2013** - Indicazioni operative

### Campi Conformi

✅ Dati identificativi studente  
✅ Tipologia disturbo/difficoltà  
✅ Punti di forza e difficoltà  
✅ Strategie didattiche personalizzate  
✅ Strumenti compensativi e misure dispensative  
✅ Modalità di valutazione  
✅ Obiettivi educativi  
✅ Spazio per firme docente e famiglia

---

## 🚀 Prossimi Sviluppi

### Funzionalità Future

- [ ] Template PDF personalizzabili per scuola
- [ ] Export multiplo (batch PDF generation)
- [ ] Firma digitale documenti
- [ ] Integrazione calendario per scadenze
- [ ] Analytics sull'efficacia interventi
- [ ] Notifiche promemoria revisione PDP/BES
- [ ] Condivisione sicura con famiglie
- [ ] Import dati da certificazioni mediche

---

## 📞 Supporto

Per problemi o domande:
- Aprire una Issue su GitHub
- Consultare la documentazione tecnica
- Verificare i test esistenti per esempi d'uso

---

**Documento generato per Docente Plus v1.0**  
**Data ultima modifica: Ottobre 2024**
