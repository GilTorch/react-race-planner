import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WritingScreen from '../screens/WritingScreen';
import StoryScreen from '../screens/StoryScreen';
import RoundWritingScreen from '../screens/RoundWritingScreen';

const Stack = createStackNavigator();

export default function WritingStack() {
  return (
    <Stack.Navigator initialRouteName="WritingScreen">
      <Stack.Screen name="WritingScreen" component={WritingScreen} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
      <Stack.Screen name="RoundWriting" component={RoundWritingScreen} />
    </Stack.Navigator>
  );
}
