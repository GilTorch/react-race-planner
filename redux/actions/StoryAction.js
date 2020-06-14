import axios from '../../services/axiosService';
import { Story } from './types';

export const createCommentAction = data => dispatch => {
  dispatch({ type: Story.COMMENT_ROUND_START });

  return axios
    .post('/comments', data)
    .then(() => dispatch({ type: Story.COMMENT_ROUND_SUCCESS }))
    .catch(error => {
      dispatch({ type: Story.COMMENT_ROUND_FAILURE });

      throw error.response?.data;
    });
};
