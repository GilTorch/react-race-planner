import React, { useState } from 'react';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default function AppNavigation() {
  const [currentUser] = useState(true);

  if (!currentUser) {
    return <AuthStack />;
  }

  return <MainStack />;
}
