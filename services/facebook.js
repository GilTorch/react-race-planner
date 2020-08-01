import * as Facebook from 'expo-facebook';
import axios from 'axios';
import { Alert } from 'react-native';
import { expo } from '../app.json';

const logIn = async () => {
  try {
    await Facebook.initializeAsync(expo.facebookAppId);
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
