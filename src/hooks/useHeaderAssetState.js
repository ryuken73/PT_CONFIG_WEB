import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeAssetActive 
} from 'Components/Header/headerSlice';
import axiosRequest from 'lib/axiosRequest';

const putAssetsActive = async (assetsActive) => {
  const [ axiosWithAuth ] = axiosRequest();
  return axiosWithAuth.putAssetsActive({assetsActive})
  .then(result => {
    return result;
  })
}

const delAssetActive = async (id) => {
  const [ axiosWithAuth ] = axiosRequest();
  return axiosWithAuth.deleteAssetActive({assetId: id})
  .then(result => {
    return result;
  })
}

export default function useHeaderState() {
  const dispatch = useDispatch();
  const assetsActive = useSelector((state) => state.header.assetsActive);

  const addAssetActiveState = React.useCallback(
    async (asset) => {
      // first, set assetsActive value in state, and then loadAssetsActive again.
      // dispatch(addAssetActive({ asset }));
       await putAssetsActive([...assetsActive, asset])
      // if(result.success){
        // loadAssetsActiveState();
      // }
    },
    [assetsActive]
  );

  const removeAssetActiveState = React.useCallback(
    async (assetId) => {
      dispatch(removeAssetActive({ assetId }));
      await delAssetActive(assetId);
      // const result = await delAssetActive(assetId);
      // if(result.success){
      //   loadAssetsActiveState();
      // }
    },
    [dispatch]
  );
  return { 
    assetsActive, 
    addAssetActiveState,
    removeAssetActiveState
  };
}
