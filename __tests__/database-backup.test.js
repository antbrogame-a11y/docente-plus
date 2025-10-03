/**
 * Tests for backup and restore functionality
 * 
 * These tests verify that:
 * - Database backups can be created
 * - Data can be exported to JSON
 * - Data can be imported from JSON
 * - Backups can be listed
 * - Old backups can be cleaned up
 * 
 * Note: These tests use mocks for FileSystem and Sharing since they are Expo-specific
 */

// Mock FileSystem and Sharing
const mockFileSystem = {
  documentDirectory: '/mock/directory/',
  EncodingType: { UTF8: 'utf8' },
  getInfoAsync: jest.fn(),
  copyAsync: jest.fn(),
  readDirectoryAsync: jest.fn(),
  deleteAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
  readAsStringAsync: jest.fn()
};

const mockSharing = {
  isAvailableAsync: jest.fn(),
  shareAsync: jest.fn()
};

jest.mock('expo-file-system', () => mockFileSystem);
jest.mock('expo-sharing', () => mockSharing);
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(() => Promise.resolve({
    execAsync: jest.fn(),
    runAsync: jest.fn(),
    getAllAsync: jest.fn(),
    getFirstAsync: jest.fn()
  }))
}));

const {
  initDatabase,
  createDatabaseBackup,
  exportDatabaseBackup,
  listDatabaseBackups,
  restoreDatabaseFromBackup,
  cleanOldBackups,
  exportAllDataToJSON,
  saveJSONExport,
  importDataFromJSON,
  createTeacher,
  createClass,
  createStudent
} = require('../db/database');

describe('Database Backup and Restore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementations
    mockFileSystem.getInfoAsync.mockResolvedValue({ exists: true, size: 1024, modificationTime: Date.now() });
    mockFileSystem.copyAsync.mockResolvedValue(undefined);
    mockFileSystem.readDirectoryAsync.mockResolvedValue([]);
    mockFileSystem.deleteAsync.mockResolvedValue(undefined);
    mockSharing.isAvailableAsync.mockResolvedValue(true);
    mockSharing.shareAsync.mockResolvedValue(undefined);
  });

  describe('createDatabaseBackup', () => {
    it('should create a backup successfully', async () => {
      const backupPath = await createDatabaseBackup();
      
      expect(backupPath).toContain('docente_plus_backup_');
      expect(backupPath).toContain('.db');
      expect(mockFileSystem.getInfoAsync).toHaveBeenCalled();
      expect(mockFileSystem.copyAsync).toHaveBeenCalled();
    });

    it('should throw error if database does not exist', async () => {
      mockFileSystem.getInfoAsync.mockResolvedValueOnce({ exists: false });
      
      await expect(createDatabaseBackup()).rejects.toThrow('Database non trovato');
    });

    it('should create backup with timestamp in filename', async () => {
      const backupPath = await createDatabaseBackup();
      const timestamp = backupPath.match(/docente_plus_backup_(.+)\.db/);
      
      expect(timestamp).not.toBeNull();
      expect(timestamp[1]).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}/);
    });
  });

  describe('exportDatabaseBackup', () => {
    it('should export and share backup', async () => {
      const exportPath = await exportDatabaseBackup();
      
      expect(exportPath).toContain('docente_plus_backup_');
      expect(mockSharing.isAvailableAsync).toHaveBeenCalled();
      expect(mockSharing.shareAsync).toHaveBeenCalledWith(
        exportPath,
        expect.objectContaining({
          mimeType: 'application/x-sqlite3',
          dialogTitle: expect.any(String)
        })
      );
    });

    it('should not share if sharing is not available', async () => {
      mockSharing.isAvailableAsync.mockResolvedValue(false);
      
      await exportDatabaseBackup();
      
      expect(mockSharing.shareAsync).not.toHaveBeenCalled();
    });
  });

  describe('listDatabaseBackups', () => {
    it('should list available backups', async () => {
      mockFileSystem.readDirectoryAsync.mockResolvedValue([
        'docente_plus_backup_2024-01-01T10-00-00.db',
        'docente_plus_backup_2024-01-02T10-00-00.db',
        'other_file.txt'
      ]);
      
      const backups = await listDatabaseBackups();
      
      expect(backups).toHaveLength(2);
      expect(backups[0]).toHaveProperty('filename');
      expect(backups[0]).toHaveProperty('path');
      expect(backups[0]).toHaveProperty('size');
      expect(backups[0]).toHaveProperty('modificationTime');
    });

    it('should filter out non-backup files', async () => {
      mockFileSystem.readDirectoryAsync.mockResolvedValue([
        'docente_plus_backup_2024-01-01T10-00-00.db',
        'random_file.json',
        'other_database.db'
      ]);
      
      const backups = await listDatabaseBackups();
      
      expect(backups).toHaveLength(1);
      expect(backups[0].filename).toBe('docente_plus_backup_2024-01-01T10-00-00.db');
    });
  });

  describe('restoreDatabaseFromBackup', () => {
    it('should restore database from backup', async () => {
      const backupPath = '/mock/directory/docente_plus_backup_2024-01-01T10-00-00.db';
      
      const result = await restoreDatabaseFromBackup(backupPath);
      
      expect(result).toBe(true);
      expect(mockFileSystem.getInfoAsync).toHaveBeenCalled();
      expect(mockFileSystem.copyAsync).toHaveBeenCalledTimes(2); // Emergency backup + restore
    });

    it('should throw error if backup does not exist', async () => {
      mockFileSystem.getInfoAsync.mockResolvedValueOnce({ exists: false });
      
      await expect(restoreDatabaseFromBackup('/fake/path.db'))
        .rejects.toThrow('File di backup non trovato');
    });

    it('should create emergency backup before restoring', async () => {
      const backupPath = '/mock/directory/docente_plus_backup_2024-01-01T10-00-00.db';
      
      await restoreDatabaseFromBackup(backupPath);
      
      const copyAsyncCalls = mockFileSystem.copyAsync.mock.calls;
      expect(copyAsyncCalls.length).toBeGreaterThanOrEqual(2);
      expect(copyAsyncCalls[0][0].to).toContain('docente_plus_before_restore_');
    });
  });

  describe('cleanOldBackups', () => {
    it('should keep only specified number of backups', async () => {
      const now = Date.now();
      mockFileSystem.readDirectoryAsync.mockResolvedValue([
        'docente_plus_backup_1.db',
        'docente_plus_backup_2.db',
        'docente_plus_backup_3.db',
        'docente_plus_backup_4.db',
        'docente_plus_backup_5.db',
        'docente_plus_backup_6.db'
      ]);
      
      // Mock different modification times
      let callCount = 0;
      mockFileSystem.getInfoAsync.mockImplementation(() => {
        callCount++;
        return Promise.resolve({
          exists: true,
          size: 1024,
          modificationTime: now - callCount * 1000
        });
      });
      
      const deletedCount = await cleanOldBackups(3);
      
      expect(deletedCount).toBe(3);
      expect(mockFileSystem.deleteAsync).toHaveBeenCalledTimes(3);
    });

    it('should not delete if backups are within limit', async () => {
      mockFileSystem.readDirectoryAsync.mockResolvedValue([
        'docente_plus_backup_1.db',
        'docente_plus_backup_2.db'
      ]);
      
      const deletedCount = await cleanOldBackups(5);
      
      expect(deletedCount).toBe(0);
      expect(mockFileSystem.deleteAsync).not.toHaveBeenCalled();
    });
  });

  describe('exportAllDataToJSON', () => {
    it('should export all tables to JSON', async () => {
      // Initialize database first
      const mockDb = await initDatabase();
      
      // Mock getAllAsync to return sample data
      mockDb.getAllAsync.mockImplementation((query) => {
        if (query.includes('classes')) {
          return Promise.resolve([{ id: 1, name: 'Class A', teacher_id: 1, student_count: 20 }]);
        }
        if (query.includes('students')) {
          return Promise.resolve([{ id: 1, name: 'Student A', class_id: 1, bes_info: null }]);
        }
        if (query.includes('schedule')) {
          return Promise.resolve([{ id: 1, teacher_id: 1, day: 'Monday', time: '09:00', class_id: 1, subject: 'Math' }]);
        }
        if (query.includes('assessments')) {
          return Promise.resolve([{ id: 1, student_id: 1, type: 'test', value: '8', date: '2024-01-01', notes: '' }]);
        }
        if (query.includes('teachers')) {
          return Promise.resolve([{ id: 1, name: 'Teacher A', school: 'School A', subjects: 'Math', schedule: '[]' }]);
        }
        return Promise.resolve([]);
      });
      
      const exportData = await exportAllDataToJSON();
      
      expect(exportData).toHaveProperty('exportDate');
      expect(exportData).toHaveProperty('version', '1.0');
      expect(exportData).toHaveProperty('data');
      expect(exportData.data).toHaveProperty('classes');
      expect(exportData.data).toHaveProperty('students');
      expect(exportData.data).toHaveProperty('schedule');
      expect(exportData.data).toHaveProperty('assessments');
      expect(exportData.data).toHaveProperty('teachers');
    });
  });

  describe('saveJSONExport', () => {
    it('should save and share JSON export', async () => {
      const mockDb = await initDatabase();
      mockDb.getAllAsync.mockResolvedValue([]);
      
      mockFileSystem.writeAsStringAsync.mockResolvedValue(undefined);
      
      const filePath = await saveJSONExport();
      
      expect(filePath).toContain('docente_plus_export_');
      expect(filePath).toContain('.json');
      expect(mockFileSystem.writeAsStringAsync).toHaveBeenCalled();
      expect(mockSharing.shareAsync).toHaveBeenCalledWith(
        filePath,
        expect.objectContaining({
          mimeType: 'application/json'
        })
      );
    });
  });

  describe('importDataFromJSON', () => {
    it('should import data from JSON file', async () => {
      const mockDb = await initDatabase();
      mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
      
      const mockData = {
        exportDate: '2024-01-01T00:00:00.000Z',
        version: '1.0',
        data: {
          teachers: [{ name: 'Teacher A', school: 'School A', subjects: 'Math', schedule: '[]' }],
          classes: [{ name: 'Class A', teacher_id: 1, student_count: 20 }],
          students: [{ name: 'Student A', class_id: 1, bes_info: null }],
          schedule: [{ teacher_id: 1, day: 'Monday', time: '09:00', class_id: 1, subject: 'Math' }],
          assessments: [{ student_id: 1, type: 'test', value: '8', date: '2024-01-01', notes: '' }]
        }
      };
      
      mockFileSystem.readAsStringAsync.mockResolvedValue(JSON.stringify(mockData));
      
      const stats = await importDataFromJSON('/mock/path/export.json');
      
      expect(stats).toEqual({
        teachers: 1,
        classes: 1,
        students: 1,
        schedule: 1,
        assessments: 1,
        materials: 0
      });
    });

    it('should throw error for invalid JSON format', async () => {
      mockFileSystem.readAsStringAsync.mockResolvedValue(JSON.stringify({ invalid: 'data' }));
      
      await expect(importDataFromJSON('/mock/path/export.json'))
        .rejects.toThrow('Formato JSON non valido');
    });
  });

  describe('Integration: Backup and Restore Flow', () => {
    it('should handle complete backup-restore cycle', async () => {
      // Create backup
      const backupPath = await createDatabaseBackup();
      expect(backupPath).toBeDefined();
      
      // List backups
      mockFileSystem.readDirectoryAsync.mockResolvedValue([
        backupPath.split('/').pop()
      ]);
      const backups = await listDatabaseBackups();
      expect(backups.length).toBeGreaterThan(0);
      
      // Restore backup
      const restored = await restoreDatabaseFromBackup(backupPath);
      expect(restored).toBe(true);
    });

    it('should handle complete JSON export-import cycle', async () => {
      const mockDb = await initDatabase();
      mockDb.getAllAsync.mockResolvedValue([]);
      mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
      
      // Export data
      const exportPath = await saveJSONExport();
      expect(exportPath).toBeDefined();
      
      // Mock reading the exported file
      const mockData = {
        exportDate: '2024-01-01T00:00:00.000Z',
        version: '1.0',
        data: {
          teachers: [],
          classes: [],
          students: [],
          schedule: [],
          assessments: []
        }
      };
      mockFileSystem.readAsStringAsync.mockResolvedValue(JSON.stringify(mockData));
      
      // Import data
      const stats = await importDataFromJSON(exportPath);
      expect(stats).toBeDefined();
    });
  });
});
