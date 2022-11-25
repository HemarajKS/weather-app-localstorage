import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  message: '',
  data: {},
  isSuccess: false,
  loading: false,
};

export const recentData: any = createAsyncThunk(
  'recent/recentData',
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: 'post',
        url: 'https://weather-assessment-default-rtdb.firebaseio.com/recent.json',
        data: arg,
      });

      return fetchedData;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(recentData.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(recentData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(recentData.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export default recentSlice;
