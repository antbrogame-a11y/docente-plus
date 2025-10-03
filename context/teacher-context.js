import React, { createContext, useState, useEffect } from 'react';
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherById,
  initDatabase
} from '../db/database';

export const TeacherContext = createContext();

export function TeacherProvider({ children }) {
  const [teacher, setTeacherState] = useState({
    id: null,
    name: '',
    school: '',
    subjects: '',
    schedule: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize database and load teacher on mount
  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        await loadTeacher();
      } catch (err) {
        console.error('Error initializing teacher context:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Load teacher from database (gets first teacher or creates a default one)
  const loadTeacher = async () => {
    try {
      const teachers = await getAllTeachers();
      if (teachers.length > 0) {
        const teacherData = teachers[0];
        setTeacherState({
          id: teacherData.id,
          name: teacherData.name || '',
          school: teacherData.school || '',
          subjects: teacherData.subjects || '',
          schedule: teacherData.schedule ? JSON.parse(teacherData.schedule) : []
        });
      } else {
        // Create a default teacher if none exists
        const newTeacher = await createTeacher('', '', '', JSON.stringify([]));
        setTeacherState({
          id: newTeacher.id,
          name: '',
          school: '',
          subjects: '',
          schedule: []
        });
      }
      setError(null);
    } catch (err) {
      console.error('Error loading teacher:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update teacher in database
  const setTeacher = async (updatedTeacher) => {
    try {
      const scheduleJSON = JSON.stringify(updatedTeacher.schedule || []);
      
      if (teacher.id) {
        // Update existing teacher
        await updateTeacher(
          teacher.id,
          updatedTeacher.name,
          updatedTeacher.school,
          updatedTeacher.subjects,
          scheduleJSON
        );
      } else {
        // Create new teacher
        const newTeacher = await createTeacher(
          updatedTeacher.name || '',
          updatedTeacher.school || '',
          updatedTeacher.subjects || '',
          scheduleJSON
        );
        updatedTeacher.id = newTeacher.id;
      }
      
      setTeacherState({
        ...updatedTeacher,
        schedule: updatedTeacher.schedule || []
      });
      setError(null);
    } catch (err) {
      console.error('Error updating teacher:', err);
      setError(err.message);
      throw err;
    }
  };

  // Refresh teacher from database
  const refreshTeacher = async () => {
    setLoading(true);
    try {
      await loadTeacher();
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherContext.Provider value={{ teacher, setTeacher, loading, error, refreshTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
}