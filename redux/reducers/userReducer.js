import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  ADD_SESSION,
  CLEAR_MESSAGE,
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE
} from '../actions/types';

const initialState = {
  loadingLogin: false,
  loadingSignup: false,
  loadingVerifyOTP: false,
  token: null,
  currentUser: null,
  message: null,
  code: null,
  otpSuccess: null
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
    case VERIFY_OTP_START:
      return {
        ...state,
        loadingVerifyOTP: true
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        otpSuccess: false,
        code: action.data.code,
        message: action.data.message,
        loadingVerifyOTP: false
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpSuccess: true,
        message: 'Your account was successfully activated',
        loadingVerifyOTP: false
      };
    default:
      return state;
  }
};

export default userReducer;
