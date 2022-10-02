import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setDialogOpen, 
  clearDialog, 
  setAssetId, 
  setAssetTitle, 
  setDisplayMode 
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialogOpen);
  const assetTitle = useSelector((state) => state.dialog.assetTitle);
  const displayMode = useSelector((state) => state.dialog.displayMode);

  const setDialogOpenState = React.useCallback(
    (open) => {
      dispatch(setDialogOpen({ dialogOpen: open }));
    },
    [dispatch]
  );

  const setIdState = React.useCallback((id) => {
    dispatch(setAssetId({assetId:id}));
  },[dispatch])

  const setAssetTitleState = React.useCallback((assetTitle) => {
    dispatch(setAssetTitle({assetTitle}));
  },[dispatch])

  const setDisplayModeState = React.useCallback((displayMode) => {
    dispatch(setDisplayMode({displayMode}));
  },[dispatch])

  const clearDialogState = React.useCallback(() => {
    dispatch(clearDialog())
  },[dispatch])

  return {
    dialogOpen,
    assetTitle,
    displayMode,
    setDialogOpenState,
    setIdState,
    setAssetTitleState,
    setDisplayModeState,
    clearDialogState
  };
}
