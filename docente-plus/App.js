import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/app-navigation';
import { TeacherProvider } from './context/teacher-context';

export default function App() {
  return (
    <TeacherProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </TeacherProvider>
  );
}
