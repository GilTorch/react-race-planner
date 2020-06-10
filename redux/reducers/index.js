import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  user: persistReducer(authPersistConfig, UserReducer)
});

export default rootReducer;
