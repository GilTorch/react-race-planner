import { Home, Story } from '../actions/types';
import mergeResponse from '../../utils/mergeResponse';

const initialState = {
  loadingStories: false,
  stories: null,
  updatingStories: false,
  filters: {
    status: {
      allSelected: false,
      tags: [
        { selected: true, label: 'Waiting for Players', slug: 'waiting_for_players' },
        { selected: true, label: 'Waiting for Intros', slug: 'waiting_for_intros' },
        { selected: true, label: 'Waiting for Intro Votes', slug: 'intro_voting' },
        { selected: true, label: 'Rounds in Progress', slug: 'round_writing' },
        { selected: true, label: 'Waiting for Endings', slug: 'waiting_for_outros' },
        { selected: true, label: 'Waiting for Outro Votes', slug: 'outro_voting' },
      ],
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
        { selected: true, label: 'Bedtime Stories', slug: 'bedtime_stories' },
      ],
    },
    authorsRange: [5, 20],
  },
};

const homeReducer = (state = initialState, action) => {
  const { data: stories } = action;

  switch (action.type) {
    case Home.SET_ACTIVE_STORIES_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.data } };
    case Story.CREATE_STORY_SUCCESS:
      return {
        ...state,
        stories: state.stories ? [action.story, ...state.stories] : [action.story],
      };
    case Story.JOIN_STORY_SUCCESS:
      return { ...state, stories: mergeResponse(state.stories, [action.story]) };
    case Home.GET_ACTIVE_STORIES_START:
      return { ...state, loadingStories: true };
    case Home.UPDATE_ACTIVE_STORIES:
      return { ...state, updatingStories: action.data };
    case Home.GET_ACTIVE_STORIES_SUCCESS:
      return {
        ...state,
        stories: stories?.length ? stories : null,
        loadingStories: false,
        updatingStories: false,
      };
    case Home.GET_ACTIVE_STORIES_FAILURE:
      return { ...state, loadingStories: false, updatingStories: false };
    default:
      return state;
  }
};

export default homeReducer;
