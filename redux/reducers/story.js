import { Story } from '../actions/types';

const INITIAL_STATE = {
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Story.JOIN_STORY_START:
      return { ...state, loading: true };
    case Story.JOIN_STORY_FAILURE:
      return { ...state, loading: false };
    case Story.JOIN_STORY_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
