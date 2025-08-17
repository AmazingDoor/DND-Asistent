import * as class_proficiencies from './../../../../shared/class_proficiencies.js';

let class_name = null;
let socket = null;

export function setSocket(io) {
    socket = io;
}

export function setClass(c) {
    class_name = c;
}

export function getClassName() {
    return class_name;
}

export function getClassData() {
    const class_data = {
        Barbarian: class_proficiencies.barbarian,
        Bard: class_proficiencies.bard,
        Cleric: class_proficiencies.cleric,
        Druid: class_proficiencies.druid,
        Fighter: class_proficiencies.fighter,
        Monk: class_proficiencies.monk,
        Paladin: class_proficiencies.paladin,
        Ranger: class_proficiencies.ranger,
        Rogue: class_proficiencies.rogue,
        Sorcerer: class_proficiencies.sorcerer,
        Warlock: class_proficiencies.warlock,
        Wizard: class_proficiencies.wizard
    }
    return class_data[class_name];
}