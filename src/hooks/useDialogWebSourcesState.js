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

  const addWebSourceState = React.useCallback((webSource) => {
    const {src, id} = webSource;
    dispatch(addWebSource({src, id}));
  },[dispatch])

  return {
    webSources,
    setWebSourcesState,
    addWebSourceState,
    removeWebSource
  };
}
