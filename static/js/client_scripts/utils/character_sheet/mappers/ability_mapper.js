let abilities = {};
let socket = null;

export function setSocket(io) {
    socket = io;
}

export function setAbilities(data) {
    abilities = data;
}

export function getAbilities() {
    return abilities;
}