import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WritingScreen from '../screens/WritingScreen';
import StoryScreen from '../screens/StoryScreen';

const Stack = createStackNavigator();

export default function WritingStack() {
  return (
    <Stack.Navigator initialRouteName="WritingScreen">
      <Stack.Screen name="WritingScreen" component={WritingScreen} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
    </Stack.Navigator>
  );
}
