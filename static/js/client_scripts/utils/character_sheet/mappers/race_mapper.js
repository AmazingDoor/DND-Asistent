import * as race_features from './../../../../shared/race_features.js';
import * as character_data_handler from '../character_data_handler.js';
import { emitSignal } from '../../socket_emitter.js';
import { ABILITIES } from '../../../../shared/data_enums.js';

let socket = null;

let default_race_skills;
let default_race_abilities;
let default_race_languages;
let saved_race_languages;
let saved_race_abilities;
let race_name;
let saved_race_skills;

let char_id = sessionStorage.getItem("charId");

export function Initialize() {
    emitSignal('require_race_data', {char_id: char_id});
    return new Promise(resolve =>{
        socket.once('sent_race_data', data => {
            resetRaceData();
            race_name = data.race_name;
            setRace(race_name);
            saved_race_languages = data.race_languages || [];
            let ability_index = 0;
            data.race_abilities.forEach((ability) => {
                setSavedAbility(ability_index, ability);
                ability_index++;
            });
            saved_race_skills = data.race_skills || [];
            resolve(data);
        });
    });
}

export function resetRaceData() {
    default_race_skills = [];
    default_race_abilities = [];
    default_race_languages = [];
    saved_race_abilities = [];
    saved_race_languages = [];
    saved_race_skills = []
    race_name = '';
}

export function setRaceSavedSkill(index, skill) {
    while(saved_race_skills.length <= index) {
        saved_race_skills.push("Any");
    }
    saved_race_skills[index] = skill;
}

export function getSavedRaceSkills() {
    return saved_race_skills;
}

export function setSavedAbility(index, ability) {
    ensureArraySize(index);
    saved_race_abilities[index] = ability;

}

function ensureArraySize(size) {
    while(saved_race_abilities.length <= size) {
        saved_race_abilities.push({[ABILITIES.OPTION]: 0});
    }
}

export function getSavedRaceAbilities() {
    return saved_race_abilities;
}

export function getSavedRaceLanguages() {
    return saved_race_languages;
}

export function setSocket(io) {
    socket = io;
}

export function setRace(name) {
    setDefaultRaceData(name);
}

export function setDefaultRaceData(name) {
    race_name = name;
    let race_data = race_features[getRaceId(race_name)];
    if(race_data === undefined) {return;}
    default_race_skills = race_data.skills;

    let abilities = race_data.abilities;

    Object.entries(abilities).forEach(([key, value]) => {
        if(key != "any") {
            default_race_abilities.push({[key]: value});
        } else {
            value.forEach((v) => {
                saved_race_abilities.push({Any: v});
            });
        }
    });
    default_race_languages = race_data.languages;
    default_race_languages.push([]);
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
    default_race_skills = data;
}

export function getRaceSkills() {
    return default_race_skills;
}

export function setRaceAbilities(data) {
    default_race_abilities = data;
}

export function getRaceAbilities() {
    return default_race_abilities;
}

export function setRaceLanguages(d) {
    default_race_languages = d;
}

export function getRaceLanguages() {
    return default_race_languages;
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