import axios from '../../services/axiosService';
import { Home } from './types';

export const createStoryAction = data => dispatch => {
  dispatch({ type: Home.CREATE_STORY_START });

  return axios
    .post('/documents/', data)
    .then(response => {
      dispatch({ type: Home.CREATE_STORY_SUCCESS, story: response.data });
      return response.data;
    })
    .catch(error => {
      dispatch({ type: Home.CREATE_STORY_FAILURE });

      throw error.response?.data;
    });
};
