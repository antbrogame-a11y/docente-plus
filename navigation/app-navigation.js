import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile-screen';
import ScheduleScreen from '../screens/schedule-screen';
import ClassListScreen from '../screens/class-list-screen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profilo Insegnante' }} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Orario' }} />
      <Stack.Screen name="ClassList" component={ClassListScreen} options={{ title: 'Le Mie Classi' }} />
    </Stack.Navigator>
  );
}