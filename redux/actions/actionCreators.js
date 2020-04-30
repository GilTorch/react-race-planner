import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';
import axios from '../../services/axiosService';

export const login = payload => {
  return dispatch => {
    dispatch({ type: LOGIN_START });
    return axios
      .post('/users/login', payload)
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, data: res.data });
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILURE, data: error.response.data });
      });
  };
};
