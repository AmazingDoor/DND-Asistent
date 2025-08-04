import {setSocket as setAbilityHandlerSocket} from './../ability_handler.js'

export let socket = null;

export function setFactorySocket(io) {
    socket = io;
    setAbilityHandlerSocket(io);
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized yet!");
  return socket;
}