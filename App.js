import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import useLinking from './navigation/useLinking';
import SpaceMono from './assets/fonts/SpaceMono-Regular.ttf';
import RobotoBlack from './assets/fonts/Roboto-Black.ttf';
import RobotoBlackItalic from './assets/fonts/Roboto-BlackItalic.ttf';
import RobotoBold from './assets/fonts/Roboto-Bold.ttf';
import RobotoBoldItalic from './assets/fonts/Roboto-BoldItalic.ttf';
import RobotoItalic from './assets/fonts/Roboto-Italic.ttf';
import RobotoLight from './assets/fonts/Roboto-Light.ttf';
import RobotoLightItalic from './assets/fonts/Roboto-LightItalic.ttf';
import RobotoMedium from './assets/fonts/Roboto-Medium.ttf';
import RobotoMediumItalic from './assets/fonts/Roboto-MediumItalic.ttf';
import RobotoRegular from './assets/fonts/Roboto-Regular.ttf';
import RobotoThin from './assets/fonts/Roboto-Thin.ttf';
import RobotoThinItalic from './assets/fonts/Roboto-ThinItalic.ttf';
import ScriptoRerumLogo from './assets/images/scriptorerum-logo.png';
import AppNavigation from './navigation';
import store from './redux/store';
import persistor from './redux/store/persistor';

// For development only. We use those when we want to
// reset the store and pause redux-persist respectively
// persistor.purge();
// persistor.pause();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

async function loadAssetsAsync() {
  const images = [ScriptoRerumLogo];

  const fonts = [
    {
      ...Ionicons.font,
      SpaceMono,
      RobotoBlack,
      RobotoBlackItalic,
      RobotoBold,
      RobotoBoldItalic,
      RobotoItalic,
      RobotoLight,
      RobotoLightItalic,
      RobotoMedium,
      RobotoMediumItalic,
      RobotoRegular,
      RobotoThin,
      RobotoThinItalic
    }
  ];

  const imageAssets = cacheImages(images);
  const fontAssets = cacheFonts(fonts);

  await Promise.all([...imageAssets, ...fontAssets]);
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#23C2C2'
    // accent: '#5A7582'
  }
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const containerRef = useRef();
  const [initialNavigationState, setInitialNavigationState] = useState();
  const { getInitialState } = useLinking(containerRef);

  useEffect(() => {
    async function setupInitialState() {
      setInitialNavigationState(await getInitialState());
    }

    setupInitialState();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <AppLoading startAsync={loadAssetsAsync} onFinish={() => setLoadingComplete(true)} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <NavigationContainer
              ref={containerRef}
              initialState={initialNavigationState}
              initialRouteName="SignupScreen">
              <AppNavigation store={store} />
            </NavigationContainer>
          </View>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool
};

App.defaultProps = {
  skipLoadingScreen: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
