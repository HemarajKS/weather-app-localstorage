import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  value: {},
};

export const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    currentData: (state, action: any) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { currentData } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
