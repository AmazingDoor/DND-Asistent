import * as weapon_data from './inventory/weapons.js';
import * as armor_data from './inventory/armor.js';
import * as item_data from './inventory/items.js';
import { ABILITIES, SKILLS, LANGUAGES } from './data_enums.js';

export const TOOL_PROF_TYPES = {
    ITEM: "item",
    OPTION: "option"
}

export const acolyte = {
    skills: [SKILLS.INSIGHT, SKILLS.RELIGION],
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
    skills: [SKILLS.DECEPTION, SKILLS.SLEIGHT_OF_HAND],
    languages: [[],0],
    feature: {},
    tool_profs: [{type: TOOL_PROF_TYPES.ITEM, name: "Disguise Kit"}, {type: TOOL_PROF_TYPES.ITEM, name: "Forgery Kit"}],
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

export const criminal = {
    skills: [SKILLS.DECEPTION, SKILLS.STEALTH],
    languages: [[],0],
    feature: {name: "Criminal Contact", description: "You have a reliable and trustworthy contact to a network of criminals"},
    tool_profs: [{type: TOOL_PROF_TYPES.OPTION, name: "Game Set", options: item_data.getGameSets()}],
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
        starting: [{item: item_data.items.crowbar, count: 1}, {item: item_data.items.clothes_common, count: 1}]
    },
    currency: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 15,
        pp: 0
    }
}


//TODO: FIGURE OUT FAVOR OF AN ADMIRER
export const entertainer = {
    skills: [SKILLS.ACROBATICS, SKILLS.PERFORMANCE],
    languages: [[],0],
    feature: {name: "By Popular Demand", descripton: "You can recieve free food and housing by performing at accepting places"},
    tool_profs: [{type: TOOL_PROF_TYPES.ITEM, name: "Disguise Kit"}, {type: TOOL_PROF_TYPES.OPTION, name: "Musical Instrument", options: item_data.getMusicalInstruments()}],
    weapons: {
        options: [],
        starting: [],
    },
    armor: {
        options: [],
        starting: [],
    },
    inventory: {
        options: ['entertainer_inventory_1'],
        starting: [{item: item_data.items.clothes_costume, count: 1}]
    },
    currency: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 15,
        pp: 0
    }
}

export const fold_hero = {
    skills: [SKILLS.ANIMAL_HANDLING, SKILLS.SURVIVAL],
    languages: [[],0],
    feature: {name: "Rustic Hospitality", description: "People show you hospitality unless you have shown yourself to be a danger"},
    tool_profs: [{type: TOOL_PROF_TYPES.OPTION, name: "Artisan's Tool", options: item_data.getArtisanTools()}],
    weapons: {
        options: [],
        starting: [],
    },
    armor: {
        options: [],
        starting: [],
    },
    inventory: {
        options: ["fold_hero_option_1"],
        starting: [{item: item_data.items.pot_iron, count: 1}, {item: item_data.items.clothes_common, count: 1}]
    },
    currency: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 10,
        pp: 0
    }
}

export const guild_artisan = {
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
}

export const hermit = {
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
}

export const noble = {
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
}

export const outlander = {
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
}

export const sage = {
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
}

export const sailor = {
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
}

export const soldier = {
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
}

export const urchin = {
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