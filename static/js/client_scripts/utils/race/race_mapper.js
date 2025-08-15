import * as races from './../../../shared/race_features.js';
let race = null;

export function setRace(race_name) {
    const race_dict = {
        "High Elf": races.high_elf,
        "Wood Elf": races.wood_elf,
        "Drow": races.drow,
        "Hill Dwarf": races.hill_dwarf,
        "Mountain Dwarf": races.mountain_dwarf,
        "Lightfoot Halfling": races.lightfoot_halfling,
        "Stout Halfling": races.stout_halfling,
        "Dragonborn": races.dragonborn,
        "Forest Gnome": races.forest_gnome,
        "Rock Gnome": races.rock_gnome,
        "Half Elf": races.half_elf,
        "Half Orc": races.half_orc,
        "Tiefling": races.tiefling,
        "Human": races.human
    };
    race = race_dict[race_name];
}

export function getRaceData() {
    return race;
}