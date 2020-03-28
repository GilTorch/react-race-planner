import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import Writing from '../screens/Writing';

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
        name="WritingScreen"
        component={Writing}
        options={{
          tabBarLabel: 'Writing'
        }}
      />
    </Tab.Navigator>
  );
}
