import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMenued } from 'Components/Header/headerSlice';

export default function useHeaderState() {
  const dispatch = useDispatch();
  const menued = useSelector((state) => state.header.menued);
  const setMenuedState = React.useCallback(
    (menued) => {
      dispatch(setMenued({ menued }));
    },
    [dispatch]
  );
  return { menued, setMenuedState };
}
