import { Writing } from './types';

export const setWritingFiltersAction = filters => {
  return dispatch =>
    dispatch({
      type: Writing.SET_SELF_STORIES_FILTERS,
      data: filters
    });
};
