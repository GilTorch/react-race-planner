/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { Auth } from './types';

export const updateUserAction = dataObj => dispatch => {
  dispatch({ type: Auth.START_A_REQUEST });

  return axios
    .put(`/users/${dataObj.id}`, dataObj.data)
    .then(response => {
      dispatch({ type: Auth.UPDATE_PROFILE_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: Auth.UPDATE_PROFILE_FAILURE });

      throw error.response?.data;
    });
};
