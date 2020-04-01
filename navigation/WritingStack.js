import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WritingScreen from '../screens/Writing';
import FilterScreen from '../screens/FilterScreen';
import StoryStack from './StoryStack';

const Stack = createStackNavigator();

export default function WritingStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="WritingScreen" component={WritingScreen} />
      <Stack.Screen name="StoryScreen" component={StoryStack} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
    </Stack.Navigator>
  );
}
