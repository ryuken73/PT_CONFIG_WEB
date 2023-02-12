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
  toggleChecked,
  setAllAssetChecked,
  setAllAssetUnChecked,
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

const TYPE_ID_FAVORITE = 0;
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
  const assetListInState = useSelector((state) => state.asset.assetList);
  const assetChecked = useSelector((state) => state.asset.assetChecked);
  const currentTypeId = useSelector((state) => state.type.currentTypeId);

  const filterFunction = React.useMemo(() => {
    return filterAssetsByType(currentTypeId)
  }, [currentTypeId])

  const assetList = React.useMemo(() => {
      return assetListInState.map(asset => {
        if(assetChecked.includes(asset.assetId)){
          return {...asset, checked: true}
        }
        return {...asset, checked: false}
      })
      .filter(filterFunction)
  }, [assetChecked, assetListInState, filterFunction])

  const assetListRef = React.useRef([]);
  assetListRef.current = assetList;

  const assetListChecked = React.useMemo(() => {
    assetList.filter(asset => asset.checked);
  }, [assetList])

  const allChecked = React.useMemo(() => {
    return assetList.length === 0
      ? false
      : assetList.every((asset) => asset.checked === true);
  }, [assetList]);

  const loadAssetListState = React.useCallback(async () => {
    const assetList = await getAssetList();
    dispatch(setAssets({ assetList }));
  },[dispatch])  

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

  const toggleCheckedState = React.useCallback((assetId) => {
    dispatch(toggleChecked({assetId}));
  },[dispatch])

  const toggleIsFavoriteState = React.useCallback( async (assetId, isFavorite) => {
    const asset = await updateAssetIsFavorite(assetId, isFavorite)
    dispatch(setAsset({assetId, asset}))
  },[dispatch])

  const toggleAllCheckedState = React.useCallback(
    (checked) => {
      // dispatch(updateAllAssets({ key: 'checked', value: checked }));
      checked && dispatch(setAllAssetChecked());
      !checked && dispatch(setAllAssetUnChecked());
    },
    [dispatch]
  );

  const removeAssetState = React.useCallback((assetId) => {
    // run axios.del and get new assets 
    // and then dispatch setAssets
    axiosWithAuth.delAsset({assetId})
    .then(result => {
      return axiosWithAuth.getAssetList();
    })
    .then(result => {
      setAssetsState(result.assetList);
    })
  },[setAssetsState])

  const removeAssetAllCheckedState = React.useCallback( async () => {
    const delPromises = assetChecked.map(assetId => axiosWithAuth.delAsset({assetId}))
    Promise.all(delPromises);
    const assetList = await getAssetList();
    setAssetsState(assetList);
    dispatch(setAllAssetUnChecked);
  }, [assetChecked, dispatch, setAssetsState]);

  const resetToDefaultState = React.useCallback(async () => {
    await axiosWithAuth.resetToDefault();
    const assetList =await getAssetList();
    setAssetsState(assetList);
  },[setAssetsState])

  return {
    assetList,
    assetListChecked,
    allChecked,
    loadAssetListState,
    addAssetsState,
    toggleCheckedState,
    toggleAllCheckedState,
    toggleIsFavoriteState,
    removeAssetState,
    setAssetsState,
    removeAssetAllCheckedState,
    resetToDefaultState
  };
}
