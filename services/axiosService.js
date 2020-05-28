import { Platform } from 'react-native';
import axios from 'axios';
import jwt from 'expo-jwt';
import { ANDROID_BASE_URL, IOS_BASE_URL, JWT_SECRET, RERUM_KEY } from 'react-native-dotenv';
import { Auth } from '../redux/actions/types';
import store from '../redux/store';

const axiosOptions = {
  baseURL: Platform.OS === 'android' ? ANDROID_BASE_URL : IOS_BASE_URL
};

const axiosService = axios.create(axiosOptions);

// Add a request interceptor to automatically add the latest saved token
// to the headers
axiosService.interceptors.request.use(
  config => {
    const { token } = store.getState().auth;
    const mutableConfig = { ...config };

    mutableConfig.headers['X-RERUM-KEY'] = RERUM_KEY;

    if (token) {
      mutableConfig.headers.common.Authorization = `Bearer ${token}`;
    }

    return mutableConfig;
  },
  err => Promise.reject(err)
);

// Add a response interceptor to automatically save the token we got from the server
// to the state
axiosService.interceptors.response.use(
  async response => {
    if (response.data?.token) {
      // 1. decode the token
      const decodedUser = jwt.decode(response.data.token, JWT_SECRET);

      decodedUser.isPasswordReset = response.data.isPasswordReset;

      // 2. save the user and the token to the state
      store.dispatch({
        type: Auth.ADD_SESSION,
        data: { user: decodedUser, token: response.data.token }
      });
    }
    return response;
  },
  error => {
    if (error.response.data?.token) {
      // 1. decode the token
      const decodedUser = jwt.decode(error.response.data.token, JWT_SECRET);

      decodedUser.isPasswordReset = error.response.data.isPasswordReset;

      // 2. save the user and the token to the state
      store.dispatch({
        type: Auth.ADD_SESSION,
        data: {
          user: decodedUser,
          token: error.response.data.token
        }
      });
    }
    return Promise.reject(error);
  }
);

export default axiosService;
