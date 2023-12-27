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
      const { textId, assetText } = payload;
      state.assetTexts.push({ textId, assetText });
    },
    removeAssetText: (state, action) => {
      const { payload } = action;
      const { textId: targetId } = payload;
      state.assetTexts = state.assetTexts.filter(({textId}) => {
        return textId !== targetId;
      });
    },
    clearAssetText: (state, action) => {
      state.assetTexts = [];
    },
    addSource: (state, action) => {
      const { payload } = action;
      const { src, size, srcId, srcType } = payload;
      state.sources.push({src, size, srcId, srcType, progress:'0%'});
    },
    updateSource: (state, action) => {
      const { payload } = action;
      const { srcId, key, value } = payload;
      const targetSource = state.sources.find(src => src.srcId === srcId); 
      if(targetSource){
        targetSource[key] = value;
      }
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
  clearAssetText,
  addSource, 
  updateSource,
  setSourceProgress, 
  removeSource, 
  setSources, 
  setSrcType,
  clearDialog,
  setAssetDetail
} = dialogSlice.actions;

export default dialogSlice.reducer;
