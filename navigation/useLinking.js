import { useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default (containerRef) => {
  return useLinking(containerRef, {
    prefixes: ['com.noukod.scriptorerum'],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Links: 'links',
          Settings: 'settings',
        },
      },
    },
  });
};
