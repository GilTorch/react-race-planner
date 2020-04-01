import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WritingScreen from '../screens/Writing';

const Stack = createStackNavigator();

export default function WritingStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="WritingScreen" component={WritingScreen} />
    </Stack.Navigator>
  );
}
