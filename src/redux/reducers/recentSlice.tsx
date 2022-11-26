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
      let arr: any = [];
      let index: any = null;
      recentData.some((ele: any, i: any) => {
        console.log('ele', ele);
        if (
          ele.location.name === action.payload.location.name &&
          ele.location.lat === action.payload.location.lat &&
          ele.location.lon === action.payload.location.lon
        ) {
          arr.push('exist');
          index = i;
        }
      });
      console.log('array', arr, index);

      if (arr.includes('exist')) {
        const fromIndex = index;
        const toIndex = recentData.length;

        const element = recentData.splice(fromIndex, 1)[0];
        console.log(element);

        recentData.splice(toIndex, 0, element);

        console.log(recentData);
        localStorage.setItem('recent', JSON.stringify(recentData));
      } else {
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
