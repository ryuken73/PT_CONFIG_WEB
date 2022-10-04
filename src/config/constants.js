const dev =  {
  TOUCH_WEB_SERVER_URL: 'http://127.0.0.1',
  SERVER_URL: 'http://localhost',
  LOG_LEVEL: {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
  },
  DEFAULT_CUSTOM_CONFIG_NAME: 'jin-transender',
  SOCKET_SERVER_URL: 'http://localhost:9009',
  EVENT_NEW_MESSAGES: 'post:newMessages',
  MEDIAINFO_BIN: '',
  SEND_PORT: 7000,
  SEND_URI_PATH: '/sendFile',
};

const prd = {
  ...dev,
  TOUCH_WEB_SERVER_URL: 'http://10.10.104.246',
  SERVER_URL: 'http://10.10.104.246',
};

export default process.env.NODE_ENV === 'development' ? dev:prd;
