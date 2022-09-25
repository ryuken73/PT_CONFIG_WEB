import React from 'react';
import { useSelector } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';

function useStorage(storageKey, stateSelector) {
  const [savedInStorage, saveLocalStorage] = useLocalStorage(storageKey, []);
  const stateValue = useSelector(stateSelector);

  React.useEffect(() => {
    saveLocalStorage(stateValue);
  }, [stateValue, saveLocalStorage]);

  return {
    savedInStorage,
  }
}

export default useStorage;
