/* eslint-disable import/named */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosRequest from 'lib/axiosRequest';
import constants from 'config/constants';
import {
  setType,
  addType,
  removeType,
  updateType,
  setCurrentTypeId
} from 'Components/Pages/LeftTab/typeSlice';

const [axiosWithAuth] = axiosRequest();
const { LOG_LEVEL } = constants;

const getTypeList = async () => {
  return axiosWithAuth.getTypeList()
  .then(result => {
    return result.typeList
  })
}

const appendType = async (type) => {
  return axiosWithAuth.putType({type})
  .then(result => {
    console.log(result)
    return result.typeList
  })
}

const delType = async (typeId) => {
  return axiosWithAuth.delType({typeId})
  .then(result => {
    console.log(result)
    return result.typeList
  })
}

export default function useAssetListState() {
  const dispatch = useDispatch();
  const typeList = useSelector((state) => state.type.typeList);
  const currentTypeId = useSelector((state) => state.type.currentTypeId);

  const setTypeState = React.useCallback(async () => {
    const typeList = await getTypeList();
    console.log('$$$', typeList);
    dispatch(setType({ typeList }));
  },[dispatch])  

  const addTypeState = React.useCallback(async (type) => {
    const types = await appendType(type);
    dispatch(setType({ typeList: types }));
  }, [dispatch]);

  const removeTypeState = React.useCallback(async (typeId) => {
    const types = await delType(typeId);
    dispatch(setType({ typeList: types }));
  },[dispatch])

  const setCurrentTypeIdState = React.useCallback(async (currentTypeId) => {
    dispatch(setCurrentTypeId({ currentTypeId }));
  },[dispatch])

  return {
    typeList,
    currentTypeId,
    setTypeState,
    addTypeState,
    removeTypeState,
    setCurrentTypeIdState
  };
}
