/**
 * Materials CRUD Operations Tests
 * Tests for materials database operations
 */

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

  describe('Create Material', () => {
    test('should create a new link material', async () => {
      const material = await createMaterial(
        'Tutorial JavaScript',
        'link',
        null,
        'https://example.com/js-tutorial',
        'Tutorial completo su JavaScript'
      );

      expect(material).toBeDefined();
      expect(material.id).toBeDefined();
      expect(material.title).toBe('Tutorial JavaScript');
      expect(material.type).toBe('link');
      expect(material.url).toBe('https://example.com/js-tutorial');
      expect(material.description).toBe('Tutorial completo su JavaScript');
      expect(material.created_at).toBeDefined();
    });

    test('should create a PDF material', async () => {
      const material = await createMaterial(
        'Dispensa Matematica',
        'pdf',
        '/path/to/math.pdf',
        null,
        'Dispensa per il corso di matematica'
      );

      expect(material).toBeDefined();
      expect(material.id).toBeDefined();
      expect(material.title).toBe('Dispensa Matematica');
      expect(material.type).toBe('pdf');
      expect(material.file_path).toBe('/path/to/math.pdf');
    });

    test('should create a material linked to a class', async () => {
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
      const materials = await getAllMaterials();
      
      expect(materials).toBeDefined();
      expect(Array.isArray(materials)).toBe(true);
      expect(materials.length).toBeGreaterThan(0);
    });

    test('should get material by ID', async () => {
      const newMaterial = await createMaterial(
        'Test Material',
        'link',
        null,
        'https://example.com/test',
        'Test description'
      );

      const foundMaterial = await getMaterialById(newMaterial.id);
      
      expect(foundMaterial).toBeDefined();
      expect(foundMaterial.id).toBe(newMaterial.id);
      expect(foundMaterial.title).toBe('Test Material');
    });

    test('should return null for non-existent material', async () => {
      const material = await getMaterialById(99999);
      expect(material).toBeNull();
    });

    test('should get materials by class ID', async () => {
      const testClass = await createClass('5C', null, 18);
      
      await createMaterial(
        'Material 1 for Class',
        'link',
        null,
        'https://example.com/1',
        null,
        testClass.id
      );
      
      await createMaterial(
        'Material 2 for Class',
        'pdf',
        '/path/to/file.pdf',
        null,
        null,
        testClass.id
      );

      const materials = await getMaterialsByClassId(testClass.id);
      
      expect(materials).toBeDefined();
      expect(Array.isArray(materials)).toBe(true);
      expect(materials.length).toBeGreaterThanOrEqual(2);
      materials.forEach(mat => {
        expect(mat.class_id).toBe(testClass.id);
      });
    });

    test('should get materials by student ID', async () => {
      const testClass = await createClass('2D', null, 22);
      const testStudent = await createStudent('Laura Bianchi', testClass.id);
      
      await createMaterial(
        'Material for Student',
        'image',
        '/path/to/image.jpg',
        null,
        'Scheda visuale',
        null,
        testStudent.id
      );

      const materials = await getMaterialsByStudentId(testStudent.id);
      
      expect(materials).toBeDefined();
      expect(Array.isArray(materials)).toBe(true);
      expect(materials.length).toBeGreaterThanOrEqual(1);
      materials.forEach(mat => {
        expect(mat.student_id).toBe(testStudent.id);
      });
    });
  });

  describe('Update Material', () => {
    test('should update material title', async () => {
      const material = await createMaterial(
        'Old Title',
        'link',
        null,
        'https://example.com'
      );

      const updated = await updateMaterial(material.id, 'New Title');
      
      expect(updated).toBeDefined();
      expect(updated.title).toBe('New Title');
      expect(updated.type).toBe('link');
    });

    test('should update material description', async () => {
      const material = await createMaterial(
        'Test Material',
        'pdf',
        '/path/to/file.pdf'
      );

      const updated = await updateMaterial(
        material.id,
        null,
        null,
        null,
        null,
        'Updated description'
      );
      
      expect(updated).toBeDefined();
      expect(updated.description).toBe('Updated description');
    });

    test('should update material type and URL', async () => {
      const material = await createMaterial(
        'Material',
        'pdf',
        '/old/path.pdf'
      );

      const updated = await updateMaterial(
        material.id,
        null,
        'link',
        null,
        'https://new-url.com'
      );
      
      expect(updated).toBeDefined();
      expect(updated.type).toBe('link');
      expect(updated.url).toBe('https://new-url.com');
    });

    test('should throw error when updating with no fields', async () => {
      const material = await createMaterial(
        'Test',
        'link',
        null,
        'https://example.com'
      );

      await expect(
        updateMaterial(material.id)
      ).rejects.toThrow('No fields to update');
    });
  });

  describe('Delete Material', () => {
    test('should delete a material', async () => {
      const material = await createMaterial(
        'Material to Delete',
        'link',
        null,
        'https://example.com/delete'
      );

      const result = await deleteMaterial(material.id);
      expect(result).toBe(true);

      const deleted = await getMaterialById(material.id);
      expect(deleted).toBeNull();
    });

    test('should delete material and its reference', async () => {
      const testClass = await createClass('Test Class for Deletion', null, 10);
      const material = await createMaterial(
        'Class Material',
        'pdf',
        '/path/to/file.pdf',
        null,
        null,
        testClass.id
      );

      const result = await deleteMaterial(material.id);
      expect(result).toBe(true);

      const materials = await getMaterialsByClassId(testClass.id);
      const deletedMaterial = materials.find(m => m.id === material.id);
      expect(deletedMaterial).toBeUndefined();
    });
  });

  describe('Material Types', () => {
    test('should support PDF materials', async () => {
      const material = await createMaterial(
        'PDF Document',
        'pdf',
        '/path/to/document.pdf'
      );

      expect(material.type).toBe('pdf');
      expect(material.file_path).toBe('/path/to/document.pdf');
    });

    test('should support image materials', async () => {
      const material = await createMaterial(
        'Image File',
        'image',
        '/path/to/image.jpg'
      );

      expect(material.type).toBe('image');
      expect(material.file_path).toBe('/path/to/image.jpg');
    });

    test('should support link materials', async () => {
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
