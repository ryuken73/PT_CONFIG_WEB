import React from 'react';
import socketio from "socket.io-client";
import constants from "config/constants";
const {TOUCH_WEB_SERVER_URL} = constants;

export const socket = socketio.connect(TOUCH_WEB_SERVER_URL);
export const SocketContext = React.createContext();