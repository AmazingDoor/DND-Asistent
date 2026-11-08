export const CLASSES = {
    BARBARIAN: "Barbarian",
    BARD: "Bard",
    CLERIC: "Cleric",
    DRUID: "Druid",
    FIGHTER: "Fighter",
    MONK: "Monk",
    PALADIN: "Paladin",
    RANGER: "Ranger",
    ROGUE: "Rogue",
    SORCERER: "Sorcerer",
    WARLOCK: "Warlock",
    WIZARD: "Wizard"
}

export const ABILITIES = {
    STR: {id: "STR", name: "Strength"},
    DEX: {id: "DEX", name: "Dexterity"},
    CON: {id: "CON", name: "Constitution"},
    INT: {id: "INT", name: "Intelligence"},
    WIS: {id: "WIS", name: "Wisdom"},
    CHA: {id: "CHA", name: "Charisma"},
    OPTION: {id: "OPT", name: "Option"}
}

export const SKILLS = {
    ATHLETICS: "Athletics",
    ACROBATICS: "Acrobatics",
    SLEIGHT_OF_HAND: "Sleight of Hand",
    STEALTH: "Stealth",
    ARCANA: "Arcana",
    HISTORY: "History",
    INVESTIGATION: "Investigation",
    NATURE: "Nature",
    RELIGION: "Religion",
    ANIMAL_HANDLING: "Animal Handling",
    INSIGHT: "Insight",
    MEDICINE: "Medicine",
    PERCEPTION: "Perception",
    SURVIVAL: "Survival",
    DECEPTION: "Deception",
    INTIMIDATION: "Intimidation",
    PERFORMANCE: "Performance",
    PERSUASION: "Persuasion",
    OPTION: "Select"
}

export const LANGUAGES = {
    COMMON: "Common",
    DWARVISH: "Dwarvish",
    ELVISH: "Elvish",
    GIANT: "Giant",
    GNOMISH: "Gnomish",
    GOBLIN: "Goblin",
    HALFLING: "Halfling",
    ORC: "Orc",
    ABYSSAL: "Abyssal",
    CELESTIAL: "Celestial",
    DRACONIC: "Draconic",
    DEEP_SPEECH: "Deep Speech",
    INFERNAL: "Infernal",
    PRIMORDIAL: "Primordial",
    SYLVAN: "Sylvan",
    UNDERCOMMON: "Undercommon"

}


export const MULTICLASS_REQUIREMENTS = {
    [CLASSES.BARBARIAN]: {any: [{ability: ABILITIES.STR, min_level: 13}]},
    [CLASSES.BARD]: {any: [{ability: ABILITIES.CHA, min_level: 13}]},
    [CLASSES.CLERIC]: {any: [{ability: ABILITIES.WIS, min_level: 13}]},
    [CLASSES.DRUID]: {any:[{ability: ABILITIES.WIS, min_level: 13}]},
    [CLASSES.FIGHTER]: {any:[{ability: ABILITIES.STR, min_level: 13}, {ability: ABILITIES.DEX, min_level: 13}]},
    [CLASSES.MONK]: {all:[{ability: ABILITIES.DEX, min_level: 13}, {ability: ABILITIES.WIS, min_level: 13}]},
    [CLASSES.PALADIN]: {all:[{ability: ABILITIES.STR , min_level: 13}, {ability: ABILITIES.CHA, min_level: 13}]},
    [CLASSES.RANGER]: {all:[{ability: ABILITIES.DEX, min_level: 13}, {ability: ABILITIES.WIS, min_level: 13}]},
    [CLASSES.ROGUE]: {any:[{ability: ABILITIES.DEX, min_level: 13}]},
    [CLASSES.SORCERER]: {any:[{ability: ABILITIES.CHA, min_level: 13}]},
    [CLASSES.WARLOCK]: {any:[{ability: ABILITIES.CHA, min_level: 13}]},
    [CLASSES.WIZARD]: {any:[{ability: ABILITIES.INT, min_level: 13}]}

}