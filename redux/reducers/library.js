import { Library } from '../actions/types';

const initialState = {
  loadingStories: false,
  stories: null,
  updatingStories: false,
  filters: {
    status: {
      allSelected: false,
      tags: [{ selected: true, label: 'Completed', slug: 'completed' }]
    },
    genres: {
      allSelected: true,
      tags: [
        { selected: true, label: 'Mystery', slug: 'mystery' },
        { selected: true, label: 'Action', slug: 'action' },
        { selected: true, label: 'Thriller', slug: 'thriller' },
        { selected: true, label: 'Scifi', slug: 'scifi' },
        { selected: true, label: 'Romance', slug: 'romance' },
        { selected: true, label: 'Essay', slug: 'essay' },
        { selected: true, label: 'Bedtime Stories', slug: 'bedtime_stories' }
      ]
    },
    authorsRange: [5, 20]
  }
};

const libraryReducer = (state = initialState, action) => {
  const { data: stories } = action;

  switch (action.type) {
    case Library.SET_COMPLETED_STORIES_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.data } };
    case Library.GET_COMPLETED_STORIES_START:
      return { ...state, loadingStories: true };
    case Library.UPDATE_COMPLETED_STORIES:
      return { ...state, updatingStories: true };
    case Library.GET_COMPLETED_STORIES_SUCCESS:
      return {
        ...state,
        stories: stories?.length ? stories : null,
        loadingStories: false,
        updatingStories: false
      };
    case Library.GET_COMPLETED_STORIES_FAILURE:
      return { ...state, loadingStories: false, updatingStories: false };
    default:
      return state;
  }
};

export default libraryReducer;
