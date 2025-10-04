import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { schema } from './schema';

let db = null;

// Initialize database
export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('docente_plus.db');
    
    // Create all tables
    await db.execAsync(schema.teachers);
    await db.execAsync(schema.classes);
    await db.execAsync(schema.students);
    await db.execAsync(schema.schedule);
    await db.execAsync(schema.assessments);
    await db.execAsync(schema.materials);
    await db.execAsync(schema.pdp_bes_reports);
    
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Get database instance
export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};

// ============================================
// CRUD operations for CLASSES table
// ============================================

/**
 * Create a new class
 * @param {string} name - Class name
 * @param {number} teacherId - Teacher ID (optional)
 * @param {number} studentCount - Number of students (optional, default 0)
 * @returns {Promise<Object>} The created class object
 */
export const createClass = async (name, teacherId = null, studentCount = 0) => {
  try {
    const database = getDatabase();
    const result = await database.runAsync(
      'INSERT INTO classes (name, teacher_id, student_count) VALUES (?, ?, ?)',
      [name, teacherId, studentCount]
    );
    
    return {
      id: result.lastInsertRowId,
      name,
      teacher_id: teacherId,
      student_count: studentCount
    };
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

/**
 * Get all classes
 * @returns {Promise<Array>} Array of all classes
 */
export const getAllClasses = async () => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync('SELECT * FROM classes ORDER BY name');
    return result;
  } catch (error) {
    console.error('Error getting all classes:', error);
    throw error;
  }
};

/**
 * Get a class by ID
 * @param {number} id - Class ID
 * @returns {Promise<Object|null>} The class object or null if not found
 */
export const getClassById = async (id) => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync('SELECT * FROM classes WHERE id = ?', [id]);
    return result || null;
  } catch (error) {
    console.error('Error getting class by ID:', error);
    throw error;
  }
};

/**
 * Update a class
 * @param {number} id - Class ID
 * @param {string} name - New class name
 * @param {number} teacherId - Teacher ID (optional)
 * @param {number} studentCount - Number of students (optional)
 * @returns {Promise<Object>} The updated class object
 */
export const updateClass = async (id, name, teacherId = null, studentCount = null) => {
  try {
    const database = getDatabase();
    
    // Build dynamic update query based on provided parameters
    const updates = [];
    const params = [];
    
    if (name !== undefined && name !== null) {
      updates.push('name = ?');
      params.push(name);
    }
    if (teacherId !== undefined && teacherId !== null) {
      updates.push('teacher_id = ?');
      params.push(teacherId);
    }
    if (studentCount !== undefined && studentCount !== null) {
      updates.push('student_count = ?');
      params.push(studentCount);
    }
    
    if (updates.length === 0) {
      throw new Error('No fields to update');
    }
    
    params.push(id);
    const query = `UPDATE classes SET ${updates.join(', ')} WHERE id = ?`;
    
    await database.runAsync(query, params);
    
    // Return the updated class
    return await getClassById(id);
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

/**
 * Delete a class
 * @param {number} id - Class ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteClass = async (id) => {
  try {
    const database = getDatabase();
    await database.runAsync('DELETE FROM classes WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

/**
 * Delete all classes - OPERAZIONE PERICOLOSA
 * Richiede token di conferma per prevenire cancellazioni accidentali
 * @param {string} confirmationToken - Deve essere 'CONFIRM_DELETE_ALL_CLASSES'
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteAllClasses = async (confirmationToken) => {
  // Protezione contro cancellazioni accidentali
  if (confirmationToken !== 'CONFIRM_DELETE_ALL_CLASSES') {
    throw new Error('Operazione richiede token di conferma per sicurezza. Passare "CONFIRM_DELETE_ALL_CLASSES" come parametro.');
  }
  
  try {
    const database = getDatabase();
    
    // Log per audit trail
    const classCount = await database.getAllAsync('SELECT COUNT(*) as count FROM classes');
    console.warn(`⚠️ ATTENZIONE: Eliminazione di ${classCount[0].count} classi richiesta`);
    
    await database.runAsync('DELETE FROM classes');
    
    console.log('✅ Tutte le classi eliminate');
    return true;
  } catch (error) {
    console.error('Error deleting all classes:', error);
    throw error;
  }
};

// ============================================
// CRUD operations for TEACHERS table
// ============================================

/**
 * Create a new teacher
 * @param {string} name - Teacher name
 * @param {string} school - School name (optional)
 * @param {string} subjects - Subjects taught (optional)
 * @param {string} schedule - Schedule data as JSON string (optional)
 * @returns {Promise<Object>} The created teacher object
 */
export const createTeacher = async (name, school = null, subjects = null, schedule = null) => {
  try {
    const database = getDatabase();
    const result = await database.runAsync(
      'INSERT INTO teachers (name, school, subjects, schedule) VALUES (?, ?, ?, ?)',
      [name, school, subjects, schedule]
    );
    
    return {
      id: result.lastInsertRowId,
      name,
      school,
      subjects,
      schedule
    };
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
};

/**
 * Get all teachers
 * @returns {Promise<Array>} Array of all teachers
 */
export const getAllTeachers = async () => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync('SELECT * FROM teachers ORDER BY name');
    return result;
  } catch (error) {
    console.error('Error getting all teachers:', error);
    throw error;
  }
};

/**
 * Get a teacher by ID
 * @param {number} id - Teacher ID
 * @returns {Promise<Object|null>} The teacher object or null if not found
 */
export const getTeacherById = async (id) => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync('SELECT * FROM teachers WHERE id = ?', [id]);
    return result || null;
  } catch (error) {
    console.error('Error getting teacher by ID:', error);
    throw error;
  }
};

/**
 * Update a teacher
 * @param {number} id - Teacher ID
 * @param {string} name - Teacher name
 * @param {string} school - School name (optional)
 * @param {string} subjects - Subjects taught (optional)
 * @param {string} schedule - Schedule data as JSON string (optional)
 * @returns {Promise<Object>} The updated teacher object
 */
export const updateTeacher = async (id, name = null, school = null, subjects = null, schedule = null) => {
  try {
    const database = getDatabase();
    
    const updates = [];
    const params = [];
    
    if (name !== undefined && name !== null) {
      updates.push('name = ?');
      params.push(name);
    }
    if (school !== undefined && school !== null) {
      updates.push('school = ?');
      params.push(school);
    }
    if (subjects !== undefined && subjects !== null) {
      updates.push('subjects = ?');
      params.push(subjects);
    }
    if (schedule !== undefined && schedule !== null) {
      updates.push('schedule = ?');
      params.push(schedule);
    }
    
    if (updates.length === 0) {
      throw new Error('No fields to update');
    }
    
    params.push(id);
    const query = `UPDATE teachers SET ${updates.join(', ')} WHERE id = ?`;
    
    await database.runAsync(query, params);
    
    return await getTeacherById(id);
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw error;
  }
};

/**
 * Delete a teacher
 * @param {number} id - Teacher ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteTeacher = async (id) => {
  try {
    const database = getDatabase();
    await database.runAsync('DELETE FROM teachers WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

// ============================================
// CRUD operations for STUDENTS table
// ============================================

/**
 * Create a new student
 * @param {string} name - Student name
 * @param {number} classId - Class ID (optional)
 * @param {string} besInfo - BES/DSA information (optional)
 * @returns {Promise<Object>} The created student object
 */
export const createStudent = async (name, classId = null, besInfo = null) => {
  try {
    const database = getDatabase();
    const result = await database.runAsync(
      'INSERT INTO students (name, class_id, bes_info) VALUES (?, ?, ?)',
      [name, classId, besInfo]
    );
    
    return {
      id: result.lastInsertRowId,
      name,
      class_id: classId,
      bes_info: besInfo
    };
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

/**
 * Get all students
 * @returns {Promise<Array>} Array of all students
 */
export const getAllStudents = async () => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync('SELECT * FROM students ORDER BY name');
    return result;
  } catch (error) {
    console.error('Error getting all students:', error);
    throw error;
  }
};

/**
 * Get students by class ID
 * @param {number} classId - Class ID
 * @returns {Promise<Array>} Array of students in the class
 */
export const getStudentsByClassId = async (classId) => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync(
      'SELECT * FROM students WHERE class_id = ? ORDER BY name',
      [classId]
    );
    return result;
  } catch (error) {
    console.error('Error getting students by class ID:', error);
    throw error;
  }
};

/**
 * Get a student by ID
 * @param {number} id - Student ID
 * @returns {Promise<Object|null>} The student object or null if not found
 */
export const getStudentById = async (id) => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync('SELECT * FROM students WHERE id = ?', [id]);
    return result || null;
  } catch (error) {
    console.error('Error getting student by ID:', error);
    throw error;
  }
};

/**
 * Update a student
 * @param {number} id - Student ID
 * @param {string} name - Student name
 * @param {number} classId - Class ID (optional)
 * @param {string} besInfo - BES/DSA information (optional)
 * @returns {Promise<Object>} The updated student object
 */
export const updateStudent = async (id, name = null, classId = null, besInfo = null) => {
  try {
    const database = getDatabase();
    
    const updates = [];
    const params = [];
    
    if (name !== undefined && name !== null) {
      updates.push('name = ?');
      params.push(name);
    }
    if (classId !== undefined && classId !== null) {
      updates.push('class_id = ?');
      params.push(classId);
    }
    if (besInfo !== undefined && besInfo !== null) {
      updates.push('bes_info = ?');
      params.push(besInfo);
    }
    
    if (updates.length === 0) {
      throw new Error('No fields to update');
    }
    
    params.push(id);
    const query = `UPDATE students SET ${updates.join(', ')} WHERE id = ?`;
    
    await database.runAsync(query, params);
    
    return await getStudentById(id);
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

/**
 * Delete a student
 * @param {number} id - Student ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteStudent = async (id) => {
  try {
    const database = getDatabase();
    await database.runAsync('DELETE FROM students WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// ============================================
// CRUD operations for SCHEDULE table
// ============================================

/**
 * Create a new schedule entry
 * @param {number} teacherId - Teacher ID
 * @param {string} day - Day of the week
 * @param {string} time - Time slot
 * @param {number} classId - Class ID (optional)
 * @param {string} subject - Subject (optional)
 * @returns {Promise<Object>} The created schedule entry
 */
export const createSchedule = async (teacherId, day, time, classId = null, subject = null) => {
  try {
    const database = getDatabase();
    const result = await database.runAsync(
      'INSERT INTO schedule (teacher_id, day, time, class_id, subject) VALUES (?, ?, ?, ?, ?)',
      [teacherId, day, time, classId, subject]
    );
    
    return {
      id: result.lastInsertRowId,
      teacher_id: teacherId,
      day,
      time,
      class_id: classId,
      subject
    };
  } catch (error) {
    console.error('Error creating schedule:', error);
    throw error;
  }
};

/**
 * Get all schedule entries
 * @returns {Promise<Array>} Array of all schedule entries
 */
export const getAllSchedule = async () => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync('SELECT * FROM schedule ORDER BY day, time');
    return result;
  } catch (error) {
    console.error('Error getting all schedule:', error);
    throw error;
  }
};

/**
 * Get schedule by teacher ID
 * @param {number} teacherId - Teacher ID
 * @returns {Promise<Array>} Array of schedule entries for the teacher
 */
export const getScheduleByTeacherId = async (teacherId) => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync(
      'SELECT * FROM schedule WHERE teacher_id = ? ORDER BY day, time',
      [teacherId]
    );
    return result;
  } catch (error) {
    console.error('Error getting schedule by teacher ID:', error);
    throw error;
  }
};

/**
 * Get a schedule entry by ID
 * @param {number} id - Schedule ID
 * @returns {Promise<Object|null>} The schedule entry or null if not found
 */
export const getScheduleById = async (id) => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync('SELECT * FROM schedule WHERE id = ?', [id]);
    return result || null;
  } catch (error) {
    console.error('Error getting schedule by ID:', error);
    throw error;
  }
};

/**
 * Update a schedule entry
 * @param {number} id - Schedule ID
 * @param {number} teacherId - Teacher ID
 * @param {string} day - Day of the week
 * @param {string} time - Time slot
 * @param {number} classId - Class ID (optional)
 * @param {string} subject - Subject (optional)
 * @returns {Promise<Object>} The updated schedule entry
 */
export const updateSchedule = async (id, teacherId = null, day = null, time = null, classId = null, subject = null) => {
  try {
    const database = getDatabase();
    
    const updates = [];
    const params = [];
    
    if (teacherId !== undefined && teacherId !== null) {
      updates.push('teacher_id = ?');
      params.push(teacherId);
    }
    if (day !== undefined && day !== null) {
      updates.push('day = ?');
      params.push(day);
    }
    if (time !== undefined && time !== null) {
      updates.push('time = ?');
      params.push(time);
    }
    if (classId !== undefined && classId !== null) {
      updates.push('class_id = ?');
      params.push(classId);
    }
    if (subject !== undefined && subject !== null) {
      updates.push('subject = ?');
      params.push(subject);
    }
    
    if (updates.length === 0) {
      throw new Error('No fields to update');
    }
    
    params.push(id);
    const query = `UPDATE schedule SET ${updates.join(', ')} WHERE id = ?`;
    
    await database.runAsync(query, params);
    
    return await getScheduleById(id);
  } catch (error) {
    console.error('Error updating schedule:', error);
    throw error;
  }
};

/**
 * Delete a schedule entry
 * @param {number} id - Schedule ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteSchedule = async (id) => {
  try {
    const database = getDatabase();
    await database.runAsync('DELETE FROM schedule WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting schedule:', error);
    throw error;
  }
};

// ============================================
// BACKUP AND RESTORE FUNCTIONS
// ============================================

// ============================================
// CRUD operations for MATERIALS table
// ============================================

/**
 * Create a new material
 * @param {string} title - Material title
 * @param {string} type - Material type (pdf, image, link, document)
 * @param {string} filePath - Path to the file (optional for links)
 * @param {string} url - URL for link type materials (optional)
 * @param {string} description - Material description (optional)
 * @param {number} classId - Class ID (optional)
 * @param {number} studentId - Student ID (optional)
 * @returns {Promise<Object>} The created material object
 */
export const createMaterial = async (title, type, filePath = null, url = null, description = null, classId = null, studentId = null) => {
  try {
    const database = getDatabase();
    const createdAt = new Date().toISOString();
    
    const result = await database.runAsync(
      'INSERT INTO materials (title, type, file_path, url, description, class_id, student_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, type, filePath, url, description, classId, studentId, createdAt]
    );
    
    return {
      id: result.lastInsertRowId,
      title,
      type,
      file_path: filePath,
      url,
      description,
      class_id: classId,
      student_id: studentId,
      created_at: createdAt
    };
  } catch (error) {
    console.error('Error creating material:', error);
    throw error;
  }
};

/**
 * Get all materials
 * @returns {Promise<Array>} Array of all materials
 */
export const getAllMaterials = async () => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync('SELECT * FROM materials ORDER BY created_at DESC');
    return result;
  } catch (error) {
    console.error('Error getting all materials:', error);
    throw error;
  }
};

/**
 * Get materials by class ID
 * @param {number} classId - Class ID
 * @returns {Promise<Array>} Array of materials for the class
 */
export const getMaterialsByClassId = async (classId) => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync(
      'SELECT * FROM materials WHERE class_id = ? ORDER BY created_at DESC',
      [classId]
    );
    return result;
  } catch (error) {
    console.error('Error getting materials by class ID:', error);
    throw error;
  }
};

/**
 * Get materials by student ID
 * @param {number} studentId - Student ID
 * @returns {Promise<Array>} Array of materials for the student
 */
export const getMaterialsByStudentId = async (studentId) => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync(
      'SELECT * FROM materials WHERE student_id = ? ORDER BY created_at DESC',
      [studentId]
    );
    return result;
  } catch (error) {
    console.error('Error getting materials by student ID:', error);
    throw error;
  }
};

/**
 * Get a material by ID
 * @param {number} id - Material ID
 * @returns {Promise<Object|null>} The material object or null if not found
 */
export const getMaterialById = async (id) => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync('SELECT * FROM materials WHERE id = ?', [id]);
    return result || null;
  } catch (error) {
    console.error('Error getting material by ID:', error);
    throw error;
  }
};

/**
 * Update a material
 * @param {number} id - Material ID
 * @param {string} title - Material title
 * @param {string} type - Material type
 * @param {string} filePath - Path to the file (optional)
 * @param {string} url - URL for link type materials (optional)
 * @param {string} description - Material description (optional)
 * @param {number} classId - Class ID (optional)
 * @param {number} studentId - Student ID (optional)
 * @returns {Promise<Object>} The updated material object
 */
export const updateMaterial = async (id, title = null, type = null, filePath = null, url = null, description = null, classId = null, studentId = null) => {
  try {
    const database = getDatabase();
    
    const updates = [];
    const params = [];
    
    if (title !== undefined && title !== null) {
      updates.push('title = ?');
      params.push(title);
    }
    if (type !== undefined && type !== null) {
      updates.push('type = ?');
      params.push(type);
    }
    if (filePath !== undefined && filePath !== null) {
      updates.push('file_path = ?');
      params.push(filePath);
    }
    if (url !== undefined && url !== null) {
      updates.push('url = ?');
      params.push(url);
    }
    if (description !== undefined && description !== null) {
      updates.push('description = ?');
      params.push(description);
    }
    if (classId !== undefined && classId !== null) {
      updates.push('class_id = ?');
      params.push(classId);
    }
    if (studentId !== undefined && studentId !== null) {
      updates.push('student_id = ?');
      params.push(studentId);
    }
    
    // If no fields to update, return the existing material unchanged
    if (updates.length === 0) {
      return await getMaterialById(id);
    }
    
    params.push(id);
    const query = `UPDATE materials SET ${updates.join(', ')} WHERE id = ?`;
    
    await database.runAsync(query, params);
    
    return await getMaterialById(id);
  } catch (error) {
    console.error('Error updating material:', error);
    throw error;
  }
};

/**
 * Delete a material
 * @param {number} id - Material ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteMaterial = async (id) => {
  try {
    const database = getDatabase();
    
    // Get material info to delete file if exists
    const material = await getMaterialById(id);
    if (material && material.file_path) {
      try {
        const fileInfo = await FileSystem.getInfoAsync(material.file_path);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(material.file_path);
        }
      } catch (fileError) {
        console.warn('Could not delete file:', fileError);
      }
    }
    
    await database.runAsync('DELETE FROM materials WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting material:', error);
    throw error;
  }
};

// ============================================
// BACKUP AND RESTORE FUNCTIONS
// ============================================

/**
 * Create backup of the database
 * @returns {Promise<string>} Path to the backup file
 */
export const createDatabaseBackup = async () => {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const dbPath = `${FileSystem.documentDirectory}SQLite/docente_plus.db`;
    const backupPath = `${FileSystem.documentDirectory}docente_plus_backup_${timestamp}.db`;
    
    // Check if database exists
    const dbInfo = await FileSystem.getInfoAsync(dbPath);
    if (!dbInfo.exists) {
      throw new Error('Database non trovato');
    }
    
    // Copy the database
    await FileSystem.copyAsync({
      from: dbPath,
      to: backupPath
    });
    
    console.log('✅ Backup creato:', backupPath);
    return backupPath;
  } catch (error) {
    console.error('❌ Errore creazione backup:', error);
    throw error;
  }
};

/**
 * Export backup for sharing
 * @returns {Promise<string>} Path to the exported backup file
 */
export const exportDatabaseBackup = async () => {
  try {
    const backupPath = await createDatabaseBackup();
    
    // Check if sharing is available
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(backupPath, {
        mimeType: 'application/x-sqlite3',
        dialogTitle: 'Esporta Backup Database Docente Plus'
      });
    }
    
    return backupPath;
  } catch (error) {
    console.error('❌ Errore esportazione backup:', error);
    throw error;
  }
};

/**
 * List all available backups
 * @returns {Promise<Array>} Array of backup objects with info
 */
export const listDatabaseBackups = async () => {
  try {
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    
    const backups = files
      .filter(file => file.startsWith('docente_plus_backup_') && file.endsWith('.db'))
      .map(async (file) => {
        const filePath = `${FileSystem.documentDirectory}${file}`;
        const info = await FileSystem.getInfoAsync(filePath);
        return {
          filename: file,
          path: filePath,
          size: info.size,
          modificationTime: info.modificationTime
        };
      });
    
    return await Promise.all(backups);
  } catch (error) {
    console.error('❌ Errore lista backup:', error);
    throw error;
  }
};

/**
 * Restore database from backup
 * @param {string} backupPath - Path to the backup file
 * @returns {Promise<boolean>} True if restored successfully
 */
export const restoreDatabaseFromBackup = async (backupPath) => {
  try {
    const dbPath = `${FileSystem.documentDirectory}SQLite/docente_plus.db`;
    
    // Check if backup exists
    const backupInfo = await FileSystem.getInfoAsync(backupPath);
    if (!backupInfo.exists) {
      throw new Error('File di backup non trovato');
    }
    
    // Create emergency backup of current database before overwriting
    const emergencyBackupPath = `${FileSystem.documentDirectory}docente_plus_before_restore_${Date.now()}.db`;
    const currentDbInfo = await FileSystem.getInfoAsync(dbPath);
    if (currentDbInfo.exists) {
      await FileSystem.copyAsync({
        from: dbPath,
        to: emergencyBackupPath
      });
      console.log('🔄 Backup di emergenza creato:', emergencyBackupPath);
    }
    
    // Restore from backup
    await FileSystem.copyAsync({
      from: backupPath,
      to: dbPath
    });
    
    console.log('✅ Database ripristinato da:', backupPath);
    return true;
  } catch (error) {
    console.error('❌ Errore ripristino database:', error);
    throw error;
  }
};

/**
 * Clean old backups (keep only the most recent N)
 * @param {number} keepCount - Number of backups to keep
 * @returns {Promise<number>} Number of backups deleted
 */
export const cleanOldBackups = async (keepCount = 5) => {
  try {
    const backups = await listDatabaseBackups();
    
    // Sort by date (most recent first)
    backups.sort((a, b) => b.modificationTime - a.modificationTime);
    
    // Delete backups beyond the limit
    const toDelete = backups.slice(keepCount);
    
    for (const backup of toDelete) {
      await FileSystem.deleteAsync(backup.path);
      console.log('🗑️ Eliminato backup vecchio:', backup.filename);
    }
    
    return toDelete.length;
  } catch (error) {
    console.error('❌ Errore pulizia backup:', error);
    throw error;
  }
};

/**
 * Export all data to JSON format
 * @returns {Promise<Object>} Object containing all data
 */
export const exportAllDataToJSON = async () => {
  try {
    const database = getDatabase();
    
    // Export all tables
    const classes = await database.getAllAsync('SELECT * FROM classes');
    const students = await database.getAllAsync('SELECT * FROM students');
    const schedule = await database.getAllAsync('SELECT * FROM schedule');
    const assessments = await database.getAllAsync('SELECT * FROM assessments');
    const teachers = await database.getAllAsync('SELECT * FROM teachers');
    const materials = await database.getAllAsync('SELECT * FROM materials');
    
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      data: {
        classes,
        students,
        schedule,
        assessments,
        teachers,
        materials
      }
    };
    
    return exportData;
  } catch (error) {
    console.error('❌ Errore esportazione dati:', error);
    throw error;
  }
};

/**
 * Save JSON export to file
 * @returns {Promise<string>} Path to the JSON file
 */
export const saveJSONExport = async () => {
  try {
    const data = await exportAllDataToJSON();
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const filePath = `${FileSystem.documentDirectory}docente_plus_export_${timestamp}.json`;
    
    await FileSystem.writeAsStringAsync(
      filePath,
      JSON.stringify(data, null, 2),
      { encoding: FileSystem.EncodingType.UTF8 }
    );
    
    console.log('✅ Esportazione JSON salvata:', filePath);
    
    // Share the file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filePath, {
        mimeType: 'application/json',
        dialogTitle: 'Esporta Dati Docente Plus (JSON)'
      });
    }
    
    return filePath;
  } catch (error) {
    console.error('❌ Errore salvataggio JSON:', error);
    throw error;
  }
};

/**
 * Import data from JSON
 * @param {string} jsonPath - Path to the JSON file
 * @returns {Promise<Object>} Import statistics
 */
export const importDataFromJSON = async (jsonPath) => {
  try {
    const database = getDatabase();
    
    // Read JSON file
    const jsonContent = await FileSystem.readAsStringAsync(jsonPath, {
      encoding: FileSystem.EncodingType.UTF8
    });
    
    const importData = JSON.parse(jsonContent);
    
    if (!importData.data) {
      throw new Error('Formato JSON non valido');
    }
    
    const stats = {
      teachers: 0,
      classes: 0,
      students: 0,
      schedule: 0,
      assessments: 0,
      materials: 0
    };
    
    // Import teachers
    if (importData.data.teachers) {
      for (const teacher of importData.data.teachers) {
        await database.runAsync(
          'INSERT INTO teachers (name, school, subjects, schedule) VALUES (?, ?, ?, ?)',
          [teacher.name, teacher.school, teacher.subjects, teacher.schedule]
        );
        stats.teachers++;
      }
    }
    
    // Import classes
    if (importData.data.classes) {
      for (const cls of importData.data.classes) {
        await database.runAsync(
          'INSERT INTO classes (name, teacher_id, student_count) VALUES (?, ?, ?)',
          [cls.name, cls.teacher_id, cls.student_count]
        );
        stats.classes++;
      }
    }
    
    // Import students
    if (importData.data.students) {
      for (const student of importData.data.students) {
        await database.runAsync(
          'INSERT INTO students (name, class_id, bes_info) VALUES (?, ?, ?)',
          [student.name, student.class_id, student.bes_info]
        );
        stats.students++;
      }
    }
    
    // Import schedule
    if (importData.data.schedule) {
      for (const entry of importData.data.schedule) {
        await database.runAsync(
          'INSERT INTO schedule (teacher_id, day, time, class_id, subject) VALUES (?, ?, ?, ?, ?)',
          [entry.teacher_id, entry.day, entry.time, entry.class_id, entry.subject]
        );
        stats.schedule++;
      }
    }
    
    // Import assessments
    if (importData.data.assessments) {
      for (const assessment of importData.data.assessments) {
        await database.runAsync(
          'INSERT INTO assessments (student_id, type, value, date, notes) VALUES (?, ?, ?, ?, ?)',
          [assessment.student_id, assessment.type, assessment.value, assessment.date, assessment.notes]
        );
        stats.assessments++;
      }
    }
    
    // Import materials
    if (importData.data.materials) {
      for (const material of importData.data.materials) {
        await database.runAsync(
          'INSERT INTO materials (title, type, file_path, url, description, class_id, student_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [material.title, material.type, material.file_path, material.url, material.description, material.class_id, material.student_id, material.created_at]
        );
        stats.materials++;
      }
    }
    
    console.log('✅ Dati importati con successo:', stats);
    return stats;
  } catch (error) {
    console.error('❌ Errore importazione dati:', error);
    throw error;
  }
};

// ============================================
// CRUD operations for PDP_BES_REPORTS table
// ============================================

/**
 * Create a new PDP/BES report
 * @param {Object} reportData - Report data object
 * @returns {Promise<Object>} The created report object
 */
export const createPdpBesReport = async (reportData) => {
  try {
    const database = getDatabase();
    const now = new Date().toISOString();
    
    const result = await database.runAsync(
      `INSERT INTO pdp_bes_reports 
       (student_id, report_type, school_year, diagnosis, strengths, difficulties, 
        teaching_strategies, evaluation_tools, objectives, notes, created_at, updated_at, pdf_path) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reportData.student_id,
        reportData.report_type,
        reportData.school_year,
        reportData.diagnosis || null,
        reportData.strengths || null,
        reportData.difficulties || null,
        reportData.teaching_strategies || null,
        reportData.evaluation_tools || null,
        reportData.objectives || null,
        reportData.notes || null,
        now,
        now,
        reportData.pdf_path || null
      ]
    );
    
    return {
      id: result.lastInsertRowId,
      ...reportData,
      created_at: now,
      updated_at: now
    };
  } catch (error) {
    console.error('Error creating PDP/BES report:', error);
    throw error;
  }
};

/**
 * Get all PDP/BES reports
 * @returns {Promise<Array>} Array of all reports
 */
export const getAllPdpBesReports = async () => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync(
      'SELECT * FROM pdp_bes_reports ORDER BY created_at DESC'
    );
    return result;
  } catch (error) {
    console.error('Error getting all PDP/BES reports:', error);
    throw error;
  }
};

/**
 * Get PDP/BES reports by student ID
 * @param {number} studentId - Student ID
 * @returns {Promise<Array>} Array of reports for the student
 */
export const getPdpBesReportsByStudentId = async (studentId) => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync(
      'SELECT * FROM pdp_bes_reports WHERE student_id = ? ORDER BY created_at DESC',
      [studentId]
    );
    return result;
  } catch (error) {
    console.error('Error getting PDP/BES reports by student ID:', error);
    throw error;
  }
};

/**
 * Get a PDP/BES report by ID
 * @param {number} id - Report ID
 * @returns {Promise<Object|null>} The report object or null if not found
 */
export const getPdpBesReportById = async (id) => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync(
      'SELECT * FROM pdp_bes_reports WHERE id = ?',
      [id]
    );
    return result || null;
  } catch (error) {
    console.error('Error getting PDP/BES report by ID:', error);
    throw error;
  }
};

/**
 * Update a PDP/BES report
 * @param {number} id - Report ID
 * @param {Object} reportData - Report data to update
 * @returns {Promise<Object>} The updated report object
 */
export const updatePdpBesReport = async (id, reportData) => {
  try {
    const database = getDatabase();
    const now = new Date().toISOString();
    
    const updates = [];
    const params = [];
    
    const fields = [
      'report_type', 'school_year', 'diagnosis', 'strengths', 'difficulties',
      'teaching_strategies', 'evaluation_tools', 'objectives', 'notes', 'pdf_path'
    ];
    
    fields.forEach(field => {
      if (reportData[field] !== undefined) {
        updates.push(`${field} = ?`);
        params.push(reportData[field]);
      }
    });
    
    if (updates.length === 0) {
      throw new Error('No fields to update');
    }
    
    updates.push('updated_at = ?');
    params.push(now);
    params.push(id);
    
    const query = `UPDATE pdp_bes_reports SET ${updates.join(', ')} WHERE id = ?`;
    await database.runAsync(query, params);
    
    return await getPdpBesReportById(id);
  } catch (error) {
    console.error('Error updating PDP/BES report:', error);
    throw error;
  }
};

/**
 * Delete a PDP/BES report
 * @param {number} id - Report ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deletePdpBesReport = async (id) => {
  try {
    const database = getDatabase();
    
    // Get the report to check if there's a PDF file
    const report = await getPdpBesReportById(id);
    
    // Delete the PDF file if it exists
    if (report && report.pdf_path) {
      try {
        const fileInfo = await FileSystem.getInfoAsync(report.pdf_path);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(report.pdf_path);
        }
      } catch (fileError) {
        console.warn('Could not delete PDF file:', fileError);
      }
    }
    
    await database.runAsync('DELETE FROM pdp_bes_reports WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting PDP/BES report:', error);
    throw error;
  }
};

// ============================================
// DASHBOARD STATISTICS AND ANALYTICS
// ============================================

/**
 * Get overall dashboard statistics
 * @returns {Promise<Object>} Dashboard statistics object
 */
export const getDashboardStatistics = async () => {
  try {
    const database = getDatabase();
    
    // Get total counts
    const classesCount = await database.getFirstAsync('SELECT COUNT(*) as count FROM classes');
    const studentsCount = await database.getFirstAsync('SELECT COUNT(*) as count FROM students');
    const materialsCount = await database.getFirstAsync('SELECT COUNT(*) as count FROM materials');
    const reportsCount = await database.getFirstAsync('SELECT COUNT(*) as count FROM pdp_bes_reports');
    
    // Get BES/DSA statistics
    const besStudentsCount = await database.getFirstAsync(
      'SELECT COUNT(*) as count FROM students WHERE bes_info IS NOT NULL AND bes_info != ""'
    );
    
    // Get report type statistics
    const pdpCount = await database.getFirstAsync(
      'SELECT COUNT(*) as count FROM pdp_bes_reports WHERE report_type = "PDP"'
    );
    const besCount = await database.getFirstAsync(
      'SELECT COUNT(*) as count FROM pdp_bes_reports WHERE report_type = "BES"'
    );
    
    return {
      totalClasses: classesCount.count || 0,
      totalStudents: studentsCount.count || 0,
      totalMaterials: materialsCount.count || 0,
      totalReports: reportsCount.count || 0,
      besStudents: besStudentsCount.count || 0,
      pdpReports: pdpCount.count || 0,
      besReports: besCount.count || 0,
    };
  } catch (error) {
    console.error('Error getting dashboard statistics:', error);
    throw error;
  }
};

/**
 * Get class-level statistics
 * @returns {Promise<Array>} Array of class statistics
 */
export const getClassStatistics = async () => {
  try {
    const database = getDatabase();
    
    const classes = await database.getAllAsync(`
      SELECT 
        c.id,
        c.name,
        c.student_count,
        COUNT(DISTINCT s.id) as actual_student_count,
        COUNT(DISTINCT CASE WHEN s.bes_info IS NOT NULL AND s.bes_info != '' THEN s.id END) as bes_count,
        COUNT(DISTINCT m.id) as materials_count,
        COUNT(DISTINCT r.id) as reports_count
      FROM classes c
      LEFT JOIN students s ON c.id = s.class_id
      LEFT JOIN materials m ON c.id = m.class_id
      LEFT JOIN pdp_bes_reports r ON s.id = r.student_id
      GROUP BY c.id, c.name, c.student_count
      ORDER BY c.name
    `);
    
    return classes;
  } catch (error) {
    console.error('Error getting class statistics:', error);
    throw error;
  }
};

/**
 * Get recent activities (last 10)
 * @returns {Promise<Array>} Array of recent activities
 */
export const getRecentActivities = async () => {
  try {
    const database = getDatabase();
    
    // Get recent materials
    const recentMaterials = await database.getAllAsync(`
      SELECT 
        'material' as type,
        m.id,
        m.title as name,
        m.created_at as date,
        c.name as class_name,
        s.name as student_name
      FROM materials m
      LEFT JOIN classes c ON m.class_id = c.id
      LEFT JOIN students s ON m.student_id = s.id
      ORDER BY m.created_at DESC
      LIMIT 5
    `);
    
    // Get recent reports
    const recentReports = await database.getAllAsync(`
      SELECT 
        'report' as type,
        r.id,
        r.report_type || ' - ' || s.name as name,
        r.created_at as date,
        c.name as class_name,
        s.name as student_name
      FROM pdp_bes_reports r
      LEFT JOIN students s ON r.student_id = s.id
      LEFT JOIN classes c ON s.class_id = c.id
      ORDER BY r.created_at DESC
      LIMIT 5
    `);
    
    // Combine and sort by date
    const activities = [...recentMaterials, ...recentReports]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
    
    return activities;
  } catch (error) {
    console.error('Error getting recent activities:', error);
    throw error;
  }
};

/**
 * Get BES/DSA distribution by class
 * @returns {Promise<Array>} Array of BES/DSA distribution per class
 */
export const getBESDistribution = async () => {
  try {
    const database = getDatabase();
    
    const distribution = await database.getAllAsync(`
      SELECT 
        c.id,
        c.name as class_name,
        COUNT(DISTINCT s.id) as total_students,
        COUNT(DISTINCT CASE WHEN s.bes_info IS NOT NULL AND s.bes_info != '' THEN s.id END) as bes_students,
        COUNT(DISTINCT r.id) as total_reports
      FROM classes c
      LEFT JOIN students s ON c.id = s.class_id
      LEFT JOIN pdp_bes_reports r ON s.id = r.student_id
      GROUP BY c.id, c.name
      HAVING total_students > 0
      ORDER BY bes_students DESC, c.name
    `);
    
    return distribution;
  } catch (error) {
    console.error('Error getting BES distribution:', error);
    throw error;
  }
};

/**
 * Get materials statistics by type
 * @returns {Promise<Array>} Array of materials grouped by type
 */
export const getMaterialsStatistics = async () => {
  try {
    const database = getDatabase();
    
    const stats = await database.getAllAsync(`
      SELECT 
        type,
        COUNT(*) as count
      FROM materials
      GROUP BY type
      ORDER BY count DESC
    `);
    
    return stats;
  } catch (error) {
    console.error('Error getting materials statistics:', error);
    throw error;
  }
};

/**
 * Export dashboard statistics as JSON
 * @returns {Promise<string>} JSON string of all dashboard data
 */
export const exportDashboardData = async () => {
  try {
    const statistics = await getDashboardStatistics();
    const classStats = await getClassStatistics();
    const recentActivities = await getRecentActivities();
    const besDistribution = await getBESDistribution();
    const materialsStats = await getMaterialsStatistics();
    
    const dashboardData = {
      exportDate: new Date().toISOString(),
      statistics,
      classStatistics: classStats,
      recentActivities,
      besDistribution,
      materialsStatistics: materialsStats
    };
    
    return JSON.stringify(dashboardData, null, 2);
  } catch (error) {
    console.error('Error exporting dashboard data:', error);
    throw error;
  }
};
