import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ADD_SESSION,
  CLEAR_MESSAGE,
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE
} from '../actions/types';

const initialState = {
  loadingLogin: false,
  loadingSendOTP: false,
  token: null,
  currentUser: null,
  message: null,
  code: null,
  otpSuccess: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case ADD_SESSION:
      return {
        ...state,
        loadingLogin: false,
        currentUser: action.payload.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loadingLogin: false,
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
        loadingSendOTP: true
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        otpSuccess: false,
        code: action.data.code,
        message: action.data.message,
        loadingSendOTP: false
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpSuccess: true,
        message: 'Your account was successfully activated',
        loadingSendOTP: true
      };
    default:
      return state;
  }
};

export default userReducer;
