import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  ADD_SESSION,
  CLEAR_MESSAGE,
  VERIFY_ACCOUNT_START,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILURE,
  RESET_PASSWORD_START,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_VERIFY_START,
  RESET_PASSWORD_VERIFY_FAILURE,
  RESET_PASSWORD_VERIFY_SUCCESS
} from '../actions/types';

const initialState = {
  loadingLogin: false,
  loadingSignup: false,
  loadingVerifyAccount: false,
  loadingPasswordReset: false,
  loadingResetPasswordVerify: false,
  token: null,
  currentUser: null,
  message: null,
  code: null,
  otpSuccess: null,
  resetPasswordVerifySuccess: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SESSION:
      return {
        ...state,
        loadingLogin: false,
        currentUser: action.payload.user
      };
    case LOGIN_START:
      return { ...state, loadingLogin: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loadingLogin: false,
        code: action.data.code,
        token: action.data.token,
        message: action.data.message
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loadingLogin: false,
        code: action.data.code,
        token: action.data.token,
        message: action.data.message
      };
    case SIGNUP_START:
      return { ...state, loadingSignup: true };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loadingSignup: false,
        code: action.data.code,
        token: action.data.token,
        message: action.data.message
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loadingSignup: false,
        code: action.data.code,
        token: action.data.token,
        message: action.data.message
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null
      };
    case VERIFY_ACCOUNT_START:
      return {
        ...state,
        loadingVerifyAccount: true
      };
    case VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        otpSuccess: false,
        code: action.data.code,
        message: action.data.message,
        loadingVerifyAccount: false
      };
    case VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        otpSuccess: true,
        message: 'Your account was successfully activated',
        loadingVerifyAccount: false
      };
    case RESET_PASSWORD_START:
      return {
        ...state,
        loadingPasswordReset: true
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loadingPasswordReset: false,
        message: action.data.message,
        code: action.data.code
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingPasswordReset: false,
        message: action.data.message,
        code: action.data.code,
        token: action.data.token
      };
    case RESET_PASSWORD_VERIFY_START:
      return {
        ...state,
        loadingResetPasswordVerify: true
      };
    case RESET_PASSWORD_VERIFY_FAILURE:
      return {
        ...state,
        loadingResetPasswordVerify: false,
        message: action.data.message,
        resetPasswordVerifySuccess: false
      };
    case RESET_PASSWORD_VERIFY_SUCCESS:
      return {
        ...state,
        loadingResetPasswordVerify: true,
        message: 'The user account was activated successfully',
        resetPasswordVerifySuccess: true
      };
    default:
      return state;
  }
};

export default userReducer;
