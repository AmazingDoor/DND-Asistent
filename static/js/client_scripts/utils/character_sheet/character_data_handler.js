let character_abilities = {};
let class_skills = [0,[]];
let class_weapon_proficiencies = [];
let class_armor_proficiencies = [];
let class_tool_proficiencies = [];
let class_saving_throws = [];


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