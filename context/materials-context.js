import React, { createContext, useState, useEffect } from 'react';
import {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialsByClassId,
  getMaterialsByStudentId,
  initDatabase
} from '../db/database';

export const MaterialsContext = createContext();

export function MaterialsProvider({ children }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize database and load materials on mount
  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        await loadMaterials();
      } catch (err) {
        console.error('Error initializing materials context:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Load all materials from database
  const loadMaterials = async () => {
    try {
      const allMaterials = await getAllMaterials();
      setMaterials(allMaterials);
      setError(null);
    } catch (err) {
      console.error('Error loading materials:', err);
      setError(err.message);
      throw err;
    }
  };

  // Add a new material
  const addMaterial = async (title, type, filePath = null, url = null, description = null, classId = null, studentId = null) => {
    try {
      const newMaterial = await createMaterial(title, type, filePath, url, description, classId, studentId);
      setMaterials(currentMaterials => [newMaterial, ...currentMaterials]);
      setError(null);
      return newMaterial;
    } catch (err) {
      console.error('Error adding material:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update an existing material
  const modifyMaterial = async (id, title = null, type = null, filePath = null, url = null, description = null, classId = null, studentId = null) => {
    try {
      const updatedMaterial = await updateMaterial(id, title, type, filePath, url, description, classId, studentId);
      setMaterials(currentMaterials =>
        currentMaterials.map(mat => (mat.id === id ? updatedMaterial : mat))
      );
      setError(null);
      return updatedMaterial;
    } catch (err) {
      console.error('Error updating material:', err);
      setError(err.message);
      throw err;
    }
  };

  // Remove a material
  const removeMaterial = async (id) => {
    try {
      await deleteMaterial(id);
      setMaterials(currentMaterials => currentMaterials.filter(mat => mat.id !== id));
      setError(null);
      return true;
    } catch (err) {
      console.error('Error removing material:', err);
      setError(err.message);
      throw err;
    }
  };

  // Get materials by class
  const getMaterialsForClass = async (classId) => {
    try {
      const classMaterials = await getMaterialsByClassId(classId);
      return classMaterials;
    } catch (err) {
      console.error('Error getting materials for class:', err);
      throw err;
    }
  };

  // Get materials by student
  const getMaterialsForStudent = async (studentId) => {
    try {
      const studentMaterials = await getMaterialsByStudentId(studentId);
      return studentMaterials;
    } catch (err) {
      console.error('Error getting materials for student:', err);
      throw err;
    }
  };

  // Refresh materials from database
  const refreshMaterials = async () => {
    setLoading(true);
    try {
      await loadMaterials();
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaterialsContext.Provider
      value={{
        materials,
        loading,
        error,
        addMaterial,
        modifyMaterial,
        removeMaterial,
        getMaterialsForClass,
        getMaterialsForStudent,
        refreshMaterials
      }}
    >
      {children}
    </MaterialsContext.Provider>
  );
}
