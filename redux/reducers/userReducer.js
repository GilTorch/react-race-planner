import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ADD_SESSION,
  CLEAR_MESSAGE
} from '../actions/types';

const initialState = {
  loadingLogin: false,
  token: null,
  currentUser: null,
  message: null,
  code: null
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
    default:
      return state;
  }
};

export default userReducer;
