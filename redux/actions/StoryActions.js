import axios from '../../services/axiosService';
import { Story } from './types';

export const deleteCommentAction = commentId => dispatch => {
  dispatch({ type: Story.DELETE_COMMENT_START });

  return axios
    .delete(`/comments/${commentId}`)
    .then(() => {
      dispatch({ type: Story.DELETE_COMMENT_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: Story.DELETE_COMMENT_FAILURE });

      throw error.response?.data;
    });
};
