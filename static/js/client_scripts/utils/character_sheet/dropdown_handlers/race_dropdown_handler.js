import {setRace} from './../mappers/race_mapper.js';
import {buildRaceSection} from './../page_builders/race_builder.js';
import {updateSkills, updateAbilities} from './../../display_stat_updater.js';
import * as character_data_handler from './../character_data_handler.js';
let socket = null;
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function setSocket(io) {
    socket = io;
    socket.on('load_race_stats', data => {
        const race_skills = data.race_skills;
        const race_abilities = data.race_abilities;
        const race_languages = data.race_languages;
        const race_name = data.race_name;
        character_data_handler.setRaceSkills(race_skills);
        character_data_handler.setRaceLanguages(race_languages);
        character_data_handler.setRaceAbilityModifiers(race_abilities);
        addEventListeners();
        if(race_name !== null) {
            const dropdown_head = document.querySelector('.race-selector');
            const dropdown_text = dropdown_head.querySelector('p');
            loadEvent(dropdown_text, race_name);
        }

    });
}

export function addEventListeners() {
    const dropdown_head = document.querySelector('.race-selector');
    const dropdown_text = dropdown_head.querySelector('p');
    const race_options = [...document.querySelector('.race-options').children];
    race_options.forEach((option) => {
        option.addEventListener('click', function() {
            clickEvent(dropdown_text, option)
        });
    });
}

function clickEvent(dropdown_text, option) {
    character_data_handler.resetRaceData();
    dropdown_text.textContent = option.textContent;
    setRace(option.textContent);
    buildRaceSection(option.textContent);
    updateSkills();
    updateAbilities();
    socket.emit('save_race', {race_name: option.textContent, char_id: char_id});
}

function loadEvent(dropdown_text, race_name) {
    dropdown_text.textContent = race_name;
    setRace(race_name);
    buildRaceSection(race_name);
    updateSkills();
    updateAbilities();
}