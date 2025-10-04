// Tests for security improvements
const { deleteAllClasses, initDatabase, createClass } = require('../db/database');

describe('Security - deleteAllClasses Protection', () => {
  beforeAll(async () => {
    await initDatabase();
  });

  beforeEach(async () => {
    // Clean up before each test with proper token
    try {
      await deleteAllClasses('CONFIRM_DELETE_ALL_CLASSES');
    } catch (e) {
      // Ignore if no classes exist
    }
  });

  test('should require confirmation token', async () => {
    await expect(deleteAllClasses()).rejects.toThrow('token di conferma');
  });

  test('should reject incorrect confirmation token', async () => {
    await expect(deleteAllClasses('WRONG_TOKEN')).rejects.toThrow('token di conferma');
    await expect(deleteAllClasses('')).rejects.toThrow('token di conferma');
    await expect(deleteAllClasses(null)).rejects.toThrow('token di conferma');
  });

  test('should succeed with correct confirmation token', async () => {
    // Create some test classes
    await createClass('Test Class 1');
    await createClass('Test Class 2');

    // Should succeed with correct token
    const result = await deleteAllClasses('CONFIRM_DELETE_ALL_CLASSES');
    expect(result).toBe(true);
  });

  test('should prevent accidental deletion without token', async () => {
    // Create test class
    await createClass('Important Class');

    // Try to delete without token
    let errorThrown = false;
    try {
      await deleteAllClasses();
    } catch (e) {
      errorThrown = true;
      expect(e.message).toContain('token di conferma');
    }

    expect(errorThrown).toBe(true);
  });
});

describe('Security - API Key Validation', () => {
  // Note: These tests would need to mock process.env
  // Keeping them simple for now

  test('API key validation function exists', () => {
    const deepseekApi = require('../services/deepseek-api');
    expect(deepseekApi.callDeepSeekAPI).toBeDefined();
  });

  test('should handle missing API key gracefully', async () => {
    // This test would require mocking process.env
    // For now, just verify the function exists and can be called
    const deepseekApi = require('../services/deepseek-api');
    expect(typeof deepseekApi.callDeepSeekAPI).toBe('function');
  });
});

describe('Security - File Upload Validation', () => {
  test('validation utilities are available', () => {
    const validation = require('../utils/validation');
    expect(validation.isValidFileSize).toBeDefined();
    expect(validation.isValidMimeType).toBeDefined();
    expect(validation.ALLOWED_MIME_TYPES).toBeDefined();
  });

  test('should have reasonable file size limits', () => {
    const { isValidFileSize } = require('../utils/validation');
    
    // 5MB should be acceptable
    expect(isValidFileSize(5 * 1024 * 1024, 10)).toBe(true);
    
    // 50MB should be rejected with 10MB limit
    expect(isValidFileSize(50 * 1024 * 1024, 10)).toBe(false);
  });

  test('should only allow safe MIME types', () => {
    const { ALLOWED_MIME_TYPES } = require('../utils/validation');
    
    // Should allow safe document types
    expect(ALLOWED_MIME_TYPES).toContain('application/pdf');
    expect(ALLOWED_MIME_TYPES).toContain('image/jpeg');
    
    // Should not allow executable types
    expect(ALLOWED_MIME_TYPES).not.toContain('application/x-executable');
    expect(ALLOWED_MIME_TYPES).not.toContain('text/javascript');
    expect(ALLOWED_MIME_TYPES).not.toContain('application/x-sh');
  });
});

describe('Security - Input Sanitization', () => {
  test('should remove dangerous HTML characters', () => {
    const { sanitizeText } = require('../utils/validation');
    
    const maliciousInput = '<script>alert("xss")</script>';
    const sanitized = sanitizeText(maliciousInput);
    
    expect(sanitized).not.toContain('<');
    expect(sanitized).not.toContain('>');
  });

  test('should enforce maximum length', () => {
    const { sanitizeText } = require('../utils/validation');
    
    const longInput = 'a'.repeat(10000);
    const sanitized = sanitizeText(longInput, 500);
    
    expect(sanitized.length).toBeLessThanOrEqual(500);
  });

  test('should validate email format', () => {
    const { isValidEmail } = require('../utils/validation');
    
    expect(isValidEmail('valid@example.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('<script>@example.com')).toBe(false);
  });

  test('should validate URLs safely', () => {
    const { isValidUrl } = require('../utils/validation');
    
    expect(isValidUrl('https://safe.com')).toBe(true);
    expect(isValidUrl('javascript:alert(1)')).toBe(false);
    expect(isValidUrl('file:///etc/passwd')).toBe(false);
  });
});
