/* eslint-disable prettier/prettier */
import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import BottomTab from './BottomTab';
import FilterScreen from '../screens/FilterScreen';
import SignupScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ResetPasswordTwoScreen from '../screens/ResetPasswordTwoScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import NewStoryScreen from '../screens/NewStoryScreen';
import { AppContext } from '../utils/providers/app-context';
import { savePushTokenAction } from '../redux/actions/UserActions';
import WebViewScreen from '../screens/WebViewScreen';
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function RootStack() {
  const dispatch = useDispatch();
  const { expoPushToken } = useContext(AppContext);
  const user = useSelector((state) => state.auth.currentUser);
  const isAuthenticated = user?.isActive && !user?.isPasswordReset;

  console.error("Navigation Loaded")
  useEffect(() => {
    if (isAuthenticated && expoPushToken) {
      dispatch(savePushTokenAction(expoPushToken));
    }
  }, [expoPushToken, isAuthenticated]);


  return (
    <Stack.Navigator mode={isAuthenticated ? 'modal' : 'card'} initialRouteName={isAuthenticated ? 'BottomTab' : 'Login'}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="ResetPasswordTwo" component={ResetPasswordTwoScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
          <Stack.Screen name="NewStoryScreen" component={NewStoryScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
