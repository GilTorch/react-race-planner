import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_MESSAGE,
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE
} from './types';
import axios from '../../services/axiosService';

export const login = payload => {
  console.log(`LOGIN PAYLOAD: ${JSON.stringify(payload)}`);
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

export const clearMessage = () => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
  };
};

export const verifyOTP = payload => {
  return dispatch => {
    dispatch({ type: VERIFY_OTP_START });
    return axios
      .post('/users/signup/verify', payload)
      .then(res => {
        console.log('OTP SENT SUCCESSFULLY');
        dispatch({ type: VERIFY_OTP_SUCCESS, data: res.data });
      })
      .catch(error => {
        console.log('OTP SENT BUT RETURNED ERROR');
        dispatch({ type: VERIFY_OTP_FAILURE, data: error.response.data });
      });
  };
};
