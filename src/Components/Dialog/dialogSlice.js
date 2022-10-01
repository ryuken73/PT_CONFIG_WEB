import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
  assetTitle: '',
  type: 'video',
  sources: [],
  assetId:'',
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
    addSource: (state, action) => {
      const { payload } = action;
      const { src, size, srcId } = payload;
      state.sources.push({src, size, srcId, progress:'0%'});
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
    setSourceProgress: (state, action) => {
      const { payload } = action;
      const { srcId, progress } = payload;
      state.sources.forEach(source => {
        if(source.srcId === srcId){
          source.progress = progress
        }
      })
    },
    setAssetTitle: (state, action) => {
      const { payload } = action;
      const { assetTitle } = payload;
      state.assetTitle = assetTitle;
    },
    setType: (state, action) => {
      const { payload } = action;
      const { type } = payload;
      state.type = type;
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
  setAssetId, 
  setAssetTitle, 
  setType, 
  addSource, 
  setSourceProgress, 
  removeSource, 
  setSources, 
  clearDialog 
} = dialogSlice.actions;

export default dialogSlice.reducer;
