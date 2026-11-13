import * as weapon_data from './inventory/weapons.js';
import * as armor_data from './inventory/armor.js';
import * as item_data from './inventory/items.js';
import { ABILITIES, CLASSES, SKILLS } from './data_enums.js';
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
    const item_objects = [...items];
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

export const PROFICIENCIES = {
    [CLASSES.BARBARIAN]: {
        saving_throws: [ABILITIES.STR, ABILITIES.CON],
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
        skills: [2, [SKILLS.ANIMAL_HANDLING, SKILLS.ATHLETICS, SKILLS.INTIMIDATION, SKILLS.NATURE, SKILLS.PERCEPTION, SKILLS.SURVIVAL]],
        inventory: {
            options: [],
            starting: [{item: item_data.items.explorers_pack, count: 1}]
        }, 
        hit_die: {
            number: 1,
            class: 12,
            level_1: "12 + your Constitution modifier",
            higher_level: "1 d12 (or 7) + your Constitution modifier per barbarian level after 1st"

        }
    },

    [CLASSES.BARD]: {saving_throws: [ABILITIES.DEX, ABILITIES.CHA],
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
    skills: [2, [SKILLS.ANIMAL_HANDLING, SKILLS.ATHLETICS, SKILLS.INTIMIDATION, SKILLS.NATURE, SKILLS.PERCEPTION, SKILLS.SURVIVAL]],
    inventory: {
        options: ['bard_inventory_1', 'bard_inventory_2'],
        starting: []
    }, 
    hit_die: {
        number: 1,
        class: 8,
        level_1: "8 + your Constitution modifier",
        higher_level: "1 d8 (or 5) + your Constitution modifier per bard level after 1st"

    }},
    [CLASSES.CLERIC]: {saving_throws: [ABILITIES.WIS, ABILITIES.CHA],
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
    skills: [2, [SKILLS.HISTORY, SKILLS.INSIGHT, SKILLS.MEDICINE, SKILLS.PERSUASION, SKILLS.RELIGION]],
    inventory: {
        options: ['cleric_inventory_1', 'cleric_inventory_2'],
        starting: []
    }, 
    hit_die: {
        number: 1,
        class: 8,
        level_1: "8 + your Constitution modifier",
        higher_level: "1 d8 (or 5) + your Constitution modifier per cleric level after 1st"

    }},
    [CLASSES.DRUID]: {saving_throws: [ABILITIES.INT, ABILITIES.WIS],
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
    skills: [2, [SKILLS.ARCANA, SKILLS.ANIMAL_HANDLING, SKILLS.INSIGHT, SKILLS.MEDICINE, SKILLS.NATURE, SKILLS.PERCEPTION, SKILLS.RELIGION, SKILLS.SURVIVAL]],
    inventory: {
        options: ['druid_inventory_1'],
        starting: [{item: item_data.items.explorers_pack, count: 1}]
    }, 
    hit_die: {
        number: 1,
        class: 8,
        level_1: "8 + your Constitution modifier",
        higher_level: "1 d8 (or 5) + your Constitution modifier per druid level after 1st"

    }},
    [CLASSES.FIGHTER]: {saving_throws: [ABILITIES.STR, ABILITIES.CON],
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
    skills: [2, [SKILLS.ACROBATICS, SKILLS.ANIMAL_HANDLING, SKILLS.ATHLETICS, SKILLS.HISTORY, SKILLS.INSIGHT, SKILLS.INTIMIDATION, SKILLS.PERCEPTION, SKILLS.SURVIVAL]],
    inventory: {
        options: ['fighter_inventory_1'],
        starting: []
    }, 
    hit_die: {
        number: 1,
        class: 10,
        level_1: "10 + your Constitution modifier",
        higher_level: "1 d10 (or 6) + your Constitution modifier per fighter level after 1st"

    }},
    [CLASSES.MONK]: {saving_throws: [ABILITIES.STR, ABILITIES.DEX],
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
    skills: [2, [SKILLS.ACROBATICS, SKILLS.ATHLETICS, SKILLS.HISTORY, SKILLS.INSIGHT, SKILLS.RELIGION, SKILLS.STEALTH]],
    inventory: {
        options: ['monk_inventory_1'],
        starting: []
    }, 
    hit_die: {
        number: 1,
        class: 8,
        level_1: "8 + your Constitution modifier",
        higher_level: "1 d8 (or 5) + your Constitution modifier per monk level after 1st"

    }},
    [CLASSES.PALADIN]: {saving_throws: [ABILITIES.WIS, ABILITIES.CHA],
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
    skills: [2, [SKILLS.ATHLETICS, SKILLS.INSIGHT, SKILLS.INTIMIDATION, SKILLS.MEDICINE, SKILLS.PERSUASION, SKILLS.RELIGION]],
    inventory: {
        options: ['paladin_inventory_1', 'paladin_inventory_2'],
        starting: []
    }, 
    hit_die: {
        number: 1,
        class: 10,
        level_1: "10 + your Constitution modifier",
        higher_level: "1 d10 (or 6) + your Constitution modifier per paladin level after 1st"

    }},
    [CLASSES.RANGER]: {saving_throws: [ABILITIES.STR, ABILITIES.DEX],
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
    skills: [3, [SKILLS.ANIMAL_HANDLING, SKILLS.ATHLETICS, SKILLS.INSIGHT, SKILLS.INVESTIGATION, SKILLS.NATURE, SKILLS.PERCEPTION, SKILLS.STEALTH, SKILLS.SURVIVAL]],
    inventory: {
        options: ['ranger_inventory_1'],
        starting: [{item: item_data.items.quiver, count: 1}]
    }, 
    hit_die: {
        number: 1,
        class: 10,
        level_1: "10 + your Constitution modifier",
        higher_level: "1 d10 (or 6) + your Constitution modifier per ranger level after 1st"

    }},
    [CLASSES.ROGUE]: {saving_throws: [ABILITIES.DEX, ABILITIES.INT],
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
    skills: [4, [SKILLS.ACROBATICS, SKILLS.ATHLETICS, SKILLS.DECEPTION, SKILLS.INSIGHT, SKILLS.INTIMIDATION, SKILLS.INVESTIGATION, SKILLS.PERCEPTION, SKILLS.PERFORMANCE, SKILLS.PERSUASION, SKILLS.SLEIGHT_OF_HAND, SKILLS.STEALTH]],
    inventory: {
        options: ['rogue_inventory_1'],
        starting: [{item: item_data.items.thieves_tools, count: 1}]
    }, 
    hit_die: {
        number: 1,
        class: 8,
        level_1: "8 + your Constitution modifier",
        higher_level: "1 d8 (or 5) + your Constitution modifier per rogue level after 1st"

    }},
    [CLASSES.SORCERER]: {saving_throws: [ABILITIES.CON, ABILITIES.CHA],
    weapons: {
        proficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        options: ['sorcerer_weapon_1'],
        starting: [{weapon: weapon_data.weapons.dagger, count: 2}]
    },
    armor: {
        proficiencies: [],
        options: [],
        starting: []
    },
    tools: [],
    skills: [2, [SKILLS.ARCANA, SKILLS.DECEPTION, SKILLS.INSIGHT, SKILLS.INTIMIDATION, SKILLS.PERSUASION, SKILLS.RELIGION]],
    inventory: {
        options: ['sorcerer_inventory_1', 'sorcerer_inventory_2'],
        starting: []
    }, 
    hit_die: {
        number: 1,
        class: 6,
        level_1: "6 + your Constitution modifier",
        higher_level: "1 d6 (or 4) + your Constitution modifier per sourcerer level after 1st"

    }},
    [CLASSES.WARLOCK]: {saving_throws: [ABILITIES.WIS, ABILITIES.CHA],
    weapons: {
        proficiencies: ["Simple Weapons"],
        options: ['warlock_weapon_1'],
        starting: [{weapon: weapon_data.weapons.dagger, count: 2}]
    },
    armor: {
        proficiencies: ["Light Armor"],
        options: [],
        starting: [{armor: armor_data.light_armor.leather, count: 1}]
    },
    tools: [],
    skills: [2, [SKILLS.ARCANA, SKILLS.DECEPTION, SKILLS.HISTORY, SKILLS.INTIMIDATION, SKILLS.INVESTIGATION, SKILLS.NATURE, SKILLS.RELIGION]],
    inventory: {
        options: ['warlock_inventory_1', 'warlock_inventory_2'],
        starting: []
    }, 
    hit_die: {
        number: 1,
        class: 8,
        level_1: "8 + your Constitution modifier",
        higher_level: "1 d8 (or 5) + your Constitution modifier per warlock level after 1st"

    }},
    [CLASSES.WIZARD]: {saving_throws: [ABILITIES.INT, ABILITIES.WIS],
    weapons: {
        proficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        options: ['wizard_weapon_1'],
        starting: []
    },
    armor: {
        proficiencies: [],
        options: [],
        starting: []
    },
    tools: [],
    skills: [2, [SKILLS.ARCANA, SKILLS.HISTORY, SKILLS.INSIGHT, SKILLS.INVESTIGATION, SKILLS.MEDICINE, SKILLS.RELIGION]],
    inventory: {
        options: ['wizard_inventory_1', 'wizard_inventory_2'],
        starting: [{item: item_data.items.spellbook, count: 1, spells: ["Select Spell", "Select Spell", "Select Spell", "Select Spell", "Select Spell", "Select Spell"]}]
    }, 
    hit_die: {
        number: 1,
        class: 6,
        level_1: "6 + your Constitution modifier",
        higher_level: "1 d6 (or 4) + your Constitution modifier per wizard level after 1st"

    }}
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