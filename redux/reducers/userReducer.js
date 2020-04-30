import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

const initialState = {
  loadingLogin: false,
  token: null,
  message: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loadingLogin: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loadingLogin: false,
        token: action.data.token,
        message: action.data.message
      };
    case LOGIN_FAILURE:
      return { ...state, loadingLogin: false, message: action.data.message };
    default:
      return state;
  }
};

export default userReducer;
