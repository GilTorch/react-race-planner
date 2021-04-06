import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware = [thunk, logger];
const middleware = [thunk];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

export default () => {
  const store = createStore(persistedReducer, undefined, composedEnhancers);
  const persistor = persistStore(store);
  return { store, persistor };
};
