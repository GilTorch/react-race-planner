import axios from '../../services/axiosService';
import { Story } from './types';

export const createCommentAction = data => dispatch => {
  dispatch({ type: Story.COMMENT_ROUND_START });

  return axios
    .post('/comments', data)
    .then(response => {
      dispatch({ type: Story.COMMENT_ROUND_SUCCESS });
      return response.data;
    })
    .catch(error => {
      dispatch({ type: Story.COMMENT_ROUND_FAILURE });

      throw error.response?.data;
    });
};
