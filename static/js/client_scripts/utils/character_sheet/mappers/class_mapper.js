import * as class_proficiencies from './../../../../shared/class_proficiencies.js';
import { getClassSpells, getPreparedSpellCount, getPreparedCantripCount, getMaxSpellLevel } from '../../../../shared/spell_data_filterer.js';
import { getMagicSlots } from '../../../../shared/spell_caster_slot_map.js';
import { getPlayerLevel } from '../../../player_level_handler.js';
import { bus, EVENTS, SAVE_EVENTS } from '../../event_bus.js';

let class_name = null;
let socket = null;

let class_skills = [0, []];
let class_weapon_proficiencies = [];
let class_armor_proficiencies = [];
let class_tool_proficiencies = [];
let class_saving_throws = [];
let class_spells = [];
let class_cantrips = [];
let current_spell_slots = [];
let using_spellbook = false;
let concentration = "";


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
    current_spell_slots = [];
}

export function handleSpellSlotOnLevelUp() {

    const player_level = getPlayerLevel();
    const max_slots = getMaxSpellSlots();
    const current_slots = getCurrentSpellSlots();
    
    let new_slots = [];
    if(class_name != "Warlock") {
        for(let i = 0; i < max_slots.length; i++) {
            if(i < current_slots.length) {
                new_slots[i] = current_slots[i];
            } else {
                new_slots[i] = max_slots[i];
            }
        }
        setCurrentSpellSlots(new_slots);
    } else {
        const max_slot_length = max_slots.length;
        let new_slots = [...getMaxSpellSlots()];
        new_slots[max_slot_length - 1] = current_slots[current_slots.length - 1];
        setCurrentSpellSlots(new_slots);

    }

    bus.publish(SAVE_EVENTS.SAVE_CLASS);
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

export function setClassSpell(spell_name, index) {
    while(class_spells.length <= index) {
        class_spells.push(null);
    }
    class_spells[index] = spell_name;
}

export function removeClassSpell(index) {
    class_spells.splice(index, 1);
}

export function setClassCantrip(cantrip_name, index) {
    while(class_cantrips.length <= index) {
        class_cantrips.push(null);
    }
    class_cantrips[index] = cantrip_name;
}

export function removeClassCantrip(index) {
    class_cantrips.splice(index, 1);
}

export function getClassPreparedSpells() {
    return class_spells;
}

export function getSpellData() {
    var saved_spells = getClassPreparedSpells();
    var class_spells = getClassSpells(class_name)[1];
    if(class_spells === undefined) {
        return [];
    }
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

export function getCantripData() {
    var saved_cantrips = getClassPreparedCantrips();
    var class_cantirps = getClassSpells(class_name)[0];
    var savedCantripData = [];
    saved_cantrips.forEach((cantrip) => {
        for(let i = 0; i < class_cantirps.length; i++) {
            let classCantrip = class_cantirps[i];
            if(cantrip == classCantrip.name) {
                savedCantripData.push(classCantrip);
                break;
            }
        }
    });
    return savedCantripData;
}

export function setSocket(io) {
    socket = io;
}

export function setDefaultClassData(c) {
    class_name = c;
    let class_data = getClassData();

    if(class_data == null || class_data == undefined) {
        return;
    }

    if("saving_throws" in class_data) {
        class_saving_throws = class_data.saving_throws;
    }
    class_weapon_proficiencies = class_data.weapons.proficiencies;
    class_armor_proficiencies = class_data.armor.proficiencies;
    class_tool_proficiencies = class_data.tools;
    const spell_slots = getMagicSlots(class_name)["spell_slots"];
    if(spell_slots != undefined && spell_slots != null)  {
        if(spell_slots.length >= getPlayerLevel() - 1) {
            const spell_slots_at_level = spell_slots[getPlayerLevel() - 1];
            setCurrentSpellSlots(spell_slots_at_level);
        }
    }
}

export function setConcentration(spell_name) {
    concentration = spell_name;
}

export function getConcentration() {
    return concentration;
}

export function setClass(data) {
    resetClassData();
    setDefaultClassData(data.class_name);
    setClassSkills(data.class_skills);
    setClassPreparedSpells(data.spells);
    setClassPreparedCantrips(data.cantrips);
    setConcentration(data.concentration);
    if("use_spell_book" in data) {
        using_spellbook = data.use_spell_book;
    }
    if(Object.hasOwn(data, "current_spell_slots")) {
        setCurrentSpellSlots(data.current_spell_slots);
    } else {
        setCurrentSpellSlots([]);
    }
}

function initializeClassData(data) {
    setClass(data);
}

export function setCurrentSpellSlots(slots) {
    current_spell_slots = slots;
}

export function getCurrentSpellSlots() {
    return current_spell_slots;
}

export function getMaxSpellSlots() {
    const magic_slots = getMagicSlots(class_name);
    let spell_slots = [];
    if(Object.hasOwn(magic_slots, "spell_slots")) {
        spell_slots = magic_slots.spell_slots[getPlayerLevel() - 1];
    }
    return spell_slots;
}

export function decrementCurrentSpells(index) {
    while(current_spell_slots.length < index) {
        current_spell_slots.push(0);
    }
    current_spell_slots[index] = parseInt(current_spell_slots[index]) - 1;
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