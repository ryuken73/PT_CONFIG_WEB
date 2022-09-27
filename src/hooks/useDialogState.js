import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setDialogOpen, 
  clearDialog, 
  setId, 
  setTitle, 
  setType 
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialogOpen);
  const title = useSelector((state) => state.dialog.title);
  const type = useSelector((state) => state.dialog.type);

  const setDialogOpenState = React.useCallback(
    (open) => {
      dispatch(setDialogOpen({ dialogOpen: open }));
    },
    [dispatch]
  );

  const setIdState = React.useCallback((id) => {
    dispatch(setId({id}));
  },[dispatch])

  const setTitleState = React.useCallback((title) => {
    dispatch(setTitle({title}));
  },[dispatch])

  const setTypeState = React.useCallback((type) => {
    dispatch(setType({type}));
  },[dispatch])

  const clearDialogState = React.useCallback(() => {
    dispatch(clearDialog())
  },[dispatch])

  return {
    dialogOpen,
    title,
    type,
    setDialogOpenState,
    setIdState,
    setTitleState,
    setTypeState,
    clearDialogState
  };
}
