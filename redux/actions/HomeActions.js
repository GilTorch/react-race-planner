import qUrl from 'quick-url';
import { Home } from './types';
import axios from '../../services/axiosService';

export const setHomeFiltersAction = filters => {
  return dispatch =>
    dispatch({
      type: Home.SET_FILTERS,
      data: filters
    });
};

export const getActiveStoriesAction = (
  {
    // sort = undefined, // For sorting, obviously
    // fields = undefined, // To allow clients to request specific fields of the entity
    // eager = undefined, // To allow clients to pull related table data for an entity
    page = 1, // For pagination: the page for which to send data (default: 1)
    rows = 10, // For pagination: the amount of rows to display on the page (default: 20)
    // // Search Query To allow clients to search through some specific fields of the entity
    // sq = undefined,
    // filter = undefined, // To allow clients to filter results
    // // For synchronization: To allow clients to request to check the 'active'
    // // state of one or multiple instances that the client already has
    // checkActive = undefined
    sq,
    status,
    genres,
    authorsRange
  } = {}
  // { cancelToken = undefined } = { cancelToken: undefined }
) => dispatch => {
  dispatch({ type: Home.GET_ACTIVE_STORIES_START });

  const url = qUrl.buildUrl(['/documents'], {
    // sort,
    // fields,
    // eager,
    page,
    rows,
    // filter,
    // checkActive
    sq,
    status,
    genres,
    authorsRange
  });

  return axios
    .get(url)
    .then(response => response.data)
    .then(response => {
      dispatch({
        type: Home.UPDATE_ACTIVE_STORIES,
        data: true
      });
      dispatch({
        type: Home.GET_ACTIVE_STORIES_SUCCESS,
        data: response.data
      });
    })
    .catch(error => {
      dispatch({ type: Home.GET_ACTIVE_STORIES_FAILURE });
      console.error(error);
      // if (axios.isCancel(error)) throw Error('Cancelled');

      throw error?.response?.data || { message: 'Something unexpected happened' };
    });
};
