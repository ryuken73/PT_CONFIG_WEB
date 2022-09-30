import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addWebSource, 
  removeWebSource,
  setWebSources,
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();
  const webSources = useSelector((state) => state.dialog.webSources);
  console.log('###', webSources);

  const setWebSourcesState = React.useCallback((webSources) => {
    dispatch(setWebSources({webSources}));
  },[dispatch])

  const addWebSourceState = React.useCallback((src) => {
    const srcId = Date.now();
    dispatch(addWebSource({srcId, src}));
  },[dispatch])

  const removeWebSourceState = React.useCallback((srcId) => {
    dispatch(removeWebSource({srcId}));
  },[dispatch])

  return {
    webSources,
    setWebSourcesState,
    addWebSourceState,
    removeWebSourceState,
  };
}
