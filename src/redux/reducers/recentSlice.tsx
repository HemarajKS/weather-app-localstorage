import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: localStorage.getItem('recent'),
};

export const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    recentAdd: (state, action) => {
      console.log('recentAdd', action.payload);
      state.value = action.payload;
    },
    recentDel: (state, action) => {
      console.log('recentDel', action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { recentAdd, recentDel } = recentSlice.actions;

export default recentSlice.reducer;
