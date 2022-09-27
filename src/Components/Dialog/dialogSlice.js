import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
  title: '',
  type: 'video',
  sources: [],
  id:'',
  webSources: []
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
      const { src, size, id } = payload;
      state.sources.push({src, size, id, progress:'0%'});
    },
    addWebSource: (state, action) => {
      const { payload } = action;
      const { src, id } = payload;
      state.webSources.push({src, id});
    },
    removeSource: (state, action) => {
      const { payload } = action;
      const { id } = payload;
      state.sources = state.sources.filter(source => source.id !== id);
    },
    removeWebSource: (state, action) => {
      const { payload } = action;
      const { id } = payload;
      state.webSources = state.webSources.filter(source => source.id !== id);
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
      const { id, progress } = payload;
      state.sources.forEach(source => {
        if(source.id === id){
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
    setId: (state, action) => {
      const { payload } = action;
      const { id } = payload;
      state.id = id;
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
  setId, 
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
