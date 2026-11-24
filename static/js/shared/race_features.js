import { ABILITIES, LANGUAGES, SKILLS, RACES } from "./data_enums.js";

export const HIGH_ELF = {
  abilities: [{id: [ABILITIES.DEX], value: 2}, {id: [ABILITIES.INT], value: 1}],
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Keen Senses (Perception)", "Fey Ancestry", "Trance", "Elf Weapon Training"],
  languages: [LANGUAGES.COMMON, LANGUAGES.ELVISH, LANGUAGES.OPTION],
  skills: [SKILLS.PERCEPTION],
  cantrips: 1,
  spells: 0,
};

export const WOOD_ELF = {
  abilities:[{id: [ABILITIES.DEX], value: 2}, {id: [ABILITIES.WIS], value: 1}],
  size: "Medium",
  speed: 35,
  features: [
    "Darkvision",
    "Keen Senses (Perception)",
    "Fey Ancestry",
    "Trance",
    "Mask of the Wild",
    "Elf Weapon Training"
  ],
  languages: [LANGUAGES.COMMON, LANGUAGES.ELVISH],
  skills: [SKILLS.PERCEPTION],
  cantrips: 0,
  spells: 0,
};

export const DROW = {
  abilities: [{id: [ABILITIES.DEX], value: 2}, {id: [ABILITIES.CHA], value: 1}],
  size: "Medium",
  speed: 30,
  features: [
    "Superior Darkvision",
    "Keen Senses (Perception)",
    "Fey Ancestry",
    "Trance",
    "Drow Magic",
    "Sunlight Sensitivity",
  ],
  languages: [LANGUAGES.COMMON, LANGUAGES.ELVISH],
  skills: ["Perception"],
  cantrips: 0,
  spells: 0,
};

export const HILL_DWARF = {
  abilities: [{id: [ABILITIES.CON], value: 2}, {id: [ABILITIES.WIS], value: 1}],
  size: "Medium",
  speed: 25,
  features: [
    "Darkvision",
    "Dwarven Resilience (Poison resistance and advantage on saving throws vs poison)",
    "Dwarven Combat Training",
    "Tool Proficiency",
    "Stonecunning",
    "Dwarven Toughness (+1 HP per level)",
  ],
  languages: [LANGUAGES.COMMON, LANGUAGES.DWARVISH],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const MOUNTAIN_DWARF = {
  abilities: [{id: [ABILITIES.CON], value: 2}, {id: [ABILITIES.STR], value: 2}],
  size: "Medium",
  speed: 25,
  features: [
    "Darkvision",
    "Dwarven Resilience (Poison resistance and advantage on saving throws vs poison)",
    "Dwarven Combat Training",
    "Tool Proficiency",
    "Stonecunning",
    "Dwarven Armor Training",
  ],
  languages: [LANGUAGES.COMMON, LANGUAGES.DWARVISH],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const LIGHTFOOT_HALFLING = {
  abilities: [{id: [ABILITIES.DEX], value: 2}, {id: [ABILITIES.CHA], value: 1}],
  size: "Small",
  speed: 25,
  features: ["Lucky", "Brave", "Halfling Nimbleness", "Naturally Stealthy"],
  languages: [LANGUAGES.COMMON, LANGUAGES.HALFLING],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const STOUT_HALFLING = {
  abilities: [{id: [ABILITIES.DEX], value: 2}, {id: [ABILITIES.CON], value: 1}],
  size: "Small",
  speed: 25,
  features: ["Lucky", "Brave", "Halfling Nimbleness", "Stout Resilience"],
  languages: [LANGUAGES.COMMON, LANGUAGES.HALFLING],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const DRAGONBORN = {
  abilities: [{id: [ABILITIES.STR], value: 2}, {id: [ABILITIES.CHA], value: 1}],
  size: "Medium",
  speed: 30,
  features: ["Breath Weapon", "Damage Resistance (depends on draconic ancestry)"],
  languages: [LANGUAGES.COMMON, LANGUAGES.DRACONIC],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const FOREST_GNOME = {
  abilities: [{id: [ABILITIES.INT], value: 2}, {id: [ABILITIES.DEX], value: 1 }],
  size: "Small",
  speed: 25,
  features: ["Darkvision", "Gnome Cunning", "Minor Illusion Cantrip", "Speak with Small Beasts"],
  languages: [LANGUAGES.COMMON, LANGUAGES.GNOMISH],
  skills: [],
  cantrips: 1,
  spells: 0,
};

export const ROCK_GNOME = {
  abilities: [{id: [ABILITIES.INT], value: 2}, {id: [ABILITIES.CON], value: 1}],
  size: "Small",
  speed: 25,
  features: ["Darkvision", "Gnome Cunning", "Artificer’s Lore", "Tinker"],
  languages: [LANGUAGES.COMMON, LANGUAGES.GNOMISH],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const HALF_ELF = {
  abilities: [{id: [ABILITIES.CHA], value: 2}, {id: [ABILITIES.OPTION], value: 1}, {id: [ABILITIES.OPTION], value: 1}],
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Fey Ancestry", "Skill Versatility (2 skills)"],
  languages: [LANGUAGES.COMMON, LANGUAGES.ELVISH, LANGUAGES.OPTION],
  skills: [SKILLS.OPTION, SKILLS.OPTION],
  cantrips: 0,
  spells: 0,
};

export const HALF_ORC = {
  abilities: [{id: [ABILITIES.STR], value: 2}, {id: [ABILITIES.CON], value: 1}],
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Relentless Endurance", "Savage Attacks"],
  languages: [LANGUAGES.COMMON, LANGUAGES.ORC],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const TIEFLING = {
  abilities: [{id: [ABILITIES.CHA], value: 2}, {id: [ABILITIES.INT], value: 1}],
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Hellish Resistance (fire)", "Infernal Legacy (cantrips and spells)"],
  languages: [LANGUAGES.COMMON, LANGUAGES.INFERNAL],
  skills: [],
  cantrips: 1,
  spells: 3,
};

export const HUMAN = {
  abilities: [{id: [ABILITIES.STR], value: 1}, {id: [ABILITIES.DEX], value: 1}, {id: [ABILITIES.CON], value: 1},
   {id: [ABILITIES.INT], value: 1}, {id: [ABILITIES.WIS], value: 1}, {id: [ABILITIES.CHA], value: 1}],
  size: "Medium",
  speed: 30,
  features: [],
  languages: [LANGUAGES.COMMON, LANGUAGES.OPTION],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const ELF_GENERIC = {
  abilities: [{id: [ABILITIES.DEX], value: 2}],
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Keen Senses (Perception)", "Fey Ancestry", "Trance"],
  languages: [LANGUAGES.COMMON, LANGUAGES.ELVISH],
  skills: [SKILLS.PERCEPTION],
  cantrips: 0,
  spells: 0,
};

export const DWARF_GENERIC = {
  abilities: [{id: [ABILITIES.CON], value: 2}],
  size: "Medium",
  speed: 25,
  features: [
    "Darkvision",
    "Dwarven Resilience (Poison resistance and advantage on saving throws vs poison)",
    "Dwarven Combat Training",
    "Tool Proficiency",
    "Stonecunning",
  ],
  languages: [LANGUAGES.COMMON, LANGUAGES.DWARVISH],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const HALFLING_GENERIC = {
  abilities: [{id: [ABILITIES.DEX], value: 2}],
  size: "Small",
  speed: 25,
  features: ["Lucky", "Brave", "Halfling Nimbleness"],
  languages: [LANGUAGES.COMMON, LANGUAGES.HALFLING],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const GNOME_GENERIC = {
  abilities: [{id: [ABILITIES.INT], value: 2}],
  size: "Small",
  speed: 25,
  features: ["Darkvision", "Gnome Cunning"],
  languages: [LANGUAGES.COMMON, LANGUAGES.GNOMISH],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const EMPTY = {
  abilities: [],
  size: "",
  speed: 25,
  features: [],
  skills: [],
  cantrips: 0,
  spells: 0
}

export function getRaceData(race) {
    const data = {
        [RACES.HIGH_ELF]: HIGH_ELF,
        [RACES.WOOD_ELF]: WOOD_ELF,
        [RACES.DROW]: DROW,
        [RACES.HILL_DWARF]: HILL_DWARF,
        [RACES.MOUNTAIN_DWARF]: MOUNTAIN_DWARF,
        [RACES.LIGHTFOOT_HALFLING]: LIGHTFOOT_HALFLING,
        [RACES.STOUT_HALFLING]: STOUT_HALFLING,
        [RACES.DRAGONBORN]: DRAGONBORN,
        [RACES.FOREST_GNOME]: FOREST_GNOME,
        [RACES.ROCK_GNOME]: ROCK_GNOME,
        [RACES.HALF_ELF]: HALF_ELF,
        [RACES.HALF_ORC]: HALF_ORC,
        [RACES.TIEFLING]: TIEFLING,
        [RACES.HUMAN]: HUMAN,
        [RACES.OPTION]: EMPTY
    }
    return data[race];
}
