import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LibraryScreen from '../screens/LibraryScreen';
import CompletedStory from '../screens/story/CompletedStory';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="LibraryScreen">
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="CompletedStory" component={CompletedStory} />
    </Stack.Navigator>
  );
}
