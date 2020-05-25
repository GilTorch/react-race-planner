import { Platform } from 'react-native';
import axios from 'axios';
import jwt from 'expo-jwt';
import { Auth } from '../redux/actions/types';
import store from '../redux/store';

const axiosOptions = {
  // TODO: get the baseURL from the ENV
  baseURL:
    Platform.OS === 'android' ? 'http://10.0.2.2:3000/api/v1' : 'http://localhost:3000/api/v1'
};

const axiosService = axios.create(axiosOptions);

// Add a request interceptor to automatically add the latest saved token
// to the headers
axiosService.interceptors.request.use(
  config => {
    const { token } = store.getState().auth;
    const mutableConfig = { ...config };
    // TODO: get the token from the ENV variable
    mutableConfig.headers['X-RERUM-KEY'] =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0RldiI6dHJ1ZSwiaWF0IjoxNTg4Mjc3OTQ2fQ.J-5O1kUdIgnbJAkVRmikS66WUqUBlzbSlNvCtLtK1t0';

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
      const decodedUser = jwt.decode(response.data.token, '&^GF^%D^Y&^*G(H9gs');

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
      const decodedUser = jwt.decode(error.response.data.token, '&^GF^%D^Y&^*G(H9gs');

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
