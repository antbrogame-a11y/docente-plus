import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/auth-context';
import LoginScreen from '../screens/login-screen';
import WelcomeScreen from '../screens/welcome-screen';
import ProfileScreen from '../screens/profile-screen';
import ScheduleScreen from '../screens/schedule-screen';
import ClassListScreen from '../screens/class-list-screen';
import MaterialsScreen from '../screens/materials-screen';
import ReportsScreen from '../screens/reports-screen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        // Auth Stack
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
      ) : (
        // App Stack
        <>
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ title: 'Benvenuto' }} 
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Profilo Insegnante' }} 
          />
          <Stack.Screen 
            name="Schedule" 
            component={ScheduleScreen} 
            options={{ title: 'Orario' }} 
          />
          <Stack.Screen 
            name="ClassList" 
            component={ClassListScreen} 
            options={{ title: 'Le Mie Classi' }} 
          />
          <Stack.Screen 
            name="Materials" 
            component={MaterialsScreen} 
            options={{ title: 'Materiali Didattici' }} 
          />
          <Stack.Screen 
            name="Reports" 
            component={ReportsScreen} 
            options={{ title: 'Report PDP/BES' }} 
          />
        </>
      )}
    </Stack.Navigator>
  );
}