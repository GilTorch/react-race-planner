/* eslint-disable no-throw-literal */
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

export const createRoundAction = (data, storyId) => (dispatch) => {
  dispatch({ type: Story.CREATE_ROUND_START });

  return axios
    .post(`/documents/${storyId}/document-parts`, data)
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
