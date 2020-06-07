/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { Auth } from './types';

export const updateUserProfile = data => dispatch => {
  dispatch({ type: Auth.START_A_REQUEST });

  return axios
    .put(`/users/${data._id}`, data)
    .then(response => {
      dispatch({ type: Auth.UPDATE_PROFILE_SUCCESS, payload: response.data });
      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Auth.UPDATE_PROFILE_FAILURE,
        payload: error.response?.data || { message: 'Unexpected Error from the app' }
      });
      return null;
    });
};
