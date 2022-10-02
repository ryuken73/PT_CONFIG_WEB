import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assetsActive: [],
};

export const headerSlice = createSlice({
  name: 'headerSlice',
  initialState,
  reducers: {
    setAssetsActive: (state, action) => {
      const { payload } = action;
      const { assetsActive } = payload;
      state.assetsActive = assetsActive;
    },
    addAssetActive: (state, action) => {
      const { payload } = action;
      const { asset } = payload;
      state.assetsActive.push(asset);
    },
    removeAssetActive: (state, action) => {
      const { payload } = action;
      const { assetId } = payload;
      state.assetsActive = state.assetsActive.filter(asset => asset.assetId !== assetId);
    },
  },
});

export const { 
  setAssetsActive,
  addAssetActive,
  removeAssetActive
} = headerSlice.actions;

export default headerSlice.reducer;
