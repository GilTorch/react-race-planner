import { Auth } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  requestError: null,
  token: null,
  currentUser: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Auth.SIGN_UP_ATTEMPT:
      return { ...state, loading: true };
    case Auth.SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        requestError: action.payload
      };
    case Auth.ADD_SESSION:
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload.user,
        loading: false,
        requestError: null
      };
    case Auth.CLEAR_REQUEST_ERROR:
      return {
        ...state,
        requestError: null
      };
    case Auth.LOGOUT:
      return {
        ...state,
        token: null,
        currentUser: null
      };
    default:
      return state;
  }
};
