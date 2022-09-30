import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addSource, 
  removeSource,
  setSources,
  setSourceProgress, 
  setTitle,
  setType
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const sources = useSelector((state) => state.dialog.sources);
  console.log('###', sources);

  const setDialogAssetState = React.useCallback(
    (drops) => {
      const id = Date.now();
      const {name, type} = drops[0];
      const [mainType, ] = type.split('/');
      const assetType = mainType === 'video' ?  'video' 
      : mainType === 'image' ? 'image' 
      : 'web';
      drops.forEach((drop,index) => {
        dispatch(addSource({ 
          src: drop.name, 
          size: drop.size, 
          srcId: id + index }));
      })
      dispatch(setTitle({title: name}))
      dispatch(setType({type: assetType}))
    },
    [dispatch]
  );

  const setSourcesState = React.useCallback((sources) => {
    dispatch(setSources({sources}));
  },[dispatch])

  const addSourceState = React.useCallback((source) => {
    const {src, size, srcId} = source;
    dispatch(addSource({src, size, srcId}));
  },[dispatch])

  const removeSourceState = React.useCallback((id) => {
    dispatch(removeSource({srcId: id}));
  },[dispatch])

  const updateProgressState = React.useCallback((id) => {
    return (progress) => {
      dispatch(setSourceProgress({srcId: id, progress}));
    }
  },[dispatch])

  return {
    sources,
    setDialogAssetState,
    setSourcesState,
    addSourceState,
    removeSourceState,
    updateProgressState,
  };
}
