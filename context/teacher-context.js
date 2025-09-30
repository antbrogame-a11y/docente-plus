import React, { createContext, useState } from 'react';

export const TeacherContext = createContext();

export function TeacherProvider({ children }) {
  const [teacher, setTeacher] = useState({
    name: '',
    school: '',
    subjects: '',
    schedule: []
  });

  return (
    <TeacherContext.Provider value={{ teacher, setTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
}