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
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { Asset } from 'expo-asset';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';

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
persistor.purge();

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
  const images = [];

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
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
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

      const experienceId = '@noukod/scriptorerum';

      const token = await Notifications.getExpoPushTokenAsync({
        experienceId,
      });

      setExpoPushToken(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        sound: true,
        enableVibrate: true,
        vibrationPattern: [0, 250, 250, 250],
      });
    }
  };

  const handleNotification = (notif) => {
    setNotification(notif);
  };

  useEffect(() => {
    async function setupInitialState() {
      await SplashScreen.preventAutoHideAsync();

      await loadAssetsAsync();

      // Push Notifications
      registerForPushNotificationsAsync();

      await SplashScreen.hideAsync();
      setInitialNavigationState(await getInitialState());

      setIsLoadingComplete(true);
    }

    setupInitialState();

    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener(handleNotification);

    return () => {
      notificationListener.remove();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <RootSiblingParent>
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
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
