import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { currentWeatherSlice } from '../reducers/currentWeatherSlice';
import locationSlice from '../reducers/locationAuto';

import weatherSlice from '../reducers/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
    currentWeather: currentWeatherSlice.reducer,
    location: locationSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
