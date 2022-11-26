import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: [],
};

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    favouriteAdd: (state, action) => {
      state.value = action.payload;
    },
    favouriteDel: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { favouriteAdd, favouriteDel } = favSlice.actions;

export default favSlice.reducer;
