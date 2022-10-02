import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setAssetsActive, 
  addAssetActive, 
  removeAssetActive 
} from 'Components/Header/headerSlice';
import axiosRequest from 'lib/axiosRequest';

const getAssetsActive = async () => {
  const [ axiosWithAuth ] = axiosRequest();
  return axiosWithAuth.getAssetsActive()
  .then(result => {
    const parsed = result.assetsActive.map(asset => {
      return {
        ...asset,
        id: asset.assetId.toString()
      }
    })
    return parsed
  })
}
const putAssetsActive = async (assetsActive) => {
  const [ axiosWithAuth ] = axiosRequest();
  return axiosWithAuth.putAssetsActive({assetsActive})
  .then(result => {
    return result;
  })
}

export default function useHeaderState() {
  const dispatch = useDispatch();
  const assetsActive = useSelector((state) => state.header.assetsActive);

  const loadAssetsActiveState = React.useCallback(async () => {
    const assetsActive = await getAssetsActive();
    dispatch(setAssetsActive({ assetsActive }));
  },[dispatch])

  const setAssetsActiveState = React.useCallback(
    async (assetsActive) => {
      // first, set assetsActive value in state, and then loadAssetsActive again.
      dispatch(setAssetsActive({ assetsActive }));
      const result = await putAssetsActive(assetsActive);
      if(result.success){
        loadAssetsActiveState();
      }
    },
    [dispatch, loadAssetsActiveState]
  );

  const addAssetActiveState = React.useCallback(
    async (asset) => {
      // first, set assetsActive value in state, and then loadAssetsActive again.
      dispatch(addAssetActive({ asset }));
      const result = await putAssetsActive([...assetsActive, asset])
      if(result.success){
        loadAssetsActiveState();
      }
    },
    [assetsActive, dispatch, loadAssetsActiveState]
  );
  const removeAssetActiveState = React.useCallback(
    (assetId) => {
      dispatch(addAssetActive({ assetId }));
    },
    [dispatch]
  );
  return { 
    assetsActive, 
    loadAssetsActiveState,
    setAssetsActiveState,
    addAssetActiveState,
    removeAssetActiveState
  };
}
