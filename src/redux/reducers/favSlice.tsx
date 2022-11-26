import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: JSON.parse(localStorage.getItem('fav') || '[]'),
};

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    favouriteAdd: (state, action) => {
      let favData = JSON.parse(localStorage.getItem('fav') || '[]');

      let arr: any = [];
      let index: any = null;
      favData.some((ele: any, i: any) => {
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
        const toIndex = favData.length;

        const element = favData.splice(fromIndex, 1)[0];

        favData.splice(toIndex, 0, element);

        localStorage.setItem('fav', JSON.stringify(favData));
      } else {
        favData.push(action.payload);
        localStorage.setItem('fav', JSON.stringify(favData));
      }
      state.value = JSON.parse(localStorage.getItem('fav') || '[]');
    },
    favouriteDel: (state, action) => {
      state.value = action.payload;
    },
    favdelAll: (state) => {
      localStorage.setItem('fav', '[]');
      state.value = JSON.parse(localStorage.getItem('fav') || '[]');
    },
  },
});

// Action creators are generated for each case reducer function
export const { favouriteAdd, favouriteDel, favdelAll } = favSlice.actions;

export default favSlice;
