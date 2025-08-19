import * as race_features from './../../../../shared/race_features.js';
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
    const data = {
        "High Elf": race_features.high_elf,
        "Wood Elf": race_features.wood_elf,
        "Drow": race_features.drow,
        "Hill Dwarf": race_features.hill_dwarf,
        "Mountain Dwarf": race_features.mountain_dwarf,
        "Lightfoot Halfling": race_features.lightfoot_halfling,
        "Stout Halfling": race_features.stout_halfling,
        "Dragonborn": race_features.dragonborn,
        "Forest Gnome": race_features.forest_gnome,
        "Rock Gnome": race_features.rock_gnome,
        "Half Elf": race_features.half_elf,
        "Half Orc": race_features.half_orc,
        "Tiefling": race_features.tiefling,
        "Human": race_features.human
    }
    return data[race];
}