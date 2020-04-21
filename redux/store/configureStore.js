import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

export default () => {
  const store = createStore(persistedReducer, undefined, composedEnhancers);
  const persistor = persistStore(store);
  return { store, persistor };
};
