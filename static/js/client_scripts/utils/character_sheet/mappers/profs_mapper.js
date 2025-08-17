import * as class_proficiencies from './../../../../shared/class_proficiencies.js';
let profs = {};

export function setProfs(p) {
    switch (p) {
    case "Barbarian":
        profs = class_proficiencies.barbarian;
        break;
    case "Bard":
        profs = class_proficiencies.bard;
        break;
    case "Cleric":
        profs = class_proficiencies.cleric;
        break;
    case "Druid":
        profs = class_proficiencies.druid;
        break;
    case "Fighter":
        profs = class_proficiencies.fighter;
        break;
    case "Monk":
        profs = class_proficiencies.monk;
        break;
    case "Paladin":
        profs = class_proficiencies.paladin;
        break;
    case "Ranger":
        profs = class_proficiencies.ranger;
        break;
    case "Rogue":
        profs = class_proficiencies.rogue;
        break;
    case "Sorcerer":
        profs = class_proficiencies.sorcerer;
        break;
    case "Warlock":
        profs = class_proficiencies.warlock;
        break;
    case "Wizard":
        profs = class_proficiencies.wizard;
        break;
    default:
        profs = {};
        break;
    }
    return profs;
}

export function getProfs() {
    return profs;
}