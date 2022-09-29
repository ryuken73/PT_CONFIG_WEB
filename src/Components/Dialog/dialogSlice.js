import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
  title: '',
  type: 'video',
  sources: [],
  assetId:'',
  webSources: [
    {src: 'http://cctvmap.sbs.co.kr/map'},
    {src: 'https://www.naver.com'}
  ]
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
      const { src, size, assetId } = payload;
      state.sources.push({src, size, assetId, progress:'0%'});
    },
    addWebSource: (state, action) => {
      const { payload } = action;
      const { src, assetId } = payload;
      state.webSources.push({src, assetId});
    },
    removeSource: (state, action) => {
      const { payload } = action;
      const { assetId } = payload;
      state.sources = state.sources.filter(source => source.assetId !== assetId);
    },
    removeWebSource: (state, action) => {
      const { payload } = action;
      const { assetId } = payload;
      state.webSources = state.webSources.filter(source => source.assetId !== assetId);
    },
    setSources: (state, action) => {
      const { payload } = action;
      const { sources } = payload;
      state.sources = sources
    },
    setWebSources: (state, action) => {
      const { payload } = action;
      const { webSources } = payload;
      state.webSources = webSources
    },
    setSourceProgress: (state, action) => {
      const { payload } = action;
      const { assetId, progress } = payload;
      state.sources.forEach(source => {
        if(source.assetId === assetId){
          source.progress = progress
        }
      })
    },
    setTitle: (state, action) => {
      const { payload } = action;
      const { title } = payload;
      state.title = title;
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
      state.title = '';
      state.type = 'video';
      state.sources = [];
    },
  },
})

export const { 
  setDialogOpen, 
  setAssetId, 
  setType, 
  setTitle, 
  addSource, 
  addWebSource,
  setSourceProgress, 
  removeSource, 
  removeWebSource,
  setSources, 
  setWebSources,
  clearDialog 
} = dialogSlice.actions;

export default dialogSlice.reducer;
