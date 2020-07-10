import { Library, Story } from '../actions/types';

const initialState = {
  loadingStories: false,
  stories: null,
  updatingStories: false,
  filters: {
    status: {
      allSelected: false,
      tags: [{ selected: true, label: 'Completed', slug: 'completed' }],
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

const libraryReducer = (state = initialState, action) => {
  const { data: stories } = action;

  switch (action.type) {
    case Library.SET_COMPLETED_STORIES_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.data } };
    case Library.GET_COMPLETED_STORIES_START:
      return { ...state, loadingStories: true };
    case Library.UPDATE_COMPLETED_STORIES:
      return { ...state, updatingStories: true };
    case Story.DELETE_COMMENT_SUCCESS:
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
    case Library.GET_COMPLETED_STORIES_SUCCESS:
      return {
        ...state,
        stories: stories?.length ? stories : null,
        loadingStories: false,
        updatingStories: false,
      };
    case Library.GET_COMPLETED_STORIES_FAILURE:
      return { ...state, loadingStories: false, updatingStories: false };
    default:
      return state;
  }
};

export default libraryReducer;
