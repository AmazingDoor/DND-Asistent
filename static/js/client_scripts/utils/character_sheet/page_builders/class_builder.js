import * as character_data_handler from './../character_data_handler.js';
import {setClass, getClassData, getClassName} from './../mappers/class_mapper.js';
import {linkDropdown} from './../../dropdown_handler.js';
import {addClassSkillEventListeners} from './../dropdown_handlers/class_skill_handler.js';
import {buildSpellSection} from './sub_builders/class_spell_section_builder.js';
import {updateSkills, updateAbilities} from './../../display_stat_updater.js';

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

let socket = null;
let class_data;
export function setSocket(io) {
    socket = io;
    socket.on('build_character_class', data => {
        setClass(data.class_name);
        character_data_handler.setClassSkills(data.class_skills);
        buildCharacterClass();
    });
}

export function buildCharacterClass() {
    const class_name = getClassName();
    const skills = character_data_handler.getClassSkills();

    const class_options = [...document.querySelector(".class-options").children];
    const head = document.querySelector(".class-selector");
    class_options.forEach((option) => {
        option.addEventListener("click", function() {clickEvent(option, head)});
    });


    if (class_name !== null) {
        document.querySelector('.selected-class').textContent = class_name;
    } else {
        document.querySelector('.selected-class').textContent = "Select Class";

    }
    buildClassStatSection(class_name, skills);
    setSkills();
    if (class_name !== "Wizard") {
        buildSpellSection(class_name);
    }


}

function clickEvent(option, head) {
    head.querySelector('.selected-class').textContent = option.textContent;
    socket.emit('save_spells', {char_id: char_id, spells: [], cantrips: []})
    buildClassStatSection(option.textContent);
    character_data_handler.resetClassData();
    if(option.textContent !== "Wizard") {
        buildSpellSection(option.textContent);
    }
    setSkills()
    const skill_array = character_data_handler.getClassSkills();
    updateSkills();
    updateAbilities();
    socket.emit('save_player_class', {class_name: option.textContent, skills: skill_array, char_id: char_id});
}

function setSkills() {
    const skills_container = document.querySelector('.class-skills-div');
    const skills = skills_container.querySelectorAll('.dropdown-head') || [];
    const skill_names = [];
    skills.forEach((skill) => {
        const skill_text = skill.querySelector('p').textContent;

        if(skill_text !== "Select Skill") {
            skill_names.push(skill_text);
        }
    });

    character_data_handler.setClassSkills([skill_names.length, skill_names]);
}

function buildClassStatSection(c, active_skills = []) {
    setClass(c);
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
        addClassSkillEventListeners(socket, setSkills);
    }

}

function removeSkills() {
    const d = document.querySelector('.class-skills-div');
    d.innerHTML = '';

}