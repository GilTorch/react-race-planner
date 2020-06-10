import { User } from '../actions/types';

const INITIAL_STATE = {
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case User.UPDATE_PROFILE_START:
      return { ...state, loading: true };
    case User.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case User.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case User.UPDATE_USER_PREFERENCE_START:
      return { ...state, loading: true };
    case User.UPDATE_USER_PREFERENCE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case User.UPDATE_USER_PREFERENCE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
