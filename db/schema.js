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
  `,
  materials: `
    CREATE TABLE IF NOT EXISTS materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      file_path TEXT,
      url TEXT,
      description TEXT,
      class_id INTEGER,
      student_id INTEGER,
      created_at TEXT NOT NULL,
      FOREIGN KEY (class_id) REFERENCES classes(id),
      FOREIGN KEY (student_id) REFERENCES students(id)
    );
  `,
  pdp_bes_reports: `
    CREATE TABLE IF NOT EXISTS pdp_bes_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      report_type TEXT NOT NULL,
      school_year TEXT NOT NULL,
      diagnosis TEXT,
      strengths TEXT,
      difficulties TEXT,
      teaching_strategies TEXT,
      evaluation_tools TEXT,
      objectives TEXT,
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      pdf_path TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id)
    );
  `
};
