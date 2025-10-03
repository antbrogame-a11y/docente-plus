# 🚀 Quick Reference - SQLite Database Functions

## 📚 Import Statement

```javascript
import {
  // Database initialization
  initDatabase,
  getDatabase,
  
  // Teachers
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  
  // Classes
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  deleteAllClasses,
  
  // Students
  createStudent,
  getAllStudents,
  getStudentsByClassId,
  getStudentById,
  updateStudent,
  deleteStudent,
  
  // Schedule
  createSchedule,
  getAllSchedule,
  getScheduleByTeacherId,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  
  // Backup & Restore
  createDatabaseBackup,
  exportDatabaseBackup,
  listDatabaseBackups,
  restoreDatabaseFromBackup,
  cleanOldBackups,
  
  // JSON Export/Import
  exportAllDataToJSON,
  saveJSONExport,
  importDataFromJSON
} from './db/database';
```

## 🔧 Common Operations

### Initialize Database
```javascript
// Call once at app startup
await initDatabase();
```

### Create Records
```javascript
// Teacher
const teacher = await createTeacher('Name', 'School', 'Subjects', '[]');

// Class
const classe = await createClass('Class Name', teacherId, 25);

// Student
const student = await createStudent('Student Name', classId, 'BES Info');

// Schedule
const lesson = await createSchedule(teacherId, 'Monday', '09:00', classId, 'Math');
```

### Read Records
```javascript
// Get all
const teachers = await getAllTeachers();
const classes = await getAllClasses();
const students = await getAllStudents();
const schedule = await getAllSchedule();

// Get by ID
const teacher = await getTeacherById(1);
const classe = await getClassById(1);
const student = await getStudentById(1);
const lesson = await getScheduleById(1);

// Get by relationship
const classStudents = await getStudentsByClassId(1);
const teacherSchedule = await getScheduleByTeacherId(1);
```

### Update Records
```javascript
// Update (pass null for fields you don't want to change)
await updateTeacher(1, 'New Name', null, null, null);
await updateClass(1, 'New Name', null, 30);
await updateStudent(1, 'New Name', null, 'New BES Info');
await updateSchedule(1, null, 'Tuesday', '10:00', null, null);
```

### Delete Records
```javascript
await deleteTeacher(1);
await deleteClass(1);
await deleteStudent(1);
await deleteSchedule(1);
```

## 💾 Backup Operations

### Create Backup
```javascript
const backupPath = await createDatabaseBackup();
// Returns: /path/docente_plus_backup_2024-01-15T10-30-00.db
```

### Export and Share Backup
```javascript
await exportDatabaseBackup();
// Creates backup and opens share dialog
```

### List Available Backups
```javascript
const backups = await listDatabaseBackups();
// Returns: [{ filename, path, size, modificationTime }, ...]
```

### Restore from Backup
```javascript
const backupPath = backups[0].path;
await restoreDatabaseFromBackup(backupPath);
// Creates emergency backup before restoring
```

### Clean Old Backups
```javascript
const deletedCount = await cleanOldBackups(5); // Keep 5 most recent
console.log(`Deleted ${deletedCount} old backups`);
```

## 📄 JSON Operations

### Export to JSON
```javascript
// Get JSON data object
const data = await exportAllDataToJSON();
console.log(data); // { exportDate, version, data: { teachers, classes, ... } }

// Save and share JSON file
const jsonPath = await saveJSONExport();
// Saves to: /path/docente_plus_export_2024-01-15T10-30-00.json
```

### Import from JSON
```javascript
const jsonPath = '/path/to/export.json';
const stats = await importDataFromJSON(jsonPath);
console.log(stats); // { teachers: 5, classes: 10, students: 150, ... }
```

## 🎨 Context Usage

### Teacher Context
```javascript
import { TeacherContext } from './context/teacher-context';

function MyComponent() {
  const { teacher, setTeacher, loading, error, refreshTeacher } = useContext(TeacherContext);
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  
  const updateProfile = async () => {
    await setTeacher({
      ...teacher,
      name: 'New Name',
      school: 'New School',
      subjects: 'Math, Physics',
      schedule: []
    });
  };
  
  return (
    <View>
      <Text>{teacher.name}</Text>
      <Button onPress={updateProfile} title="Update" />
      <Button onPress={refreshTeacher} title="Refresh" />
    </View>
  );
}
```

### Classes Context
```javascript
import { ClassesContext } from './context/classes-context';

function MyComponent() {
  const { classes, addClass, modifyClass, removeClass, loading, error } = useContext(ClassesContext);
  
  const addNewClass = async () => {
    await addClass('5A', teacherId, 25);
  };
  
  const updateClass = async (id) => {
    await modifyClass(id, 'New Name', null, 30);
  };
  
  const deleteClass = async (id) => {
    await removeClass(id);
  };
  
  return (
    <FlatList
      data={classes}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Button onPress={() => updateClass(item.id)} title="Update" />
          <Button onPress={() => deleteClass(item.id)} title="Delete" />
        </View>
      )}
    />
  );
}
```

## ⚠️ Error Handling

All database functions throw errors. Use try-catch:

```javascript
try {
  const teacher = await createTeacher('Name', 'School', 'Subjects', '[]');
  console.log('Teacher created:', teacher);
} catch (error) {
  console.error('Failed to create teacher:', error);
  Alert.alert('Error', error.message);
}
```

## 🧪 Testing

Run tests:
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

## 📊 Database Schema

```
teachers
  ├─ id (INTEGER PRIMARY KEY)
  ├─ name (TEXT)
  ├─ school (TEXT)
  ├─ subjects (TEXT)
  └─ schedule (TEXT - JSON string)

classes
  ├─ id (INTEGER PRIMARY KEY)
  ├─ name (TEXT)
  ├─ teacher_id (INTEGER)
  └─ student_count (INTEGER)

students
  ├─ id (INTEGER PRIMARY KEY)
  ├─ name (TEXT)
  ├─ class_id (INTEGER)
  └─ bes_info (TEXT)

schedule
  ├─ id (INTEGER PRIMARY KEY)
  ├─ teacher_id (INTEGER)
  ├─ day (TEXT)
  ├─ time (TEXT)
  ├─ class_id (INTEGER)
  └─ subject (TEXT)

assessments
  ├─ id (INTEGER PRIMARY KEY)
  ├─ student_id (INTEGER)
  ├─ type (TEXT)
  ├─ value (TEXT)
  ├─ date (TEXT)
  └─ notes (TEXT)
```

## 💡 Tips

1. **Always initialize database** at app startup with `initDatabase()`
2. **Use contexts** for teacher and classes data management
3. **Create regular backups** with `createDatabaseBackup()`
4. **Export to JSON** for data portability
5. **Handle errors** with try-catch blocks
6. **Test changes** with the provided test suite

## 📖 Full Documentation

- **SQLITE_IMPLEMENTATION.md** - Complete implementation details
- **IMPLEMENTATION_VISUAL_SUMMARY.md** - Visual overview
- **BACKUP_GUIDE.md** - Backup/restore guide
- **README.md** - Project overview

---

**Need help?** Check the test files in `__tests__/` for usage examples!
