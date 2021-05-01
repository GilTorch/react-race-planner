import { Platform } from 'react-native';
import axios from 'axios';
import jwt from 'react-native-pure-jwt';
import { ANDROID_BASE_URL, IOS_BASE_URL, JWT_SECRET, RERUM_KEY } from 'react-native-dotenv';
import Constants from 'expo-constants';

import { Auth } from '../redux/actions/types';
import store from '../redux/store';

const platformBaseURL = Platform.OS === 'android' ? ANDROID_BASE_URL : IOS_BASE_URL;


// When it's a device, iOS and Android use the same base url
const axiosOptions = {
  baseURL: Constants.isDevice ? ANDROID_BASE_URL : platformBaseURL,
};

const axiosService = axios.create(axiosOptions);

// Add a request interceptor to automatically add the latest saved token
// to the headers
axiosService.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;
    const mutableConfig = { ...config };

    mutableConfig.headers['X-RERUM-KEY'] = RERUM_KEY;

    if (token) {
      mutableConfig.headers.common.Authorization = `Bearer ${token}`;
    }

    return mutableConfig;
  },
  (err) => Promise.reject(err),
);

// Add a response interceptor to automatically save the token we got from the server
// to the state
axiosService.interceptors.response.use(
  async (response) => {
    if (response.data?.token) {
      // 1. decode the token
      const decodedUser = await jwt.decode(response.data.token, JWT_SECRET);

      decodedUser.isPasswordReset = response.data.isPasswordReset;

      // 2. save the user and the token to the state
      store.dispatch({
        type: Auth.ADD_SESSION,
        data: { user: decodedUser.payload, token: response.data.token },
      });
    }
    return response;
  },
  async (error) => {
    if (error.response?.data?.token) {
      // 1. decode the token
      const decodedUser = await jwt.decode(error.response.data.token, JWT_SECRET);

      decodedUser.isPasswordReset = error.response.data.isPasswordReset;

      // 2. save the user and the token to the state
      store.dispatch({
        type: Auth.ADD_SESSION,
        data: {
          user: decodedUser.payload,
          token: error.response.data.token,
        },
      });
    }
    return Promise.reject(error);
  },
);

export default axiosService;
