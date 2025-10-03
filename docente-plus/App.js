import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../navigation/app-navigation';
import { AuthProvider } from '../context/auth-context';
import { TeacherProvider } from '../context/teacher-context';
import { ClassesProvider } from '../context/classes-context';
import { MaterialsProvider } from '../context/materials-context';
import { ReportsProvider } from '../context/reports-context';

export default function App() {
  return (
    <AuthProvider>
      <TeacherProvider>
        <ClassesProvider>
          <MaterialsProvider>
            <ReportsProvider>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
            </ReportsProvider>
          </MaterialsProvider>
        </ClassesProvider>
      </TeacherProvider>
    </AuthProvider>
  );
}
