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
- **Database SQLite locale**: ora disponibile con funzioni CRUD complete per tutte le tabelle
- Le funzionalità sono di esempio e la UI è in sviluppo
- La navigation è aggiornata per le schermate principali

---

## Database e Funzioni CRUD

Il progetto ora include un database SQLite locale (`db/database.js`) con funzioni CRUD (Create, Read, Update, Delete) complete per tutte le tabelle:

### Tabelle disponibili

1. **teachers** - Dati degli insegnanti
2. **classes** - Classi gestite
3. **students** - Studenti con informazioni BES/DSA
4. **schedule** - Orario delle lezioni
5. **assessments** - Valutazioni degli studenti

### Inizializzazione del database

Prima di utilizzare le funzioni CRUD, è necessario inizializzare il database:

```javascript
import { initDatabase } from './db/database';

// Inizializza il database (crea tutte le tabelle)
await initDatabase();
```

### Funzioni CRUD disponibili

#### Teachers (Insegnanti)

```javascript
import { addTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } from './db/database';

// Aggiungere un insegnante
const teacherId = await addTeacher({
  name: 'Mario Rossi',
  school: 'Liceo Scientifico',
  subjects: 'Matematica, Fisica',
  schedule: JSON.stringify({}) // Orario in formato JSON
});

// Ottenere tutti gli insegnanti
const teachers = await getAllTeachers();

// Ottenere un insegnante specifico
const teacher = await getTeacherById(1);

// Aggiornare un insegnante
await updateTeacher(1, {
  name: 'Mario Rossi',
  school: 'Liceo Classico',
  subjects: 'Latino, Greco',
  schedule: JSON.stringify({})
});

// Eliminare un insegnante
await deleteTeacher(1);
```

#### Classes (Classi)

```javascript
import { addClass, getAllClasses, getClassById, updateClass, deleteClass } from './db/database';

// Aggiungere una classe
const classId = await addClass({
  name: '3A',
  teacher_id: 1,
  student_count: 25
});

// Ottenere tutte le classi
const classes = await getAllClasses();

// Ottenere una classe specifica
const classData = await getClassById(1);

// Aggiornare una classe
await updateClass(1, {
  name: '3B',
  teacher_id: 1,
  student_count: 23
});

// Eliminare una classe
await deleteClass(1);
```

#### Students (Studenti)

```javascript
import { 
  addStudent, 
  getAllStudents, 
  getStudentById, 
  getStudentsByClassId,
  updateStudent, 
  deleteStudent 
} from './db/database';

// Aggiungere uno studente
const studentId = await addStudent({
  name: 'Luca Bianchi',
  class_id: 1,
  bes_info: JSON.stringify({ type: 'DSA', details: 'Dislessia' })
});

// Ottenere tutti gli studenti
const students = await getAllStudents();

// Ottenere uno studente specifico
const student = await getStudentById(1);

// Ottenere studenti di una classe
const classStudents = await getStudentsByClassId(1);

// Aggiornare uno studente
await updateStudent(1, {
  name: 'Luca Bianchi',
  class_id: 2,
  bes_info: JSON.stringify({ type: 'BES', details: 'ADHD' })
});

// Eliminare uno studente
await deleteStudent(1);
```

#### Schedule (Orario)

```javascript
import { 
  addSchedule, 
  getAllSchedules, 
  getScheduleById, 
  getSchedulesByTeacherId,
  updateSchedule, 
  deleteSchedule 
} from './db/database';

// Aggiungere una voce di orario
const scheduleId = await addSchedule({
  teacher_id: 1,
  day: 'Lunedì',
  time: '08:00-09:00',
  class_id: 1,
  subject: 'Matematica'
});

// Ottenere tutte le voci di orario
const schedules = await getAllSchedules();

// Ottenere una voce specifica
const schedule = await getScheduleById(1);

// Ottenere orario di un insegnante
const teacherSchedule = await getSchedulesByTeacherId(1);

// Aggiornare una voce di orario
await updateSchedule(1, {
  teacher_id: 1,
  day: 'Martedì',
  time: '09:00-10:00',
  class_id: 2,
  subject: 'Fisica'
});

// Eliminare una voce di orario
await deleteSchedule(1);
```

#### Assessments (Valutazioni)

```javascript
import { 
  addAssessment, 
  getAllAssessments, 
  getAssessmentById, 
  getAssessmentsByStudentId,
  updateAssessment, 
  deleteAssessment 
} from './db/database';

// Aggiungere una valutazione
const assessmentId = await addAssessment({
  student_id: 1,
  type: 'Verifica scritta',
  value: '8',
  date: '2024-01-15',
  notes: 'Ottima prova'
});

// Ottenere tutte le valutazioni
const assessments = await getAllAssessments();

// Ottenere una valutazione specifica
const assessment = await getAssessmentById(1);

// Ottenere valutazioni di uno studente
const studentAssessments = await getAssessmentsByStudentId(1);

// Aggiornare una valutazione
await updateAssessment(1, {
  student_id: 1,
  type: 'Verifica orale',
  value: '9',
  date: '2024-01-20',
  notes: 'Eccellente'
});

// Eliminare una valutazione
await deleteAssessment(1);
```

### Gestione degli errori

Tutte le funzioni CRUD restituiscono Promises e gestiscono gli errori. È consigliato utilizzare try/catch:

```javascript
try {
  const teacher = await getTeacherById(1);
  if (!teacher) {
    console.log('Insegnante non trovato');
  }
} catch (error) {
  console.error('Errore nel recupero dell\'insegnante:', error);
}
```

### Note tecniche

- Tutte le funzioni sono **asincrone** e restituiscono Promise
- Il database viene creato automaticamente alla prima chiamata di `initDatabase()`
- I campi JSON (come `schedule`, `bes_info`) devono essere stringificati con `JSON.stringify()`
- Le funzioni `add*` restituiscono l'ID del record inserito
- Le funzioni `update*` e `delete*` restituiscono un booleano (true se l'operazione è riuscita)
- Le funzioni `getById` restituiscono `null` se il record non viene trovato

---

## Roadmap

- [x] Persistenza dati tramite database locale (SQLite con funzioni CRUD complete)
- [ ] Integrazione database con UI e Context
- [ ] Gestione materiali didattici per classe/studente
- [ ] Moduli per normative e report PDP/BES (PDF)
- [ ] Backup, esportazione e sincronizzazione dati
- [ ] Miglioramento accessibilità UI
- [ ] Dashboard avanzata con analytics e suggerimenti
- [ ] Test e rilascio versione beta

---

## Sviluppo & Contributi

1. Clona il repository  
   `git clone https://github.com/antbrogame-a11y/docente-plus.git`

2. Installa le dipendenze  
   `npm install` oppure `yarn`

3. Avvia la versione demo/mock  
   `npm start`

4. Contribuisci con nuove funzionalità o fix tramite Pull Request!

---

## Note

- Il progetto è in fase di prototipazione.
- Tutte le funzionalità sono modificabili e ampliabili secondo necessità.
- Per richieste o segnalazioni usa la sezione Issues di GitHub.
