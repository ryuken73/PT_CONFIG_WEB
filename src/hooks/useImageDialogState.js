import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setDialogOpen, 
  setImages,
  addImage,
  delImage
} from 'Components/AddImageDialog/imageDialogSlice'

export default function useImageDialogState() {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.imageDialog.dialogOpen);
  const images = useSelector((state) => state.imageDialog.images);

  const setImageDialogOpenState = React.useCallback(
    (open) => {
      dispatch(setDialogOpen({ dialogOpen: open }));
    },
    [dispatch]
  );
  const setImagesState = React.useCallback(
    (images) => {
      dispatch(setImages({ images }));
    },
    [dispatch]
  );
  
  const addImageState = React.useCallback(
    (image) => {
      dispatch(addImage({ image }));
    },
    [dispatch]
  );
  const delImageState = React.useCallback(
    (id) => {
      const imageId = parseInt(id);
      dispatch(delImage({ imageId }));
    },
    [dispatch]
  );

  return {
    images,
    dialogOpen,
    setImageDialogOpenState,
    setImagesState,
    addImageState,
    delImageState
  };
}
