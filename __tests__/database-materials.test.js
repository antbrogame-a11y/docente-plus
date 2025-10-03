/**
 * Materials CRUD Operations Tests
 * Tests for materials database operations
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
  readAsStringAsync: jest.fn(),
  makeDirectoryAsync: jest.fn()
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(),
  shareAsync: jest.fn()
}));

const {
  initDatabase,
  createMaterial,
  getAllMaterials,
  getMaterialById,
  getMaterialsByClassId,
  getMaterialsByStudentId,
  updateMaterial,
  deleteMaterial,
  createClass,
  createStudent
} = require('../db/database');

describe('Materials CRUD Operations', () => {
  beforeAll(async () => {
    await initDatabase();
  });

  beforeEach(() => {
    // Reset mocks before each test
    mockDb.runAsync.mockClear();
    mockDb.getAllAsync.mockClear();
    mockDb.getFirstAsync.mockClear();
  });

  describe('Create Material', () => {
    test('should create a new link material', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 1 });

      const material = await createMaterial(
        'Tutorial JavaScript',
        'link',
        null,
        'https://example.com/js-tutorial',
        'Tutorial completo su JavaScript'
      );

      expect(material).toBeDefined();
      expect(material.id).toBe(1);
      expect(material.title).toBe('Tutorial JavaScript');
      expect(material.type).toBe('link');
      expect(material.url).toBe('https://example.com/js-tutorial');
      expect(material.description).toBe('Tutorial completo su JavaScript');
      expect(material.created_at).toBeDefined();
    });

    test('should create a PDF material', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 2 });

      const material = await createMaterial(
        'Dispensa Matematica',
        'pdf',
        '/path/to/math.pdf',
        null,
        'Dispensa per il corso di matematica'
      );

      expect(material).toBeDefined();
      expect(material.id).toBe(2);
      expect(material.title).toBe('Dispensa Matematica');
      expect(material.type).toBe('pdf');
      expect(material.file_path).toBe('/path/to/math.pdf');
    });

    test('should create a material linked to a class', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 10 }); // class
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 3 }); // material
      
      const testClass = await createClass('3B', null, 20);
      
      const material = await createMaterial(
        'Esercizi Classe 3B',
        'pdf',
        '/path/to/exercises.pdf',
        null,
        'Esercizi per la classe',
        testClass.id,
        null
      );

      expect(material).toBeDefined();
      expect(material.class_id).toBe(testClass.id);
    });

    test('should create a material linked to a student', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 11 }); // class
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 20 }); // student
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 4 }); // material
      
      const testClass = await createClass('4A', null, 15);
      const testStudent = await createStudent('Mario Rossi', testClass.id, 'DSA: Dislessia');
      
      const material = await createMaterial(
        'Materiale PDP',
        'pdf',
        '/path/to/pdp.pdf',
        null,
        'Piano Didattico Personalizzato',
        null,
        testStudent.id
      );

      expect(material).toBeDefined();
      expect(material.student_id).toBe(testStudent.id);
    });
  });

  describe('Read Material', () => {
    test('should get all materials', async () => {
      const mockMaterials = [
        { id: 1, title: 'Material 1', type: 'link', url: 'https://example.com/1' },
        { id: 2, title: 'Material 2', type: 'pdf', file_path: '/path/to/file.pdf' }
      ];
      mockDb.getAllAsync.mockResolvedValueOnce(mockMaterials);

      const materials = await getAllMaterials();
      
      expect(materials).toBeDefined();
      expect(Array.isArray(materials)).toBe(true);
      expect(materials.length).toBe(2);
    });

    test('should get material by ID', async () => {
      const mockMaterial = {
        id: 5,
        title: 'Test Material',
        type: 'link',
        url: 'https://example.com/test',
        description: 'Test description'
      };
      mockDb.getFirstAsync.mockResolvedValueOnce(mockMaterial);

      const foundMaterial = await getMaterialById(5);
      
      expect(foundMaterial).toBeDefined();
      expect(foundMaterial.id).toBe(5);
      expect(foundMaterial.title).toBe('Test Material');
    });

    test('should return null for non-existent material', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce(undefined);

      const material = await getMaterialById(99999);
      expect(material).toBeNull();
    });

    test('should get materials by class ID', async () => {
      const mockMaterials = [
        { id: 1, title: 'Material 1', class_id: 10 },
        { id: 2, title: 'Material 2', class_id: 10 }
      ];
      mockDb.getAllAsync.mockResolvedValueOnce(mockMaterials);

      const materials = await getMaterialsByClassId(10);
      
      expect(materials).toBeDefined();
      expect(Array.isArray(materials)).toBe(true);
      expect(materials.length).toBe(2);
      materials.forEach(mat => {
        expect(mat.class_id).toBe(10);
      });
    });

    test('should get materials by student ID', async () => {
      const mockMaterials = [
        { id: 3, title: 'Material for Student', student_id: 20 }
      ];
      mockDb.getAllAsync.mockResolvedValueOnce(mockMaterials);

      const materials = await getMaterialsByStudentId(20);
      
      expect(materials).toBeDefined();
      expect(Array.isArray(materials)).toBe(true);
      expect(materials.length).toBe(1);
      materials.forEach(mat => {
        expect(mat.student_id).toBe(20);
      });
    });
  });

  describe('Update Material', () => {
    test('should update material title', async () => {
      const mockMaterial = {
        id: 7,
        title: 'New Title',
        type: 'link',
        url: 'https://example.com'
      };
      mockDb.runAsync.mockResolvedValueOnce({});
      mockDb.getFirstAsync.mockResolvedValueOnce(mockMaterial);

      const updated = await updateMaterial(7, 'New Title');
      
      expect(updated).toBeDefined();
      expect(updated.title).toBe('New Title');
    });

    test('should update material description', async () => {
      const mockMaterial = {
        id: 8,
        title: 'Test Material',
        type: 'pdf',
        file_path: '/path/to/file.pdf',
        description: 'Updated description'
      };
      mockDb.runAsync.mockResolvedValueOnce({});
      mockDb.getFirstAsync.mockResolvedValueOnce(mockMaterial);

      const updated = await updateMaterial(
        8,
        null,
        null,
        null,
        null,
        'Updated description'
      );
      
      expect(updated).toBeDefined();
      expect(updated.description).toBe('Updated description');
    });

    test('should throw error when updating with no fields', async () => {
      await expect(
        updateMaterial(1)
      ).rejects.toThrow('No fields to update');
    });
  });

  describe('Delete Material', () => {
    test('should delete a material', async () => {
      const FileSystem = require('expo-file-system');
      FileSystem.getInfoAsync.mockResolvedValueOnce({ exists: false });
      
      mockDb.getFirstAsync.mockResolvedValueOnce({ id: 9, title: 'Material to Delete' });
      mockDb.runAsync.mockResolvedValueOnce({});

      const result = await deleteMaterial(9);
      expect(result).toBe(true);
    });
  });

  describe('Material Types', () => {
    test('should support PDF materials', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 100 });

      const material = await createMaterial(
        'PDF Document',
        'pdf',
        '/path/to/document.pdf'
      );

      expect(material.type).toBe('pdf');
      expect(material.file_path).toBe('/path/to/document.pdf');
    });

    test('should support image materials', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 101 });

      const material = await createMaterial(
        'Image File',
        'image',
        '/path/to/image.jpg'
      );

      expect(material.type).toBe('image');
      expect(material.file_path).toBe('/path/to/image.jpg');
    });

    test('should support link materials', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 102 });

      const material = await createMaterial(
        'External Link',
        'link',
        null,
        'https://example.com/resource'
      );

      expect(material.type).toBe('link');
      expect(material.url).toBe('https://example.com/resource');
    });

    test('should support document materials', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 103 });

      const material = await createMaterial(
        'Document File',
        'document',
        '/path/to/document.docx'
      );

      expect(material.type).toBe('document');
      expect(material.file_path).toBe('/path/to/document.docx');
    });
  });
});
