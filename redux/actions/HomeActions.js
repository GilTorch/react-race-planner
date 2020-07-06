import { Home } from './types';

export const setHomeFiltersAction = filters => {
  return dispatch =>
    dispatch({
      type: Home.SET_ACTIVE_STORIES_FILTERS,
      data: filters
    });
};
