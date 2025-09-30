import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile-screen';
import ScheduleScreen from '../screens/schedule-screen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
    </Stack.Navigator>
  );
}