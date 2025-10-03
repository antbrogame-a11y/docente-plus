import React, { createContext, useState, useEffect } from 'react';
import {
  getDashboardStatistics,
  getClassStatistics,
  getRecentActivities,
  getBESDistribution,
  getMaterialsStatistics,
  exportDashboardData
} from '../db/database';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [statistics, setStatistics] = useState(null);
  const [classStats, setClassStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [besDistribution, setBESDistribution] = useState([]);
  const [materialsStats, setMaterialsStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [stats, classData, activities, besData, materialsData] = await Promise.all([
        getDashboardStatistics(),
        getClassStatistics(),
        getRecentActivities(),
        getBESDistribution(),
        getMaterialsStatistics()
      ]);
      
      setStatistics(stats);
      setClassStats(classData);
      setRecentActivities(activities);
      setBESDistribution(besData);
      setMaterialsStats(materialsData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh dashboard data
  const refreshDashboard = async () => {
    await loadDashboardData();
  };

  // Export dashboard data
  const exportData = async () => {
    try {
      const jsonData = await exportDashboardData();
      return jsonData;
    } catch (err) {
      console.error('Error exporting dashboard data:', err);
      throw err;
    }
  };

  // Load data on mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        statistics,
        classStats,
        recentActivities,
        besDistribution,
        materialsStats,
        loading,
        error,
        refreshDashboard,
        exportData
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
