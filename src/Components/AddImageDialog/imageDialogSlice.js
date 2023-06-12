import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
  images: []
};

export const imageDialogSlice = createSlice({
  name: 'imageDialogSlice',
  initialState,
  reducers: {
    setDialogOpen: (state, action) => {
      const { payload } = action;
      const { dialogOpen } = payload;
      state.dialogOpen = dialogOpen;
    },
    setImages: (state, action) => {
      const { payload } = action;
      const { images } = payload;
      state.images = images;
    },
    addImage: (state, action) => {
      const { payload } = action;
      const { image } = payload;
      state.images.push(image);
    },
    delImage: (state, action) => {
      const { payload } = action;
      const { imageId } = payload;
      state.images = state.images.filter(image => {
        return image.imageId !== imageId
      });
    },
  },
})

export const { 
  setDialogOpen, 
  setImages,
  addImage,
  delImage
} = imageDialogSlice.actions;

export default imageDialogSlice.reducer;
