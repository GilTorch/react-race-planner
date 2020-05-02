import React from 'react';
import store from '../redux/store';
import AuthStack from './AuthStack';
import RootStack from './RootStack';

export default function AppNavigation() {
  const { currentUser } = store.getState().user;
  if (!currentUser || !currentUser.isActive) {
    return <AuthStack />;
  }

  return <RootStack />;
}
