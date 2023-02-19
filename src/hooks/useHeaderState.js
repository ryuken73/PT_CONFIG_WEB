import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setAssetsActive, 
  // addAssetActive, 
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

const delAssetActive = async (id) => {
  const [ axiosWithAuth ] = axiosRequest();
  return axiosWithAuth.deleteAssetActive({assetId: id})
  .then(result => {
    return result;
  })
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

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
      // await putAssetsActive(assetsActive);
      // const result = await putAssetsActive(assetsActive);
      // if(result.success){
      //   loadAssetsActiveState();
      // }
    },
    [dispatch]
  );

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

  const addAssetsActiveState = React.useCallback(
    async (assets) => {
       await putAssetsActive([...assetsActive, ...assets])
    },
    [assetsActive]
  );

  const  orderChangeAssetActiveState = React.useCallback(async (dragResult) => {
    const newAssetsActive = reorder(
        assetsActive,
        dragResult.source.index,
        dragResult.destination.index
    );
    await putAssetsActive(newAssetsActive);
  }, [assetsActive])


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
    loadAssetsActiveState,
    setAssetsActiveState,
    orderChangeAssetActiveState,
    addAssetActiveState,
    addAssetsActiveState,
    removeAssetActiveState
  };
}
