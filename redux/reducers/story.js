import { Story } from '../actions/types';

const INITIAL_STATE = {
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Story.COMMENT_ROUND_START:
      return { ...state, loading: true };
    case Story.COMMENT_ROUND_FAILURE:
      return { ...state, loading: false };
    case Story.COMMENT_ROUND_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
