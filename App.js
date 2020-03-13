import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import SignupScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ResetPasswordTwoScreen from "./screens/ResetPasswordTwoScreen";

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
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
          "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
          "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
          "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
          "Roboto-ThinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf")
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
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator>
            {/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}
            <Stack.Screen
              options={{ headerShown: false }}
              name="Root"
              component={SignupScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
