import {
  SET_HOME_STORY_FILTERS,
  SET_LIBRARY_STORY_FILTERS,
  SET_WRITING_STORY_FILTERS
} from './types';

export const setHomeStoryFiltersAction = filters => {
  return dispatch =>
    dispatch({
      type: SET_HOME_STORY_FILTERS,
      data: filters
    });
};

export const setLibraryStoryFiltersAction = filters => {
  return dispatch =>
    dispatch({
      type: SET_LIBRARY_STORY_FILTERS,
      data: filters
    });
};

export const setWritingStoryFiltersAction = filters => {
  return dispatch =>
    dispatch({
      type: SET_WRITING_STORY_FILTERS,
      data: filters
    });
};
