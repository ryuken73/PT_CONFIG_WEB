import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addSource, 
  removeSource,
  setSources,
  setSrcType,
  setSourceProgress, 
  setAssetDetail
  // setAssetTitle,
} from 'Components/Dialog/dialogSlice'

const getNextSrcType = srcType => {
  const nextType = srcType === 'video' ? 'image' : srcType === 'image' ? 'web' : 'video';
  return nextType;
}

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
      dispatch(setAssetDetail({key: 'assetTitle', value: drops[0].name}))
    },
    [dispatch]
  );

  const setSourcesState = React.useCallback((sources) => {
    dispatch(setSources({sources}));
  },[dispatch])

  const addSourceState = React.useCallback((source) => {
    const {src, size, srcId, srcType} = source;
    dispatch(addSource({src, size, srcId, srcType}));
  },[dispatch])

  const removeSourceState = React.useCallback((id) => {
    dispatch(removeSource({srcId: id}));
  },[dispatch])

  const toggleSrcTypeState = React.useCallback((id) => {
    const targetSource = sources.find(source => source.srcId === id);
    const nextSrcType = getNextSrcType(targetSource.srcType);
    dispatch(setSrcType({srcId: id, srcType: nextSrcType}))
  },[dispatch, sources])

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
    toggleSrcTypeState,
    removeSourceState,
    updateProgressState,
  };
}
