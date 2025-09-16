import * as weapon_data from './weapons.js';
import * as armor_data from './armor.js';
import * as item_data from './items.js';

function setDefaultCount(l, t="weapon") {
    if (t === "weapon") {
        return l.map(weapon => ({weapon: weapon, count: 1}));
    } else if (t === "armor"){
        return l.map(armor => ({armor: armor, count: 1}));
    } else if (t==="item") {
        return l.map(item => ({item: item, count: 1}));
    }
}

function filterArray(input_array, filter_out_array) {
    //return an array with no duplicates
    return [...input_array].filter(item => !filter_out_array.includes(item));
}

function addOthers(items, other_items) {
    return items.map(item => ({ ...item, other: other_items}));
}

function getInstruments() {
    let instruments = [];
    Object.keys(item_data.items).forEach(key => {
        const o = item_data.items[key];
        if('tool_category' in o) {
            if (o['tool_category'] === "Musical Instrument") {
                instruments.push(item_data.items[key]);
            }
        }
    });
    return instruments;
}

function getHolySymbols() {
    let symbols = [];
    Object.keys(item_data.items).forEach(key => {
        const o = item_data.items[key];
        if('gear_category' in o) {
            if(o.gear_category.index === "holy-symbols") {
                symbols.push(item_data.items[key]);
            }
        }
    });
    return symbols;
}

const other_item_types = {
    weapon: 'weapon',
    armor: 'armor',
    item: 'item',
    container_item: 'container_item',
    weapon_choice: 'weapon_choice',
    armor_choice: 'armor_choice',
    item_choice: 'item_choice'
}

export const options = {
    barbarian_weapon_1: setDefaultCount(weapon_data.getMeleeWeapons(weapon_data.martial_weapons)),
    barbarian_weapon_2: setDefaultCount(weapon_data.simple_weapons),
    bard_weapon_1: setDefaultCount([weapon_data.weapons.rapier, weapon_data.weapons.longsword, ...weapon_data.simple_weapons]),
    bard_inventory_1: setDefaultCount(getInstruments(), "item"),
    bard_inventory_2: [{item: item_data.items.diplomats_pack, count: 1}, {item: item_data.items.entertainers_pack, count: 1}],
    cleric_weapon_1: setDefaultCount([weapon_data.weapons.mace, weapon_data.weapons.warhammer]),
    cleric_weapon_2: [{weapon: weapon_data.weapons.light_crossbow, count: 1, ammo: 20}, ...setDefaultCount(filterArray(weapon_data.simple_weapons, [weapon_data.weapons.light_crossbow]))],
    cleric_armor_1: setDefaultCount([armor_data.medium_armor.scale_mail, armor_data.light_armor.leather, armor_data.heavy_armor.chain_mail], "armor"),
    cleric_inventory_1: setDefaultCount([item_data.items.priests_pack, item_data.items.explorers_pack], "item"),
    cleric_inventory_2: setDefaultCount(getHolySymbols(), "item"),
    druid_weapon_1: [{weapon: weapon_data.weapons.shield, count: 1}, ...setDefaultCount(weapon_data.simple_weapons)],
    druid_weapon_2: [{weapon: weapon_data.weapons.scimitar, count: 1}, ...setDefaultCount(weapon_data.getMeleeWeapons(weapon_data.simple_weapons))],
    druid_inventory_1: setDefaultCount(item_data.getDruidicFoci(), "item"),
    fighter_weapon_1: [...addOthers(setDefaultCount(weapon_data.martial_weapons), [{type: other_item_types.weapon, item: weapon_data.weapons.shield, count: 1}]), ...addOthers(setDefaultCount(weapon_data.martial_weapons), [{type: other_item_types.weapon_choice, options: 'fighter_weapon_1_option_2', label: "+1 Martial Weapon"}])],
    fighter_weapon_1_option_2: setDefaultCount(weapon_data.martial_weapons),
    fighter_armor_1: [{armor: armor_data.heavy_armor.chain_mail, count: 1}, {armor: armor_data.light_armor.leather, count: 1, other:[{type: other_item_types.weapon, item: weapon_data.weapons.longbow, count: 1, ammo: 20}]}]

}