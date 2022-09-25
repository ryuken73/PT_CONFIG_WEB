import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogOpen, addSource } from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialogOpen);
  const title = useSelector((state) => state.dialog.title);
  const type = useSelector((state) => state.dialog.type);
  const sources = useSelector((state) => state.dialog.sources);
  console.log('###', sources);

  const setDroppedSrcState = React.useCallback(
    (src) => {
      const id = Date.now();
      dispatch(addSource({ src, id }));
    },
    [dispatch]
  );

  const setDialogOpenState = React.useCallback(
    (open) => {
      dispatch(setDialogOpen({ dialogOpen: open }));
    },
    [dispatch]
  );

  return {
    dialogOpen,
    title,
    type,
    sources,
    setDialogOpenState,
    setDroppedSrcState,
  };
}
