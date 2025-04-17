import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setSources,
  setSourceProgress, 
} from 'Components/Dialog/dialogSlice'

export default function useDialogState() {
  const dispatch = useDispatch();

  const setSourcesState = React.useCallback((sources) => {
    dispatch(setSources({sources}));
  },[dispatch])

  const updateProgressState = React.useCallback((id) => {
    return (progress) => {
      dispatch(setSourceProgress({srcId: id, progress}));
    }
  },[dispatch])

  return {
    setSourcesState,
    updateProgressState,
  };
}
