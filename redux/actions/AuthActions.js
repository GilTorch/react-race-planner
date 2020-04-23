import jwt from 'expo-jwt';
import axios from 'axios';
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
    .then(async response => {
      const decodedUser = await jwt.decode(response.data.token, '&^GF^%D^Y&^*G(H9gs', {
        timeSkew: 30
      });

      dispatch({
        type: Auth.SIGN_UP_SUCCESS,
        payload: { user: decodedUser, token: response.data.token }
      });
      return decodedUser;
    })
    .catch(error => {
      // console.log(error);
      dispatch({
        type: Auth.SIGN_UP_FAIL,
        payload: error.response ? error.response.data : { message: 'Unexpected Error' }
      });
    });
};

export const clearRequestError = () => dispatch => {
  dispatch({ type: Auth.CLEAR_REQUEST_ERROR });
};

export const logOutUser = redirectToLogin => dispatch => {
  redirectToLogin();
  dispatch({ type: Auth.LOGOUT });
};
