import * as SQLite from 'expo-sqlite';
import { schema } from './schema';

// Apre il database SQLite
const db = SQLite.openDatabase('docenteplus.db');

/**
 * Crea tutte le tabelle necessarie nel database.
 * Questa funzione deve essere chiamata all'avvio dell'app per assicurarsi
 * che tutte le tabelle siano presenti.
 */
export function createTables() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // Crea le tabelle usando lo schema definito
        tx.executeSql(schema.teachers);
        tx.executeSql(schema.classes);
        tx.executeSql(schema.students);
        tx.executeSql(schema.schedule);
        tx.executeSql(schema.assessments);
      },
      (error) => {
        console.error('Errore durante la creazione delle tabelle:', error);
        reject(error);
      },
      () => {
        console.log('Tabelle del database create con successo');
        resolve();
      }
    );
  });
}

// Esporta il riferimento al database per futuri usi CRUD
export { db };
