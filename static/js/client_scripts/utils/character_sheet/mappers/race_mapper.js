let race = null;
let socket = null;

export function setSocket(io) {
    socket = io;
}

export function setRace(race_name) {
    race = race_name;
}

export function getRace() {
    return race;
}

export function getRaceData() {
    console.log("Implement this");
}