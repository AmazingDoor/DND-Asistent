import * as class_proficiencies from './../../../../shared/class_proficiencies.js';
import { getClassSpells, getPreparedSpellCount, getPreparedCantripCount } from '../../../../shared/spell_data_filterer.js';
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
let spell_slots_used = [];
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
    current_spell_slots = [];
    resetUsedSpellSlots();
}

export function handleSpellSlotOnLevelUp() {
    
    const player_level = getPlayerLevel();
    const magic_slots = getMagicSlots(class_name);

    let max_slots = []
    if(Object.hasOwn(magic_slots, "spell_slots")) {
        max_slots = magic_slots.spell_slots[player_level - 1];
    }

    const spell_slots_used = getSpellSlotsUsed();
    for(let i = 0; i < spell_slots_used.length; i++) {
        if(i >= max_slots.length) {
            break;
        }
        max_slots[i] = parseInt(max_slots[i]) - parseInt(spell_slots_used[i]);
    }


    setCurrentSpellSlots(max_slots);
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

export function setClass(data) {
    resetClassData();
    setDefaultClassData(data.class_name);
    setClassSkills(data.class_skills);
    setClassPreparedSpells(data.spells);
    setClassPreparedCantrips(data.cantrips);
    if("use_spell_book" in data) {
        using_spellbook = data.use_spell_book;
    }
    if(Object.hasOwn(data, "current_spell_slots")) {
        setCurrentSpellSlots(data.current_spell_slots);
    } else {
        setCurrentSpellSlots([]);
    }

    if(Object.hasOwn(data, "spell_slots_used")) {
        setSpellSlotsUsed(data.spell_slots_used);
        spell_slots_used.forEach((slot) => {
        });
    } else {
        resetUsedSpellSlots();
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

export function setSpellSlotsUsed(slots) {
    spell_slots_used = slots;
}

export function resetUsedSpellSlots() {
    const spell_slot_length = getCurrentSpellSlots().length;
    let used_spell_slots = [];
    for(let i = 0; i < spell_slot_length; i++) {
        used_spell_slots.push(0);
    }

    setSpellSlotsUsed(used_spell_slots);
}

function ensureEnoughUsedSpellSlots() {
    const current_spell_slots_length = getCurrentSpellSlots().length;
    const used_spell_slots = getSpellSlotsUsed();
    let new_used_slots = [];

    for(let i = 0; i < current_spell_slots_length; i++) {
        if(i < used_spell_slots.length) {
            new_used_slots.push(used_spell_slots[i]);
        } else {
            new_used_slots.push(0);
        }
    }
    setSpellSlotsUsed(new_used_slots);
}

export function incrementUsedSpellSlot(index) {
    ensureEnoughUsedSpellSlots();
    spell_slots_used[index] = parseInt(spell_slots_used[index]) + 1;
}

export function getSpellSlotsUsed() {
    return spell_slots_used;
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