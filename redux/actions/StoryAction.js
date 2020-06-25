/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { Story, Home } from './types';

export const joinStoryAction = data => dispatch => {
  dispatch({ type: Story.JOIN_STORY_START });

  return (
    axios
      .put('/documents', data) // TODO: create the endpoint
      // TODO: Save the new story data to the writing reducer
      .then(() => dispatch({ type: Story.JOIN_STORY_SUCCESS }))
      .catch(error => {
        dispatch({ type: Story.JOIN_STORY_FAILURE });

        throw error.response?.data;
      })
  );
};

export const createStoryAction = data => dispatch => {
  dispatch({ type: Home.CREATE_STORY_START });

  return axios
    .post('/documents', data)
    .then(response => {
      dispatch({ type: Home.CREATE_STORY_SUCCESS, story: response.data });
      return response.data;
    })
    .catch(error => {
      dispatch({ type: Home.CREATE_STORY_FAILURE });

      throw error.response?.data;
    });
};
