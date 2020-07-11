import { Home, Story } from '../actions/types';

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
    // When it's a new comment, we're not sure where exactly the story is
    // so we attempt to update it everywhere. We don't add it as a new one,
    // that's why we don't use `mergeResponse`
    case Story.COMMENT_ROUND_SUCCESS:
      return {
        ...state,
        stories: state.stories.map((s) => {
          // eslint-disable-next-line no-underscore-dangle
          if (s._id === action.story._id) {
            return action.story;
          }

          return s;
        }),
      };
    // We shouldn't have to check for this here
    // We need to add a local state for the current story
    // to the Story screen
    // We're only doing the following in the case
    // where the user just joined the story and the story is
    // still in the `home` reducer while they propose their intro
    // Because they got to it from the Home screen
    case Story.CREATE_ROUND_SUCCESS:
      return {
        ...state,
        stories: state.stories.map((s) => {
          // eslint-disable-next-line no-underscore-dangle
          if (s._id === action.story._id) {
            return action.story;
          }

          return s;
        }),
      };
    case Story.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        stories: state.stories?.map(s => {
          // eslint-disable-next-line no-underscore-dangle
          if (s._id === action.story._id) {
            return action.story;
          }

          return s;
        })
      };
    case Story.JOIN_STORY_SUCCESS:
      return {
        ...state,
    case Story.ROUND_VOTE_SUCCESS:
      return {
        ...state,
        stories: state.stories?.map((s) => {
          // eslint-disable-next-line no-underscore-dangle
          if (s._id === action.story._id) {
            return action.story;
          }

          return s;
        }),
      };
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
