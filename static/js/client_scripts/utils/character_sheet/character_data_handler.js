let character_abilities = {};
let class_skills = [0, []];
let race_skills = [];
let race_ability_modifiers = {};
let race_languages = [];
let class_weapon_proficiencies = [];
let class_armor_proficiencies = [];
let class_tool_proficiencies = [];
let class_saving_throws = [];
let class_spells = [];

export function resetRaceData() {
    race_skills = [];
    race_ability_modifiers = {};
    race_languages = [];
}

export function resetClassData() {
    class_skills = [0, []];
    class_weapon_proficiencies = [];
    class_armor_proficiencies = [];
    class_tool_proficiencies = [];
    class_saving_throws = [];
    class_spells = [];
}

/*Modifier From Race*/
export function setCharacterAbilities(data) {
    character_abilities = data;
}

export function getCharacterAbilities() {
    return character_abilities;
}

/*Skills From Class*/
export function setClassSkills(data) {
    class_skills = data
}

export function getClassSkillNames() {
    return class_skills[1];
}

export function getClassSkills() {
    return class_skills;
}

/*Weapon Proficiencies From Class*/
export function setClassWeaponProficiencies(data) {
    class_weapon_proficiencies = data;
}

export function getClassWeaponProficiencies() {
    return class_weapon_proficiencies;
}

/*Armor Proficiencies From Class*/
export function setClassArmorProficiencies(data) {
    class_armor_proficiencies = data;
}

export function getClassArmorProficiencies() {
    return class_weapon_proficiencies;
}

/*Tool Proficiencies From Class*/
export function setClassToolProficiencies(data) {
    class_tool_proficiencies = data;
}

export function getClassToolProficiencies() {
    return class_tool_proficiencies;
}

/*Saving Throws From Class*/
export function setClassSavingThrows(data) {
    class_saving_throws = data;
}

export function getClassSavingThrows() {
    return class_saving_throws;
}

export function setClassPreparedSpells(spells) {
    class_spells = spells;
}

export function getClassPreparedSpells() {
    return class_spells;
}

export function setRaceSkills(data) {
    race_skills = data;
}

export function getRaceSkills() {
    return race_skills;
}

export function getRaceSkillNames() {
    return race_skills;
}

export function setRaceAbilityModifiers(data) {
    race_ability_modifiers = data;
}

export function getRaceAbilityModifiers() {
    return race_ability_modifiers;
}

export function setRaceLanguages(data) {
    race_languages = data;
}

export function getRaceLanguages() {
    return getRaceLanguages();
}