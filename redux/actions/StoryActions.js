/* eslint-disable no-underscore-dangle */
import axios from '../../services/axiosService';
import { Story } from './types';

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
