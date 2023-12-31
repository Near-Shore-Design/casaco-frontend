import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { injectStore } from "apiInstance";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
// import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import authReducer from "utilities/reduxSlices/authSlice";
import homeReducer from "utilities/reduxSlices/HomePropertySlice";
import mapReducer from "utilities/reduxSlices/MapSlice";
import sellPropertyReducer from "utilities/reduxSlices/sellPropertySlice";
import buyPropertyReducer from "utilities/reduxSlices/buyPropertySlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  map: mapReducer,
  sell: sellPropertyReducer,
  buy: buyPropertyReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
injectStore(store);

const persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
