import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

//  'X-RapidAPI-Key': '2a6520b525msh83ced160d6b7657p186e25jsnc9809f844b38',

const initialState: any = {
  message: '',
  data: [],
  isSuccess: false,
  loading: false,
};

export const getrecentweather: any = createAsyncThunk(
  'recentweather/getrecentweather',
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedData: any = await axios.request({
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: arg },
        headers: {
          'X-RapidAPI-Key':
            'af3431978amshc69811be2a6a5cep1e62abjsnbf2a965a707d',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      });

      return fetchedData;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const recentweatherSlice = createSlice({
  name: 'recentweather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getrecentweather.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getrecentweather.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getrecentweather.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export default recentweatherSlice;
