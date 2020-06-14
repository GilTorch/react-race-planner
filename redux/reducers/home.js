import { Home } from '../actions/types';

const initialState = {
  getStoriesLoading: false,
  getGenresLoading: false,
  stories: null,
  genres: null,
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
    authors: [5, 20]
  }
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Home.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.data } };
    case Home.GET_ALL_STORIES_START:
      return { ...state, getStoriesLoading: true };
    case Home.GET_ALL_STORIES_FAILURE:
      return { ...state, getStoriesLoading: false };
    case Home.GET_ALL_STORIES_SUCCESS:
      return { ...state, getStoriesLoading: false, stories: action.stories };
    case Home.GET_ALL_GENRES_START:
      return { ...state, getGenresLoading: true };
    case Home.GET_ALL_GENRES_FAILURE:
      return { ...state, getGenresLoading: false };
    case Home.GET_ALL_GENRES_SUCCESS:
      return { ...state, getGenresLoading: false, genres: action.genres };
    default:
      return state;
  }
};

export default homeReducer;
