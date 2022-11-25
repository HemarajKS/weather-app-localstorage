import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  message: '',
  data: [],
  isSuccess: false,
  loading: false,
}

export const getLocation: any = createAsyncThunk(
  'location/getLocation',
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedData: any = await axios.request({
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/search.json',
        params: { q: arg },
        headers: {
          'X-RapidAPI-Key':
            '40adfff86amshae63704e562067ap186c63jsnff5b3c3286a4',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      })

      return fetchedData
    } catch (error) {
      rejectWithValue(error)
    }
  },
)

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getLocation.pending, (state, action) => {
      // Add user to the state array
      state.loading = true
    })
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.isSuccess = true
    })
    builder.addCase(getLocation.rejected, (state, action) => {
      state.message = action.payload
      state.loading = false
      state.isSuccess = false
    })
  },
})

export default locationSlice
