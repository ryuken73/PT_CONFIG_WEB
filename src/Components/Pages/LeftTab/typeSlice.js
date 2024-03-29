import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeList: [],
  currentTypeId: 4
};

export const typeSlice = createSlice({
  name: 'typeSlice',
  initialState,
  reducers: {
    setType: (state, action) => {
      const { payload } = action;
      const { typeList } = payload;
      state.typeList = typeList
    },
    addType: (state, action) => {
      const { payload } = action;
      const { type } = payload;
      state.typeList.push(type);
    },
    removeType: (state, action) => {
      const { payload } = action;
      const { typeId } = payload;
      state.typeList = state.typeList.filter(type => type.typeId !== typeId);
    },
    updateType: (state, action) => {
      const { payload } = action;
      const { typeId, key, value } = payload;
      const type = state.typeList.find(type => type.typeId === typeId);
      if(type) type[key] = value;
    },
    setCurrentTypeId: (state, action) => {
      const { payload } = action;
      const { currentTypeId } = payload;
      state.currentTypeId = currentTypeId
    },
  },
})

export const { 
  setType,
  addType, 
  removeType, 
  updateType, 
  setCurrentTypeId
} = typeSlice.actions;

export default typeSlice.reducer;