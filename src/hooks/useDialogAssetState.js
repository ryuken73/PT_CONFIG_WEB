import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  setDialogOpen, 
  setIsEditMode,
  setAssetDetail
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();

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

  const setAssetDetailState = React.useCallback((key, value) => {
    dispatch(setAssetDetail({key, value}));
  },[dispatch])

  return {
    setDialogOpenState,
    setIsEditModeState,
    setAssetDetailState,
  };
}
