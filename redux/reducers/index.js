import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import homeReducer from './home';
import libraryReducer from './library';
import writingReducer from './writing';
import AuthReducer from './AuthReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  home: homeReducer,
  library: libraryReducer,
  writing: writingReducer
});

export default rootReducer;
