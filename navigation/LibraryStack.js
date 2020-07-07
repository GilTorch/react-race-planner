import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LibraryScreen from '../screens/LibraryScreen';
import StoryScreen from '../screens/StoryScreen';
import RoundWritingScreen from '../screens/RoundWritingScreen';

const Stack = createStackNavigator();

export default function Librarystack() {
  return (
    <Stack.Navigator initialRouteName="LibraryScreen">
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
      <Stack.Screen name="RoundWriting" component={RoundWritingScreen} />
    </Stack.Navigator>
  );
}
