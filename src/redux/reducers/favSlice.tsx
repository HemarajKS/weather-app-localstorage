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
        if (
          ele.location.lat === action.payload.location.lat &&
          ele.location.lon === action.payload.location.lon
        ) {
          arr.push('exist');
          index = i;
        }
      });

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
      let favData = JSON.parse(localStorage.getItem('fav') || '[]');
      favData.splice(action.payload, 1);
      localStorage.setItem('fav', JSON.stringify(favData));
      state.value = JSON.parse(localStorage.getItem('fav') || '[]');
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
