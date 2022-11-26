import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

export const showMobileMenuSlice = createSlice({
  name: 'showMobileMenu',
  initialState,
  reducers: {
    mobileMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { mobileMenu } = showMobileMenuSlice.actions;

export default showMobileMenuSlice.reducer;
