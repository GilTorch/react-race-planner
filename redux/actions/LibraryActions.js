import { Library } from './types';

export const setLibraryFiltersAction = filters => {
  return dispatch =>
    dispatch({
      type: Library.SET_COMPLETED_STORIES_FILTERS,
      data: filters
    });
};
