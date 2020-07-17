import axios from '../../services/axiosService';
import { Story } from './types';

export const deleteCommentAction = (commentId) => (dispatch) => {
  dispatch({ type: Story.DELETE_COMMENT_START });

  return axios
    .delete(`/comments/${commentId}`)
    .then((response) => {
      dispatch({ type: Story.DELETE_COMMENT_SUCCESS, story: response.data.story });
    })
    .catch((error) => {
      dispatch({ type: Story.DELETE_COMMENT_FAILURE });

      throw error.response?.data;
    });
};

export const joinStoryAction = (storyId, userId, privacyStatus) => (dispatch) => {
  dispatch({ type: Story.JOIN_STORY_START });

  return axios
    .post(`/documents/${storyId}/authors/${userId}`, { privacyStatus })
    .then((response) => dispatch({ type: Story.JOIN_STORY_SUCCESS, story: response.data.story }))
    .catch((error) => {
      dispatch({ type: Story.JOIN_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const createStoryAction = (data) => (dispatch) => {
  dispatch({ type: Story.CREATE_STORY_START });

  return axios
    .post('/documents', data)
    .then((response) => {
      dispatch({ type: Story.CREATE_STORY_SUCCESS, story: response.data.story });
      return response.data;
    })
    .catch((error) => {
      dispatch({ type: Story.CREATE_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const createRoundAction = (data, storyId, roundId) => (dispatch) => {
  dispatch({ type: Story.CREATE_ROUND_START });
  let urlString = `/documents/${storyId}/document-parts`;

  if (roundId) {
    urlString = `/documents/${storyId}/document-parts/${roundId}`;
  }

  // When `roundId` exists, it means it's a round submission, not an intro nor outro
  // So we do a `put` instead of a `post`. Because we're updating the data
  // not creating a new one
  return axios[roundId ? 'put' : 'post'](urlString, data)
    .then((response) => {
      dispatch({ type: Story.CREATE_ROUND_SUCCESS, story: response.data.story });
    })
    .catch((error) => {
      dispatch({ type: Story.CREATE_ROUND_FAILURE });

      throw error.response?.data;
    });
};

export const leaveStoryAction = (storyId, userId) => (dispatch) => {
  dispatch({ type: Story.LEAVE_STORY_START });

  // Delete all parts for this author
  return axios
    .delete(`/documents/${storyId}/authors/${userId}`)
    .then(() => {
      dispatch({ type: Story.LEAVE_STORY_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: Story.LEAVE_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const deleteStoryAction = (storyId) => (dispatch) => {
  dispatch({ type: Story.DELETE_STORY_START });

  return axios
    .delete(`/documents/${storyId}`)
    .then(() => {
      dispatch({ type: Story.DELETE_STORY_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: Story.DELETE_STORY_FAILURE });

      throw error.response?.data;
    });
};

export const skipRoundAction = (storyId, documentPartId) => (dispatch) => {
  dispatch({ type: Story.SKIP_ROUND_START });

  return axios
    .put(`/documents/${storyId}/skip-turn`, { documentPartId })
    .then((response) => {
      dispatch({ type: Story.SKIP_ROUND_SUCCESS, story: response.data.story });
    })
    .catch((error) => {
      dispatch({ type: Story.SKIP_ROUND_FAILURE });

      throw error.response?.data;
    });
};

export const reportCommentAction = ({ commentId, report }) => (dispatch) => {
  dispatch({ type: Story.REPORT_COMMENT_START });
  return axios
    .post(`/comments/${commentId}/reports`, { report })
    .then(() => {
      dispatch({ type: Story.REPORT_COMMENT_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: Story.REPORT_COMMENT_FAILURE });

      throw error.response?.data;
    });
};

export const createCommentAction = (data, documentPartId) => (dispatch) => {
  dispatch({ type: Story.COMMENT_ROUND_START });

  return axios
    .post(`/comments/${documentPartId}`, data)
    .then((response) => {
      dispatch({ type: Story.COMMENT_ROUND_SUCCESS, story: response.data.story });
    })
    .catch((error) => {
      dispatch({ type: Story.COMMENT_ROUND_FAILURE });

      throw error.response?.data;
    });
};

export const voteForRoundAction = (storyId, roundId) => (dispatch) => {
  dispatch({ type: Story.ROUND_VOTE_START });

  return axios
    .post(`/votes/${storyId}/${roundId}`)
    .then((response) => {
      dispatch({ type: Story.ROUND_VOTE_SUCCESS, story: response.data.story });
    })
    .catch((error) => {
      dispatch({ type: Story.ROUND_VOTE_FAILURE });

      throw error.response?.data;
    });
};

export const getSelectedStoryAction = (storyId) => (dispatch) => {
  dispatch({ type: Story.GET_SELECTED_STORY_START });

  return axios
    .get(`/documents/${storyId}`)
    .then((response) => {
      dispatch({ type: Story.GET_SELECTED_STORY_SUCCESS, story: response.data.story });
    })
    .catch((error) => {
      dispatch({ type: Story.GET_SELECTED_STORY_FAILURE });

      throw error.response?.data;
    });
};
