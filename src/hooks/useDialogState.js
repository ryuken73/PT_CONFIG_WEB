import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setDialogOpen, 
  clearDialog, 
  setAssetId, 
  setAssetTitle, 
  setType 
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialogOpen);
  const assetTitle = useSelector((state) => state.dialog.assetTitle);
  const type = useSelector((state) => state.dialog.type);

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

  const setTypeState = React.useCallback((type) => {
    dispatch(setType({type}));
  },[dispatch])

  const clearDialogState = React.useCallback(() => {
    dispatch(clearDialog())
  },[dispatch])

  return {
    dialogOpen,
    assetTitle,
    type,
    setDialogOpenState,
    setIdState,
    setAssetTitleState,
    setTypeState,
    clearDialogState
  };
}
