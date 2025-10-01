import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../navigation/app-navigation';
import { TeacherProvider } from '../context/teacher-context';
import { createTables } from '../db/database';

export default function App() {
  useEffect(() => {
    // Inizializza il database all'avvio dell'app
    createTables().catch((error) => {
      console.error('Errore durante l\'inizializzazione del database:', error);
    });
  }, []);

  return (
    <TeacherProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </TeacherProvider>
  );
}
