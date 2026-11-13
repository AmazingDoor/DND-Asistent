export const CLASSES = {
    BARBARIAN: "BARBARIAN",
    BARD: "BARD",
    CLERIC: "CLERIC",
    DRUID: "DRUID",
    FIGHTER: "FIGHER",
    MONK: "MONK",
    PALADIN: "PALADIN",
    RANGER: "RANGER",
    ROGUE: "ROGUE",
    SORCERER: "SORCERER",
    WARLOCK: "WARLOCK",
    WIZARD: "WIZARD",
    OPTION: "OPTION"
}

export const CLASS_NAMES = {
    [CLASSES.BARBARIAN]: "Barbarian",
    [CLASSES.BARD]: "Bard",
    [CLASSES.CLERIC]: "Cleric",
    [CLASSES.DRUID]: "Druid",
    [CLASSES.FIGHTER]: "Fighter",
    [CLASSES.MONK]: "Monk",
    [CLASSES.PALADIN]: "Paladin",
    [CLASSES.RANGER]: "Ranger",
    [CLASSES.ROGUE]: "Rogue",
    [CLASSES.SORCERER]: "Sorcerer",
    [CLASSES.WARLOCK]: "Warlock",
    [CLASSES.WIZARD]: "Wizard",
    [CLASSES.OPTION]: "Select Class"
}

export const ABILITIES = {
    STR: "STR",
    DEX: "DEX",
    CON: "CON",
    INT: "INT",
    WIS: "WIS",
    CHA: "CHA",
    OPTION: "OPTION"
}

export const ABILITY_NAMES = {
    [ABILITIES.STR]: "Strength",
    [ABILITIES.DEX]: "Dexterity",
    [ABILITIES.CON]: "Constitution",
    [ABILITIES.INT]: "Intelligence",
    [ABILITIES.WIS]: "Wisdom",
    [ABILITIES.CHA]: "Charisma",
    [ABILITIES.OPTION]: "Select"
}

export const SKILLS = {
    ATHLETICS: "ATHLETICS",
    ACROBATICS: "ACROBATICS",
    SLEIGHT_OF_HAND: "SLEIGHT_OF_HAND",
    STEALTH: "STEALTH",
    ARCANA: "ARCANA",
    HISTORY: "HISTORY",
    INVESTIGATION: "INVESTIGATION",
    NATURE: "NATURE",
    RELIGION: "RELIGION",
    ANIMAL_HANDLING: "ANIMAL_HANDLING",
    INSIGHT: "INSIGHT",
    MEDICINE: "MEDICINE",
    PERCEPTION: "PERCEPTION",
    SURVIVAL: "SURVIVAL",
    DECEPTION: "DECEPTION",
    INTIMIDATION: "INTIMIDATION",
    PERFORMANCE: "PERFORMANCE",
    PERSUASION: "PERSUASION",
    OPTION: "OPTION"
}

export const SKILL_NAMES = {
    [SKILLS.ATHLETICS]: "Athletics",
    [SKILLS.ACROBATICS]: "Acrobatics",
    [SKILLS.SLEIGHT_OF_HAND]: "Sleight of Hand",
    [SKILLS.STEALTH]: "Stealth",
    [SKILLS.ARCANA]: "Arcana",
    [SKILLS.HISTORY]: "History",
    [SKILLS.INVESTIGATION]: "Investigation",
    [SKILLS.NATURE]: "Nature",
    [SKILLS.RELIGION]: "Religion",
    [SKILLS.ANIMAL_HANDLING]: "Animal Handling",
    [SKILLS.INSIGHT]: "Insight",
    [SKILLS.MEDICINE]: "Medicine",
    [SKILLS.PERCEPTION]: "Perception",
    [SKILLS.SURVIVAL]: "Survival",
    [SKILLS.DECEPTION]: "Deception",
    [SKILLS.INTIMIDATION]: "Intimidation",
    [SKILLS.PERFORMANCE]: "Performance",
    [SKILLS.PERSUASION]: "Persuasion",
    [SKILLS.OPTION]: "Select Skill"
}

export const LANGUAGES = {
    COMMON: "COMMON",
    DWARVISH: "DWARVISH",
    ELVISH: "ELVISH",
    GIANT: "GIANT",
    GNOMISH: "GNOMISH",
    GOBLIN: "GOBLIN",
    HALFLING: "HALFLING",
    ORC: "ORC",
    ABYSSAL: "ABYSSAL",
    CELESTIAL: "CELESTIAL",
    DRACONIC: "DRACONIC",
    DEEP_SPEECH: "DEEP_SPEECH",
    INFERNAL: "INFERNAL",
    PRIMORDIAL: "PRIMORDIAL",
    SYLVAN: "SYLVAN",
    UNDERCOMMON: "UNDERCOMMON",
    OPTION: "OPTION"

}

export const LANGUAGE_NAMES = {
    [LANGUAGES.COMMON]: "Common",
    [LANGUAGES.DWARVISH]: "Dwarvish",
    [LANGUAGES.ELVISH]: "Elvish",
    [LANGUAGES.GIANT]: "Giant",
    [LANGUAGES.GNOMISH]: "Gnomish",
    [LANGUAGES.GOBLIN]: "Goblin",
    [LANGUAGES.HALFLING]: "Halfling",
    [LANGUAGES.ORC]: "Orc",
    [LANGUAGES.ABYSSAL]: "Abyssal",
    [LANGUAGES.CELESTIAL]: "Celestial",
    [LANGUAGES.DRACONIC]: "Draconic",
    [LANGUAGES.DEEP_SPEECH]: "Deep Speech",
    [LANGUAGES.INFERNAL]: "Infernal",
    [LANGUAGES.PRIMORDIAL]: "Primordial",
    [LANGUAGES.SYLVAN]: "Sylvan",
    [LANGUAGES.UNDERCOMMON]: "Undercommon",
    [LANGUAGES.OPTION]: "Select"

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