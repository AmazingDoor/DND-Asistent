import {getRaceData} from './race_mapper.js';
import {linkDropdown} from './../dropdown_handler.js';
import {createAbilityDropdown} from './../dropdown_builders/ability_dropdown_builder.js';
import {createLanguageDropdown} from './../dropdown_builders/language_dropdown_builder.js';
import {createSkillDropdown} from './../dropdown_builders/skill_dropdown_builder.js';
export function buildRaceSection(race_name, updateSkills) {
    const race_data = getRaceData(race_name);
    if(race_data === undefined || race_data === null) {return;}
    createAbilities(race_data.abilities);
    setSize(race_data.size);
    setSpeed(race_data.speed);
    createTraits(race_data.features);
    createLanguages(race_data.languages);
    createSkills(race_data.skills, updateSkills);
}

function createAbilities(abilities) {
    const abilities_table = document.querySelector('.race-abilities-table');
    abilities_table.innerHTML = ''

}

function setSize(s) {
    const size_nums = document.querySelectorAll('.race-size');
    size_nums.forEach((size_num) => {
        size_num.textContent = s;
    });

}

function setSpeed(num) {
    const speed_nums = document.querySelectorAll('.speed-num');
    speed_nums.forEach((speed_num) => {
        speed_num.textContent = num.toString();
    });
}

function createTraits(traits) {
    const trait_list = document.querySelector('.trait-list');
    trait_list.innerHTML = '';
    traits.forEach((trait) => {
        const t = document.createElement('p');
        t.textContent = trait;
        trait_list.appendChild(t);
    });
}

function createLanguages(languages) {
    const set_languages = languages[0];
    const language_choices = languages[1];
    const language_list = document.querySelector('.language-list');
    language_list.innerHTML = '';
    set_languages.forEach((language) => {
        const t = document.createElement('p');
        t.textContent = language;
        language_list.appendChild(t);
    });

    for (let i = 0; i < language_choices; i++) {
        createLanguageDropdown(language_list);
    }


}

function createSkills(skills, updateSkills) {
    const skill_list = document.querySelector('.skill-list');
    skill_list.innerHTML = '';
    let selectable = 0;
    skills.forEach((skill) => {
        if(skill !== "Any") {
            const t = document.createElement('p');
            t.textContent = skill;
            skill_list.appendChild(t);
        } else {
            selectable++;
        }
    });

    for (let i = 0; i < selectable; i++) {
        createSkillDropdown(skill_list, updateSkills);
    }
}


