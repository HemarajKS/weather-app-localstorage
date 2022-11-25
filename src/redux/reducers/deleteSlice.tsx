import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  message: '',
  data: {},
  isSuccess: false,
  loading: false,
}

export const deleteData: any = createAsyncThunk(
  'delete/deleteData',
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: 'delete',
        url: `https://weather-assessment-default-rtdb.firebaseio.com/${arg.page}/${arg.id}.json`,
      })

      return fetchedData
    } catch (error) {
      rejectWithValue(error)
    }
  },
)

export const deleteSlice = createSlice({
  name: 'delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteData.pending, (state, action) => {
      // Add user to the state array
      state.loading = true
    })
    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.isSuccess = true
    })
    builder.addCase(deleteData.rejected, (state, action) => {
      state.message = action.payload
      state.loading = false
      state.isSuccess = false
    })
  },
})

export default deleteSlice
