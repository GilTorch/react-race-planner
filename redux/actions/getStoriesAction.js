import qUrl from 'quick-url';
import { Home, Library, Writing } from './types';
import axios from '../../services/axiosService';

export const getStoriesAction = (
  { page = 1, rows = 10, sq, status, genres, authorsRange, screen = 'home' } = {}
  // { cancelToken = undefined } = { cancelToken: undefined }
) => dispatch => {
  if (screen === 'home') {
    dispatch({ type: Home.GET_ACTIVE_STORIES_START });
  } else if (screen === 'library') {
    dispatch({ type: Library.GET_COMPLETED_STORIES_START });
  } else {
    dispatch({ type: Writing.GET_SELF_STORIES_START });
  }

  const url = qUrl.buildUrl(['/documents'], {
    page,
    rows,
    sq,
    status,
    genres,
    authorsRange
  });

  return axios
    .get(url)
    .then(response => response.data)
    .then(response => {
      if (screen === 'home') {
        dispatch({
          type: Home.UPDATE_ACTIVE_STORIES,
          data: true
        });

        dispatch({
          type: Home.GET_ACTIVE_STORIES_SUCCESS,
          data: response.stories
        });
      } else if (screen === 'library') {
        dispatch({
          type: Library.UPDATE_COMPLETED_STORIES,
          data: true
        });

        dispatch({
          type: Library.GET_COMPLETED_STORIES_SUCCESS,
          data: response.stories
        });
      } else {
        dispatch({
          type: Writing.UPDATE_SELF_STORIES,
          data: true
        });

        dispatch({
          type: Writing.GET_SELF_STORIES_SUCCESS,
          data: response.stories
        });
      }
    })
    .catch(error => {
      if (screen === 'home') {
        dispatch({ type: Home.GET_ACTIVE_STORIES_FAILURE });
      } else if (screen === 'library') {
        dispatch({ type: Library.GET_COMPLETED_STORIES_FAILURE });
      } else {
        dispatch({ type: Writing.GET_SELF_STORIES_FAILURE });
      }

      // if (axios.isCancel(error)) throw Error('Cancelled');

      throw error?.response?.data || { message: 'Something unexpected happened' };
    });
};
