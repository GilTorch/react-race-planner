import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, CLEAR_MESSAGE } from './types';
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
        console.log(`LOGIN FAILURE: ${error}`);
        dispatch({ type: LOGIN_FAILURE, data: error });
      });
  };
};

export const clearMessage = () => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
  };
};
