import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import userReducer from './userReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'tokenExpiration', 'currentUser'],
  blacklist: ['code']
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer)
});
export default rootReducer;
