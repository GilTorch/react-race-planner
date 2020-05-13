import { Auth } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  loadingDeleteAccount: false,
  requestError: null,
  token: null,
  currentUser: null,
  deleteSuccess: null
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
    case Auth.DELETE_ACCOUNT_START:
      return {
        ...state,
        loadingDeleteAccount: true
      };
    case Auth.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: null,
        loadingDeleteAccount: false,
        deleteSuccess: true
      };
    case Auth.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loadingDeleteAccount: false,
        requestError: action.data,
        deleteSuccess: null
      };
    default:
      return state;
  }
};
