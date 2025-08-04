import {setSocket as setMessageHandlerSocket} from './../message_handler.js';
import {setSocket as setMessageImageSocket} from './../image_handler.js';

export let socket = null;

export function setFactorySocket(io) {
    socket = io;
    setMessageHandlerSocket(io);
    setMessageImageSocket(io);
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized yet!");
  return socket;
}