import { SET_HOME_STORY_FILTERS } from '../actions/types';

const initialState = {
  homeStoryFilters: {
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
    }
  }
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_STORY_FILTERS:
      return { ...state, homeStoryFilters: { ...state.homeStoryFilters, ...action.data } };
    default:
      return state;
  }
};

export default homeReducer;
