import * as weapon_data from './inventory/weapons.js';
import * as armor_data from './inventory/armor.js';
import * as item_data from './inventory/items.js';
import {options as selection_options} from './inventory/class_loadout_options.js';

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
    console.log(items);
    const item_objects = [...items];
    console.log(item_objects.map(item => ({ ...item, other: other_items})));
    return item_objects.map(item => ({ ...item, other: other_items}));
}

export const other_item_types = {
    weapon: 'weapon',
    armor: 'armor',
    item: 'item',
    container_item: 'container_item',
    weapon_choice: 'weapon_choice',
    armor_choice: 'armor_choice',
    item_choice: 'item_choice'
}


export const barbarian = {
    saving_throws: ['Strength', 'Constitution'],
    weapons: {
        proficiencies: ["Simple Weapons", "Martial Weapons"],
        options: ['barbarian_weapon_1', 'barbarian_weapon_2'],
        starting: [{weapon: weapon_data.weapons.javelin, count: 4}]

    },
    armor: {
        proficiencies: ["Light Armor", "Medium Armor", "Shields"],
        options: [],
        starting: []
    },
    tools: [],
    skills: [2, ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"]],
    inventory: {
        options: [],
        starting: [{item: item_data.items.explorers_pack, count: 1}]
    }
};


export const bard = {
    saving_throws: ['Dexterity', 'Charisma'],
    weapons: {
        proficiencies: ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        options: ['bard_weapon_1'],
        starting: [{weapon: weapon_data.weapons.dagger, count: 1}]
    },
    armor: {
        proficiencies: ["Light armor", "Medium Armor", "Shields"],
        options: [],
        starting: [{armor: armor_data.light_armor.leather, count: 1}]
    },
    tools: [],
    skills: [2, ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"]],
    inventory: {
        options: ['bard_inventory_1', 'bard_inventory_2'],
        starting: []
    }
};

export const cleric = {
    saving_throws: ['Wisdom', 'Charisma'],
    weapons: {
        proficiencies: ["Simple Weapons"],
        options: ['cleric_weapon_1', 'cleric_weapon_2'],
        starting: [{weapon: weapon_data.weapons.shield, count: 1}]
    },
    armor: {
        proficiencies: ["Light Armor", "Medium Armor", "Shields"],
        options: ['cleric_armor_1'],
        starting: []
    },
    tools: [],
    skills: [2, ["History", "Insight", "Medicine", "Persuasion", "Religion"]],
    inventory: {
        options: ['cleric_inventory_1', 'cleric_inventory_2'],
        starting: []
    }

};

export const druid = {
    saving_throws: ["Intelligence", "Wisdom"],
    weapons: {
        proficiencies: ["Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars", "sickless", "Slings", "Spears"],
        options: ['druid_weapon_1', 'druid_weapon_2'],
        starting: []
    },
    armor: {
        proficiencies: ["Light Armor", "Medium Armor", "Shields (Non-Metal)"],
        options: [],
        starting: [{armor: armor_data.light_armor.leather, count: 1}]
    },
    tools: ["Herbalism Kit"],
    skills: [2, ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"]],
    inventory: {
        options: ['druid_inventory_1'],
        starting: [{item: item_data.items.explorers_pack, count: 1}]
    }

};

export const fighter = {
    saving_throws: ["Strength", "Constitution"],
    weapons: {
        proficiencies: ["Simple Weapons", "Martial Weapons"],
        options: ['fighter_weapon_1', 'fighter_weapon_2'],
        starting: []
    },
    armor: {
        proficiencies: ["All Armor", "Shields"],
        options: ['fighter_armor_1'],
        starting: []
    },
    tools: [],
    skills: [2, ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"]],
    inventory: {
        options: ['fighter_inventory_1'],
        starting: []
    }

};

export const monk = {
    saving_throws: ["Strength", "Dexterity"],
    weapons: {
        proficiencies: ["Simple Weapons", "Shortswords"],
        options: ['monk_weapon_1'],
        starting: [{weapon: weapon_data.weapons.dart, count: 10}]
    },
    armor: {
        proficiencies: [],
        options: [],
        starting: []
    },
    tools: ["Artisan's Tool", "Musical Instrument"],
    skills: [2, ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"]],
    inventory: {
        options: ['monk_inventory_1'],
        starting: []
    }

};

export const paladin = {
    saving_throws: ["Wisdom", "Charisma"],
    weapons: {
        proficiencies: ["Simple Weapons", "Martial Weapons"],
        options: ['paladin_weapon_1', 'paladin_weapon_2'],
        starting: []
    },
    armor: {proficiencies: ["All Armor", "Shields"],
        options: [],
        starting: [{armor: armor_data.heavy_armor.chain_mail, count: 1}]
    },
    tools: [],
    skills: [2, ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"]],
    inventory: {
        options: ['paladin_inventory_1', 'paladin_inventory_2'],
        starting: []
    }

};

export const ranger = {
    saving_throws: ["Strength", "Dexterity"],
    weapons: {
        proficiencies: ["Simple Weapons", "Martial Weapons"],
        options: ['ranger_weapon_1', 'ranger_weapon_1'],
        starting: [{weapon: weapon_data.weapons.longbow, count: 1, ammo: 20}]
    },
    armor: {
        proficiencies: ["Light Armor", "Medium Armor", "Shields"],
        options: ['ranger_armor_1'],
        starting: []
    },
    tools: [],
    skills: [3, ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"]],
    inventory: {
        options: ['ranger_inventory_1'],
        starting: [{item: item_data.items.quiver, count: 1}]
    }

};

export const rogue = {
    saving_throws: ["Dexterity", "Intelligence"],
    weapons: {
        proficiencies: ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        options: ['rogue_weapon_1', 'rogue_weapon_2'],
        starting: [{weapon: weapon_data.weapons.dagger, count: 2}]
    },
    armor: {
        proficiencies: ["Light Armor"],
        options: [],
        starting: [{armor: armor_data.light_armor.leather, count: 1}]
    },
    tools: ["Thieves' Tools"],
    skills: [4, ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"]],
    inventory: {
        options: ['rogue_inventory_1'],
        starting: [{item: item_data.items.thieves_tools, count: 1}]
    }

};

export const sorcerer = {
    saving_throws: ["Constitution", "Charisma"],
    weapons: {
        proficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        options: [],
        starting: []
    },
    armor: {
        proficiencies: [],
        options: [],
        starting: []
    },
    tools: [],
    skills: [2, ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"]],
    inventory: {
        options: [],
        starting: []
    }

};

export const warlock = {
    saving_throws: ["Wisdom", "Charisma"],
    weapons: {
        proficiencies: ["Simple Weapons"],
        options: [],
        starting: []
    },
    armor: {
        proficiencies: ["Light Armor"],
        options: [],
        starting: []
    },
    tools: [],
    skills: [2, ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"]],
    inventory: {
        options: [],
        starting: []
    }

};

export const wizard = {
    saving_throws: ["Intelligence", "Wisdom"],
    weapons: {
        proficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        options: [],
        starting: []
    },
    armor: {
        proficiencies: [],
        options: [],
        starting: []
    },
    tools: [],
    skills: [2, ["Arcana", "History", "Insight", "Investigaton", "Medicine", "Religion"]],
    inventory: {
        options: [],
        starting: [{item: item_data.items.spellbook, count: 1, spells: ["Select Spell", "Select Spell", "Select Spell", "Select Spell", "Select Spell", "Select Spell"]}]
    }

};

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