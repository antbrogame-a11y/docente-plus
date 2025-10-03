# Copilot Instructions - Docente Plus

This document provides comprehensive instructions for GitHub Copilot when working on the Docente Plus project.

## Project Overview

Docente Plus is a React Native/Expo mobile application for teacher workflow management with a focus on educational needs, accessibility, and Italian education standards (BES/DSA compliance).

**Key Technologies:**
- Framework: React Native with Expo SDK 54
- Database: SQLite (expo-sqlite)
- State Management: Context API
- Navigation: React Navigation (Stack)
- Testing: Jest with jest-expo
- Document Generation: expo-print for PDF reports

## Code Conventions

### Naming Conventions
- **Components**: PascalCase (e.g., `ClassCard.js`, `DragDropSchedule.js`)
- **Files**: kebab-case (e.g., `class-list-screen.js`, `dashboard-screen.js`)
- **Variables and Functions**: camelCase (e.g., `studentData`, `createBackup`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MIN_TOUCH_TARGET_SIZE`)
- **Context Files**: kebab-case with `-context` suffix (e.g., `auth-context.js`)

### File Organization
```
/
├── App.js                    # Main app entry point
├── components/               # Reusable UI components (PascalCase)
├── screens/                  # Screen components (kebab-case)
├── context/                  # Context providers (kebab-case)
├── db/                       # Database logic and schema
├── services/                 # External services (e.g., API integrations)
├── constants/                # App-wide constants
├── navigation/               # Navigation configuration
├── assets/                   # Images, icons, fonts
└── __tests__/                # Test files (.test.js suffix)
```

## Architecture & Patterns

### State Management
- Use Context API for global state (auth, classes, teacher data)
- Prefer local state (useState) for component-specific data
- Keep business logic in database layer (`db/database.js`)

### Database Layer
- All database operations in `db/database.js`
- Schema definitions in `db/schema.js`
- Always use transactions for multi-step operations
- Include proper error handling with try-catch blocks
- Provide backup and restore functionality

### Navigation
- Stack navigation pattern with React Navigation
- Screen names should match file names (e.g., 'ClassList' → `class-list-screen.js`)
- Pass minimal data through navigation params
- Reload data on screen focus when needed

### Component Structure
```javascript
// Preferred pattern for screen components
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyScreen({ navigation }) {
  // State hooks first
  const [data, setData] = useState([]);
  
  // Effects
  useEffect(() => {
    // Load data
  }, []);
  
  // Event handlers
  const handleAction = () => {
    // Handle action
  };
  
  // Render
  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
}

// Styles at the bottom
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

## Accessibility Requirements (Critical)

**All new components and screens MUST implement:**

### 1. Accessibility Labels
```javascript
<TouchableOpacity
  accessibilityLabel="Nome descrittivo dell'elemento"
  accessibilityHint="Cosa succede quando viene premuto"
  accessibilityRole="button"
>
  {/* Content */}
</TouchableOpacity>
```

### 2. Touch Targets
- Minimum size: 44x44 points (WCAG 2.5.5 compliance)
- Use `minHeight: 44, minWidth: 44` in styles
- Add appropriate padding if content is smaller

### 3. Color Contrast
- All text must meet WCAG AA standards:
  - Normal text (< 18pt): 4.5:1 contrast ratio
  - Large text (≥ 18pt): 3:1 contrast ratio
- Use constants from `constants/index.js` for colors

### 4. Screen Reader Support
- Provide meaningful `accessibilityLabel` for all interactive elements
- Use `accessibilityHint` to describe outcomes
- Set appropriate `accessibilityRole` (button, header, link, etc.)
- Mark decorative elements with `accessibilityElementsHidden={true}`

### 5. Keyboard Navigation
- Ensure all interactive elements are focusable
- Provide visible focus indicators
- Support logical tab order

**Reference:** See `ACCESSIBILITY_GUIDE.md` for comprehensive guidelines and examples.

## BES/DSA Integration (Educational Requirements)

When working with student-related features:

- **Always include BES/DSA fields** in student data structures
- BES (Bisogni Educativi Speciali) and DSA (Disturbi Specifici dell'Apprendimento) are mandatory
- Provide appropriate UI for managing these educational needs
- Follow Italian ministerial directive standards for PDP/BES reports
- Include accessibility considerations for students with learning difficulties

**Reference:** See `REPORTS_DOCUMENTATION.md` for PDP/BES report structure.

## Testing Standards

### Test Structure
```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  test('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe(expected);
  });
});
```

### Testing Requirements
- Write tests for all database operations (`__tests__/database-*.test.js`)
- Test CRUD operations (Create, Read, Update, Delete)
- Test error handling and edge cases
- Include accessibility tests for new UI components
- Aim for >80% code coverage for critical paths

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Code Quality & Best Practices

### Error Handling
```javascript
// Database operations
try {
  await db.runAsync('INSERT INTO ...', params);
} catch (error) {
  console.error('Error description:', error);
  throw error; // Re-throw to let caller handle
}

// User-facing operations
try {
  await riskyOperation();
  Alert.alert('Success', 'Operation completed');
} catch (error) {
  Alert.alert('Error', 'User-friendly message');
  console.error('Debug info:', error);
}
```

### Performance
- Use `FlatList` for long lists, not `ScrollView` with `.map()`
- Implement `keyExtractor` and optimize `renderItem` in FlatLists
- Avoid unnecessary re-renders with `React.memo()` and `useCallback()`
- Lazy load heavy components when possible

### Code Style
- Use functional components, not class components
- Prefer async/await over Promise chains
- Use meaningful variable names in Italian when appropriate for domain concepts
- Keep functions small and focused (single responsibility)
- Comment complex logic, especially for educational/legal requirements

## Documentation Priorities

When making significant changes:

1. **Code Comments**: For complex business logic (especially BES/DSA related)
2. **Update README.md**: If adding major features
3. **Technical Docs**: Update relevant files in root (e.g., `IMPLEMENTATION_SUMMARY.md`)
4. **User Guides**: Update if changing user-facing workflows

## Git Workflow

### Commit Messages
Follow conventional commits format:
```
feat: Add new feature description
fix: Fix bug description
docs: Update documentation
test: Add or update tests
refactor: Code refactoring
style: Code style changes
chore: Maintenance tasks
```

### Branch Strategy
- Main branch: `main` (protected)
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Copilot branches: `copilot/fix-*` (auto-generated)

**Reference:** See `GIT_WORKFLOW_GUIDE.md` for detailed workflow.

## Common Patterns & Examples

### Database CRUD Pattern
```javascript
// Create
export async function createItem(data) {
  try {
    const db = await getDatabase();
    const result = await db.runAsync(
      'INSERT INTO items (name, value) VALUES (?, ?)',
      [data.name, data.value]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}

// Read
export async function getItems() {
  try {
    const db = await getDatabase();
    const items = await db.getAllAsync('SELECT * FROM items');
    return items;
  } catch (error) {
    console.error('Error getting items:', error);
    return [];
  }
}
```

### Context Pattern
```javascript
// Creating a context
export const MyContext = createContext({
  data: null,
  updateData: () => {},
});

export function MyProvider({ children }) {
  const [data, setData] = useState(null);
  
  const updateData = (newData) => {
    setData(newData);
  };
  
  return (
    <MyContext.Provider value={{ data, updateData }}>
      {children}
    </MyContext.Provider>
  );
}

// Using the context
import { useContext } from 'react';
import { MyContext } from '../context/my-context';

const { data, updateData } = useContext(MyContext);
```

### Material/Document Handling
```javascript
// Use expo-document-picker for file selection
import * as DocumentPicker from 'expo-document-picker';

const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf',
    copyToCacheDirectory: true,
  });
  
  if (!result.canceled) {
    // Handle selected file
    const file = result.assets[0];
  }
};
```

## External Services

### DeepSeek API (Optional)
- API integration in `services/deepseek-api.js`
- Requires API key in `.env` file
- Used for AI-assisted features (optional, graceful degradation)
- Never commit API keys to repository

## Priority Principles

When making decisions or trade-offs, prioritize in this order:

1. **Accessibility** - Must meet WCAG AA standards
2. **Simplicity** - Keep code and UX simple and maintainable
3. **Pedagogy** - Support educational best practices and Italian standards
4. **Data Safety** - Prevent data loss, implement backups
5. **Performance** - Optimize for mobile devices
6. **User Experience** - Intuitive, clear, teacher-friendly

## Emergency & Backup

- Database backup functions available in `db/database.js`
- Emergency procedures documented in `EMERGENCY_QUICK_REF.md`
- Always test destructive operations (e.g., `deleteAllClasses`) thoroughly
- Implement confirmation dialogs for irreversible actions

## References

**Key Documentation Files:**
- `README.md` - Project overview and setup
- `ACCESSIBILITY_GUIDE.md` - Comprehensive accessibility guidelines
- `REPORTS_DOCUMENTATION.md` - PDP/BES report specifications
- `DASHBOARD_DOCUMENTATION.md` - Analytics and dashboard features
- `GIT_WORKFLOW_GUIDE.md` - Git workflow for contributors
- `BACKUP_GUIDE.md` - Data backup and restoration
- `COPILOT_SETUP.md` - Original technical instructions (legacy)

**When in doubt:**
1. Check existing similar code in the repository
2. Follow React Native best practices
3. Maintain accessibility standards
4. Write tests for new functionality
5. Document complex logic

---

**Last Updated:** January 2025
**Project Status:** Beta development - All features subject to change
