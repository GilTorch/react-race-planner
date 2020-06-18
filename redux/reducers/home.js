import { Home } from '../actions/types';
// import mergeResponse from '../../utils/mergeResponse';

const initialState = {
  loadingStories: false,
  stories: null,
  updatingStories: false,
  filters: {
    status: {
      allSelected: false,
      tags: [
        { selected: true, label: 'In Progress', slug: 'in_progress' },
        { selected: true, label: 'Waiting for players', slug: 'waiting_for_authors' },
        { selected: false, label: 'Completed', slug: 'completed' },
        { selected: true, label: 'Started by me', slug: 'includes_me' }
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

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Home.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.data } };
    case Home.GET_ACTIVE_STORIES_START:
      return { ...state, loadingStories: true };
    case Home.UPDATE_ACTIVE_STORIES:
      return { ...state, updatingStories: action.data };
    case Home.GET_ACTIVE_STORIES_SUCCESS:
      return {
        ...state,
        stories: action.data,
        loadingStories: false,
        updatingStories: false
      };
    case Home.GET_ACTIVE_STORIES_FAILURE:
      return { ...state, loadingStories: false, updatingStories: false };
    default:
      return state;
  }
};

export default homeReducer;
