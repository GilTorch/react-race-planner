import { SET_WRITING_STORY_FILTERS } from '../actions/types';

const initialState = {
  writingStoryFilters: {
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

const writingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WRITING_STORY_FILTERS:
      return { ...state, writingStoryFilters: { ...state.writingStoryFilters, ...action.data } };
    default:
      return state;
  }
};

export default writingReducer;
