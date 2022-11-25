import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import searchSlice from '../reducers/currentData'
import deleteSlice from '../reducers/deleteSlice'
import FavouriteSlice from '../reducers/favouriteSlice'
import getFavouriteSlice from '../reducers/getFavSlice'
import getrecentSlice from '../reducers/getRecentSlice'
import locationSlice from '../reducers/locationAuto'
import recentSlice from '../reducers/recentSlice'
import weatherSlice from '../reducers/weatherSlice'

export const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    weather: weatherSlice.reducer,
    search: searchSlice.reducer,
    recent: recentSlice.reducer,
    getrecent: getrecentSlice.reducer,
    Favourite: FavouriteSlice.reducer,
    getFavourite: getFavouriteSlice.reducer,
    delete: deleteSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
