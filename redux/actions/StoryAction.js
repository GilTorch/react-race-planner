/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { Story } from './types';

export const joinStoryAction = data => dispatch => {
  dispatch({ type: Story.JOIN_STORY_START });

  return (
    axios
      .post('/join-document-parts', data) // TODO: create the endpoint
      // TODO: handle story has minimum authors
      .then(() => dispatch({ type: Story.JOIN_STORY_SUCCESS }))
      .catch(error => {
        dispatch({ type: Story.JOIN_STORY_FAILURE });

        throw error.response?.data;
      })
  );
};
