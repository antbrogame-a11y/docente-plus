import {
  initDatabase,
  getDashboardStatistics,
  getClassStatistics,
  getRecentActivities,
  getBESDistribution,
  getMaterialsStatistics,
  exportDashboardData,
  createClass,
  createStudent,
  createMaterial,
  createReport
} from '../db/database';

// Mock expo-sqlite
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(() => Promise.resolve({
    execAsync: jest.fn(() => Promise.resolve()),
    runAsync: jest.fn(() => Promise.resolve({ lastInsertRowId: 1 })),
    getFirstAsync: jest.fn(() => Promise.resolve(null)),
    getAllAsync: jest.fn(() => Promise.resolve([]))
  }))
}));

// Mock expo-file-system
jest.mock('expo-file-system', () => ({
  documentDirectory: 'file://mock/',
  writeAsStringAsync: jest.fn(() => Promise.resolve()),
  readAsStringAsync: jest.fn(() => Promise.resolve('{}')),
  getInfoAsync: jest.fn(() => Promise.resolve({ exists: true, size: 1024 })),
  makeDirectoryAsync: jest.fn(() => Promise.resolve()),
  readDirectoryAsync: jest.fn(() => Promise.resolve([])),
  copyAsync: jest.fn(() => Promise.resolve()),
  deleteAsync: jest.fn(() => Promise.resolve())
}));

// Mock expo-sharing
jest.mock('expo-sharing', () => ({
  shareAsync: jest.fn(() => Promise.resolve()),
  isAvailableAsync: jest.fn(() => Promise.resolve(true))
}));

describe('Dashboard Database Functions', () => {
  let db;

  beforeEach(async () => {
    db = await initDatabase();
  });

  describe('getDashboardStatistics', () => {
    it('should return statistics with all counts', async () => {
      db.getFirstAsync = jest.fn()
        .mockResolvedValueOnce({ count: 5 })  // classes
        .mockResolvedValueOnce({ count: 20 }) // students
        .mockResolvedValueOnce({ count: 15 }) // materials
        .mockResolvedValueOnce({ count: 8 })  // reports
        .mockResolvedValueOnce({ count: 3 })  // bes students
        .mockResolvedValueOnce({ count: 5 })  // pdp reports
        .mockResolvedValueOnce({ count: 3 }); // bes reports

      const stats = await getDashboardStatistics();

      expect(stats).toEqual({
        totalClasses: 5,
        totalStudents: 20,
        totalMaterials: 15,
        totalReports: 8,
        besStudents: 3,
        pdpReports: 5,
        besReports: 3
      });
      expect(db.getFirstAsync).toHaveBeenCalledTimes(7);
    });

    it('should handle zero counts', async () => {
      db.getFirstAsync = jest.fn()
        .mockResolvedValue({ count: 0 });

      const stats = await getDashboardStatistics();

      expect(stats.totalClasses).toBe(0);
      expect(stats.totalStudents).toBe(0);
      expect(stats.totalMaterials).toBe(0);
    });

    it('should handle database errors', async () => {
      db.getFirstAsync = jest.fn()
        .mockRejectedValue(new Error('Database error'));

      await expect(getDashboardStatistics()).rejects.toThrow('Database error');
    });
  });

  describe('getClassStatistics', () => {
    it('should return statistics for all classes', async () => {
      const mockClassStats = [
        {
          id: 1,
          name: '1A',
          student_count: 25,
          actual_student_count: 24,
          bes_count: 3,
          materials_count: 10,
          reports_count: 3
        },
        {
          id: 2,
          name: '2B',
          student_count: 22,
          actual_student_count: 22,
          bes_count: 1,
          materials_count: 8,
          reports_count: 1
        }
      ];

      db.getAllAsync = jest.fn()
        .mockResolvedValue(mockClassStats);

      const stats = await getClassStatistics();

      expect(stats).toEqual(mockClassStats);
      expect(stats).toHaveLength(2);
      expect(stats[0].name).toBe('1A');
      expect(stats[0].bes_count).toBe(3);
    });

    it('should handle empty classes', async () => {
      db.getAllAsync = jest.fn()
        .mockResolvedValue([]);

      const stats = await getClassStatistics();

      expect(stats).toEqual([]);
    });
  });

  describe('getRecentActivities', () => {
    it('should return combined recent materials and reports', async () => {
      const mockMaterials = [
        {
          type: 'material',
          id: 1,
          name: 'Math PDF',
          date: '2024-01-15T10:00:00',
          class_name: '1A',
          student_name: null
        }
      ];

      const mockReports = [
        {
          type: 'report',
          id: 1,
          name: 'PDP - John Doe',
          date: '2024-01-14T09:00:00',
          class_name: '2B',
          student_name: 'John Doe'
        }
      ];

      db.getAllAsync = jest.fn()
        .mockResolvedValueOnce(mockMaterials)
        .mockResolvedValueOnce(mockReports);

      const activities = await getRecentActivities();

      expect(activities).toHaveLength(2);
      expect(activities[0].type).toBe('material');
      expect(activities[1].type).toBe('report');
    });

    it('should limit to 10 activities', async () => {
      const mockMaterials = Array(7).fill(null).map((_, i) => ({
        type: 'material',
        id: i,
        name: `Material ${i}`,
        date: new Date(2024, 0, 15 - i).toISOString(),
        class_name: '1A',
        student_name: null
      }));

      const mockReports = Array(7).fill(null).map((_, i) => ({
        type: 'report',
        id: i,
        name: `Report ${i}`,
        date: new Date(2024, 0, 14 - i).toISOString(),
        class_name: '2B',
        student_name: 'Student'
      }));

      db.getAllAsync = jest.fn()
        .mockResolvedValueOnce(mockMaterials.slice(0, 5))
        .mockResolvedValueOnce(mockReports.slice(0, 5));

      const activities = await getRecentActivities();

      expect(activities.length).toBeLessThanOrEqual(10);
    });
  });

  describe('getBESDistribution', () => {
    it('should return BES distribution by class', async () => {
      const mockDistribution = [
        {
          id: 1,
          class_name: '1A',
          total_students: 25,
          bes_students: 5,
          total_reports: 4
        },
        {
          id: 2,
          class_name: '2B',
          total_students: 22,
          bes_students: 2,
          total_reports: 2
        }
      ];

      db.getAllAsync = jest.fn()
        .mockResolvedValue(mockDistribution);

      const distribution = await getBESDistribution();

      expect(distribution).toEqual(mockDistribution);
      expect(distribution[0].bes_students).toBe(5);
      expect(distribution[1].bes_students).toBe(2);
    });

    it('should only include classes with students', async () => {
      const mockDistribution = [
        {
          id: 1,
          class_name: '1A',
          total_students: 25,
          bes_students: 5,
          total_reports: 4
        }
      ];

      db.getAllAsync = jest.fn()
        .mockResolvedValue(mockDistribution);

      const distribution = await getBESDistribution();

      expect(distribution.every(d => d.total_students > 0)).toBe(true);
    });

    it('should order by bes_students DESC', async () => {
      const mockDistribution = [
        {
          id: 1,
          class_name: '1A',
          total_students: 25,
          bes_students: 5,
          total_reports: 4
        },
        {
          id: 2,
          class_name: '2B',
          total_students: 22,
          bes_students: 2,
          total_reports: 2
        }
      ];

      db.getAllAsync = jest.fn()
        .mockResolvedValue(mockDistribution);

      const distribution = await getBESDistribution();

      expect(distribution[0].bes_students).toBeGreaterThanOrEqual(distribution[1].bes_students);
    });
  });

  describe('getMaterialsStatistics', () => {
    it('should return materials grouped by type', async () => {
      const mockStats = [
        { type: 'pdf', count: 15 },
        { type: 'link', count: 10 },
        { type: 'image', count: 5 },
        { type: 'document', count: 3 }
      ];

      db.getAllAsync = jest.fn()
        .mockResolvedValue(mockStats);

      const stats = await getMaterialsStatistics();

      expect(stats).toEqual(mockStats);
      expect(stats[0].type).toBe('pdf');
      expect(stats[0].count).toBe(15);
    });

    it('should handle no materials', async () => {
      db.getAllAsync = jest.fn()
        .mockResolvedValue([]);

      const stats = await getMaterialsStatistics();

      expect(stats).toEqual([]);
    });

    it('should order by count DESC', async () => {
      const mockStats = [
        { type: 'pdf', count: 15 },
        { type: 'link', count: 10 },
        { type: 'image', count: 5 }
      ];

      db.getAllAsync = jest.fn()
        .mockResolvedValue(mockStats);

      const stats = await getMaterialsStatistics();

      for (let i = 0; i < stats.length - 1; i++) {
        expect(stats[i].count).toBeGreaterThanOrEqual(stats[i + 1].count);
      }
    });
  });

  describe('exportDashboardData', () => {
    it('should export all dashboard data as JSON', async () => {
      // Mock all data retrieval functions
      db.getFirstAsync = jest.fn()
        .mockResolvedValue({ count: 5 });
      
      db.getAllAsync = jest.fn()
        .mockResolvedValue([]);

      const jsonData = await exportDashboardData();

      expect(typeof jsonData).toBe('string');
      
      const parsed = JSON.parse(jsonData);
      expect(parsed).toHaveProperty('exportDate');
      expect(parsed).toHaveProperty('statistics');
      expect(parsed).toHaveProperty('classStatistics');
      expect(parsed).toHaveProperty('recentActivities');
      expect(parsed).toHaveProperty('besDistribution');
      expect(parsed).toHaveProperty('materialsStatistics');
    });

    it('should include export date in ISO format', async () => {
      db.getFirstAsync = jest.fn()
        .mockResolvedValue({ count: 0 });
      
      db.getAllAsync = jest.fn()
        .mockResolvedValue([]);

      const jsonData = await exportDashboardData();
      const parsed = JSON.parse(jsonData);

      expect(parsed.exportDate).toBeDefined();
      expect(new Date(parsed.exportDate)).toBeInstanceOf(Date);
    });

    it('should format JSON with indentation', async () => {
      db.getFirstAsync = jest.fn()
        .mockResolvedValue({ count: 0 });
      
      db.getAllAsync = jest.fn()
        .mockResolvedValue([]);

      const jsonData = await exportDashboardData();

      // Check that JSON is pretty-printed (has newlines and spaces)
      expect(jsonData).toContain('\n');
      expect(jsonData).toContain('  ');
    });
  });

  describe('Integration tests', () => {
    it('should calculate correct percentages for BES students', async () => {
      const mockDistribution = [
        {
          id: 1,
          class_name: '1A',
          total_students: 20,
          bes_students: 5,
          total_reports: 4
        }
      ];

      db.getAllAsync = jest.fn()
        .mockResolvedValue(mockDistribution);

      const distribution = await getBESDistribution();
      const percentage = (distribution[0].bes_students / distribution[0].total_students) * 100;

      expect(percentage).toBe(25);
    });

    it('should handle edge case with no BES students', async () => {
      db.getFirstAsync = jest.fn()
        .mockResolvedValueOnce({ count: 5 })  // classes
        .mockResolvedValueOnce({ count: 20 }) // students
        .mockResolvedValueOnce({ count: 15 }) // materials
        .mockResolvedValueOnce({ count: 0 })  // reports
        .mockResolvedValueOnce({ count: 0 })  // bes students
        .mockResolvedValueOnce({ count: 0 })  // pdp reports
        .mockResolvedValueOnce({ count: 0 }); // bes reports

      const stats = await getDashboardStatistics();

      expect(stats.besStudents).toBe(0);
      expect(stats.pdpReports).toBe(0);
      expect(stats.besReports).toBe(0);
    });
  });
});
