/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { User } from './types';

export const updateUserAction = dataObj => dispatch => {
  dispatch({ type: User.UPDATE_PROFILE_START });

  return axios
    .put(`/users/${dataObj.id}`, dataObj.data)
    .then(() => {
      dispatch({ type: User.UPDATE_PROFILE_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: User.UPDATE_PROFILE_FAILURE });

      throw error.response?.data;
    });
};
