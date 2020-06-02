import { Auth } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  requestError: null,
  token: null,
  currentUser: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Auth.SIGNUP_START:
      return { ...state, loading: true };
    case Auth.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case Auth.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false
      };
    case Auth.ADD_SESSION:
      return {
        ...state,
        token: action.data.token,
        currentUser: action.data.user,
        loading: false
      };
    case Auth.LOGIN_START:
      return { ...state, loading: true };
    case Auth.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case Auth.LOGIN_FAILURE:
      return {
        ...state,
        loading: false
      };
    case Auth.VERIFY_ACCOUNT_START:
      return {
        ...state,
        loading: true
      };
    case Auth.VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false
      };
    case Auth.VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        token: null, // Get rid of the temporary token
        currentUser: null // And its user data
      };
    case Auth.RESET_PASSWORD_START:
      return {
        ...state,
        loading: true
      };
    case Auth.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false
      };
    case Auth.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: { ...state.currentUser, isPasswordReset: true }
      };
    case Auth.RESEND_OTP_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, isPasswordReset: true }
      };
    case Auth.RESET_PASSWORD_VERIFY_START:
      return {
        ...state,
        loading: true
      };
    case Auth.RESET_PASSWORD_VERIFY_FAILURE:
      return {
        ...state,
        loading: false
      };
    case Auth.RESET_PASSWORD_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        token: null, // Get rid of the temporary token
        currentUser: null // And its user data
      };
    case Auth.LOGOUT:
      return {
        ...state,
        token: null,
        currentUser: null
      };
    case Auth.DELETE_ACCOUNT_START:
      return {
        ...state,
        loading: true
      };
    case Auth.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: null,
        loading: false
      };
    case Auth.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        requestError: action.data
      };
    default:
      return state;
  }
};
