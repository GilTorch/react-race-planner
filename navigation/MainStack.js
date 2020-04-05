import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeStackScreen from './HomeStack';
import FilterScreen from '../screens/FilterScreen';
import UserPartOfStory from '../screens/story/UserPartOfStory';
import StartedStory from '../screens/story/StartedStory';
import InProgressStory from '../screens/story/InProgressStory';
import CompletedStory from '../screens/story/CompletedStory';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeStackScreen}
      />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="UserPartOfStory" component={UserPartOfStory} />
      <Stack.Screen name="InProgressStory" component={InProgressStory} />
      <Stack.Screen name="StartedStory" component={StartedStory} />
      <Stack.Screen name="CompletedStory" component={CompletedStory} />
    </Stack.Navigator>
  );
}
