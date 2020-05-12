import axios from '../../services/axiosService';
import { Auth } from './types';

export const signUpUser = data => dispatch => {
  dispatch({ type: Auth.SIGN_UP_ATTEMPT });

  return axios.post('/users/signup', data).catch(error => {
    // TODO: handle server error, right now got an error status 500 for duplicated
    // username/email
    // console.log(error);
    dispatch({
      type: Auth.SIGN_UP_FAIL,
      payload: error.response?.data || { message: 'Unexpected Error from the app' }
    });
  });
};

export const clearRequestError = () => dispatch => {
  dispatch({ type: Auth.CLEAR_REQUEST_ERROR });
};

export const logOut = () => dispatch => {
  dispatch({ type: Auth.LOGOUT });
};
