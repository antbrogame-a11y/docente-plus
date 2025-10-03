import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../navigation/app-navigation';
import { AuthProvider } from '../context/auth-context';
import { TeacherProvider } from '../context/teacher-context';
import { ClassesProvider } from '../context/classes-context';
import { MaterialsProvider } from '../context/materials-context';
import { ReportsProvider } from '../context/reports-context';
import { DashboardProvider } from '../context/dashboard-context';

export default function App() {
  return (
    <AuthProvider>
      <TeacherProvider>
        <ClassesProvider>
          <MaterialsProvider>
            <ReportsProvider>
              <DashboardProvider>
                <NavigationContainer>
                  <AppNavigation />
                </NavigationContainer>
              </DashboardProvider>
            </ReportsProvider>
          </MaterialsProvider>
        </ClassesProvider>
      </TeacherProvider>
    </AuthProvider>
  );
}
