import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
  isEditMode: false,
  assetId:'',
  assetTitle: '',
  displayMode: '',
  sources: [],
};

export const dialogSlice = createSlice({
  name: 'dialogSlice',
  initialState,
  reducers: {
    setDialogOpen: (state, action) => {
      const { payload } = action;
      const { dialogOpen } = payload;
      state.dialogOpen = dialogOpen;
    },
    setIsEditMode: (state, action) => {
      const { payload } = action;
      const { isEditMode } = payload;
      state.isEditMode = isEditMode;
    },
    addSource: (state, action) => {
      const { payload } = action;
      const { src, size, srcId, srcType } = payload;
      state.sources.push({src, size, srcId, srcType, progress:'0%'});
    },
    removeSource: (state, action) => {
      const { payload } = action;
      const { srcId } = payload;
      state.sources = state.sources.filter(source => source.srcId !== srcId);
    },
    setSources: (state, action) => {
      const { payload } = action;
      const { sources } = payload;
      state.sources = sources
    },
    setSrcType: (state, action) => {
      const { payload } = action;
      const { srcId, srcType } = payload;
      const targetSource = state.sources.find(source => source.srcId === srcId);
      targetSource.srcType = srcType;
    },
    setSourceProgress: (state, action) => {
      const { payload } = action;
      const { srcId, progress } = payload;
      const targetSource = state.sources.find(source => source.srcId === srcId);
      targetSource.progress = progress;
    },
    setAssetTitle: (state, action) => {
      const { payload } = action;
      const { assetTitle } = payload;
      state.assetTitle = assetTitle;
    },
    setDisplayMode: (state, action) => {
      const { payload } = action;
      const { displayMode } = payload;
      state.displayMode = displayMode;
    },
    setAssetId: (state, action) => {
      const { payload } = action;
      const { assetId } = payload;
      state.assetId = assetId;
    },
    clearDialog: (state, action) => {
      state.assetTitle = '';
      state.sources = [];
    },
  },
})

export const { 
  setDialogOpen, 
  setIsEditMode,
  setAssetId, 
  setAssetTitle, 
  setDisplayMode, 
  addSource, 
  setSourceProgress, 
  removeSource, 
  setSources, 
  setSrcType,
  clearDialog 
} = dialogSlice.actions;

export default dialogSlice.reducer;
