import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import homeReducer from './home';
import libraryReducer from './library';
import writingReducer from './writing';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage
};

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage
};

const libraryPersistConfig = {
  key: 'library',
  storage: AsyncStorage
};

const writingPersistConfig = {
  key: 'writing',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  user: persistReducer(userPersistConfig, UserReducer),
  home: persistReducer(homePersistConfig, homeReducer),
  library: persistReducer(libraryPersistConfig, libraryReducer),
  writing: persistReducer(writingPersistConfig, writingReducer)
});

export default rootReducer;
