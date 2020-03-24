import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainStack from './MainStack';

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
    </Tab.Navigator>
  );
}
