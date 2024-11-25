import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist';
import {
  asyncGetItem,
  asyncSetItem,
  asyncRemoveItem,
} from '@/utils/storage/storage';
import { reactotron } from '@/devtools/ReactotronConfig';

import { api } from '@/services/apiRTK';
import { userReducer } from './user';

const reducers = combineReducers({
  user: userReducer,
});

export const reduxStorage: Storage = {
  setItem: asyncSetItem,
  getItem: asyncGetItem,
  removeItem: asyncRemoveItem,
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(reactotron.createEnhancer()),
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
