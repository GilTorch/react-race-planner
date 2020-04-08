import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LibraryScreen from '../screens/LibraryScreen';
import StoryScreen from '../screens/StoryScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="LibraryScreen">
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
    </Stack.Navigator>
  );
}
