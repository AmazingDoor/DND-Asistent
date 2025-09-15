import {items} from './../../../shared/inventory/items.js';
let character_abilities = {};
let class_skills = [0, []];
let class_cantrips = [];
let race_skills = [];
let race_ability_modifiers = {};
let race_languages = [];
let class_weapon_proficiencies = [];
let class_armor_proficiencies = [];
let class_tool_proficiencies = [];
let class_saving_throws = [];
let class_spells = [];
let race_spells = [];
let inventory = [];
let weapon_inventory = [];
let armor_inventory = [];
let mount_inventory = [];


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

//This is also used for armor
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

export function resetRaceData() {
    race_skills = [];
    race_ability_modifiers = {};
    race_languages = [];
}

export function resetClassData() {
    class_skills = [0, []];
    class_weapon_proficiencies = [];
    class_armor_proficiencies = [];
    class_tool_proficiencies = [];
    class_saving_throws = [];
    class_spells = [];
    class_cantrips = [];
}

/*Modifier From Race*/
export function setCharacterAbilities(data) {
    character_abilities = data;
}

export function getCharacterAbilities() {
    return character_abilities;
}

/*Skills From Class*/
export function setClassSkills(data) {
    class_skills = data
}

export function getClassSkillNames() {
    return class_skills[1];
}

export function getClassSkills() {
    return class_skills;
}

/*Weapon Proficiencies From Class*/
export function setClassWeaponProficiencies(data) {
    class_weapon_proficiencies = data;
}

export function getClassWeaponProficiencies() {
    return class_weapon_proficiencies;
}

/*Armor Proficiencies From Class*/
export function setClassArmorProficiencies(data) {
    class_armor_proficiencies = data;
}

export function getClassArmorProficiencies() {
    return class_weapon_proficiencies;
}

/*Tool Proficiencies From Class*/
export function setClassToolProficiencies(data) {
    class_tool_proficiencies = data;
}

export function getClassToolProficiencies() {
    return class_tool_proficiencies;
}

/*Saving Throws From Class*/
export function setClassSavingThrows(data) {
    class_saving_throws = data;
}

export function getClassSavingThrows() {
    return class_saving_throws;
}

export function setClassPreparedSpells(spells) {
    class_spells = spells;
}

export function getClassPreparedSpells() {
    return class_spells;
}

export function setRaceSkills(data) {
    race_skills = data;
}

export function getRaceSkills() {
    return race_skills;
}

export function getRaceSkillNames() {
    return race_skills;
}

export function setRaceAbilityModifiers(data) {
    race_ability_modifiers = data;
}

export function getRaceAbilityModifiers() {
    return race_ability_modifiers;
}

export function setRaceLanguages(data) {
    race_languages = data;
}

export function getRaceLanguages() {
    return race_languages;
}

export function setClassPreparedCantrips(data) {
    class_cantrips = data;
}

export function getClassPreparedCantrips() {
    return class_cantrips;
}