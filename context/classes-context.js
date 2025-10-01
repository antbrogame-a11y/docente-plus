import React, { createContext, useState, useEffect } from 'react';
import {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  initDatabase
} from '../db/database';

export const ClassesContext = createContext();

export function ClassesProvider({ children }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize database and load classes on mount
  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        await loadClasses();
      } catch (err) {
        console.error('Error initializing classes context:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Load all classes from database
  const loadClasses = async () => {
    try {
      const allClasses = await getAllClasses();
      setClasses(allClasses);
      setError(null);
    } catch (err) {
      console.error('Error loading classes:', err);
      setError(err.message);
      throw err;
    }
  };

  // Add a new class
  const addClass = async (name, teacherId = null, studentCount = 0) => {
    try {
      const newClass = await createClass(name, teacherId, studentCount);
      setClasses(currentClasses => [...currentClasses, newClass]);
      setError(null);
      return newClass;
    } catch (err) {
      console.error('Error adding class:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update an existing class
  const modifyClass = async (id, name, teacherId = null, studentCount = null) => {
    try {
      const updatedClass = await updateClass(id, name, teacherId, studentCount);
      setClasses(currentClasses =>
        currentClasses.map(cls => (cls.id === id ? updatedClass : cls))
      );
      setError(null);
      return updatedClass;
    } catch (err) {
      console.error('Error updating class:', err);
      setError(err.message);
      throw err;
    }
  };

  // Remove a class
  const removeClass = async (id) => {
    try {
      await deleteClass(id);
      setClasses(currentClasses => currentClasses.filter(cls => cls.id !== id));
      setError(null);
      return true;
    } catch (err) {
      console.error('Error removing class:', err);
      setError(err.message);
      throw err;
    }
  };

  // Refresh classes from database
  const refreshClasses = async () => {
    setLoading(true);
    try {
      await loadClasses();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClassesContext.Provider
      value={{
        classes,
        loading,
        error,
        addClass,
        modifyClass,
        removeClass,
        refreshClasses
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
}
