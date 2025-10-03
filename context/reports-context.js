import React, { createContext, useState, useEffect } from 'react';
import {
  getAllPdpBesReports,
  getPdpBesReportsByStudentId,
  getPdpBesReportById,
  createPdpBesReport,
  updatePdpBesReport,
  deletePdpBesReport
} from '../db/database';

export const ReportsContext = createContext({
  reports: [],
  loading: false,
  error: null,
  addReport: () => {},
  modifyReport: () => {},
  removeReport: () => {},
  getReportsForStudent: () => {},
  getReportById: () => {},
  refreshReports: () => {}
});

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all reports on mount
  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const allReports = await getAllPdpBesReports();
      setReports(allReports);
    } catch (err) {
      setError(err.message);
      console.error('Error loading reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const addReport = async (reportData) => {
    try {
      setLoading(true);
      setError(null);
      const newReport = await createPdpBesReport(reportData);
      await loadReports(); // Refresh list
      return newReport;
    } catch (err) {
      setError(err.message);
      console.error('Error adding report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const modifyReport = async (id, reportData) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await updatePdpBesReport(id, reportData);
      await loadReports(); // Refresh list
      return updated;
    } catch (err) {
      setError(err.message);
      console.error('Error updating report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeReport = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await deletePdpBesReport(id);
      await loadReports(); // Refresh list
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getReportsForStudent = async (studentId) => {
    try {
      return await getPdpBesReportsByStudentId(studentId);
    } catch (err) {
      console.error('Error getting reports for student:', err);
      throw err;
    }
  };

  const getReportById = async (id) => {
    try {
      return await getPdpBesReportById(id);
    } catch (err) {
      console.error('Error getting report by ID:', err);
      throw err;
    }
  };

  const refreshReports = async () => {
    await loadReports();
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        error,
        addReport,
        modifyReport,
        removeReport,
        getReportsForStudent,
        getReportById,
        refreshReports
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
