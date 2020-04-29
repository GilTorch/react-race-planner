import axios from '../../services/axiosService';
import { Auth } from './types';
import { NEW_SESSION_URL } from '../../api/urls';

export const signUpUser = ({ username, firstName, lastName, email, password }) => dispatch => {
  dispatch({ type: Auth.SIGN_UP_ATTEMPT });

  return axios
    .post(`http://10.0.2.2:3000/api/v1${NEW_SESSION_URL}`, {
      username,
      firstName,
      lastName,
      email,
      password
    })
    .catch(error => {
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
