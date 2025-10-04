// Tests for validation utilities
const {
  isValidEmail,
  sanitizeText,
  isValidUrl,
  isValidFileSize,
  isValidMimeType,
  isValidStudentCount,
  sanitizeClassName,
  sanitizeName,
  validateField,
  ALLOWED_MIME_TYPES
} = require('../utils/validation');

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    test('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('name+tag@example.com')).toBe(true);
    });

    test('should reject invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('missing@domain')).toBe(false);
      expect(isValidEmail('@nodomain.com')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(undefined)).toBe(false);
    });

    test('should handle emails with whitespace', () => {
      expect(isValidEmail('  test@example.com  ')).toBe(true);
    });
  });

  describe('sanitizeText', () => {
    test('should remove dangerous HTML characters', () => {
      expect(sanitizeText('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(sanitizeText('Hello <b>World</b>')).toBe('Hello bWorld/b');
    });

    test('should trim whitespace', () => {
      expect(sanitizeText('  Hello World  ')).toBe('Hello World');
    });

    test('should enforce maximum length', () => {
      const longText = 'a'.repeat(1000);
      expect(sanitizeText(longText, 100)).toHaveLength(100);
      expect(sanitizeText(longText, 500)).toHaveLength(500);
    });

    test('should handle null and undefined', () => {
      expect(sanitizeText(null)).toBe('');
      expect(sanitizeText(undefined)).toBe('');
      expect(sanitizeText('')).toBe('');
    });

    test('should handle non-string input', () => {
      expect(sanitizeText(123)).toBe('');
      expect(sanitizeText({})).toBe('');
    });
  });

  describe('isValidUrl', () => {
    test('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://sub.domain.example.com/path?query=value')).toBe(true);
    });

    test('should reject invalid URLs', () => {
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('notaurl')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false); // Only http/https allowed
      expect(isValidUrl('javascript:alert(1)')).toBe(false);
      expect(isValidUrl(null)).toBe(false);
      expect(isValidUrl(undefined)).toBe(false);
    });
  });

  describe('isValidFileSize', () => {
    test('should validate file sizes within limit', () => {
      expect(isValidFileSize(1024, 10)).toBe(true); // 1KB < 10MB
      expect(isValidFileSize(5 * 1024 * 1024, 10)).toBe(true); // 5MB < 10MB
      expect(isValidFileSize(10 * 1024 * 1024, 10)).toBe(true); // Exactly 10MB
    });

    test('should reject files over limit', () => {
      expect(isValidFileSize(11 * 1024 * 1024, 10)).toBe(false); // 11MB > 10MB
      expect(isValidFileSize(100 * 1024 * 1024, 10)).toBe(false); // 100MB > 10MB
    });

    test('should reject zero or negative sizes', () => {
      expect(isValidFileSize(0, 10)).toBe(false);
      expect(isValidFileSize(-1, 10)).toBe(false);
    });

    test('should respect custom size limits', () => {
      expect(isValidFileSize(6 * 1024 * 1024, 5)).toBe(false); // 6MB > 5MB
      expect(isValidFileSize(4 * 1024 * 1024, 5)).toBe(true); // 4MB < 5MB
    });
  });

  describe('isValidMimeType', () => {
    test('should validate allowed MIME types', () => {
      expect(isValidMimeType('application/pdf')).toBe(true);
      expect(isValidMimeType('image/jpeg')).toBe(true);
      expect(isValidMimeType('image/png')).toBe(true);
      expect(isValidMimeType('application/msword')).toBe(true);
    });

    test('should reject disallowed MIME types', () => {
      expect(isValidMimeType('application/x-executable')).toBe(false);
      expect(isValidMimeType('text/javascript')).toBe(false);
      expect(isValidMimeType('application/x-sh')).toBe(false);
    });

    test('should handle case insensitivity', () => {
      expect(isValidMimeType('IMAGE/JPEG')).toBe(true);
      expect(isValidMimeType('Application/PDF')).toBe(true);
    });

    test('should handle invalid input', () => {
      expect(isValidMimeType(null)).toBe(false);
      expect(isValidMimeType(undefined)).toBe(false);
      expect(isValidMimeType('')).toBe(false);
    });
  });

  describe('isValidStudentCount', () => {
    test('should validate reasonable student counts', () => {
      expect(isValidStudentCount(0)).toBe(true);
      expect(isValidStudentCount(25)).toBe(true);
      expect(isValidStudentCount(100)).toBe(true);
      expect(isValidStudentCount(1000)).toBe(true);
    });

    test('should reject invalid counts', () => {
      expect(isValidStudentCount(-1)).toBe(false);
      expect(isValidStudentCount(1001)).toBe(false);
      expect(isValidStudentCount(1.5)).toBe(false);
      expect(isValidStudentCount('25')).toBe(false);
      expect(isValidStudentCount(null)).toBe(false);
    });
  });

  describe('sanitizeClassName', () => {
    test('should sanitize class names with max 100 chars', () => {
      const longName = 'a'.repeat(200);
      expect(sanitizeClassName(longName)).toHaveLength(100);
    });

    test('should remove dangerous characters', () => {
      expect(sanitizeClassName('Classe <1A>')).toBe('Classe 1A');
    });
  });

  describe('sanitizeName', () => {
    test('should sanitize names with max 150 chars', () => {
      const longName = 'a'.repeat(200);
      expect(sanitizeName(longName)).toHaveLength(150);
    });
  });

  describe('validateField', () => {
    test('should validate required fields', () => {
      const result1 = validateField('', { required: true });
      expect(result1.isValid).toBe(false);
      expect(result1.error).toBe('Campo obbligatorio');

      const result2 = validateField('test', { required: true });
      expect(result2.isValid).toBe(true);
      expect(result2.error).toBe(null);
    });

    test('should allow empty non-required fields', () => {
      const result = validateField('', { required: false });
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('');
    });

    test('should validate minimum length', () => {
      const result = validateField('ab', { minLength: 3 });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Lunghezza minima');
    });

    test('should validate email type', () => {
      const result1 = validateField('notanemail', { type: 'email' });
      expect(result1.isValid).toBe(false);
      expect(result1.error).toBe('Email non valida');

      const result2 = validateField('test@example.com', { type: 'email' });
      expect(result2.isValid).toBe(true);
    });

    test('should validate url type', () => {
      const result1 = validateField('notaurl', { type: 'url' });
      expect(result1.isValid).toBe(false);
      expect(result1.error).toBe('URL non valido');

      const result2 = validateField('https://example.com', { type: 'url' });
      expect(result2.isValid).toBe(true);
    });

    test('should validate number type', () => {
      const result1 = validateField('abc', { type: 'number' });
      expect(result1.isValid).toBe(false);
      expect(result1.error).toBe('Valore numerico non valido');

      const result2 = validateField('123', { type: 'number' });
      expect(result2.isValid).toBe(true);
    });

    test('should sanitize and return cleaned value', () => {
      const result = validateField('  <test>  ', {});
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('test');
    });
  });

  describe('ALLOWED_MIME_TYPES constant', () => {
    test('should contain common document types', () => {
      expect(ALLOWED_MIME_TYPES).toContain('application/pdf');
      expect(ALLOWED_MIME_TYPES).toContain('image/jpeg');
      expect(ALLOWED_MIME_TYPES).toContain('image/png');
      expect(ALLOWED_MIME_TYPES).toContain('application/msword');
    });

    test('should be an array', () => {
      expect(Array.isArray(ALLOWED_MIME_TYPES)).toBe(true);
    });

    test('should not be empty', () => {
      expect(ALLOWED_MIME_TYPES.length).toBeGreaterThan(0);
    });
  });
});
