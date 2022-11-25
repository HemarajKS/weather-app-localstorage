import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  message: '',
  data: {},
  isSuccess: false,
  loading: false,
};

export const getrecentData: any = createAsyncThunk(
  'getrecent/getrecentData',
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: 'get',
        url: 'https://weather-assessment-default-rtdb.firebaseio.com/recent.json',
      });

      return fetchedData;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getrecentSlice = createSlice({
  name: 'getrecent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getrecentData.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getrecentData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getrecentData.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export default getrecentSlice;
