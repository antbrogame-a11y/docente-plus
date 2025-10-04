// Input validation and sanitization utilities
// Provides security and data integrity checks

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Sanitizes text input by removing dangerous characters
 * @param {string} text - Text to sanitize
 * @param {number} maxLength - Maximum allowed length (default 500)
 * @returns {string} Sanitized text
 */
export const sanitizeText = (text, maxLength = 500) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  return text
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove potentially dangerous HTML characters
};

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validates file size
 * @param {number} sizeInBytes - File size in bytes
 * @param {number} maxSizeMB - Maximum size in MB (default 10)
 * @returns {boolean} True if file size is acceptable
 */
export const isValidFileSize = (sizeInBytes, maxSizeMB = 10) => {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return sizeInBytes > 0 && sizeInBytes <= maxBytes;
};

/**
 * Allowed MIME types for file uploads
 */
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

/**
 * Validates MIME type for file uploads
 * @param {string} mimeType - MIME type to validate
 * @returns {boolean} True if MIME type is allowed
 */
export const isValidMimeType = (mimeType) => {
  if (!mimeType || typeof mimeType !== 'string') {
    return false;
  }
  return ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase());
};

/**
 * Validates student count (must be positive integer)
 * @param {number} count - Student count to validate
 * @returns {boolean} True if count is valid
 */
export const isValidStudentCount = (count) => {
  return Number.isInteger(count) && count >= 0 && count <= 1000;
};

/**
 * Sanitizes class name
 * @param {string} name - Class name to sanitize
 * @returns {string} Sanitized class name
 */
export const sanitizeClassName = (name) => {
  return sanitizeText(name, 100);
};

/**
 * Sanitizes teacher/student name
 * @param {string} name - Name to sanitize
 * @returns {string} Sanitized name
 */
export const sanitizeName = (name) => {
  return sanitizeText(name, 150);
};

/**
 * Validates and sanitizes a generic form field
 * @param {string} value - Value to validate
 * @param {Object} options - Validation options
 * @returns {Object} {isValid: boolean, sanitized: string, error: string|null}
 */
export const validateField = (value, options = {}) => {
  const {
    required = false,
    minLength = 0,
    maxLength = 500,
    type = 'text', // 'text', 'email', 'url', 'number'
  } = options;

  // Check if required
  if (required && (!value || !value.trim())) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Campo obbligatorio'
    };
  }

  // If not required and empty, return valid
  if (!value || !value.trim()) {
    return {
      isValid: true,
      sanitized: '',
      error: null
    };
  }

  // Sanitize
  const sanitized = sanitizeText(value, maxLength);

  // Check length
  if (sanitized.length < minLength) {
    return {
      isValid: false,
      sanitized,
      error: `Lunghezza minima: ${minLength} caratteri`
    };
  }

  // Type-specific validation
  switch (type) {
    case 'email':
      if (!isValidEmail(sanitized)) {
        return {
          isValid: false,
          sanitized,
          error: 'Email non valida'
        };
      }
      break;
    case 'url':
      if (!isValidUrl(sanitized)) {
        return {
          isValid: false,
          sanitized,
          error: 'URL non valido'
        };
      }
      break;
    case 'number':
      if (isNaN(Number(sanitized))) {
        return {
          isValid: false,
          sanitized,
          error: 'Valore numerico non valido'
        };
      }
      break;
  }

  return {
    isValid: true,
    sanitized,
    error: null
  };
};
