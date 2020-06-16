import { Story } from '../actions/types';

const initialState = {
  loading: false
};

const StoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Story.DELETE_COMMENT_START:
      return { ...state, loading: true };
    case Story.DELETE_COMMENT_FAILURE:
      return { ...state, loading: false };
    case Story.DELETE_COMMENT_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default StoryReducer;
