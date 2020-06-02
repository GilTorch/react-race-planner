import axios from '../../services/axiosService';
import { Auth } from './types';

export const signupAction = data => dispatch => {
  dispatch({ type: Auth.SIGNUP_START });

  return axios
    .post('/users/signup', data)
    .then(() => dispatch({ type: Auth.SIGNUP_SUCCESS }))
    .catch(error => {
      dispatch({ type: Auth.SIGNUP_FAILURE });

      throw error.response?.data;
    });
};

export const accountVerificationAction = data => dispatch => {
  dispatch({ type: Auth.VERIFY_ACCOUNT_START });

  return axios
    .post('/users/signup/verify', data)
    .then(() => dispatch({ type: Auth.VERIFY_ACCOUNT_SUCCESS }))
    .catch(error => {
      dispatch({ type: Auth.VERIFY_ACCOUNT_FAILURE });

      throw error.response?.data;
    });
};

export const otpCodeAction = usage => dispatch => {
  dispatch({ type: Auth.RESEND_OTP_START });

  return axios
    .post('/users/otp', { usage })
    .then(() => dispatch({ type: Auth.RESEND_OTP_SUCCESS }))
    .catch(error => {
      dispatch({ type: Auth.RESEND_OTP_FAILURE });

      throw error?.response?.data || { message: 'Something unexpected happened' };
    });
};

export const loginAction = data => dispatch => {
  dispatch({ type: Auth.LOGIN_START });

  return axios
    .post('/users/login', data)
    .then(() => dispatch({ type: Auth.LOGIN_SUCCESS }))
    .catch(error => {
      dispatch({ type: Auth.LOGIN_FAILURE });

      throw error.response?.data;
    });
};

export const passwordResetAction = data => dispatch => {
  dispatch({ type: Auth.RESET_PASSWORD_START });

  return axios
    .post('/users/password-reset', data)
    .then(() => dispatch({ type: Auth.RESET_PASSWORD_SUCCESS }))
    .catch(error => {
      dispatch({ type: Auth.RESET_PASSWORD_FAILURE });

      throw error.response?.data;
    });
};

export const passwordResetVerificationAction = data => dispatch => {
  dispatch({ type: Auth.RESET_PASSWORD_VERIFY_START });

  return axios
    .post('/users/password-reset/verify', data)
    .then(() => dispatch({ type: Auth.RESET_PASSWORD_VERIFY_SUCCESS }))
    .catch(error => {
      dispatch({ type: Auth.RESET_PASSWORD_VERIFY_FAILURE });

      throw error.response?.data;
    });
};

export const logoutAction = () => dispatch => {
  dispatch({ type: Auth.LOGOUT });
};

export const deleteAccount = currentUserId => {
  return dispatch => {
    dispatch({ type: Auth.DELETE_ACCOUNT_START });
    return axios.delete(`/users/${currentUserId}`).then(
      res => {
        dispatch({ type: Auth.DELETE_ACCOUNT_SUCCESS, data: res.data });
      },
      error => {
        dispatch({
          type: Auth.DELETE_ACCOUNT_FAILURE,
          data: error.response?.data || { message: 'Unexpected Error from the app' }
        });
      }
    );
  };
};
