
let socket = null;

export function setSocket(io) {
    socket = io;
}

export function emitAndWait(signalName, data) {
    return new Promise((resolve) => {
        socket.emit(signalName, data, resolve); 
    });
}

export function emitSignal(signalName, data) {
    socket.emit(signalName, data);
}