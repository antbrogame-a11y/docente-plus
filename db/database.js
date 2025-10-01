import * as SQLite from 'expo-sqlite';
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
 * Delete all classes (useful for testing)
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteAllClasses = async () => {
  try {
    const database = getDatabase();
    await database.runAsync('DELETE FROM classes');
    return true;
  } catch (error) {
    console.error('Error deleting all classes:', error);
    throw error;
  }
};
