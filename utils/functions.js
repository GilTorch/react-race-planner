import Constants from 'expo-constants';
import { Platform } from 'react-native';
import {
  ANDROID_SERVER_URL,
  IOS_SERVER_URL,
  USER_AVATAR_UPLOAD_LOCATION,
} from 'react-native-dotenv';

const platformServerURL = Platform.OS === 'android' ? ANDROID_SERVER_URL : IOS_SERVER_URL;

export const getUserProfileUri = (userPicture) => {
  if (!userPicture) {
    return null;
  }

  if (userPicture.startsWith('http')) {
    return userPicture;
  }

  const baseUri = Constants.isDevice ? ANDROID_SERVER_URL : platformServerURL;
  const profileUri = `${baseUri}/${USER_AVATAR_UPLOAD_LOCATION}/${userPicture}`;

  return profileUri;
};

export const avatarGenerator = (username) => `https://api.adorable.io/avatars/${username}.png`;
