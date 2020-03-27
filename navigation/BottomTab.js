import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import UserPartOfStory from '../screens/story/UserPartOfStory';
import StartedStory from '../screens/story/StartedStory';
import InProgressStory from '../screens/story/InProgressStory';
import CompletedStory from '../screens/story/CompletedStory';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home'
        }}
      />

      <Tab.Screen
        name="UserPartOfStory"
        component={UserPartOfStory}
        options={{
          tabBarLabel: 'PartOf'
        }}
      />

      <Tab.Screen
        name="InProgressStory"
        component={InProgressStory}
        options={{
          tabBarLabel: 'InP'
        }}
      />

      <Tab.Screen
        name="StartedStory"
        component={StartedStory}
        options={{
          tabBarLabel: 'Start'
        }}
      />

      <Tab.Screen
        name="CompletedStory"
        component={CompletedStory}
        options={{
          tabBarLabel: 'Comp'
        }}
      />
    </Tab.Navigator>
  );
}
