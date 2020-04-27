import { combineReducers } from 'redux';
import homeReducer from './home';
import libraryReducer from './library';
import writingReducer from './writing';

const rootReducer = combineReducers({
  home: homeReducer,
  library: libraryReducer,
  writing: writingReducer
});

export default rootReducer;
