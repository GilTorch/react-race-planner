/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { Story, Home } from './types';

export const createReportAction = data => dispatch => {
  dispatch({ type: Story.EPORT_STORY_START });

  return axios
    .post('/reports', data)
    .then(() => dispatch({ type: Story.EPORT_STORY_SUCCESS }))
    .catch(error => {
      dispatch({ type: Story.EPORT_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const getAllStoriesAction = () => dispatch => {
  dispatch({ type: Home.GET_ALL_STORIES_START });

  return axios
    .get('/documents')
    .then(response => {
      dispatch({ type: Home.GET_ALL_STORIES_SUCCESS, stories: response.data });
    })
    .catch(error => {
      dispatch({ type: Home.GET_ALL_STORIES_FAILURE });

      throw error.response?.data;
    });
};

export const getAllGenresAction = () => dispatch => {
  dispatch({ type: Home.GET_ALL_GENRES_START });

  return axios
    .get('/story-genres')
    .then(response => {
      dispatch({ type: Home.GET_ALL_GENRES_SUCCESS, genres: response.data });
    })
    .catch(error => {
      dispatch({ type: Home.GET_ALL_GENRES_FAILURE });

      throw error.response?.data;
    });
};
