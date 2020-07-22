/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { User } from './types';

export const updateUserAction = (dataObj) => (dispatch) => {
  dispatch({ type: User.UPDATE_PROFILE_START });

  return axios
    .put(`/users/${dataObj.id}`, dataObj.data)
    .then((response) => {
      const { user } = response.data;
      dispatch({ type: User.UPDATE_PROFILE_SUCCESS, payload: user });
    })
    .catch((error) => {
      dispatch({ type: User.UPDATE_PROFILE_FAILURE });

      throw error.response?.data;
    });
};

export const updateUserPreferenceAction = (dataObj) => (dispatch) => {
  dispatch({ type: User.UPDATE_USER_PREFERENCE_START });

  return axios
    .put(`/preferences/${dataObj.id}`, dataObj.data)
    .then(() => {
      dispatch({ type: User.UPDATE_USER_PREFERENCE_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: User.UPDATE_USER_PREFERENCE_FAILURE });

      throw error.response?.data;
    });
};

export const savePushTokenAction = (token) => (dispatch) => {
  alert(`trying to save the token ${token}`);
  return axios.post('/users/save-push-token', { token }).catch((error) => {
    console.error("failed to save the user's token", error);
  });
};
