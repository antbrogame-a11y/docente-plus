import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../navigation/app-navigation';
import { AuthProvider } from '../context/auth-context';
import { TeacherProvider } from '../context/teacher-context';
import { ClassesProvider } from '../context/classes-context';

export default function App() {
  return (
    <AuthProvider>
      <TeacherProvider>
        <ClassesProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </ClassesProvider>
      </TeacherProvider>
    </AuthProvider>
  );
}
