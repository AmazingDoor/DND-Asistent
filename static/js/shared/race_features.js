export const high_elf = {
  abilities: { dex: 2,  int: 1 },
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Keen Senses (Perception)", "Fey Ancestry", "Trance", "Elf Weapon Training"],
  languages: [["Common", "Elvish"], 1], // 1 extra language choice
  skills: ["Perception"],
  cantrips: 1,
  spells: 0,
};

export const wood_elf = {
  abilities: { dex: 2, wis: 1 },
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
  languages: [["Common", "Elvish"], 0],
  skills: ["Perception"],
  cantrips: 0,
  spells: 0,
};

export const drow = {
  abilities: { dex: 2, cha: 1 },
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
  languages: [["Common", "Elvish"], 0],
  skills: ["Perception"],
  cantrips: 0,
  spells: 0,
};

export const hill_dwarf = {
  abilities: { con: 2, wis: 1 },
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
  languages: [["Common", "Dwarvish"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const mountain_dwarf = {
  abilities: { con: 2, str: 2 },
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
  languages: [["Common", "Dwarvish"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const lightfoot_halfling = {
  abilities: { dex: 2, cha: 1 },
  size: "Small",
  speed: 25,
  features: ["Lucky", "Brave", "Halfling Nimbleness", "Naturally Stealthy"],
  languages: [["Common", "Halfling"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const stout_halfling = {
  abilities: { dex: 2, con: 1 },
  size: "Small",
  speed: 25,
  features: ["Lucky", "Brave", "Halfling Nimbleness", "Stout Resilience"],
  languages: [["Common", "Halfling"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const dragonborn = {
  abilities: { str: 2, cha: 1 },
  size: "Medium",
  speed: 30,
  features: ["Breath Weapon", "Damage Resistance (depends on draconic ancestry)"],
  languages: [["Common", "Draconic"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const forest_gnome = {
  abilities: { int: 2, dex: 1 },
  size: "Small",
  speed: 25,
  features: ["Darkvision", "Gnome Cunning", "Minor Illusion Cantrip", "Speak with Small Beasts"],
  languages: [["Common", "Gnomish"], 0],
  skills: [],
  cantrips: 1,
  spells: 0,
};

export const rock_gnome = {
  abilities: { int: 2, con: 1 },
  size: "Small",
  speed: 25,
  features: ["Darkvision", "Gnome Cunning", "Artificer’s Lore", "Tinker"],
  languages: [["Common", "Gnomish"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const half_elf = {
  abilities: { cha: 2, any: 1, any: 1 },
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Fey Ancestry", "Skill Versatility (2 skills)"],
  languages: [["Common", "Elvish"], 1],
  skills: ["Any", "Any"], // 2 skills of choice
  cantrips: 0,
  spells: 0,
};

export const half_orc = {
  abilities: { str: 2, con: 1 },
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Relentless Endurance", "Savage Attacks"],
  languages: [["Common", "Orc"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const tiefling = {
  abilities: { cha: 2, int: 1 },
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Hellish Resistance (fire)", "Infernal Legacy (cantrips and spells)"],
  languages: [["Common", "Infernal"], 0],
  skills: [],
  cantrips: 1,
  spells: 3,
};

export const human = {
  abilities:
    { str: 1,
    dex: 1,
    con: 1,
    int: 1,
    wis: 1,
    cha: 1 },
  size: "Medium",
  speed: 30,
  features: [],
  languages: [["Common"], 1],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const elf_generic = {
  abilities: { dex: 2 },
  size: "Medium",
  speed: 30,
  features: ["Darkvision", "Keen Senses (Perception)", "Fey Ancestry", "Trance"],
  languages: [["Common", "Elvish"], 0],
  skills: ["Perception"],
  cantrips: 0,
  spells: 0,
};

export const dwarf_generic = {
  abilities: { con: 2 },
  size: "Medium",
  speed: 25,
  features: [
    "Darkvision",
    "Dwarven Resilience (Poison resistance and advantage on saving throws vs poison)",
    "Dwarven Combat Training",
    "Tool Proficiency",
    "Stonecunning",
  ],
  languages: [["Common", "Dwarvish"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const halfling_generic = {
  abilities: { dex: 2 },
  size: "Small",
  speed: 25,
  features: ["Lucky", "Brave", "Halfling Nimbleness"],
  languages: [["Common", "Halfling"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};

export const gnome_generic = {
  abilities: { int: 2 },
  size: "Small",
  speed: 25,
  features: ["Darkvision", "Gnome Cunning"],
  languages: [["Common", "Gnomish"], 0],
  skills: [],
  cantrips: 0,
  spells: 0,
};
