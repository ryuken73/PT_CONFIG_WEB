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
  setAsset,
  updateAsset,
  updateAllAssets,
  // startMediainfoQueue,
} from 'Components/Pages/MainTab/assetSlice';

const [axiosWithAuth] = axiosRequest();
const { LOG_LEVEL } = constants;

const getAssetList = async () => {
  return axiosWithAuth.getAssetList()
          .then(result => {
          return result.assetList;
  });
}

const updateAssetIsFavorite = async (assetId, isFavorite) => {
  return axiosWithAuth.postAsset({assetId, isFavorite})
         .then(result => {
            return result.asset;
         });
}

const updateAssetType = async (assetId, typeId) => {
  return axiosWithAuth.postAsset({assetId, typeId})
         .then(result => {
            return result.asset;
         });
}

const TYPE_ID_FAVORITE = 0;
const TYPE_ID_NONE = 2;
const TYPE_ID_ALL = 1;

const filterAssetsByType = (typeId) => {
  return (asset) => {
    if (typeId === TYPE_ID_ALL){
      return true;
    }
    if (typeId === TYPE_ID_FAVORITE) {
      return asset.isFavorite;
    }
    return asset.typeId === typeId;
  }
}

export default function useAssetListState() {
  const dispatch = useDispatch();
  const assetList = useSelector((state) => state.asset.assetList);
  // const assetChecked = useSelector((state) => state.asset.assetChecked);
  const currentTypeId = useSelector((state) => state.type.currentTypeId);

  const filterFunction = React.useMemo(() => {
    return filterAssetsByType(currentTypeId)
  }, [currentTypeId])

  const assetListCurrentType = React.useMemo(() => {
    return assetList.filter(filterFunction)
  }, [assetList, filterFunction])

  const assetChecked = React.useMemo(() => {
    return assetList.filter(asset => asset.checked);
  }, [assetList])

  const allChecked = React.useMemo(() => {
    return assetListCurrentType.length === 0
      ? false
      : assetListCurrentType.every((asset) => asset.checked === true);
  }, [assetListCurrentType]);

  const loadAssetListState = React.useCallback(async () => {
    const assetList = await getAssetList();
    const processTypeUndefined = assetList.map(asset => {
      if (asset.typeId === undefined){
        asset.typeId = TYPE_ID_NONE;
      }
      asset.checked = false;
      return asset;
    })
    dispatch(setAssets({ assetList: processTypeUndefined }));
  },[dispatch])  

  const setAssetsState = React.useCallback((assets) => {
    dispatch(setAssets({assetList: assets}))
  },[dispatch])

  const setAssetState = React.useCallback((assetId, asset) => {
    dispatch(setAsset({assetId, asset}))
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

  const toggleIsFavoriteState = React.useCallback( async (assetId, isFavorite) => {
    const asset = await updateAssetIsFavorite(assetId, isFavorite)
    dispatch(setAsset({assetId, asset}))
  },[dispatch])
  
  const setAssetTypeState = React.useCallback( async (assetId, typeId) => {
    const asset = await updateAssetType(assetId, typeId);
    dispatch(setAsset({assetId, asset}))
  },[dispatch])

  const toggleCheckedState = React.useCallback((assetId) => {
    const targetAsset = assetList.find(asset => asset.assetId === assetId);
    console.log(targetAsset)
    const prevChecked = targetAsset.checked;
    dispatch(updateAsset({assetId, key:'checked', value: !prevChecked}));
  },[assetList, dispatch])

  const toggleAllCheckedInTypeState = React.useCallback((checked) => { 
    assetListCurrentType.forEach(asset => {
      dispatch(updateAsset({
        assetId: asset.assetId,
        key: 'checked',
        value: checked
      }))
    })
  }, [assetListCurrentType, dispatch])

  const removeAssetState = React.useCallback((assetId) => {
    axiosWithAuth.delAsset({assetId})
  },[])

  const resetToDefaultState = React.useCallback(async () => {
    await axiosWithAuth.resetToDefault();
    const assetList =await getAssetList();
    setAssetsState(assetList);
  },[setAssetsState])

  const updateAllAssetsState = React.useCallback((key, value) => {
    dispatch(updateAllAssets({key, value}))
  }, [dispatch])

  return {
    assetList,
    assetListCurrentType,
    assetChecked,
    allChecked,
    loadAssetListState,
    addAssetsState,
    toggleCheckedState,
    toggleAllCheckedInTypeState,
    toggleIsFavoriteState,
    setAssetTypeState,
    removeAssetState,
    setAssetsState,
    setAssetState,
    resetToDefaultState,
    updateAllAssetsState
  };
}
