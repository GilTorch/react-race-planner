import { Auth } from '../actions/types';

const INITIAL_STATE = {
  signUpIsLoading: false,
  signUpError: null,
  token: null,
  tokenExpiration: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // SIGNUP
    case Auth.SIGN_UP_ATTEMPT:
      return { ...state, signUpIsLoading: true };

    case Auth.SIGN_UP_FAIL:
      return {
        ...state,
        signUpIsLoading: false,
        signUpError: action.payload
      };

    case Auth.SIGN_UP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        tokenExpiration: action.payload.expiration,
        signUpIsLoading: false,
        signUpError: null
      };
    default:
      return state;
  }
};
