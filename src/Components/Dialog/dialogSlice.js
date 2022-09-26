import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
  title: '',
  type: '',
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
    addSource: (state, action) => {
      const { payload } = action;
      const { src, size, id } = payload;
      state.sources.push({src, size, id, progress:'0%'});
    },
    removeSource: (state, action) => {
      const { payload } = action;
      const { id } = payload;
      state.sources = state.sources.filter(source => source.id !== id);
    },
    setSources: (state, action) => {
      const { payload } = action;
      const { sources } = payload;
      state.sources = sources
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
    clearDialog: (state, action) => {
      state.title = '';
      state.type = '';
      state.sources = [];
    },
  },
})

export const { 
  setDialogOpen, 
  setTitle, 
  setType, 
  addSource, 
  setSourceProgress, 
  removeSource, 
  setSources, 
  clearDialog 
} = dialogSlice.actions;

export default dialogSlice.reducer;
