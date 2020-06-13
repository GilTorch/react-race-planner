import { Story } from '../actions/types';

const INITIAL_STATE = {
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Story.REPORT_STORY_START:
      return { ...state, loading: true };
    case Story.REPORT_STORY_FAILURE:
      return { ...state, loading: false };
    case Story.REPORT_STORY_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
