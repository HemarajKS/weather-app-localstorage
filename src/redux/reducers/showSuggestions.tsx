import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

export const showSuggestionSlice = createSlice({
  name: 'showSuggestion',
  initialState,
  reducers: {
    showSugg: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSugg } = showSuggestionSlice.actions;

export default showSuggestionSlice.reducer;
