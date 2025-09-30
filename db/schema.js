export const schema = {
  teachers: `
    CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      school TEXT,
      subjects TEXT,
      schedule TEXT
    );
  `,
  classes: `
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      teacher_id INTEGER,
      student_count INTEGER
    );
  `,
  students: `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      class_id INTEGER,
      bes_info TEXT
    );
  `,
  schedule: `
    CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      day TEXT,
      time TEXT,
      class_id INTEGER,
      subject TEXT
    );
  `,
  assessments: `
    CREATE TABLE IF NOT EXISTS assessments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      type TEXT,
      value TEXT,
      date TEXT,
      notes TEXT
    );
  `
};
