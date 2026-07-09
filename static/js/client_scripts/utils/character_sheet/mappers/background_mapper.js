import * as background_data from './../../../../shared/background_data.js';

let background_name = null;
let socket = null;

export function setSocket(io) {
    socket = io;
}

export function setBackground(c) {
    background_name = c;
}

export function getBackgroundName() {
    return background_name;
}

export function getBackgroundData() {
    console.log(background_name);
    const backgrounds = {
        Acolyte: background_data.acolyte,
        Charlatan: background_data.charlatan,
    }
    return backgrounds[background_name] || null;
}