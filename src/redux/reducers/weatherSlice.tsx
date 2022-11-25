import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

//  'X-RapidAPI-Key': '2a6520b525msh83ced160d6b7657p186e25jsnc9809f844b38',

const initialState = {
  message: '',
  data: [],
  isSuccess: false,
  loading: false,
};

export const getweather: any = createAsyncThunk(
  'weather/getweather',
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedData: any = await axios.request({
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: arg },
        headers: {
          'X-RapidAPI-Key':
            '40adfff86amshae63704e562067ap186c63jsnff5b3c3286a4',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      });

      return fetchedData;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getweather.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getweather.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getweather.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export default weatherSlice;
