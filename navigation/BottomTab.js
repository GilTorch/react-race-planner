import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainStack from './MainStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={MainStack}
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings'
        }}
      />
    </Tab.Navigator>
  );
}
