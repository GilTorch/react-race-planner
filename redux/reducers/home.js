import { Home } from '../actions/types';

const initialState = {
  createStoryLoading: false,
  stories: null,
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
    case Home.CREATE_STORY_START:
      return { ...state, createStoryLoading: true };
    case Home.CREATE_STORY_FAILURE:
      return { ...state, createStoryLoading: false };
    case Home.CREATE_STORY_SUCCESS:
      return {
        ...state,
        createStoryLoading: false,
        stories: state.stories ? [...state.stories, action.story] : [action.story]
      };
    default:
      return state;
  }
};

export default homeReducer;
