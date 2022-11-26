import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import weatherSlice from '../reducers/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
