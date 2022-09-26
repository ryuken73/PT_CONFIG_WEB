import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menued: [],
};

export const headerSlice = createSlice({
  name: 'headerSlice',
  initialState,
  reducers: {
    setMenued: (state, action) => {
      const { payload } = action;
      const { menued } = payload;
      state.menued = menued;
    }
  },
});

export const { setMenued } = headerSlice.actions;

export default headerSlice.reducer;
