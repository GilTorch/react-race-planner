import React, { useState } from 'react';

import AuthStack from './AuthStack';
import BottomTab from './BottomTab';

export default function AppNavigation() {
  const [currentUser] = useState(true);

  if (!currentUser) {
    return <AuthStack />;
  }

  return <BottomTab />;
}
