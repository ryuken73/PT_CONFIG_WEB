/* eslint-disable import/named */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosRequest from 'lib/axiosRequest';
import constants from 'config/constants';
import useAppState from 'hooks/useAppState';
import {
  addAsset,
  addAssets,
  setAssets,
  removeAsset,
  updateAsset,
  toggleChecked,
  setAllAssetChecked,
  setAllAssetUnChecked,
  updateAllAssets,
  // startMediainfoQueue,
} from 'Components/Pages/MainTab/assetSlice';

const [axiosWithAuth] = axiosRequest();
const { LOG_LEVEL } = constants;

export default function useAssetListState() {
  const dispatch = useDispatch();
  const assetListInState = useSelector((state) => state.asset.assetList);
  const assetChecked = useSelector((state) => state.asset.assetChecked);
  const assetList = assetListInState.map(asset => {
    if(assetChecked.includes(asset.id)){
      return {...asset, checked: true}
    }
    return {...asset, checked: false}
  })
  const assetListRef = React.useRef([]);
  assetListRef.current = assetList;
  const allChecked = React.useMemo(() => {
    return assetList.length === 0
      ? false
      : assetList.every((asset) => asset.checked === true);
  }, [assetList]);

  const setAssetsState = React.useCallback((assets) => {
    dispatch(setAssets({assetList: assets}))
  },[dispatch])

  const addAssetsState = React.useCallback(
    (assets) => {
      if (Array.isArray(assets)) {
        dispatch(addAssets({ assets }));
      } else {
        throw new Error('assets should be Array');
      }
    },
    [dispatch]
  );

  const toggleCheckedState = React.useCallback((id) => {
    dispatch(toggleChecked({assetId: id}));
  },[dispatch])

  const toggleAllCheckedState = React.useCallback(
    (checked) => {
      // dispatch(updateAllAssets({ key: 'checked', value: checked }));
      checked && dispatch(setAllAssetChecked());
      !checked && dispatch(setAllAssetUnChecked());
    },
    [dispatch]
  );

  const removeAssetState = React.useCallback((id) => {
    // run axios.del and get new assets 
    // and then dispatch setAssets
    axiosWithAuth.delAsset({id})
    .then(result => {
      return axiosWithAuth.getAssetList();
    })
    .then(result => {
      setAssetsState(result.assetList);
    })
  },[setAssetsState])

  const removeAssetAllCheckedState = React.useCallback(() => {
    const delPromises = assetChecked.map(assetId => axiosWithAuth.delAsset({id: assetId}))
    Promise.all(delPromises)
    .then(result => {
      return axiosWithAuth.getAssetList();
    })
    .then(result => {
      setAssetsState(result.assetList);
    })
  }, [assetChecked, setAssetsState]);

  return {
    assetList,
    allChecked,
    addAssetsState,
    toggleCheckedState,
    toggleAllCheckedState,
    removeAssetState,
    setAssetsState,
    removeAssetAllCheckedState,
  };
}
