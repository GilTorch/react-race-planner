import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import AuthReducer from './AuthReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer)
});

export default rootReducer;
