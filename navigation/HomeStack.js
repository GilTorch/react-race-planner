import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ViewAllCategoriesModal from '../components/ViewAllCategoriesModal';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen" mode="modal">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="ViewAllCategoriesModal"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: 'All Categories',
          headerBackTitle: 'Back'
        }}
        component={ViewAllCategoriesModal}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
