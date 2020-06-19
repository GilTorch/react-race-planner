import { Writing } from '../actions/types';

const initialState = {
  loadingStories: false,
  stories: null,
  updatingStories: false,
  filters: {
    status: {
      allSelected: true,
      tags: [
        { selected: true, label: 'In Progress', slug: 'in_progress' },
        // { selected: true, label: 'Waiting for players', slug: 'waiting_for_authors' },
        { selected: true, label: 'Completed', slug: 'completed' },
        { selected: true, label: "Stories that I'm part of", slug: 'include_self' }
      ]
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

const writingReducer = (state = initialState, action) => {
  const { data: stories } = action;

  switch (action.type) {
    case Writing.SET_SELF_STORIES_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.data } };
    case Writing.GET_SELF_STORIES_START:
      return { ...state, loadingStories: true };
    case Writing.UPDATE_SELF_STORIES:
      return { ...state, updatingStories: true };
    case Writing.GET_SELF_STORIES_SUCCESS:
      return {
        ...state,
        stories: stories?.length ? stories : null,
        loadingStories: false,
        updatingStories: false
      };
    case Writing.GET_SELF_STORIES_FAILURE:
      return { ...state, loadingStories: false, updatingStories: false };
    default:
      return state;
  }
};

export default writingReducer;
