import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import StoryScreen from '../screens/StoryScreen';
import NewStoryScreen from '../screens/NewStoryScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
      <Stack.Screen name="NewStoryScreen" component={NewStoryScreen} />
    </Stack.Navigator>
  );
}
