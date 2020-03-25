import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTab from './BottomTab';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#23C2C2',
            elevation: 10,
            height: 101
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold'
          },
          headerTitleAlign: 'center'
        }}
        name="ScriptoRerum"
        component={BottomTab}
      />
    </Stack.Navigator>
  );
}
