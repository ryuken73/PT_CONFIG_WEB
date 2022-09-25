/* eslint-disable import/named */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import constants from 'config/constants';
import useAppState from 'hooks/useAppState';
import {
  addAsset,
  addAssets,
  setAssets,
  removeAsset,
  updateAsset,
  updateAllAssets,
  updateCheckedAsset,
  // startMediainfoQueue,
} from 'Components/Pages/MainTab/assetSlice';

const { LOG_LEVEL } = constants;

export default function useAssetListState() {
  const dispatch = useDispatch();
  const assetList = useSelector((state) => state.asset.assetList);
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

  const toggleAllCheckedState = React.useCallback(
    (checked) => {
      dispatch(updateAllAssets({ key: 'checked', value: checked }));
    },
    [dispatch]
  );

  const removeAssetState = React.useCallback((id) => {
    // run axios.del and get new assets 
    // and then dispatch setAssets
    const newAssetList = assetList.filter(asset => asset.id !== id);
    dispatch(setAssets({assetList: newAssetList}));
  },[])

  const removeAssetAllCheckedState = React.useCallback(() => {
    const checkedAssets = assetListRef.current.filter(
      (asset) => asset.checked === true
    );
    checkedAssets.forEach((asset) => {
      dispatch(removeAsset({ assetId: asset.id }));
    });
  }, [dispatch]);

  return {
    assetList,
    allChecked,
    addAssetsState,
    removeAssetState,
    setAssetsState,
    toggleAllCheckedState,
    removeAssetAllCheckedState,
  };
}
