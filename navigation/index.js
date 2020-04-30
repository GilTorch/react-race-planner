import React from 'react';
import store from '../redux/store';
import AuthStack from './AuthStack';
import RootStack from './RootStack';

export default function AppNavigation() {
  const { user } = store.getState();
  if (!user.token) {
    return <AuthStack />;
  }

  return <RootStack />;
}
