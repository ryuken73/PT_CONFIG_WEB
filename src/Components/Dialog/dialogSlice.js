import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
  isEditMode: false,
  assetId:'',
  assetTitle: '',
  assetText: '',
  assetTexts: [],
  displayMode: '',
  isScrollVideo: false,
  isScrollSmooth: false,
  scrollSpeed: 150,
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
    addAssetText: (state, action) => {
      const { payload } = action;
      const { assetText } = payload;
      state.assetTexts.push(assetText);
    },
    removeAssetText: (state, action) => {
      const { payload } = action;
      const { assetText, index } = payload;
      state.assetTexts = state.assetTexts.filter((text, textIndex) => {
        return text !== assetText && textIndex !== index;
      });
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
    // setAssetTitle: (state, action) => {
    //   const { payload } = action;
    //   const { assetTitle } = payload;
    //   state.assetTitle = assetTitle;
    // },
    // setDisplayMode: (state, action) => {
    //   const { payload } = action;
    //   const { displayMode } = payload;
    //   state.displayMode = displayMode;
    // },
    // setAssetId: (state, action) => {
    //   const { payload } = action;
    //   const { assetId } = payload;
    //   state.assetId = assetId;
    // },
    setAssetDetail: (state, action) => {
      const { payload } = action;
      const { key, value } = payload;
      state[key] = value;
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
  // setAssetId, 
  // setAssetTitle, 
  // setDisplayMode, 
  addAssetText,
  removeAssetText,
  addSource, 
  setSourceProgress, 
  removeSource, 
  setSources, 
  setSrcType,
  clearDialog,
  setAssetDetail
} = dialogSlice.actions;

export default dialogSlice.reducer;
