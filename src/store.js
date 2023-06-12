import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import appReducer from 'appSlice';
import configReducer from 'Components/Header/configSlice';
import assetReducer from 'Components/Pages/MainTab/assetSlice';
import typeReducer from 'Components/Pages/LeftTab/typeSlice';
import dialogReducer from 'Components/Dialog/dialogSlice';
import headerReducer from 'Components/Header/headerSlice';
import imageDialogReducer from 'Components/AddImageDialog/imageDialogSlice';
import CONSTANTS from 'config/constants';

const { LOGLESS_REDUX_ACTIONS = ['assetSlice/updateJobProgress'] } = CONSTANTS;

const logger = createLogger({
  predicate: (getState, action) => !LOGLESS_REDUX_ACTIONS.includes(action.type),
});

export const store = configureStore({
  reducer: {
    app: appReducer,
    asset: assetReducer,
    type: typeReducer,
    config: configReducer,
    dialog: dialogReducer,
    header: headerReducer,
    imageDialog: imageDialogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
