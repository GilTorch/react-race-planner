import { Story } from '../actions/types';

const INITIAL_STATE = {
  joinStoryLoading: false,
  createStoryLoading: false,
  leaveStoryLoading: false,
  deleteStoryLoading: false,
  loadingReportComment: false,
  createRoundLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case Story.REPORT_COMMENT_START:
      return { ...state, loadingReportComment: true };
    case Story.REPORT_COMMENT_FAILURE:
      return { ...state, loadingReportComment: false };
    case Story.REPORT_COMMENT_SUCCESS:
      return { ...state, loadingReportComment: false };
    default:
      return state;
  }
};
