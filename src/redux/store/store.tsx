import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { currentWeatherSlice } from '../reducers/currentWeatherSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import locationSlice from '../reducers/locationAuto';
import { tempUnitSlice } from '../reducers/tempUnit';

import weatherSlice from '../reducers/weatherSlice';
import favSlice from '../reducers/favSlice';
import { recentSlice } from '../reducers/recentSlice';
import { showSuggestionSlice } from '../reducers/showSuggestions';
import { showMobileMenuSlice } from '../reducers/showMobileMenu';

const reducers = combineReducers({
  weather: weatherSlice.reducer,
  currentWeather: currentWeatherSlice.reducer,
  location: locationSlice.reducer,
  tempUnit: tempUnitSlice.reducer,
  fav: favSlice.reducer,
  recent: recentSlice.reducer,
  showSuggestion: showSuggestionSlice.reducer,
  mobileMenu: showMobileMenuSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['location', 'weather', 'mobileMenu'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
