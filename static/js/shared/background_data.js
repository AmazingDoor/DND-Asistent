import * as weapon_data from './inventory/weapons.js';
import * as armor_data from './inventory/armor.js';
import * as item_data from './inventory/items.js';

export const acolyte = {
    skills: ['Insight', 'Religion'],
    languages: [[], 2],
    feature: {name: "Shelter of the Faithful", description: "You have a network of religious allies that can provide you with shelter, food, and aid"},
    tool_profs: [],
    weapons: {
        options: [],
        starting: [],
    },
    armor: {
        options: [],
        starting: [],
    },
    inventory: {
        options: ['acolyte_inventory_1'],
        starting: [{item: item_data.items.block_of_incense, count: 5}, {item: item_data.items.vestments, count: 1},{item: item_data.items.clothes_common, count: 1}, {item: item_data.items.pouch, count: 1}]
    },
    currency: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 15,
        pp: 0
    }
}

export const charlatan = {
    skills: ["Deception", "Sleight of Hand"],
    languages: [[],0],
    feature: {},
    tool_profs: ["Disguise Kit", "Forgery Kit"],
    weapons: {
        options: [],
        starting: [],
    },
    armor: {
        options: [],
        starting: [],
    },
    inventory: {
        options: [],
        starting: [{item: item_data.items.clothes_fine, count: 1}, {item: item_data.items.disguise_kit, count: 1}, {item: item_data.items.pouch, count: 1}]
    },
    currency: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 15,
        pp: 0
    }
}

/*
    skills: [],
    languages: [[],0],
    feature: {},
    tool_profs: [],
    weapons: {
        options: [],
        starting: [],
    },
    armor: {
        options: [],
        starting: [],
    },
    inventory: {
        options: [],
        starting: []
    },
    currency: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 0,
        pp: 0
    }
*/