import * as class_proficiencies from './../../../../shared/class_proficiencies.js';
import { getClassSpells, getPreparedSpellCount, getPreparedCantripCount } from '../../../../shared/spell_data_filterer.js';

let class_name = null;
let socket = null;

let class_skills = [0, []];
let class_weapon_proficiencies = [];
let class_armor_proficiencies = [];
let class_tool_proficiencies = [];
let class_saving_throws = [];
let class_spells = [];
let class_cantrips = [];
let using_spellbook = false;


export function Initialize() {
    socket.emit('required_client_class_data', {char_id: char_id})
    return new Promise((resolve) => {
        socket.on('build_character_class', data => {
            initializeClassData(data);
            resolve(data);
        });
    });

}

export function resetClassData() {
    class_skills = [0, []];
    class_weapon_proficiencies = [];
    class_armor_proficiencies = [];
    class_tool_proficiencies = [];
    class_saving_throws = [];
    class_spells = [];
    class_cantrips = [];
    using_spellbook = false;
}


export function getClassSkillNames() {
    return class_skills[1];
}

export function setUsingSpellbook(b) {
    using_spellbook = b;
}

export function isUsingSpellbook() {
    return using_spellbook;
}

export function setClassSkills(d) {
    class_skills = d;
}

export function getClassSkills() {
    return class_skills;
}

export function setClassPreparedCantrips(c) {
    class_cantrips = c;
}

export function getClassPreparedCantrips() {
    return class_cantrips;
}

export function setWeaponProficiencies(d) {
    class_weapon_proficiencies = d;
}

export function getWeaponProficiencies() {
    return class_weapon_proficiencies;
}

export function setArmorProficiencies(d) {
    class_armor_proficiencies = d;
}

export function getArmorProficiencies() {
    return class_armor_proficiencies;
}

export function setToolProficiencies(d) {
    class_tool_proficiencies = d;
}

export function setSavingThrows(d) {
    class_saving_throws = d;
}

export function getClassSavingThrows() {
    return class_saving_throws;
}

export function setClassPreparedSpells(s) {
    class_spells = s;
}

export function getClassPreparedSpells() {
    return class_spells;
}

export function getSpellData() {
    var saved_spells = getClassPreparedSpells();
    var class_spells = getClassSpells(class_name)[1];
    var savedSpellData = [];
    saved_spells.forEach((spell) => {
        for(let i = 0; i < class_spells.length; i++) {
            let classSpell = class_spells[i];
            if(spell == classSpell.name) {
                savedSpellData.push(classSpell);
                break;
            }
        };
    });
    return savedSpellData;
}

export function setSocket(io) {
    socket = io;
}

export function setDefaultClassData(c) {
    class_name = c;
    let class_data = getClassData();

    if("saving_throws" in class_data) {
        class_saving_throws = class_data.saving_throws;
    }
    class_weapon_proficiencies = class_data.weapons.proficiencies;
    class_armor_proficiencies = class_data.armor.proficiencies;
    class_tool_proficiencies = class_data.tools;
}

export function setClass(data) {
    resetClassData();
    setDefaultClassData(data.class_name);
    setClassSkills(data.class_skills);
    setClassPreparedSpells(data.spells);
    setClassPreparedCantrips(data.cantrips);
    if("use_spell_book" in data) {
        using_spellbook = data.use_spell_book;
    }
}

function initializeClassData(data) {
    setClass(data);


}

export function getClassName() {
    return class_name;
}

export function getClassData() {
    const default_class_data = {
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

    return default_class_data[class_name] || null;
}