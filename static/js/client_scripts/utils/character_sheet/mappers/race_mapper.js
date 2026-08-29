import * as race_features from './../../../../shared/race_features.js';
import * as character_data_handler from '../character_data_handler.js';
import { emitSignal } from '../../socket_emitter.js';

let socket = null;

let race_skills;
let race_abilities;
let race_languages;
let saved_race_languages;
let race_name;

let char_id = sessionStorage.getItem("charId");

export function Initialize() {
    emitSignal('require_race_data', {char_id: char_id});
    return new Promise(resolve =>{
        socket.once('sent_race_data', data => {
            race_name = data.race_name;
            saved_race_languages = data.race_languages || [];
            setRace(race_name);
            resolve(data);
        });
    });
}

export function resetRaceData() {
    race_skills = [];
    race_abilities = [];
    race_languages = [];
    race_name = '';
}

export function getSavedRaceLanguages() {
    return saved_race_languages;
}

export function setSocket(io) {
    socket = io;
}

export function setRace(name) {
    race_name = name;
    let race_data = race_features[getRaceId(race_name)];
    if(race_data == undefined) {return;}
    race_skills = race_data.skills;
    race_abilities = race_data.abilities;
    race_languages = race_data.languages;
    race_languages.push([]);
}

export function getRaceId(name) {
    return name.toLowerCase().replace(" ", "_")
}

export function getRace() {
    if(race_name == "Select Race") {
        return undefined;
    }
    return race_name;
}

export function setRaceSkills(data) {
    race_skills = data;
}

export function getRaceSkills() {
    return race_skills;
}

export function setRaceAbilities(data) {
    race_abilities = data;
}

export function getRaceAbilities() {
    return race_abilities;
}

export function setRaceLanguages(d) {
    race_languages = d;
}

export function getRaceLanguages() {
    return race_languages;
}

export function getRaceName() {
    return race_name;
}

export function setRaceName(d) {
    race_name = d;
}

export function getRaceData(race) {
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