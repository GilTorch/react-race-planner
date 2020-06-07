/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import BottomTab from './BottomTab';
import FilterScreen from '../screens/FilterScreen';
import SignupScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ResetPasswordTwoScreen from '../screens/ResetPasswordTwoScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';

const Stack = createStackNavigator();

export default function RootStack() {
  const authState = useSelector(state => state.auth);

  const isAuthenticated = authState.currentUser?.isActive && !authState.currentUser?.isPasswordReset;

  return (
    <Stack.Navigator mode={isAuthenticated ? 'modal' : 'card'}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="ResetPasswordTwo" component={ResetPasswordTwoScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        </>
      ) : (
          <>
            <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
          </>
        )}
    </Stack.Navigator>
  );
}
