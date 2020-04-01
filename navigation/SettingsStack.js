import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
