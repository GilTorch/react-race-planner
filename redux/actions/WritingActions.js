import qUrl from 'quick-url';
import { Writing } from './types';
import axios from '../../services/axiosService';

export const setWritingFiltersAction = filters => {
  return dispatch =>
    dispatch({
      type: Writing.SET_FILTERS,
      data: filters
    });
};

export const getCompletedStoriesAction = (
  {
    sort = undefined, // For sorting, obviously
    fields = undefined, // To allow clients to request specific fields of the entity
    eager = undefined, // To allow clients to pull related table data for an entity
    page = 1, // For pagination: the page for which to send data (default: 1)
    rows = 20, // For pagination: the amount of rows to display on the page (default: 20)
    // Search Query To allow clients to search through some specific fields of the entity
    sq = undefined,
    filter = undefined, // To allow clients to filter results
    // For synchronization: To allow clients to request to check the 'active'
    // state of one or multiple instances that the client already has
    checkActive = undefined
  } = {},
  { cancelToken = undefined } = { cancelToken: undefined }
) => dispatch => {
  dispatch({ type: Writing.GET_SELF_STORIES_START });

  const url = qUrl.buildUrl(['/documents'], {
    sort,
    fields,
    eager,
    page,
    rows,
    sq,
    filter,
    checkActive
  });

  return axios
    .get(url, { cancelToken })
    .then(response => response.data)
    .then(response => {
      dispatch({
        type: Writing.GET_SELF_STORIES_SUCCESS,
        data: response.data
      });
    })
    .catch(error => {
      dispatch({ type: Writing.GET_SELF_STORIES_FAILURE });

      if (axios.isCancel(error)) throw Error('Cancelled');

      throw error?.response?.data || { message: 'Something unexpected happened' };
    });
};
