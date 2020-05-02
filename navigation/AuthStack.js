import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignupScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ResetPasswordTwoScreen from '../screens/ResetPasswordTwoScreen';
import RootStack from './RootStack';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ResetPasswordTwoScreen" component={ResetPasswordTwoScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      {/* We're adding the Home stack here because we don't have a store and logic yet. Once we do,
      we will simply set the status of the logged in user via the state and the app will get them to the right screen */}
      <Stack.Screen name="Home" component={RootStack} />
    </Stack.Navigator>
  );
}
