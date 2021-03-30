import React from 'react';
import { useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default () => {
  const ref = React.useRef();
  const [isReady, setIsReady] = React.useState(true);
  const [initialState, setInitialState] = React.useState();
  const { getInitialState } = useLinking(ref, {
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

  return {
    getInitialState: () =>
      getInitialState()
        .catch(() => { })
        .then((state) => {
          if (state !== undefined) {
            setInitialState(state);
          }
          setIsReady(true);
        }),
    ref,
    ready: isReady,
    initialState,
  };
};
