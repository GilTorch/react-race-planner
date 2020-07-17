import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk, logger];

const composedEnhancers = compose(applyMiddleware(...middleware));

export default () => {
  const store = createStore(persistedReducer, undefined, composedEnhancers);
  const persistor = persistStore(store);
  return { store, persistor };
};
