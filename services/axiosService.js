import axios from 'axios';
import jwt from 'expo-jwt';
import store from '../redux/store';

const axiosOptions = {
  baseURL: 'http://localhost:3000/api/v1' // TODO: get the vaseURL from the ENV
};

const axiosService = axios.create(axiosOptions);

// Add a request interceptor to automatically add the latest saved token
// to the headers
axiosService.interceptors.request.use(
  config => {
    const { token } = store.getState().user;
    const mutableConfig = { ...config };
    mutableConfig.headers['X-RERUM-KEY'] =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0RldiI6dHJ1ZSwiaWF0IjoxNTg4Mjg1NDU2fQ.Q0xXrgI411ZmHnkUXkjdg9V2j_TTznZ-zSYb1LtSLVY';
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
  response => {
    console.log(`INTERCEPTORS RESPONSE: ${response}`);
    if (response.data?.token) {
      // 1. decode the token
      const decodedUser = jwt.decode(response.data.token, '&^GF^%D^Y&^*G(H9gs');
      // 2. save the user and the token to the state
      store.dispatch({
        type: 'ADD_SESSION',
        payload: {
          user: decodedUser,
          token: response.data.token,
          tokenExpiration: decodedUser.exp
        }
      });
    }
    return response;
  },
  error => Promise.reject(error)
);

export default axiosService;
