import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from 'config/constants';

// initialize application log (log file name, format etc..)
const date = (new Date()).toLocaleDateString();
const { LOG_LEVEL } = CONSTANTS;
const initialState = {
  modalOpen: false,
  isMessageBoxHidden: true,
  messageBoxText: 'test',
  messageBoxLevel: 'success',
  appLog: {
    level: LOG_LEVEL.INFO,
    date,
    message: 'App Started',
  },
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      const { payload } = action;
      const { open } = payload;
      state.modalOpen = open;
    },
    setStateValue: (state, action) => {
      const { payload } = action;
      const { key, value } = payload;
      state[key] = value;
    },
    setAppLog: (state, action) => {
      const { payload } = action;
      const { level = LOG_LEVEL.INFO, message } = payload;
      const date = (new Date()).toLocaleDateString();
      state.appLog = {
        level,
        date,
        message,
      };
    },
  },
});

export const { setModalOpen, setStateValue, setAppLog } = appSlice.actions;

export const showMessageBoxForDuration =
  (text, duration = 1000, level = 'success') =>
  async (dispatch, getState) => {
    dispatch(setStateValue({ key: 'isMessageBoxHidden', value: false }));
    dispatch(setStateValue({ key: 'messageBoxLevel', value: level }));
    dispatch(setStateValue({ key: 'messageBoxText', value: text }));
    setTimeout(() => {
      dispatch(setStateValue({ key: 'isMessageBoxHidden', value: true }));
    }, [duration])
    setTimeout(() => {
      const state = getState();
      if(state.app.isMessageBoxHidden) {
        dispatch(setStateValue({ key: 'messageBoxText', value: '' }));
        dispatch(setStateValue({ key: 'messageBoxLevel', value: 'success' }));
      }
    }, [duration + 500]);
}

export default appSlice.reducer;
