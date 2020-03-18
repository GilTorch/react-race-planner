import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PropTypes from 'prop-types';
// import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import SignupScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import FilterScreen from './screens/FilterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ResetPasswordTwoScreen from './screens/ResetPasswordTwoScreen';
import SpaceMono from './assets/fonts/SpaceMono-Regular.ttf';
import RobotoBlack from './assets/fonts/Roboto-Black.ttf';
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

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': SpaceMono,
          'Roboto-Black': RobotoBlack,
          'Roboto-Bold': RobotoBold,
          'Roboto-BoldItalic': RobotoBoldItalic,
          'Roboto-Italic': RobotoItalic,
          'Roboto-Light': RobotoLight,
          'Roboto-LightItalic': RobotoLightItalic,
          'Roboto-Medium': RobotoMedium,
          'Roboto-MediumItalic': RobotoMediumItalic,
          'Roboto-Regular': RobotoRegular,
          'Roboto-Thin': RobotoThin,
          'Roboto-ThinItalic': RobotoThinItalic
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
        <Stack.Navigator>
          <Stack.Screen name="Root" component={FilterScreen} />
          {/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignupScreen"
            component={SignupScreen}
          />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ResetPassword"
            component={ResetPasswordScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ResetPasswordTwoScreen"
            component={ResetPasswordTwoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
