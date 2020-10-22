import * as Facebook from 'expo-facebook';
import axios from 'axios';
import { Alert } from 'react-native';
import { expo } from '../app.json';

Facebook.initializeAsync({
  appId: expo.facebookAppId,
});

const logIn = async () => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      const response = await axios.get(
        `https://graph.facebook.com/me?access_token=${token}&fields=email,first_name,last_name`,
      );
      const facebookData = await response.data;
      return facebookData;
    }
    return {};
  } catch ({ message }) {
    Alert.alert(`Facebook Login Error: ${message}`);
    return {};
  }
};

export { logIn };
