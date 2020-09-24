import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Toast from 'react-native-root-toast';
import * as Font from 'expo-font';
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Entypo,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import { AppLoading, Notifications } from 'expo';
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
import EarthOrbiter from './assets/fonts/EarthOrbiter.ttf';
import ScriptoRerumLogo from './assets/images/scriptorerum-logo.png';
import AppNavigation from './navigation';
import store from './redux/store';
import persistor from './redux/store/persistor';
import { AppContext } from './utils/providers/app-context';

// For development only. We use those when we want to
// reset the store and pause redux-persist respectively
// persistor.purge();

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

async function loadAssetsAsync() {
  const images = [ScriptoRerumLogo];

  const fonts = [
    {
      ...Ionicons.font,
      ...FontAwesome5.font,
      ...FontAwesome.font,
      ...MaterialCommunityIcons.font,
      ...AntDesign.font,
      ...SimpleLineIcons.font,
      ...Entypo.font,
      ...Feather.font,
      ...MaterialIcons.font,
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
      RobotoThinItalic,
      EarthOrbiter,
    },
  ];

  const imageAssets = cacheImages(images);
  const fontAssets = cacheFonts(fonts);

  await Promise.all([...imageAssets, ...fontAssets]);
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#23C2C2',
    // accent: '#5A7582'
  },
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const containerRef = useRef();
  const [initialNavigationState, setInitialNavigationState] = useState();
  const { getInitialState } = useLinking(containerRef);
  // Push Notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Toast.show('Failed to get push token for push notification!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();

      setExpoPushToken(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };
  useEffect(() => {
    async function setupInitialState() {
      setInitialNavigationState(await getInitialState());
    }

    setupInitialState();

    // Push Notifications
    registerForPushNotificationsAsync();
    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationListener = Notifications.addListener(handleNotification);

    return () => {
      notificationListener.remove();
    };
  }, []);

  const handleNotification = (notif) => {
    setNotification(notif);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return <AppLoading startAsync={loadAssetsAsync} onFinish={() => setLoadingComplete(true)} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContext.Provider value={{ expoPushToken, notification }}>
          <PaperProvider theme={theme}>
            <View style={styles.container}>
              <NavigationContainer
                ref={containerRef}
                initialState={initialNavigationState}
                initialRouteName="SignupScreen">
                <AppNavigation />
              </NavigationContainer>
            </View>
          </PaperProvider>
        </AppContext.Provider>
      </PersistGate>
    </Provider>
  );
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};

App.defaultProps = {
  skipLoadingScreen: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
