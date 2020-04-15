import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTab from './BottomTab';
import FilterScreen from '../screens/FilterScreen';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
    </Stack.Navigator>
  );
}
