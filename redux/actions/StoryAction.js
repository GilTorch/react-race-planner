/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { Story } from './types';

export const joinStoryAction = (storyId, userId, privacyStatus) => dispatch => {
  dispatch({ type: Story.JOIN_STORY_START });

  return axios
    .post(`/documents/${storyId}/authors/${userId}`, { privacyStatus })
    .then(response => dispatch({ type: Story.JOIN_STORY_SUCCESS, story: response.data.story }))
    .catch(error => {
      dispatch({ type: Story.JOIN_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const createStoryAction = data => dispatch => {
  dispatch({ type: Story.CREATE_STORY_START });

  return axios
    .post('/documents', data)
    .then(response => {
      dispatch({ type: Story.CREATE_STORY_SUCCESS, story: response.data.story });
      return response.data;
    })
    .catch(error => {
      dispatch({ type: Story.CREATE_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const leaveStoryAction = (storyId, userId) => dispatch => {
  dispatch({ type: Story.LEAVE_STORY_START });

  // Delete all parts for this author
  return axios
    .delete(`/documents/${storyId}/authors/${userId}`)
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
