import React from 'react';
import { useDispatch } from 'react-redux';
import { setStateValue } from 'appSlice';
import constants from 'config/constants';
import { date } from 'utils';

const { LOG_LEVEL } = constants;

export default function useAppLogState() {
  const dispatch = useDispatch();
  const setAppLogState = React.useCallback(
    (logMessage, logLevel = LOG_LEVEL.INFO) => {
      dispatch(
        setStateValue({
          key: 'appLog',
          value: {
            level: logLevel,
            message: logMessage,
            date: date.getLogDate()
          },
        })
      );
    },
    [dispatch]
  );
  return { setAppLogState };
}
