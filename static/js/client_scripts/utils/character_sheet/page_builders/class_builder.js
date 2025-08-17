import * as character_data_handler from './../character_data_handler.js';
import {setClass, getClassData} from './../mappers/class_mapper.js';

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});
let socket = null;
let class_data;
export function setSocket(io) {
    socket = io;
}

export function buildCharacterClass(data) {
    const class_options = [...document.querySelector(".class-options").children];
    const head = document.querySelector(".class-selector");
    class_options.forEach((option) => {
        option.addEventListener("click", function() {clickEvent(option, head)});
    })

    const class_name = data.class_name;
    const skills = data.player_skills;
    if (class_name !== null) {
        document.querySelector('.selected-class').textContent = class_name;
    } else {
        document.querySelector('.selected-class').textContent = "Select Class";

    }
    buildClassStatSection(class_name, skills);

}

function clickEvent(option, head) {
    head.querySelector('.selected-class').textContent = option.textContent;
    buildClassStatSection(option.textContent);
    const skills = getSkills();
    const skill_array = [skills.length, skills];
    socket.emit('save_player_class', {class_name: option.textContent, skills: skill_array, char_id: char_id});
}

function getSkills() {
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

function buildClassStatSection(c, active_skills = []) {
    setProfs(c);
    class_data = getClassData();
    if (Object.keys(class_data).length === 0) {
        return;
    }
    const saving_throws = class_data.saving_throws;
    const weapons = class_data.weapons;
    const armor = class_data.armor;
    const tools = class_data.tools;
    const skill_count = class_data.skills[0];
    const skills = class_data.skills[1];

    character_data_handler.setClassSkills(class_data.skills);

    createSavingThrows(saving_throws)
    createWeapons(weapons)
    createArmor(armor)
    createTools(tools)
    createSkillSelections(skill_count, skills, active_skills)
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