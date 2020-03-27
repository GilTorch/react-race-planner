import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTab from './BottomTab';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Main" component={BottomTab} />
    </Stack.Navigator>
  );
}
