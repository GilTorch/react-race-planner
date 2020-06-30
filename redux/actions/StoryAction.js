import axios from '../../services/axiosService';
import { Story } from './types';

export const createStoryAction = data => dispatch => {
  dispatch({ type: Story.CREATE_STORY_START });

  return axios
    .post('/documents/', data)
    .then(response => {
      dispatch({ type: Story.CREATE_STORY_SUCCESS, story: response.data });
      return response.data;
    })
    .catch(error => {
      dispatch({ type: Story.CREATE_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const leaveStoryAction = storyId => dispatch => {
  dispatch({ type: Story.LEAVE_STORY_START });

  return axios
    .put(`/documents/${storyId}/author`)
    .then(() => {
      dispatch({ type: Story.LEAVE_STORY_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: Story.LEAVE_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const deleteStoryAction = storyId => dispatch => {
  dispatch({ type: Story.DELETE_STORY_START });

  return axios
    .delete(`/documents/${storyId}`)
    .then(() => {
      dispatch({ type: Story.DELETE_STORY_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: Story.DELETE_STORY_FAILURE });

      throw error.response?.data;
    });
};
