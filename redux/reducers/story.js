import { Story } from '../actions/types';

const INITIAL_STATE = {
  joinStoryLoading: false,
  createStoryLoading: false,
  leaveStoryLoading: false,
  deleteStoryLoading: false,
  createCommentLoading: false,
  createRoundLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Story.COMMENT_ROUND_START:
      return { ...state, createCommentLoading: true };
    case Story.COMMENT_ROUND_FAILURE:
      return { ...state, createCommentLoading: false };
    case Story.COMMENT_ROUND_SUCCESS:
      return { ...state, createCommentLoading: false };
    case Story.JOIN_STORY_START:
      return { ...state, joinStoryLoading: true };
    case Story.JOIN_STORY_FAILURE:
      return { ...state, joinStoryLoading: false };
    case Story.JOIN_STORY_SUCCESS:
      return { ...state, joinStoryLoading: false };
    case Story.LEAVE_STORY_START:
      return { ...state, leaveStoryLoading: true };
    case Story.LEAVE_STORY_FAILURE:
      return { ...state, leaveStoryLoading: false };
    case Story.LEAVE_STORY_SUCCESS:
      return { ...state, leaveStoryLoading: false };
    case Story.DELETE_STORY_START:
      return { ...state, deleteStoryLoading: true };
    case Story.DELETE_STORY_FAILURE:
      return { ...state, deleteStoryLoading: false };
    case Story.DELETE_STORY_SUCCESS:
      return { ...state, deleteStoryLoading: false };
    case Story.CREATE_STORY_START:
      return { ...state, createStoryLoading: true };
    case Story.CREATE_STORY_FAILURE:
      return { ...state, createStoryLoading: false };
    case Story.CREATE_STORY_SUCCESS:
      return { ...state, createStoryLoading: false };
    case Story.CREATE_ROUND_START:
      return { ...state, createRoundLoading: true };
    case Story.CREATE_ROUND_FAILURE:
      return { ...state, createRoundLoading: false };
    case Story.CREATE_ROUND_SUCCESS:
      return { ...state, createRoundLoading: false };
    default:
      return state;
  }
};
