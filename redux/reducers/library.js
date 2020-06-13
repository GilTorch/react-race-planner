import { Library } from '../actions/types';

const initialState = {
  loadingStories: false,
  stories: null,
  updatingStories: false,
  filters: {
    status: {
      allSelected: false,
      tags: [
        { selected: true, label: 'In Progress' },
        { selected: false, label: 'Waiting for players' },
        { selected: false, label: 'Completed' },
        { selected: false, label: 'Started by me' }
      ]
    },
    genres: {
      allSelected: false,
      tags: [
        { selected: true, label: 'Mystery' },
        { selected: false, label: 'Action' },
        { selected: false, label: 'Thriller' },
        { selected: false, label: 'Scifi' },
        { selected: false, label: 'Romance' },
        { selected: false, label: 'Essay' },
        { selected: false, label: 'Bedtime Stories' }
      ]
    },
    authorsRange: [5, 20]
  }
};

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Library.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.data } };
    default:
      return state;
  }
};

export default libraryReducer;
