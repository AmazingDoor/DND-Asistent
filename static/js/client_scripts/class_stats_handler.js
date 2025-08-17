let socket = null;
import * as class_proficiencies from './../shared/class_proficiencies.js';
import {linkDropdown} from './utils/dropdown_handler.js';
import {addClassSkillEventListeners} from './class_skill_handler.js';
import {setProfs, getProfs} from './utils/class_stats_handler/profs_mapper.js';
import {updateModifiers, calculateAbilityModifiers} from './ability_handler.js';
import {buildSpellSection} from './class_spell_section_handler.js';
let profs;
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function setSocket(io) {
    socket = io;
}

/*export function addEventListeners(updateSkills) {
    const class_options = [...document.querySelector(".class-options").children];
    const head = document.querySelector(".class-selector");
    class_options.forEach((option) => {
        option.addEventListener("click", function () {
        addClickListener(option, head, updateSkills)
        updateSkills();
        buildSpellSection(option.textContent);
        });
    });
}*/

/*export function loadPlayerClass(data, updateSkills) {
    const class_name = data.class_name;
    const skills = data.player_skills;
    if (class_name !== null) {
        document.querySelector('.selected-class').textContent = class_name;
    } else {
        document.querySelector('.selected-class').textContent = "Select Class";

    }
    buildClassStatSection(class_name, updateSkills, skills);
    updateSkills();
}*/

/*function addClickListener(option, head, updateSkills) {
    head.querySelector('.selected-class').textContent = option.textContent;
    buildClassStatSection(option.textContent, updateSkills);
    const skills = getSkills();
    const skill_array = [skills.length, skills];
    updateSkills();
    socket.emit('save_player_class', {class_name: option.textContent, skills: skill_array, char_id: char_id});

} */

/*function buildClassStatSection(c, updateSkills, active_skills = []) {
    setProfs(c);
    profs = getProfs();
    calculateAbilityModifiers();
    if (Object.keys(profs).length === 0) {
        return;
    }
    const saving_throws = profs.saving_throws;
    const weapons = profs.weapons;
    const armor = profs.armor;
    const tools = profs.tools;
    const skill_count = profs.skills[0];
    const skills = profs.skills[1];

    createSavingThrows(saving_throws)
    createWeapons(weapons)
    createArmor(armor)
    createTools(tools)
    createSkillSelections(skill_count, skills, active_skills, updateSkills)


}*/



export function getSavingThrows() {
    return profs.saving_throws;
}