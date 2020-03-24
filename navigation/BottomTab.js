import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainStack from './MainStack';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={{
          tabBarLabel: 'Home'
        }}
      />
    </Tab.Navigator>
  );
}
