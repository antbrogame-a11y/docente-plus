import * as SQLite from 'expo-sqlite';
import { schema } from './schema';

// Inizializza il database
let db = null;

/**
 * Inizializza la connessione al database e crea le tabelle
 * @returns {Promise<SQLite.WebSQLDatabase>} Database instance
 */
export const initDatabase = async () => {
  try {
    if (!db) {
      db = SQLite.openDatabase('docenteplus.db');
    }

    // Crea tutte le tabelle definite nello schema
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        // Crea tabella teachers
        tx.executeSql(schema.teachers, [], 
          () => console.log('Tabella teachers creata'),
          (_, error) => console.error('Errore creazione tabella teachers:', error)
        );

        // Crea tabella classes
        tx.executeSql(schema.classes, [], 
          () => console.log('Tabella classes creata'),
          (_, error) => console.error('Errore creazione tabella classes:', error)
        );

        // Crea tabella students
        tx.executeSql(schema.students, [], 
          () => console.log('Tabella students creata'),
          (_, error) => console.error('Errore creazione tabella students:', error)
        );

        // Crea tabella schedule
        tx.executeSql(schema.schedule, [], 
          () => console.log('Tabella schedule creata'),
          (_, error) => console.error('Errore creazione tabella schedule:', error)
        );

        // Crea tabella assessments
        tx.executeSql(schema.assessments, [], 
          () => console.log('Tabella assessments creata'),
          (_, error) => console.error('Errore creazione tabella assessments:', error)
        );
      }, 
      error => reject(error),
      () => resolve(db)
      );
    });
  } catch (error) {
    console.error('Errore inizializzazione database:', error);
    throw error;
  }
};

/**
 * Ottiene l'istanza del database
 * @returns {SQLite.WebSQLDatabase} Database instance
 */
export const getDatabase = () => {
  if (!db) {
    throw new Error('Database non inizializzato. Chiamare initDatabase() prima.');
  }
  return db;
};

// ==================== CRUD TEACHERS ====================

/**
 * Aggiunge un nuovo insegnante
 * @param {Object} teacher - Dati dell'insegnante
 * @param {string} teacher.name - Nome dell'insegnante
 * @param {string} teacher.school - Scuola
 * @param {string} teacher.subjects - Materie insegnate
 * @param {string} teacher.schedule - Orario (JSON stringificato)
 * @returns {Promise<number>} ID del nuovo insegnante
 */
export const addTeacher = (teacher) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO teachers (name, school, subjects, schedule) VALUES (?, ?, ?, ?)',
        [teacher.name, teacher.school, teacher.subjects, teacher.schedule],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene tutti gli insegnanti
 * @returns {Promise<Array>} Array di insegnanti
 */
export const getAllTeachers = () => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM teachers',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene un insegnante per ID
 * @param {number} id - ID dell'insegnante
 * @returns {Promise<Object|null>} Dati dell'insegnante o null se non trovato
 */
export const getTeacherById = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM teachers WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows._array[0]);
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Aggiorna un insegnante
 * @param {number} id - ID dell'insegnante
 * @param {Object} teacher - Nuovi dati dell'insegnante
 * @returns {Promise<boolean>} True se l'aggiornamento è riuscito
 */
export const updateTeacher = (id, teacher) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'UPDATE teachers SET name = ?, school = ?, subjects = ?, schedule = ? WHERE id = ?',
        [teacher.name, teacher.school, teacher.subjects, teacher.schedule, id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Elimina un insegnante
 * @param {number} id - ID dell'insegnante da eliminare
 * @returns {Promise<boolean>} True se l'eliminazione è riuscita
 */
export const deleteTeacher = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'DELETE FROM teachers WHERE id = ?',
        [id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

// ==================== CRUD CLASSES ====================

/**
 * Aggiunge una nuova classe
 * @param {Object} classData - Dati della classe
 * @param {string} classData.name - Nome della classe
 * @param {number} classData.teacher_id - ID dell'insegnante
 * @param {number} classData.student_count - Numero di studenti
 * @returns {Promise<number>} ID della nuova classe
 */
export const addClass = (classData) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO classes (name, teacher_id, student_count) VALUES (?, ?, ?)',
        [classData.name, classData.teacher_id, classData.student_count],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene tutte le classi
 * @returns {Promise<Array>} Array di classi
 */
export const getAllClasses = () => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM classes',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene una classe per ID
 * @param {number} id - ID della classe
 * @returns {Promise<Object|null>} Dati della classe o null se non trovata
 */
export const getClassById = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM classes WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows._array[0]);
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Aggiorna una classe
 * @param {number} id - ID della classe
 * @param {Object} classData - Nuovi dati della classe
 * @returns {Promise<boolean>} True se l'aggiornamento è riuscito
 */
export const updateClass = (id, classData) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'UPDATE classes SET name = ?, teacher_id = ?, student_count = ? WHERE id = ?',
        [classData.name, classData.teacher_id, classData.student_count, id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Elimina una classe
 * @param {number} id - ID della classe da eliminare
 * @returns {Promise<boolean>} True se l'eliminazione è riuscita
 */
export const deleteClass = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'DELETE FROM classes WHERE id = ?',
        [id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

// ==================== CRUD STUDENTS ====================

/**
 * Aggiunge un nuovo studente
 * @param {Object} student - Dati dello studente
 * @param {string} student.name - Nome dello studente
 * @param {number} student.class_id - ID della classe
 * @param {string} student.bes_info - Informazioni BES/DSA (JSON stringificato)
 * @returns {Promise<number>} ID del nuovo studente
 */
export const addStudent = (student) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO students (name, class_id, bes_info) VALUES (?, ?, ?)',
        [student.name, student.class_id, student.bes_info],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene tutti gli studenti
 * @returns {Promise<Array>} Array di studenti
 */
export const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM students',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene uno studente per ID
 * @param {number} id - ID dello studente
 * @returns {Promise<Object|null>} Dati dello studente o null se non trovato
 */
export const getStudentById = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM students WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows._array[0]);
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene tutti gli studenti di una classe
 * @param {number} classId - ID della classe
 * @returns {Promise<Array>} Array di studenti della classe
 */
export const getStudentsByClassId = (classId) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM students WHERE class_id = ?',
        [classId],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Aggiorna uno studente
 * @param {number} id - ID dello studente
 * @param {Object} student - Nuovi dati dello studente
 * @returns {Promise<boolean>} True se l'aggiornamento è riuscito
 */
export const updateStudent = (id, student) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'UPDATE students SET name = ?, class_id = ?, bes_info = ? WHERE id = ?',
        [student.name, student.class_id, student.bes_info, id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Elimina uno studente
 * @param {number} id - ID dello studente da eliminare
 * @returns {Promise<boolean>} True se l'eliminazione è riuscita
 */
export const deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'DELETE FROM students WHERE id = ?',
        [id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

// ==================== CRUD SCHEDULE ====================

/**
 * Aggiunge una nuova voce di orario
 * @param {Object} scheduleEntry - Dati della voce di orario
 * @param {number} scheduleEntry.teacher_id - ID dell'insegnante
 * @param {string} scheduleEntry.day - Giorno della settimana
 * @param {string} scheduleEntry.time - Ora della lezione
 * @param {number} scheduleEntry.class_id - ID della classe
 * @param {string} scheduleEntry.subject - Materia
 * @returns {Promise<number>} ID della nuova voce di orario
 */
export const addSchedule = (scheduleEntry) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO schedule (teacher_id, day, time, class_id, subject) VALUES (?, ?, ?, ?, ?)',
        [scheduleEntry.teacher_id, scheduleEntry.day, scheduleEntry.time, scheduleEntry.class_id, scheduleEntry.subject],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene tutte le voci di orario
 * @returns {Promise<Array>} Array di voci di orario
 */
export const getAllSchedules = () => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM schedule',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene una voce di orario per ID
 * @param {number} id - ID della voce di orario
 * @returns {Promise<Object|null>} Dati della voce di orario o null se non trovata
 */
export const getScheduleById = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM schedule WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows._array[0]);
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene tutte le voci di orario di un insegnante
 * @param {number} teacherId - ID dell'insegnante
 * @returns {Promise<Array>} Array di voci di orario dell'insegnante
 */
export const getSchedulesByTeacherId = (teacherId) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM schedule WHERE teacher_id = ?',
        [teacherId],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Aggiorna una voce di orario
 * @param {number} id - ID della voce di orario
 * @param {Object} scheduleEntry - Nuovi dati della voce di orario
 * @returns {Promise<boolean>} True se l'aggiornamento è riuscito
 */
export const updateSchedule = (id, scheduleEntry) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'UPDATE schedule SET teacher_id = ?, day = ?, time = ?, class_id = ?, subject = ? WHERE id = ?',
        [scheduleEntry.teacher_id, scheduleEntry.day, scheduleEntry.time, scheduleEntry.class_id, scheduleEntry.subject, id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Elimina una voce di orario
 * @param {number} id - ID della voce di orario da eliminare
 * @returns {Promise<boolean>} True se l'eliminazione è riuscita
 */
export const deleteSchedule = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'DELETE FROM schedule WHERE id = ?',
        [id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

// ==================== CRUD ASSESSMENTS ====================

/**
 * Aggiunge una nuova valutazione
 * @param {Object} assessment - Dati della valutazione
 * @param {number} assessment.student_id - ID dello studente
 * @param {string} assessment.type - Tipo di valutazione
 * @param {string} assessment.value - Valore della valutazione
 * @param {string} assessment.date - Data della valutazione (ISO 8601)
 * @param {string} assessment.notes - Note aggiuntive
 * @returns {Promise<number>} ID della nuova valutazione
 */
export const addAssessment = (assessment) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO assessments (student_id, type, value, date, notes) VALUES (?, ?, ?, ?, ?)',
        [assessment.student_id, assessment.type, assessment.value, assessment.date, assessment.notes],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene tutte le valutazioni
 * @returns {Promise<Array>} Array di valutazioni
 */
export const getAllAssessments = () => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM assessments',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene una valutazione per ID
 * @param {number} id - ID della valutazione
 * @returns {Promise<Object|null>} Dati della valutazione o null se non trovata
 */
export const getAssessmentById = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM assessments WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows._array[0]);
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Ottiene tutte le valutazioni di uno studente
 * @param {number} studentId - ID dello studente
 * @returns {Promise<Array>} Array di valutazioni dello studente
 */
export const getAssessmentsByStudentId = (studentId) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM assessments WHERE student_id = ?',
        [studentId],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Aggiorna una valutazione
 * @param {number} id - ID della valutazione
 * @param {Object} assessment - Nuovi dati della valutazione
 * @returns {Promise<boolean>} True se l'aggiornamento è riuscito
 */
export const updateAssessment = (id, assessment) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'UPDATE assessments SET student_id = ?, type = ?, value = ?, date = ?, notes = ? WHERE id = ?',
        [assessment.student_id, assessment.type, assessment.value, assessment.date, assessment.notes, id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

/**
 * Elimina una valutazione
 * @param {number} id - ID della valutazione da eliminare
 * @returns {Promise<boolean>} True se l'eliminazione è riuscita
 */
export const deleteAssessment = (id) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.transaction(tx => {
      tx.executeSql(
        'DELETE FROM assessments WHERE id = ?',
        [id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};
