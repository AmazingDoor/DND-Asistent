import * as weapon_data from './inventory/weapons.js';
import * as instrument_data from './inventory/instruments.js';
import * as armor_data from './inventory/armor.js';

function setDefaultCount(l) {
    return l.map(weapon => ({weapon: weapon, count: 1}));
}

function filterArray(input_array, filter_out_array) {
    return [...input_array].filter(item => !filter_out_array.includes(item));
}

export const barbarian = {
    saving_throws: ['Strength', 'Constitution'],
    weapons: {
        proficiencies: ["Simple Weapons", "Martial Weapons"],
        options: [setDefaultCount(weapon_data.getMeleeWeapons(weapon_data.martial_weapons)), setDefaultCount(weapon_data.simple_weapons)],
        starting: [{weapon: weapon_data.weapons.javelin, count: 4}]

    },
    armor: {
        proficiencies: ["Light Armor", "Medium Armor", "Shields"],
        options: [[]],
        starting: []
    },
    tools: [],
    skills: [2, ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"]],
    inventory: {
        options: [],
        starting: ["Explorer's Pack"]
    }
};

export const bard = {
    saving_throws: ['Dexterity', 'Charisma'],
    weapons: {
        proficiencies: ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        options: [setDefaultCount([weapon_data.weapons.rapier, weapon_data.weapons.longsword, ...weapon_data.simple_weapons])],
        starting: [{weapon: weapon_data.weapons.dagger, count: 1}]
    },
    armor: {
        proficiencies: ["Light armor", "Medium Armor", "Shields"],
        options: [[armor_data.light_armor.leather]],
        starting: []
    },
    tools: [],
    skills: [2, ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"]],
    inventory: {
        options: [],
        starting: [[instrument_data.instruments], ["Diplomat's Pack", "Entertainer's Pack"]]
    }
};

export const cleric = {
    saving_throws: ['Wisdom', 'Charisma'],
    weapons: {
        proficiencies: ["Simple Weapons"],
        options: [setDefaultCount([weapon_data.weapons.mace, weapon_data.weapons.warhammer]), [{weapon: weapon_data.weapons.light_crossbow, count: 1, ammo: 20}, ...setDefaultCount(filterArray(weapon_data.simple_weapons, [weapon_data.weapons.light_crossbow]))]],
        starting: []
    },
    armor: {
        proficiencies: ["Light Armor", "Medium Armor", "Shields"],
        options: [[armor_data.medium_armor.scale_mail, armor_data.light_armor.leather, armor_data.heavy_armor.chain_mail]],
        starting: [armor_data.shield]
    },
    tools: [],
    skills: [2, ["History", "Insight", "Medicine", "Persuasion", "Religion"]],
    inventory: {
        options: [["Priest's Pack", "Explorer's Pack"]],
        starting: ["Holy Symbol"]
    }

};

export const druid = {
    saving_throws: ["Intelligence", "Wisdom"],
    weapons: {
        proficiencies: ["Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars", "sickless", "Slings", "Spears"],
        options: [[]],
        starting: []
    },
    armor: {
        proficiencies: ["Light Armor", "Medium Armor", "Shields (Non-Metal)"],
        options: [],
        starting: []
    },
    tools: ["Herbalism Kit"],
    skills: [2, ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"]],
    inventory: {
        options: [],
        starting: []
    }

};

export const fighter = {
    saving_throws: ["Strength", "Constitution"],
    weapons: {
        proficiencies: ["Simple Weapons", "Martial Weapons"],
        options: [],
        starting: []
    },
    armor: {
        proficiencies: ["All Armor", "Shields"],
        options: [],
        starting: []
    },
    tools: [],
    skills: [2, ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"]],
    inventory: {
        options: [],
        starting: []
    }

};

export const monk = {
    saving_throws: ["Strength", "Dexterity"],
    weapons: {
        proficiencies: ["Simple Weapons", "Shortswords"],
        options: [],
        starting: []
    },
    armor: {
        proficiencies: [],
        options: [],
        starting: []
    },
    tools: ["Artisan's Tool", "Musical Instrument"],
    skills: [2, ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"]],
    inventory: {
        options: [],
        starting: []
    }

};

export const paladin = {
    saving_throws: ["Wisdom", "Charisma"],
    weapons: {
        proficiencies: ["Simple Weapons", "Martial Weapons"],
        options: [],
        starting: []
    },
    armor: {proficiencies: ["All Armor", "Shields"],
        options: [],
        starting: []
    },
    tools: [],
    skills: [2, ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"]],
    inventory: {
        options: [],
        starting: []
    }

};

export const ranger = {
    saving_throws: ["Strength", "Dexterity"],
    weapons: {
        proficiencies: ["Simple Weapons", "Martial Weapons"],
        options: [],
        starting: []
    },
    armor: {
        proficiencies: ["Light Armor", "Medium Armor", "Shields"],
        options: [],
        starting: []
    },
    tools: [],
    skills: [3, ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"]],
    inventory: {
        options: [],
        starting: []
    }

};

export const rogue = {
    saving_throws: ["Dexterity", "Intelligence"],
    weapons: {
        proficiencies: ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        options: [],
        starting: []
    },
    armor: {
        proficiencies: ["Light Armor"],
        options: [],
        starting: []
    },
    tools: ["Thieves' Tools"],
    skills: [4, ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"]],
    inventory: {
        options: [],
        starting: []
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
        starting: []
    }

};