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
    acolyte_inventory_1: setDefaultCount(getHolySymbols())
}