import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setDialogOpen, 
  setIsEditMode,
  clearDialog, 
  // setAssetId, 
  // etAssetTitle, 
  // setDisplayMode,
  setAssetDetail
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialogOpen);
  const isEditMode = useSelector((state) => state.dialog.isEditMode);
  const assetId = useSelector((state) => state.dialog.assetId);
  const assetTitle = useSelector((state) => state.dialog.assetTitle);
  const displayMode = useSelector((state) => state.dialog.displayMode);
  const isScrollVideoChecked = useSelector((state) => state.dialog.isScrollVideoChecked);
  const isScrollSmooth = useSelector((state) => state.dialog.isScrollSmooth);
  const scrollSpeed = useSelector((state) => state.dialog.scrollSpeed);

  const setDialogOpenState = React.useCallback(
    (open) => {
      dispatch(setDialogOpen({ dialogOpen: open }));
    },
    [dispatch]
  );

  const setIsEditModeState = React.useCallback(
    (isEditMode) => {
      dispatch(setIsEditMode({ isEditMode }));
    },
    [dispatch]
  );

  // const setIdState = React.useCallback((id) => {
  //   dispatch(setAssetId({assetId:id}));
  // },[dispatch])

  // const setAssetTitleState = React.useCallback((assetTitle) => {
  //   dispatch(setAssetTitle({assetTitle}));
  // },[dispatch])

  // const setDisplayModeState = React.useCallback((displayMode) => {
  //   dispatch(setDisplayMode({displayMode}));
  // },[dispatch])

  const setAssetDetailState = React.useCallback((key, value) => {
    dispatch(setAssetDetail({key, value}));
  },[dispatch])

  const clearDialogState = React.useCallback(() => {
    dispatch(clearDialog())
  },[dispatch])

  return {
    dialogOpen,
    isEditMode,
    assetId,
    assetTitle,
    displayMode,
    isScrollVideoChecked,
    isScrollSmooth,
    scrollSpeed,
    setDialogOpenState,
    setIsEditModeState,
    // setIdState,
    // setAssetTitleState,
    // setDisplayModeState,
    setAssetDetailState,
    clearDialogState,
  };
}
