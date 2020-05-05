import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CLEAR_MESSAGE,
  VERIFY_ACCOUNT_START,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILURE
} from './types';
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
        let response = { message: 'We have issues connecting with the server. Try again later' };
        if (error.response && error.response.data) {
          response = error.response.data;
        }
        dispatch({ type: LOGIN_FAILURE, data: response });
      });
  };
};

export const signup = payload => {
  return dispatch => {
    dispatch({ type: SIGNUP_START });
    return axios
      .post('/users/signup', payload)
      .then(res => {
        dispatch({ type: SIGNUP_SUCCESS, data: res.data });
      })
      .catch(error => {
        let response = { message: 'We have issues connecting with the server. Try again later' };
        if (error.response && error.response.data) {
          response = error.response.data;
        }
        dispatch({ type: SIGNUP_FAILURE, data: response });
      });
  };
};

export const clearMessage = () => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
  };
};

export const verifyAccount = payload => {
  return dispatch => {
    dispatch({ type: VERIFY_ACCOUNT_START });
    return axios
      .post('/users/signup/verify', payload)
      .then(res => {
        dispatch({ type: VERIFY_ACCOUNT_SUCCESS, data: res.data });
      })
      .catch(error => {
        dispatch({ type: VERIFY_ACCOUNT_FAILURE, data: error.response.data });
      });
  };
};
