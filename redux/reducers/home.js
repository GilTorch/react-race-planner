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
