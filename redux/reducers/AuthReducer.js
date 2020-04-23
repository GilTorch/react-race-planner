import { Auth } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  requestError: null,
  token: null,
  currentUser: null,
  tokenExpiration: null
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
    case Auth.SIGN_UP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload.user,
        tokenExpiration: action.payload.user?.exp || null,
        loading: false,
        requestError: null
      };
    case Auth.CLEAR_REQUEST_ERROR:
      return {
        ...state,
        requestError: null
      };
    default:
      return state;
  }
};
