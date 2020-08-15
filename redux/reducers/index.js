import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import HomeReducer from './HomeReducer';
import LibraryReducer from './LibraryReducer';
import WritingReducer from './WritingReducer';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import storyReducer from './story';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
};

const libraryPersistConfig = {
  key: 'library',
  storage: AsyncStorage,
};

const writingPersistConfig = {
  key: 'writing',
  storage: AsyncStorage,
};

// TODO: Get rid of this, we do it at the stack level
// and actually save the intended data in 'writing' above
const storyPersistConfig = {
  key: 'story',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  user: persistReducer(userPersistConfig, UserReducer),
  home: persistReducer(homePersistConfig, HomeReducer),
  library: persistReducer(libraryPersistConfig, LibraryReducer),
  writing: persistReducer(writingPersistConfig, WritingReducer),
  story: persistReducer(storyPersistConfig, storyReducer),
});

export default rootReducer;
