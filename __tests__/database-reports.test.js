/**
 * Tests for PDP/BES Reports Database Operations
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

// Mock FileSystem and Sharing
jest.mock('expo-file-system', () => ({
  documentDirectory: '/mock/directory/',
  EncodingType: { UTF8: 'utf8' },
  getInfoAsync: jest.fn(),
  copyAsync: jest.fn(),
  readDirectoryAsync: jest.fn(),
  deleteAsync: jest.fn(),
  makeDirectoryAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn()
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
  shareAsync: jest.fn()
}));

import {
  initDatabase,
  createPdpBesReport,
  getAllPdpBesReports,
  getPdpBesReportsByStudentId,
  getPdpBesReportById,
  updatePdpBesReport,
  deletePdpBesReport,
  createStudent,
  createClass
} from '../db/database';

describe('PDP/BES Reports Database Operations', () => {
  const testStudentId = 1;
  const testClassId = 1;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockDb.execAsync.mockResolvedValue(undefined);
    mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
    mockDb.getAllAsync.mockResolvedValue([]);
    mockDb.getFirstAsync.mockResolvedValue(null);
    
    // Initialize database
    await initDatabase();
  });

  describe('Create PDP/BES Report', () => {
    it('should create a new PDP report', async () => {
      const reportData = {
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025',
        diagnosis: 'DSA - Dislessia certificata con diagnosi n. 123/2024',
        strengths: 'Buone capacità logiche e di ragionamento',
        difficulties: 'Difficoltà nella lettura e scrittura',
        teaching_strategies: 'Utilizzo di mappe concettuali, audiolibri, tempo aggiuntivo',
        evaluation_tools: 'Prove orali, interrogazioni programmate',
        objectives: 'Migliorare la velocità di lettura, ridurre errori ortografici',
        notes: 'Studente molto motivato'
      };

      const report = await createPdpBesReport(reportData);

      expect(report).toBeDefined();
      expect(report.id).toBeDefined();
      expect(report.student_id).toBe(testStudentId);
      expect(report.report_type).toBe('PDP');
      expect(report.school_year).toBe('2024/2025');
      expect(report.created_at).toBeDefined();
      expect(report.updated_at).toBeDefined();
    });

    it('should create a new BES report', async () => {
      const reportData = {
        student_id: testStudentId,
        report_type: 'BES',
        school_year: '2024/2025',
        diagnosis: 'Disturbo dell\'attenzione',
        strengths: 'Creatività e pensiero laterale',
        difficulties: 'Mantenere la concentrazione per periodi prolungati',
        teaching_strategies: 'Pause frequenti, attività pratiche, rinforzi positivi',
        evaluation_tools: 'Verifiche a step, feedback frequente',
        objectives: 'Aumentare i tempi di attenzione, completare compiti assegnati',
        notes: null
      };

      const report = await createPdpBesReport(reportData);

      expect(report).toBeDefined();
      expect(report.id).toBeDefined();
      expect(report.report_type).toBe('BES');
    });

    it('should create report with minimal required fields', async () => {
      const reportData = {
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025'
      };

      const report = await createPdpBesReport(reportData);

      expect(report).toBeDefined();
      expect(report.id).toBeDefined();
      expect(report.student_id).toBe(testStudentId);
    });
  });

  describe('Get PDP/BES Reports', () => {
    it('should get all reports', async () => {
      // Mock the database to return some reports
      const mockReports = [
        {
          id: 1,
          student_id: testStudentId,
          report_type: 'PDP',
          school_year: '2024/2025',
          diagnosis: 'Test diagnosis 1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          student_id: testStudentId,
          report_type: 'BES',
          school_year: '2024/2025',
          diagnosis: 'Test diagnosis 2',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      mockDb.getAllAsync.mockResolvedValueOnce(mockReports);

      const reports = await getAllPdpBesReports();

      expect(reports).toBeDefined();
      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBeGreaterThan(0);
    });

    it('should get reports by student ID', async () => {
      // Mock the database to return reports for the student
      const mockReports = [
        {
          id: 1,
          student_id: testStudentId,
          report_type: 'PDP',
          school_year: '2024/2025',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      mockDb.getAllAsync.mockResolvedValueOnce(mockReports);

      const reports = await getPdpBesReportsByStudentId(testStudentId);

      expect(reports).toBeDefined();
      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBeGreaterThan(0);
      reports.forEach(report => {
        expect(report.student_id).toBe(testStudentId);
      });
    });

    it('should get report by ID', async () => {
      // Mock database responses
      const mockReport = {
        id: 1,
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025',
        diagnosis: 'Test diagnosis',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 1 });

      // First create a report
      const reportData = {
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025',
        diagnosis: 'Test diagnosis'
      };
      const createdReport = await createPdpBesReport(reportData);

      // Then retrieve it
      mockDb.getFirstAsync.mockResolvedValueOnce(mockReport);
      const report = await getPdpBesReportById(createdReport.id);

      expect(report).toBeDefined();
      expect(report.id).toBe(createdReport.id);
      expect(report.student_id).toBe(testStudentId);
      expect(report.diagnosis).toBe('Test diagnosis');
    });

    it('should return null for non-existent report ID', async () => {
      const report = await getPdpBesReportById(99999);
      expect(report).toBeNull();
    });
  });

  describe('Update PDP/BES Report', () => {
    it('should update report fields', async () => {
      // Mock the creation and update
      const createdReport = {
        id: 1,
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025',
        diagnosis: 'Original diagnosis',
        created_at: '2024-01-01T10:00:00.000Z',
        updated_at: '2024-01-01T10:00:00.000Z'
      };
      const updatedReport = {
        ...createdReport,
        diagnosis: 'Updated diagnosis',
        strengths: 'New strengths identified',
        updated_at: '2024-01-01T11:00:00.000Z'
      };

      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 1 });

      // Create a report
      const reportData = {
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025',
        diagnosis: 'Original diagnosis'
      };
      const created = await createPdpBesReport(reportData);

      // Mock the update operation
      mockDb.runAsync.mockResolvedValueOnce({});
      mockDb.getFirstAsync.mockResolvedValueOnce(updatedReport);

      // Update it
      const updated = await updatePdpBesReport(created.id, {
        diagnosis: 'Updated diagnosis',
        strengths: 'New strengths identified'
      });

      expect(updated).toBeDefined();
      expect(updated.diagnosis).toBe('Updated diagnosis');
      expect(updated.strengths).toBe('New strengths identified');
      expect(updated.updated_at).not.toBe(created.updated_at);
    });

    it('should update single field', async () => {
      const createdReport = {
        id: 1,
        student_id: testStudentId,
        report_type: 'BES',
        school_year: '2024/2025',
        created_at: '2024-01-01T10:00:00.000Z',
        updated_at: '2024-01-01T10:00:00.000Z'
      };
      const updatedReport = {
        ...createdReport,
        notes: 'Added some notes',
        updated_at: '2024-01-01T11:00:00.000Z'
      };

      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 1 });

      const reportData = {
        student_id: testStudentId,
        report_type: 'BES',
        school_year: '2024/2025'
      };
      const created = await createPdpBesReport(reportData);

      mockDb.runAsync.mockResolvedValueOnce({});
      mockDb.getFirstAsync.mockResolvedValueOnce(updatedReport);

      const updated = await updatePdpBesReport(created.id, {
        notes: 'Added some notes'
      });

      expect(updated).toBeDefined();
      expect(updated.notes).toBe('Added some notes');
    });

    it('should throw error when no fields to update', async () => {
      const reportData = {
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025'
      };
      const createdReport = await createPdpBesReport(reportData);

      await expect(
        updatePdpBesReport(createdReport.id, {})
      ).rejects.toThrow('No fields to update');
    });
  });

  describe('Delete PDP/BES Report', () => {
    it('should delete a report', async () => {
      const reportToDelete = {
        id: 1,
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025',
        pdf_path: null
      };

      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 1 });

      // Create a report
      const reportData = {
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025'
      };
      const createdReport = await createPdpBesReport(reportData);

      // Mock for deletePdpBesReport - it calls getPdpBesReportById first
      mockDb.getFirstAsync.mockResolvedValueOnce(reportToDelete);
      mockDb.runAsync.mockResolvedValueOnce({});

      // Delete it
      const result = await deletePdpBesReport(createdReport.id);
      expect(result).toBe(true);

      // Verify it's deleted - mock null response
      mockDb.getFirstAsync.mockResolvedValueOnce(null);
      const deletedReport = await getPdpBesReportById(createdReport.id);
      expect(deletedReport).toBeNull();
    });

    it('should handle deletion of report with PDF path', async () => {
      const reportData = {
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025',
        pdf_path: '/fake/path/to/pdf.pdf'
      };
      const createdReport = await createPdpBesReport(reportData);

      // Should not throw even if file doesn't exist
      const result = await deletePdpBesReport(createdReport.id);
      expect(result).toBe(true);
    });
  });

  describe('Report Data Validation', () => {
    it('should handle reports with all fields populated', async () => {
      const reportData = {
        student_id: testStudentId,
        report_type: 'PDP',
        school_year: '2024/2025',
        diagnosis: 'Full diagnosis',
        strengths: 'All strengths',
        difficulties: 'All difficulties',
        teaching_strategies: 'All strategies',
        evaluation_tools: 'All tools',
        objectives: 'All objectives',
        notes: 'All notes',
        pdf_path: '/path/to/report.pdf'
      };

      const report = await createPdpBesReport(reportData);

      expect(report).toBeDefined();
      expect(report.diagnosis).toBe('Full diagnosis');
      expect(report.strengths).toBe('All strengths');
      expect(report.difficulties).toBe('All difficulties');
      expect(report.teaching_strategies).toBe('All strategies');
      expect(report.evaluation_tools).toBe('All tools');
      expect(report.objectives).toBe('All objectives');
      expect(report.notes).toBe('All notes');
      expect(report.pdf_path).toBe('/path/to/report.pdf');
    });

    it('should handle null optional fields', async () => {
      const reportData = {
        student_id: testStudentId,
        report_type: 'BES',
        school_year: '2024/2025',
        diagnosis: null,
        strengths: null,
        difficulties: null,
        teaching_strategies: null,
        evaluation_tools: null,
        objectives: null,
        notes: null
      };

      const report = await createPdpBesReport(reportData);

      expect(report).toBeDefined();
      expect(report.student_id).toBe(testStudentId);
    });
  });

  describe('Report Ordering', () => {
    it('should return reports ordered by creation date descending', async () => {
      const now = new Date();
      const earlier = new Date(now.getTime() - 1000000);
      
      const mockReports = [
        {
          id: 2,
          student_id: testStudentId,
          report_type: 'PDP',
          school_year: '2024/2025',
          created_at: now.toISOString()
        },
        {
          id: 1,
          student_id: testStudentId,
          report_type: 'PDP',
          school_year: '2023/2024',
          created_at: earlier.toISOString()
        }
      ];

      mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 1 });
      mockDb.getAllAsync.mockResolvedValueOnce(mockReports);

      const reports = await getAllPdpBesReports();

      expect(reports.length).toBeGreaterThan(1);
      // More recent reports should come first
      for (let i = 0; i < reports.length - 1; i++) {
        const currentDate = new Date(reports[i].created_at);
        const nextDate = new Date(reports[i + 1].created_at);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });
  });
});
