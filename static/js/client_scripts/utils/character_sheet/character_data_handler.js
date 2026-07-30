import { getClassSpells } from '../../../shared/spell_data_filterer.js';
import {items} from './../../../shared/inventory/items.js';
import { getClassName as get_class_name, getClassName } from './mappers/class_mapper.js';

let base_character_abilities = {};
let character_ability_modifiers = {};
let inventory = [];
let weapon_inventory = [];
let armor_inventory = [];
let mount_inventory = [];
let character_skills = {};
let background_skills = [];


export function addSpellToBookInventory(book_index, spell_index, spell_name) {
    const spell_book = inventory[book_index];
    console.log(inventory);
    spell_book.spells[spell_index] = spell_name;
}

export function getSpellsFromSpellbooks() {
    let spell_books = [];
    let all_spells = [];
    let filtered_spells = [];
    const class_spells = getClassSpells(getClassName())[1];
    
    
    inventory.forEach((item) => {
        if(item.type == "spellbook_item") {
            spell_books.push(item);
        }
    });


    //TODO: filter for prepared spells
    spell_books.forEach((book) => {
        let spells = book.spells;
        spells.forEach((spell) => {
            all_spells.push(spell);
        });
    });

    all_spells.forEach((spell) => {
        for(let i = 0; i < class_spells.length; i++) {
            let classSpell = class_spells[i];
            if(spell == classSpell.name) {
                filtered_spells.push(classSpell);
                break;
            }
        }
    });

    return filtered_spells;
}

export function setCharacterBaseAbilities(base_abilities) {
    base_character_abilities = {
        str: base_abilities[0],
        dex: base_abilities[1],
        con: base_abilities[2],
        int: base_abilities[3],
        wis: base_abilities[4],
        cha: base_abilities[5] 
    }
}

export function getCharacterBaseAbilities() {
    return base_character_abilities;
}

export function setCharacterSkills(skills) {
    character_skills = {
        athletics: skills[0],
        acrobatics: skills[1],
        sleight_of_hand: skills[2],
        stealth: skills[3],
        arcana: skills[4],
        history: skills[5],
        investigation: skills[6],
        nature: skills[7],
        religion: skills[8],
        animal_handling: skills[9],
        insight: skills[10],
        medicine: skills[11],
        perception: skills[12],
        survival: skills[13],
        deception: skills[14],
        intimidation: skills[15],
        performance: skills[16],
        persuasion: skills[17]
    };
}

export function getCharacterSkills() {
    return character_skills;
}

export function setCharacterAbilityModifiers(d) {
    character_ability_modifiers = d;
}

export function getCharacterAbilityModifiers() {
    return character_ability_modifiers;
}

export function getSpellCastingAbilityScore() {
    const className = getClassName();
    const spellCastingAbilities = 
    {
        Artificer: character_ability_modifiers.int,
        Bard: character_ability_modifiers.cha,
        Cleric: character_ability_modifiers.wis,
        Druid: character_ability_modifiers.wis,
        Paladin: character_ability_modifiers.cha,
        Ranger: character_ability_modifiers.wis,
        Sorcerer: character_ability_modifiers.cha,
        Warlock: character_ability_modifiers.cha,
        Wizard: character_ability_modifiers.int
    };
    if(className in spellCastingAbilities) {
        return spellCastingAbilities[className];
    }
    return 0;
}

export function addInvWeapon(item, t='default', count=1) {
    const i = {type: "weapon", reference: item, from: t, count: count};
    weapon_inventory.push(i);
}

export function addInvArmor(item, t='default', count=1) {
    const i = {type: "armor", reference: item, from: t, count: count};
    armor_inventory.push(i);
}

export function addInvItem(item, t='default', count=1) {
    const i = {type: 'item', reference: item, from: t, count: count};
    inventory.push(i);
}

export function addInvContainerItem(item, t='default', count=1, input_inv=null) {
    let inv = input_inv;
    if(inv === null) {
        const item_data = items[item];
        if (item_data.contents.length > 0) {
            inv = item_data.contents.map((input_item) => ({
                item_reference: input_item.item.index.replace(/-/g, '_'),
                count: input_item.quantity
            }));
        }
    }
    const i = {type: 'container_item', reference: item, from: t, count: count, inventory: inv};
    inventory.push(i);
}

export function addSpellbookItem(reference, t='default', count=1, spells=[]) {
    const i = {type: 'spellbook_item', reference: 'spellbook', from: t, count: count, spells: spells}
    inventory.push(i);
}

export function addInvOption(t, optns, t2='default') {
    const o = {type: t, options: optns, from: t2};
    if (t === "weapon_option") {
        weapon_inventory.push(o);
    } else if(t === "armor_option") {
        armor_inventory.push(o);
    } else if(t === "item_option") {
        inventory.push(o);
    } else if(t === "mount_option") {
        mount_inventory.push(o);
    }
}



export function removeItem(index) {
    inventory.splice(index, 1);
}

export function removeWeapon(index) {
    weapon_inventory.splice(index, 1);
}

export function removeArmor(index) {
    armor_inventory.splice(index, 1);
}

export function setInventory(inv) {
    if(inv === null) {
        return;
    }
    inventory = inv.inv;
    weapon_inventory = inv.weapon;
    armor_inventory = inv.armor;
    mount_inventory = inv.mount;
}

export function getInventory() {
    return inventory;
}

export function getWeaponInventory() {
    return weapon_inventory;
}

export function getArmorInventory() {
    return armor_inventory;
}

export function getMountInventory() {
    return mount_inventory;
}

export function getBackgroundSkills() {
    return background_skills;
}

export function addBackgroundSkill(skill) {
    background_skills.push(skill);
}

export function setBackgroundSkills(skills) {
    background_skills = skills;
}
