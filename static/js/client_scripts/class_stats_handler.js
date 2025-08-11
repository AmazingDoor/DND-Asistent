let socket = null;
import * as class_proficiencies from './../shared/class_proficiencies.js';
import {linkDropdown} from './utils/dropdown_handler.js';
import {addClassSkillEventListeners} from './class_skill_handler.js';
import {setProfs, getProfs} from './utils/class_stats_handler/profs_mapper.js';
import {updateModifiers, calculateAbilityModifiers} from './ability_handler.js';

let profs;
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function setSocket(io) {
    socket = io;
}

export function addEventListeners(updateSkills) {
    const class_options = [...document.querySelector(".class-options").children];
    const head = document.querySelector(".class-selector");
    class_options.forEach((option) => {
        option.addEventListener("click", function () {
        addClickListener(option, head, updateSkills)
        updateSkills();
        });
    });
}

export function loadPlayerClass(data, updateSkills) {
    const class_name = data.class_name;
    const skills = data.player_skills;
    document.querySelector('.selected-class').textContent = class_name;
    buildClassStatSection(class_name, updateSkills, skills);
    updateSkills();
}

function addClickListener(option, head, updateSkills) {
    head.querySelector('.selected-class').textContent = option.textContent;
    buildClassStatSection(option.textContent, updateSkills);
    const skills = getSkills();
    const skill_array = [skills.length, skills];
    updateSkills();
    socket.emit('save_player_class', {class_name: option.textContent, skills: skill_array, char_id: char_id});

}

function buildClassStatSection(c, updateSkills, active_skills = []) {
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


}

function createSavingThrows(saving_throws) {
    const count = saving_throws.length;
    let str = '';
    for (let i = 0; i < count; i++) {
        str = str + saving_throws[i];
        if(i < count - 1) {
            str = str + ', ';
        }
    }

    document.querySelector('.saving-throw-display').textContent = str;

}

function createWeapons(weapons) {
    const count = weapons.length;
    let str = '';
    for (let i = 0; i < count; i++) {
        str = str + weapons[i];
        if(i < count - 1) {
            str = str + ', ';
        }
    }

    document.querySelector('.weapons-display').textContent = str;
}

function createArmor(armor) {
    const count = armor.length;
    let str = '';
    for (let i = 0; i < count; i++) {
        str = str + armor[i];
        if(i < count - 1) {
            str = str + ', ';
        }
    }

    document.querySelector('.armor-display').textContent = str;
}

function createTools(tools) {
    const count = tools.length;
    let str = '';
    for (let i = 0; i < count; i++) {
        str = str + tools[i];
        if(i < count - 1) {
            str = str + ', ';
        }
    }

    document.querySelector('.tools-display').textContent = str;
}

function createSkillSelections(skill_count, skills, active_skills, updateSkills) {
    const d = document.querySelector('.class-skills-div');
    removeSkills();
    const skill_names = active_skills[1] || [];
    for (let i = 0; i < skill_count; i++) {
        let skill_text = "Select Skill";
        if (skill_names.length > 0) {
            if (skill_names[i] !== undefined) {
                skill_text = skill_names[i];
            }
        }
        let skill_div = document.createElement('div');
        skill_div.classList.add('skill-selection');
        skill_div.classList.add('dropdown-head');
        skill_div.innerHTML = `
            <p>${skill_text}</p>
            <div class="dropdown">
                <div class="skill-dropdown dropdown-content hidden">
                </div>
            </div>
        `;

        d.appendChild(skill_div);
        const dropdown = skill_div.querySelector('.dropdown-content');
        skills.forEach((skill) => {
            let option = document.createElement('div');
            option.classList.add('skill-option');
            option.textContent = skill;
            dropdown.appendChild(option);
        });
        skill_div.appendChild(dropdown);
        linkDropdown(skill_div);
        addClassSkillEventListeners(updateSkills, getSkills);
    }

}

function removeSkills() {
    const d = document.querySelector('.class-skills-div');
    d.innerHTML = '';

}

export function getSkills() {
    const skills_container = document.querySelector('.class-skills-div');
    const skills = skills_container.querySelectorAll('.dropdown-head') || [];
    const skill_names = []
    skills.forEach((skill) => {
        const skill_text = skill.querySelector('p').textContent;
        if(skill_text !== "Select Skill") {
            skill_names.push(skill_text);
        }
    });

    return skill_names;
}

export function getSavingThrows() {
    return profs.saving_throws;
}