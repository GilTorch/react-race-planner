import React, { useState } from 'react';

import AuthStack from './AuthStack';
import RootStack from './RootStack';

export default function AppNavigation() {
  const [currentUser] = useState(false);

  if (!currentUser) {
    return <AuthStack />;
  }

  return <RootStack />;
}
