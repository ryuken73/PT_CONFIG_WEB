import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addSource, 
  removeSource,
  setSources,
  setSourceProgress, 
  setAssetTitle,
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const sources = useSelector((state) => state.dialog.sources);
  console.log('###', sources);

  const setDialogAssetState = React.useCallback(
    (drops) => {
      const id = Date.now();
      drops.forEach((drop,index) => {
        const {name, type, size} = drop;
        const [mimeType, ] = type.split('/');
        const srcType = mimeType === 'video' ?  'video' 
        : mimeType === 'image' ? 'image' 
        : 'web';
        dispatch(addSource({ 
          src: name, 
          size: size, 
          srcType,
          srcId: id + index 
        }));
      })
      dispatch(setAssetTitle({assetTitle: drops[0].name}))
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
