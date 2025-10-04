// Centralized logging system for Docente Plus
// Provides configurable logging levels for development and production

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4
};

// Set current level based on environment
// In development (__DEV__), show all logs
// In production, only show errors
const currentLevel = typeof __DEV__ !== 'undefined' && __DEV__ 
  ? LOG_LEVELS.DEBUG 
  : LOG_LEVELS.ERROR;

/**
 * Logger utility with configurable levels
 */
export const logger = {
  /**
   * Debug level logging - only in development
   * @param  {...any} args - Arguments to log
   */
  debug: (...args) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.log('[DEBUG]', new Date().toISOString(), ...args);
    }
  },

  /**
   * Info level logging - only in development
   * @param  {...any} args - Arguments to log
   */
  info: (...args) => {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.log('[INFO]', new Date().toISOString(), ...args);
    }
  },

  /**
   * Warning level logging - development and production
   * @param  {...any} args - Arguments to log
   */
  warn: (...args) => {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn('[WARN]', new Date().toISOString(), ...args);
    }
  },

  /**
   * Error level logging - always logged
   * @param  {...any} args - Arguments to log
   */
  error: (...args) => {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      console.error('[ERROR]', new Date().toISOString(), ...args);
    }
  },

  /**
   * Database operation logging - only in development
   * @param {string} operation - Database operation name
   * @param  {...any} args - Additional arguments
   */
  database: (operation, ...args) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.log('[DB]', new Date().toISOString(), operation, ...args);
    }
  },

  /**
   * API call logging - only in development
   * @param {string} endpoint - API endpoint
   * @param  {...any} args - Additional arguments
   */
  api: (endpoint, ...args) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.log('[API]', new Date().toISOString(), endpoint, ...args);
    }
  },

  /**
   * Security event logging - always logged
   * @param {string} event - Security event description
   * @param  {...any} args - Additional arguments
   */
  security: (event, ...args) => {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn('[SECURITY]', new Date().toISOString(), event, ...args);
    }
  }
};

/**
 * Get current log level name
 * @returns {string} Current log level name
 */
export const getLogLevel = () => {
  const levelName = Object.keys(LOG_LEVELS).find(
    key => LOG_LEVELS[key] === currentLevel
  );
  return levelName || 'UNKNOWN';
};

/**
 * Check if a specific log level is enabled
 * @param {string} level - Level to check ('DEBUG', 'INFO', 'WARN', 'ERROR')
 * @returns {boolean} True if level is enabled
 */
export const isLogLevelEnabled = (level) => {
  const levelValue = LOG_LEVELS[level];
  return levelValue !== undefined && currentLevel <= levelValue;
};

export default logger;
