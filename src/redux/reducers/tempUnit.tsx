import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

export const tempUnitSlice = createSlice({
  name: 'tempUnit',
  initialState,
  reducers: {
    temp: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { temp } = tempUnitSlice.actions;

export default tempUnitSlice.reducer;
