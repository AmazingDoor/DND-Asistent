let character_abilities = {};
let class_skills = [0,[]];

export function setCharacterAbilities(data) {
    character_abilities = data;
}

export function getCharacterAbilities() {
    return character_abilities;
}

export function setCharacterClassSkills(data) {
    class_skills = data
}

export function getCharacterClassSkills() {
    return class_skills;
}