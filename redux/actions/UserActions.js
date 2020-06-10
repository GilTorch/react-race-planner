/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { User } from './types';

export const updateUserAction = dataObj => dispatch => {
  dispatch({ type: User.UPDATE_PROFILE_START });

  return axios
    .put(`/users/${dataObj.id}`, dataObj.data)
    .then(response => {
      const { user } = response.data;
      delete user.isActive;
      // console.log('resonse', user);
      dispatch({ type: User.UPDATE_PROFILE_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: User.UPDATE_PROFILE_FAILURE });

      throw error.response?.data;
    });
};

export const updateUserPreferenceAction = dataObj => dispatch => {
  dispatch({ type: User.UPDATE_USER_PREFERENCE_START });

  return axios
    .put(`/preferences/${dataObj.id}`, dataObj.data)
    .then(() => {
      dispatch({ type: User.UPDATE_USER_PREFERENCE_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: User.UPDATE_USER_PREFERENCE_FAILURE });

      throw error.response?.data;
    });
};
