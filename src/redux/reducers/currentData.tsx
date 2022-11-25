import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: {
    id: '13.35,74.75',
    place: 'Udupi',
    region: 'Karnataka',
    icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
    temp_f: 73.6,
    temp_c: 23.1,
    condition: 'Partly cloudy',
    temp_min: 71.6,
    temp_max: 75.6,
    precep: 0,
    humidity: 73,
    wind: 2.9,
    visibility: 6,
    fav: false,
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    currentSearch: (state: any, action: any) => {
      state.search = action.payload;
    },
  },
});

export const { currentSearch } = searchSlice.actions;

export default searchSlice;
