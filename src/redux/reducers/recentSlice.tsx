import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: JSON.parse(localStorage.getItem('recent') || '[]'),
};

export const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    recentAdd: (state, action) => {
      console.log('recentAdd', action.payload);
      let recentData = JSON.parse(localStorage.getItem('recent') || '[]');
      console.log('recentData', recentData);
      if (!recentData.includes(action.payload)) {
        recentData.push(action.payload);
        localStorage.setItem('recent', JSON.stringify(recentData));
      }
      console.log('recentAdd data', recentData);
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
