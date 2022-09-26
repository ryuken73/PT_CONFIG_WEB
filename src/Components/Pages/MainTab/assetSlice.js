import { createSlice } from '@reduxjs/toolkit';
// #asset's keys to handle
//  title, type, src 
// #asset's keys created by server
//  id, created, updated 

const initialState = {
  assetList: [],
  assetChecked: []
};

export const assetSlice = createSlice({
  name: 'assetSlice',
  initialState,
  reducers: {
    addAsset: (state, action) => {
      const { payload } = action;
      const { asset } = payload;
      state.assetList.push(asset);
    },
    addAssets: (state, action) => {
      const { payload } = action;
      const { assets } = payload;
      state.assetList = [...state.assetList, ...assets];
    },
    setAssets: (state, action) => {
      const { payload } = action;
      const { assetList } = payload;
      state.assetList = assetList;
    },
    removeAsset: (state, action) => {
      const { payload } = action;
      const { assetId } = payload;
      state.assetList = state.assetList.filter(asset => asset.id !== assetId);
    },
    updateAsset: (state, action) => {
      const { payload } = action;
      const { assetId, key, value } = payload;
      const asset = state.assetList.find(asset => asset.id === assetId);
      if(asset) asset[key] = value;
    },
    updateAllAssets: (state, action) => {
      const { payload } = action;
      const { key, value } = payload;
      state.assetList.forEach(asset => asset[key] = value);
    },
    toggleChecked: (state, action) => {
      const { payload } = action;
      const { assetId } = payload;
      const checked = state.assetChecked.includes(assetId);
      if(checked){
        state.assetChecked = state.assetChecked.filter(id => id !== assetId);
      } else {
        state.assetChecked.push(assetId);
      }
    },
    setAllAssetChecked: (state, action) => {
      state.assetChecked = state.assetList.map(asset => asset.id);
    },
    setAllAssetUnChecked: (state, action) => {
      state.assetChecked = [];
    },
    updateJobProgress: (state, action) => {
      const { payload } = action;
      const { jobId, progress } = payload;
      const index = state.jobList.findIndex(job => job.jobId === jobId);
      state.jobList[index] = {
        ...state.jobList[index],
        ...progress
      }
    },
  },
})

export const { 
  addAsset, 
  addAssets, 
  setAssets, 
  removeAsset, 
  updateAsset, 
  updateAllAssets, 
  toggleChecked,
  setAllAssetChecked,
  setAllAssetUnChecked,
  updateJobProgress 
} = assetSlice.actions;

export default assetSlice.reducer;
