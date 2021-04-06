import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Toast from 'react-native-root-toast';
import * as Font from 'expo-font';
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic
} from "@expo-google-fonts/roboto";

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
import EarthOrbiter from './assets/fonts/EarthOrbiter.ttf';
import ScriptoRerumLogo from './assets/images/scriptorerum-logo.png';
import AppNavigation from './navigation';
import store from './redux/store';
import persistor from './redux/store/persistor';
import { AppContext } from './utils/providers/app-context';

// For development only. We use those when we want to
// reset the store and pause redux-persist respectively

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
      RobotoBlack: Roboto_900Black,
      RobotoBlackItalic: Roboto_900Black_Italic,
      RobotoBold: Roboto_700Bold,
      RobotoBoldItalic: Roboto_700Bold_Italic,
      RobotoItalic: Roboto_100Thin_Italic,
      RobotoLight: Roboto_300Light,
      RobotoLightItalic: Roboto_300Light_Italic,
      RobotoMedium: Roboto_500Medium,
      RobotoMediumItalic: Roboto_500Medium_Italic,
      RobotoRegular: Roboto_400Regular,
      RobotoThin: Roboto_100Thin,
      RobotoThinItalic: Roboto_100Thin_Italic,
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
  const containerRef = useRef();
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const { getInitialState, isReady, ref, initialState } = useLinking(containerRef);
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

      setIsLoadingFontComplete(false);
      await loadAssetsAsync();
      setIsLoadingFontComplete(true);
      // Push Notifications
      registerForPushNotificationsAsync();

      await SplashScreen.hideAsync();
      await getInitialState();
    }

    setupInitialState();

    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener(handleNotification);

    return () => {
      notificationListener.remove();
    };
  }, []);

  if (!isReady || !isLoadingComplete) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContext.Provider value={{ expoPushToken, notification }}>
            <PaperProvider theme={theme}>
              <View style={styles.container}>
                <NavigationContainer ref={ref} initialState={initialState}>
                  <AppNavigation />
                </NavigationContainer>
              </View>
            </PaperProvider>
          </AppContext.Provider>
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
