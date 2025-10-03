// Test accessibility constants and ensure they are properly defined
const { 
  ACCESSIBILITY_LABELS, 
  ACCESSIBILITY_HINTS, 
  ACCESSIBILITY_ROLES,
  CONTRAST_RATIOS,
  MINIMUM_TOUCH_TARGET,
  FOCUS_ORDER
} = require('../constants/accessibility');

describe('Accessibility Constants', () => {
  describe('ACCESSIBILITY_LABELS', () => {
    test('should have labels for all login screen elements', () => {
      expect(ACCESSIBILITY_LABELS.LOGIN_EMAIL_INPUT).toBeDefined();
      expect(ACCESSIBILITY_LABELS.LOGIN_PASSWORD_INPUT).toBeDefined();
      expect(ACCESSIBILITY_LABELS.LOGIN_SUBMIT_BUTTON).toBeDefined();
    });

    test('should have labels for all welcome screen elements', () => {
      expect(ACCESSIBILITY_LABELS.WELCOME_TITLE).toBeDefined();
      expect(ACCESSIBILITY_LABELS.WELCOME_TEST_API_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.WELCOME_PROFILE_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.WELCOME_CLASSES_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.WELCOME_MATERIALS_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.WELCOME_LOGOUT_BUTTON).toBeDefined();
    });

    test('should have labels for all materials screen elements', () => {
      expect(ACCESSIBILITY_LABELS.MATERIALS_ADD_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_TITLE_INPUT).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_DESCRIPTION_INPUT).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_URL_INPUT).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_TYPE_LINK).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_TYPE_PDF).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_TYPE_IMAGE).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_TYPE_DOCUMENT).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_FILE_PICKER).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_DELETE_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_OPEN_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_CANCEL_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_SUBMIT_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_LABELS.MATERIALS_CLASS_SELECTOR).toBeDefined();
    });

    test('all labels should be non-empty strings', () => {
      Object.values(ACCESSIBILITY_LABELS).forEach(label => {
        expect(typeof label).toBe('string');
        expect(label.length).toBeGreaterThan(0);
      });
    });
  });

  describe('ACCESSIBILITY_HINTS', () => {
    test('should have hints for key interactive elements', () => {
      expect(ACCESSIBILITY_HINTS.LOGIN_SUBMIT_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_HINTS.WELCOME_TEST_API_BUTTON).toBeDefined();
      expect(ACCESSIBILITY_HINTS.MATERIALS_ADD_BUTTON).toBeDefined();
    });

    test('all hints should be non-empty strings', () => {
      Object.values(ACCESSIBILITY_HINTS).forEach(hint => {
        expect(typeof hint).toBe('string');
        expect(hint.length).toBeGreaterThan(0);
      });
    });

    test('hints should start with action verbs or "Tocca per"', () => {
      Object.values(ACCESSIBILITY_HINTS).forEach(hint => {
        const startsWithTocca = hint.startsWith('Tocca per');
        const startsWithAction = /^[A-Z][a-zà-ù]+/.test(hint);
        expect(startsWithTocca || startsWithAction).toBe(true);
      });
    });
  });

  describe('ACCESSIBILITY_ROLES', () => {
    test('should define standard accessibility roles', () => {
      expect(ACCESSIBILITY_ROLES.HEADER).toBe('header');
      expect(ACCESSIBILITY_ROLES.BUTTON).toBe('button');
      expect(ACCESSIBILITY_ROLES.TEXT_INPUT).toBe('none');
      expect(ACCESSIBILITY_ROLES.LINK).toBe('link');
      expect(ACCESSIBILITY_ROLES.IMAGE).toBe('image');
      expect(ACCESSIBILITY_ROLES.ADJUSTABLE).toBe('adjustable');
    });

    test('all roles should be valid React Native accessibility roles', () => {
      const validRoles = [
        'none', 'button', 'link', 'search', 'image', 'keyboardkey',
        'text', 'adjustable', 'imagebutton', 'header', 'summary', 'alert'
      ];
      
      Object.values(ACCESSIBILITY_ROLES).forEach(role => {
        expect(validRoles).toContain(role);
      });
    });
  });

  describe('CONTRAST_RATIOS', () => {
    test('should define WCAG AA minimum contrast ratios', () => {
      expect(CONTRAST_RATIOS.NORMAL_TEXT).toBe(4.5);
      expect(CONTRAST_RATIOS.LARGE_TEXT).toBe(3.0);
    });

    test('contrast ratios should be valid numbers', () => {
      expect(typeof CONTRAST_RATIOS.NORMAL_TEXT).toBe('number');
      expect(typeof CONTRAST_RATIOS.LARGE_TEXT).toBe('number');
      expect(CONTRAST_RATIOS.NORMAL_TEXT).toBeGreaterThan(0);
      expect(CONTRAST_RATIOS.LARGE_TEXT).toBeGreaterThan(0);
    });
  });

  describe('MINIMUM_TOUCH_TARGET', () => {
    test('should be 44 pixels (WCAG 2.5.5)', () => {
      expect(MINIMUM_TOUCH_TARGET).toBe(44);
    });

    test('should be a positive number', () => {
      expect(typeof MINIMUM_TOUCH_TARGET).toBe('number');
      expect(MINIMUM_TOUCH_TARGET).toBeGreaterThan(0);
    });
  });

  describe('FOCUS_ORDER', () => {
    test('should define focus order for login screen', () => {
      expect(FOCUS_ORDER.LOGIN_SCREEN).toBeDefined();
      expect(Array.isArray(FOCUS_ORDER.LOGIN_SCREEN)).toBe(true);
      expect(FOCUS_ORDER.LOGIN_SCREEN).toContain('email');
      expect(FOCUS_ORDER.LOGIN_SCREEN).toContain('password');
      expect(FOCUS_ORDER.LOGIN_SCREEN).toContain('submit');
    });

    test('should define focus order for welcome screen', () => {
      expect(FOCUS_ORDER.WELCOME_SCREEN).toBeDefined();
      expect(Array.isArray(FOCUS_ORDER.WELCOME_SCREEN)).toBe(true);
    });

    test('should define focus order for materials screen', () => {
      expect(FOCUS_ORDER.MATERIALS_SCREEN).toBeDefined();
      expect(Array.isArray(FOCUS_ORDER.MATERIALS_SCREEN)).toBe(true);
    });

    test('focus orders should not be empty', () => {
      Object.values(FOCUS_ORDER).forEach(order => {
        expect(order.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration', () => {
    test('labels and hints should cover same elements where appropriate', () => {
      // Elements that should have both labels and hints
      const commonElements = [
        'LOGIN_SUBMIT_BUTTON',
        'WELCOME_TEST_API_BUTTON',
        'MATERIALS_ADD_BUTTON'
      ];

      commonElements.forEach(element => {
        expect(ACCESSIBILITY_LABELS[element]).toBeDefined();
        expect(ACCESSIBILITY_HINTS[element]).toBeDefined();
      });
    });
  });
});
