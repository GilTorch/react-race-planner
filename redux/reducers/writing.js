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
        { selected: true, label: 'Waiting for players', slug: 'waiting_for_authors' },
        { selected: true, label: 'Completed', slug: 'completed' },
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

const writingReducer = (state = initialState, action) => {
  switch (action.type) {
    case Writing.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.data } };
    default:
      return state;
  }
};

export default writingReducer;
