/**
 * Tests for CRUD operations on all database entities
 * 
 * These tests verify that:
 * - All entities can be created (Create)
 * - All entities can be read (Read)
 * - All entities can be updated (Update)
 * - All entities can be deleted (Delete)
 */

// Mock expo-sqlite
const mockDb = {
  execAsync: jest.fn(),
  runAsync: jest.fn(),
  getAllAsync: jest.fn(),
  getFirstAsync: jest.fn()
};

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(() => Promise.resolve(mockDb))
}));

// Mock FileSystem and Sharing for database.js imports
jest.mock('expo-file-system', () => ({
  documentDirectory: '/mock/directory/',
  EncodingType: { UTF8: 'utf8' },
  getInfoAsync: jest.fn(),
  copyAsync: jest.fn(),
  readDirectoryAsync: jest.fn(),
  deleteAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
  readAsStringAsync: jest.fn()
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(),
  shareAsync: jest.fn()
}));

const {
  initDatabase,
  // Teachers
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  // Classes
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  // Students
  createStudent,
  getAllStudents,
  getStudentsByClassId,
  getStudentById,
  updateStudent,
  deleteStudent,
  // Schedule
  createSchedule,
  getAllSchedule,
  getScheduleByTeacherId,
  getScheduleById,
  updateSchedule,
  deleteSchedule
} = require('../db/database');

describe('Database CRUD Operations', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    mockDb.execAsync.mockResolvedValue(undefined);
    mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
    mockDb.getAllAsync.mockResolvedValue([]);
    mockDb.getFirstAsync.mockResolvedValue(null);
    
    // Initialize database
    await initDatabase();
  });

  describe('Teachers CRUD', () => {
    it('should create a teacher', async () => {
      mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
      
      const teacher = await createTeacher('John Doe', 'High School', 'Math, Physics', '[]');
      
      expect(teacher).toEqual({
        id: 1,
        name: 'John Doe',
        school: 'High School',
        subjects: 'Math, Physics',
        schedule: '[]'
      });
      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'INSERT INTO teachers (name, school, subjects, schedule) VALUES (?, ?, ?, ?)',
        ['John Doe', 'High School', 'Math, Physics', '[]']
      );
    });

    it('should get all teachers', async () => {
      const mockTeachers = [
        { id: 1, name: 'John Doe', school: 'High School', subjects: 'Math', schedule: '[]' },
        { id: 2, name: 'Jane Smith', school: 'Middle School', subjects: 'English', schedule: '[]' }
      ];
      mockDb.getAllAsync.mockResolvedValue(mockTeachers);
      
      const teachers = await getAllTeachers();
      
      expect(teachers).toEqual(mockTeachers);
      expect(mockDb.getAllAsync).toHaveBeenCalledWith('SELECT * FROM teachers ORDER BY name');
    });

    it('should get teacher by id', async () => {
      const mockTeacher = { id: 1, name: 'John Doe', school: 'High School', subjects: 'Math', schedule: '[]' };
      mockDb.getFirstAsync.mockResolvedValue(mockTeacher);
      
      const teacher = await getTeacherById(1);
      
      expect(teacher).toEqual(mockTeacher);
      expect(mockDb.getFirstAsync).toHaveBeenCalledWith('SELECT * FROM teachers WHERE id = ?', [1]);
    });

    it('should update a teacher', async () => {
      const updatedTeacher = { id: 1, name: 'John Updated', school: 'New School', subjects: 'Science', schedule: '[]' };
      mockDb.getFirstAsync.mockResolvedValue(updatedTeacher);
      
      const teacher = await updateTeacher(1, 'John Updated', 'New School', 'Science', '[]');
      
      expect(teacher).toEqual(updatedTeacher);
      expect(mockDb.runAsync).toHaveBeenCalled();
    });

    it('should delete a teacher', async () => {
      const result = await deleteTeacher(1);
      
      expect(result).toBe(true);
      expect(mockDb.runAsync).toHaveBeenCalledWith('DELETE FROM teachers WHERE id = ?', [1]);
    });
  });

  describe('Classes CRUD', () => {
    it('should create a class', async () => {
      mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
      
      const cls = await createClass('Class A', 1, 25);
      
      expect(cls).toEqual({
        id: 1,
        name: 'Class A',
        teacher_id: 1,
        student_count: 25
      });
    });

    it('should get all classes', async () => {
      const mockClasses = [
        { id: 1, name: 'Class A', teacher_id: 1, student_count: 25 },
        { id: 2, name: 'Class B', teacher_id: 1, student_count: 20 }
      ];
      mockDb.getAllAsync.mockResolvedValue(mockClasses);
      
      const classes = await getAllClasses();
      
      expect(classes).toEqual(mockClasses);
    });

    it('should get class by id', async () => {
      const mockClass = { id: 1, name: 'Class A', teacher_id: 1, student_count: 25 };
      mockDb.getFirstAsync.mockResolvedValue(mockClass);
      
      const cls = await getClassById(1);
      
      expect(cls).toEqual(mockClass);
    });

    it('should update a class', async () => {
      const updatedClass = { id: 1, name: 'Class A Updated', teacher_id: 1, student_count: 30 };
      mockDb.getFirstAsync.mockResolvedValue(updatedClass);
      
      const cls = await updateClass(1, 'Class A Updated', 1, 30);
      
      expect(cls).toEqual(updatedClass);
    });

    it('should delete a class', async () => {
      const result = await deleteClass(1);
      
      expect(result).toBe(true);
      expect(mockDb.runAsync).toHaveBeenCalledWith('DELETE FROM classes WHERE id = ?', [1]);
    });
  });

  describe('Students CRUD', () => {
    it('should create a student', async () => {
      mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
      
      const student = await createStudent('Alice Johnson', 1, 'DSA: Dyslexia');
      
      expect(student).toEqual({
        id: 1,
        name: 'Alice Johnson',
        class_id: 1,
        bes_info: 'DSA: Dyslexia'
      });
    });

    it('should get all students', async () => {
      const mockStudents = [
        { id: 1, name: 'Alice Johnson', class_id: 1, bes_info: 'DSA: Dyslexia' },
        { id: 2, name: 'Bob Smith', class_id: 1, bes_info: null }
      ];
      mockDb.getAllAsync.mockResolvedValue(mockStudents);
      
      const students = await getAllStudents();
      
      expect(students).toEqual(mockStudents);
    });

    it('should get students by class id', async () => {
      const mockStudents = [
        { id: 1, name: 'Alice Johnson', class_id: 1, bes_info: 'DSA: Dyslexia' }
      ];
      mockDb.getAllAsync.mockResolvedValue(mockStudents);
      
      const students = await getStudentsByClassId(1);
      
      expect(students).toEqual(mockStudents);
      expect(mockDb.getAllAsync).toHaveBeenCalledWith(
        'SELECT * FROM students WHERE class_id = ? ORDER BY name',
        [1]
      );
    });

    it('should get student by id', async () => {
      const mockStudent = { id: 1, name: 'Alice Johnson', class_id: 1, bes_info: 'DSA: Dyslexia' };
      mockDb.getFirstAsync.mockResolvedValue(mockStudent);
      
      const student = await getStudentById(1);
      
      expect(student).toEqual(mockStudent);
    });

    it('should update a student', async () => {
      const updatedStudent = { id: 1, name: 'Alice Updated', class_id: 2, bes_info: 'Updated info' };
      mockDb.getFirstAsync.mockResolvedValue(updatedStudent);
      
      const student = await updateStudent(1, 'Alice Updated', 2, 'Updated info');
      
      expect(student).toEqual(updatedStudent);
    });

    it('should delete a student', async () => {
      const result = await deleteStudent(1);
      
      expect(result).toBe(true);
      expect(mockDb.runAsync).toHaveBeenCalledWith('DELETE FROM students WHERE id = ?', [1]);
    });
  });

  describe('Schedule CRUD', () => {
    it('should create a schedule entry', async () => {
      mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
      
      const schedule = await createSchedule(1, 'Monday', '09:00', 1, 'Math');
      
      expect(schedule).toEqual({
        id: 1,
        teacher_id: 1,
        day: 'Monday',
        time: '09:00',
        class_id: 1,
        subject: 'Math'
      });
    });

    it('should get all schedule entries', async () => {
      const mockSchedule = [
        { id: 1, teacher_id: 1, day: 'Monday', time: '09:00', class_id: 1, subject: 'Math' },
        { id: 2, teacher_id: 1, day: 'Tuesday', time: '10:00', class_id: 2, subject: 'Physics' }
      ];
      mockDb.getAllAsync.mockResolvedValue(mockSchedule);
      
      const schedule = await getAllSchedule();
      
      expect(schedule).toEqual(mockSchedule);
    });

    it('should get schedule by teacher id', async () => {
      const mockSchedule = [
        { id: 1, teacher_id: 1, day: 'Monday', time: '09:00', class_id: 1, subject: 'Math' }
      ];
      mockDb.getAllAsync.mockResolvedValue(mockSchedule);
      
      const schedule = await getScheduleByTeacherId(1);
      
      expect(schedule).toEqual(mockSchedule);
      expect(mockDb.getAllAsync).toHaveBeenCalledWith(
        'SELECT * FROM schedule WHERE teacher_id = ? ORDER BY day, time',
        [1]
      );
    });

    it('should get schedule by id', async () => {
      const mockScheduleEntry = { id: 1, teacher_id: 1, day: 'Monday', time: '09:00', class_id: 1, subject: 'Math' };
      mockDb.getFirstAsync.mockResolvedValue(mockScheduleEntry);
      
      const schedule = await getScheduleById(1);
      
      expect(schedule).toEqual(mockScheduleEntry);
    });

    it('should update a schedule entry', async () => {
      const updatedSchedule = { id: 1, teacher_id: 1, day: 'Tuesday', time: '10:00', class_id: 1, subject: 'Physics' };
      mockDb.getFirstAsync.mockResolvedValue(updatedSchedule);
      
      const schedule = await updateSchedule(1, 1, 'Tuesday', '10:00', 1, 'Physics');
      
      expect(schedule).toEqual(updatedSchedule);
    });

    it('should delete a schedule entry', async () => {
      const result = await deleteSchedule(1);
      
      expect(result).toBe(true);
      expect(mockDb.runAsync).toHaveBeenCalledWith('DELETE FROM schedule WHERE id = ?', [1]);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors when creating', async () => {
      mockDb.runAsync.mockRejectedValue(new Error('Database error'));
      
      await expect(createTeacher('Test', 'School', 'Subject', '[]'))
        .rejects.toThrow('Database error');
    });

    it('should handle database errors when reading', async () => {
      mockDb.getAllAsync.mockRejectedValue(new Error('Database error'));
      
      await expect(getAllTeachers()).rejects.toThrow('Database error');
    });

    it('should handle database errors when updating', async () => {
      mockDb.runAsync.mockRejectedValue(new Error('Database error'));
      
      await expect(updateTeacher(1, 'Test', 'School', 'Subject', '[]'))
        .rejects.toThrow('Database error');
    });

    it('should handle database errors when deleting', async () => {
      mockDb.runAsync.mockRejectedValue(new Error('Database error'));
      
      await expect(deleteTeacher(1)).rejects.toThrow('Database error');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values in create operations', async () => {
      mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
      
      const teacher = await createTeacher('John Doe', null, null, null);
      
      expect(teacher.school).toBe(null);
      expect(teacher.subjects).toBe(null);
      expect(teacher.schedule).toBe(null);
    });

    it('should return null when entity not found', async () => {
      mockDb.getFirstAsync.mockResolvedValue(null);
      
      const teacher = await getTeacherById(999);
      
      expect(teacher).toBe(null);
    });

    it('should return empty array when no entities exist', async () => {
      mockDb.getAllAsync.mockResolvedValue([]);
      
      const teachers = await getAllTeachers();
      
      expect(teachers).toEqual([]);
    });

    it('should throw error when updating with no fields', async () => {
      await expect(updateTeacher(1)).rejects.toThrow('No fields to update');
    });
  });
});
