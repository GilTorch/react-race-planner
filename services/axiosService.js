import axios from 'axios';
import store from '../redux/store';

const axiosOptions = {
  baseURL: 'http://10.0.2.2:3000/api/v1' // TODO: get the vaseURL from the ENV
};

const axiosService = axios.create(axiosOptions);

// Add a request interceptor to automatically add the latest saved token
// to the headers
axiosService.interceptors.request.use(
  config => {
    const { token } = store.getState().auth;
    const mutableConfig = { ...config };
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
    if (response.data?.token) {
      // 1. decode the token
      // const decodedUser = jwt.decode(response.data.token, '&^GF^%D^Y&^*G(H9gs');
      // 2. save the user and the token to the state
      // store.dispatch({
      //   type: 'ADD_SESSION',
      //   payload: { user: decodedUser, token: response.data.token }
      // });
    }
    return response;
  },
  error => Promise.reject(error)
);

export default axiosService;
