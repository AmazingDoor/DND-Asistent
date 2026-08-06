let socket = null;
import * as class_proficiencies from './../shared/class_proficiencies.js';
import {linkDropdown} from './utils/dropdown_handler.js';
import {addClassSkillEventListeners} from './class_skill_handler.js';
import {updateModifiers, calculateAbilityModifiers} from './ability_handler.js';

let profs;
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function setSocket(io) {
    socket = io;
}

export function getSavingThrows() {
    return profs.saving_throws;
}