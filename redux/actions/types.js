export const Auth = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  VERIFY_ACCOUNT_START: 'VERIFY_ACCOUNT_START',
  VERIFY_ACCOUNT_SUCCESS: 'VERIFY_ACCOUNT_SUCCESS',
  VERIFY_ACCOUNT_FAILURE: 'VERIFY_ACCOUNT_FAILURE',

  RESET_PASSWORD_START: 'RESET_PASSWORD_START',
  RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',

  RESEND_OTP_START: 'RESEND_OTP_START',
  RESEND_OTP_FAILURE: 'RESEND_OTP_FAILURE',
  RESEND_OTP_SUCCESS: 'RESEND_OTP_SUCCESS',

  RESET_PASSWORD_VERIFY_START: 'RESET_PASSWORD_VERIFY_START',
  RESET_PASSWORD_VERIFY_FAILURE: 'RESET_PASSWORD_VERIFY_FAILURE',
  RESET_PASSWORD_VERIFY_SUCCESS: 'RESET_PASSWORD_VERIFY_SUCCESS',

  SIGNUP_START: 'SIGNUP_START',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',

  ADD_SESSION: 'ADD_SESSION',
  SIGN_UP_FAIL: 'SIGN_UP_FAIL',
  CLEAR_REQUEST_ERROR: 'CLEAR_REQUEST_ERROR',
  DELETE_ACCOUNT_START: 'DELETE_ACCOUNT_START',
  DELETE_ACCOUNT_FAILURE: 'DELETE_ACCOUNT_FAILURE',
  DELETE_ACCOUNT_SUCCESS: 'DELETE_ACCOUNT_SUCCESS',

  LOGOUT: 'LOGOUT',
  GET_ACTIVE_STORIES_START: 'GET_ACTIVE_STORIES_START',
  GET_ACTIVE_STORIES_FAILURE: 'GET_ACTIVE_STORIES_FAILURE',
  GET_ACTIVE_STORIES_SUCCESS: 'GET_ACTIVE_STORIES_SUCCESS',
  UPDATE_ACTIVE_STORIES: 'UPDATE_ACTIVE_STORIES',
  GET_COMPLETED_STORIES_START: 'GET_ACTIVE_STORIES_START',
  GET_COMPLETED_STORIES_FAILURE: 'GET_ACTIVE_STORIES_FAILURE',
  GET_COMPLETED_STORIES_SUCCESS: 'GET_ACTIVE_STORIES_SUCCESS',
  GET_SELF_STORIES_START: 'GET_SELF_STORIES_START',
  GET_SELF_STORIES_FAILURE: 'GET_SELF_STORIES_FAILURE',
  GET_SELF_STORIES_SUCCESS: 'GET_SELF_STORIES_SUCCESS'
};

export const User = {
  UPDATE_PROFILE_START: 'UPDATE_PROFILE_START',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',
  UPDATE_USER_PREFERENCE_START: 'UPDATE_USER_PREFERENCE_START',
  UPDATE_USER_PREFERENCE_SUCCESS: 'UPDATE_USER_PREFERENCE_SUCCESS',
  UPDATE_USER_PREFERENCE_FAILURE: 'UPDATE_USER_PREFERENCE_FAILURE'
};

export const Home = {
  // Notice that only the Home one has the following 3 types.
  // That's because a story is automatically set to in progress
  // (waiting_for_players to be exact) upon creation. So they can only
  // be shown up on the Home screen for now
  SET_ACTIVE_STORIES_FILTERS: 'SET_ACTIVE_STORIES_FILTERS',
  GET_ACTIVE_STORIES_START: 'GET_ACTIVE_STORIES_START',
  GET_ACTIVE_STORIES_FAILURE: 'GET_ACTIVE_STORIES_FAILURE',
  GET_ACTIVE_STORIES_SUCCESS: 'GET_ACTIVE_STORIES_SUCCESS',
  UPDATE_ACTIVE_STORIES: 'UPDATE_ACTIVE_STORIES'
};

export const Library = {
  SET_COMPLETED_STORIES_FILTERS: 'SET_COMPLETED_STORIES_FILTERS',
  GET_COMPLETED_STORIES_START: 'GET_COMPLETED_STORIES_START',
  GET_COMPLETED_STORIES_FAILURE: 'GET_COMPLETED_STORIES_FAILURE',
  GET_COMPLETED_STORIES_SUCCESS: 'GET_COMPLETED_STORIES_SUCCESS',
  UPDATE_COMPLETED_STORIES: 'UPDATE_COMPLETED_STORIES'
};

export const Writing = {
  SET_SELF_STORIES_FILTERS: 'SET_SELF_STORIES_FILTERS',
  GET_SELF_STORIES_START: 'GET_SELF_STORIES_START',
  GET_SELF_STORIES_FAILURE: 'GET_SELF_STORIES_FAILURE',
  GET_SELF_STORIES_SUCCESS: 'GET_SELF_STORIES_SUCCESS',
  UPDATE_SELF_STORIES: 'UPDATE_SELF_STORIES'
};

export const Story = {
  JOIN_STORY_START: 'JOIN_STORY_START',
  JOIN_STORY_FAILURE: 'JOIN_STORY_FAILURE',
  JOIN_STORY_SUCCESS: 'JOIN_STORY_SUCCESS',
  CREATE_STORY_START: 'CREATE_STORY_START',
  CREATE_STORY_SUCCESS: 'CREATE_STORY_SUCCESS',
  CREATE_STORY_FAILURE: 'CREATE_STORY_FAILURE',
  CREATE_ROUND_START: 'CREATE_ROUND_START',
  CREATE_ROUND_SUCCESS: 'CREATE_ROUND_SUCCESS',
  CREATE_ROUND_FAILURE: 'CREATE_ROUND_FAILURE',
  LEAVE_STORY_START: 'LEAVE_STORY_START',
  LEAVE_STORY_SUCCESS: 'LEAVE_STORY_SUCCESS',
  LEAVE_STORY_FAILURE: 'LEAVE_STORY_FAILURE',
  DELETE_STORY_START: 'DELETE_STORY_START',
  DELETE_STORY_SUCCESS: 'DELETE_STORY_SUCCESS',
  DELETE_STORY_FAILURE: 'DELETE_STORY_FAILURE',
  DELETE_COMMENT_START: 'DELETE_COMMENT_START',
  DELETE_COMMENT_FAILURE: 'DELETE_COMMENT_FAILURE',
  DELETE_COMMENT_SUCCESS: 'DELETE_COMMENT_SUCCESS'
};
