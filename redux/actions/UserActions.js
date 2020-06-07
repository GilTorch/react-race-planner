import axios from '../../services/axiosService';
import { Auth } from './types';

export const updateUserProfile = data => dispatch => {
  dispatch({ type: Auth.START_A_REQUEST });

  return axios
    .put(`/users/${data.id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      alert('got them');
      dispatch({ type: Auth.UPDATE_PROFILE_SUCCESS, payload: response.data });
      return response.data;
    })
    .catch(error => {
      alert(JSON.stringify(error));

      dispatch({
        type: Auth.UPDATE_PROFILE_FAILURE,
        payload: error.response?.data || { message: 'Unexpected Error from the app' }
      });
      return null;
    });
};