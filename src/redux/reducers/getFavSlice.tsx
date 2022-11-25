import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  message: '',
  data: {},
  isSuccess: false,
  loading: false,
};

export const getFavouriteData: any = createAsyncThunk(
  'getFavourite/getFavouriteData',
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: 'get',
        url: 'https://weather-assessment-default-rtdb.firebaseio.com/Favourite.json',
      });

      return fetchedData;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getFavouriteSlice = createSlice({
  name: 'getFavourite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getFavouriteData.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getFavouriteData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getFavouriteData.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export default getFavouriteSlice;
