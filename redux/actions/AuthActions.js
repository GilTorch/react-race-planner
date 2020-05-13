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

export const deleteAccount = currentUserId => {
  return dispatch => {
    dispatch({ type: Auth.DELETE_ACCOUNT_START });
    return axios.delete(`/users/${currentUserId}`).then(
      res => {
        dispatch({ type: Auth.DELETE_ACCOUNT_SUCCESS, data: res.data });
      },
      error => {
        dispatch({
          type: Auth.DELETE_ACCOUNT_FAILURE,
          data: error.response?.data || { message: 'Unexpected Error from the app' }
        });
      }
    );
  };
};
