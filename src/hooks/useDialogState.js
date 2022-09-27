import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setDialogOpen, 
  clearDialog, 
  addSource, 
  setSources,
  setSourceProgress, 
  setId, 
  setTitle, 
  setType 
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialogOpen);
  const title = useSelector((state) => state.dialog.title);
  const type = useSelector((state) => state.dialog.type);
  const sources = useSelector((state) => state.dialog.sources);
  console.log('###', sources);

  const setDialogAssetState = React.useCallback(
    (drops) => {
      const id = Date.now();
      const {name, size, type} = drops[0];
      const [mainType, ] = type.split('/');
      const assetType = mainType === 'video' ?  'video' 
      : mainType === 'image' ? 'image' 
      : 'web';
      drops.forEach((drop,index) => {
        dispatch(addSource({ 
          src: drop.name, 
          size: drop.size, 
          id: id + index }));
      })
      dispatch(setTitle({title: name}))
      dispatch(setType({type: assetType}))
    },
    [dispatch]
  );

  const setDialogOpenState = React.useCallback(
    (open) => {
      dispatch(setDialogOpen({ dialogOpen: open }));
    },
    [dispatch]
  );

  const setSourcesState = React.useCallback((sources) => {
    dispatch(setSources({sources}));
  },[dispatch])

  const setIdState = React.useCallback((id) => {
    dispatch(setId({id}));
  },[dispatch])

  const setTitleState = React.useCallback((title) => {
    dispatch(setTitle({title}));
  },[dispatch])

  const setTypeState = React.useCallback((type) => {
    dispatch(setType({type}));
  },[dispatch])

  const addSourceState = React.useCallback((source) => {
    const {src, size, id} = source;
    dispatch(addSource({src, size, id}));
  },[dispatch])

  const updateProgressState = React.useCallback((sourceId) => {
    return (progress) => {
      dispatch(setSourceProgress({id: sourceId, progress}));
    }
  },[dispatch])

  const clearDialogState = React.useCallback(() => {
    dispatch(clearDialog())
  },[dispatch])

  return {
    dialogOpen,
    title,
    type,
    sources,
    setDialogOpenState,
    setDialogAssetState,
    setSourcesState,
    setIdState,
    setTitleState,
    setTypeState,
    addSourceState,
    updateProgressState,
    clearDialogState
  };
}
