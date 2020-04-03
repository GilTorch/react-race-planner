/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome5 } from '@expo/vector-icons';
import MainStack from './MainStack';
import WritingStack from './WritingStack';
import SettingsStack from './SettingsStack';
import LibraryStack from './LibraryStack';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Library"
      tabBarOptions={{
        labelPosition: 'beside-icon'
      }}>
      <Tab.Screen
        name="Library"
        component={LibraryStack}
        options={{
          tabBarLabel: ({ focused }) => {
            if (!focused) return null;
            const label = (
              <Text
                style={{
                  paddingLeft: 15,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: '#03A2A2'
                }}>
                Library
              </Text>
            );
            return label;
          },
          tabBarIcon: ({ focused }) => {
            const icon = (
              <FontAwesome5
                style={{ fontSize: 20 }}
                color={focused ? '#03A2A2' : '#707070'}
                name="book"
              />
            );
            return icon;
          }
        }}
      />

      <Tab.Screen
        name="Home"
        component={MainStack}
        options={{
          tabBarLabel: ({ focused }) => {
            if (!focused) return null;

            return (
              <Text
                style={{
                  paddingLeft: 15,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: '#03A2A2'
                }}>
                Home
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                style={{ fontSize: 20 }}
                color={focused ? '#03A2A2' : '#707070'}
                name="home"
              />
            );
          }
        }}
      />

      <Tab.Screen
        name="Writing"
        component={WritingStack}
        options={{
          tabBarLabel: ({ focused }) => {
            if (!focused) return null;

            return (
              <Text
                style={{
                  paddingLeft: 15,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: '#03A2A2'
                }}>
                Writing
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                style={{ fontSize: 20 }}
                color={focused ? '#03A2A2' : '#707070'}
                name="pen-fancy"
              />
            );
          }
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarLabel: ({ focused }) => {
            if (!focused) return null;

            return (
              <Text
                style={{
                  paddingLeft: 15,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: '#03A2A2'
                }}>
                Settings
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                style={{ fontSize: 20 }}
                color={focused ? '#03A2A2' : '#707070'}
                name="cog"
              />
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}
