import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignupScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ResetPasswordTwoScreen from '../screens/ResetPasswordTwoScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ResetPasswordTwoScreen" component={ResetPasswordTwoScreen} />
    </Stack.Navigator>
  );
}
