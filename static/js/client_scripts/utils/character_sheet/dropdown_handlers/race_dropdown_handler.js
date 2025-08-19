import {setRace} from './../mappers/race_mapper.js';
import {buildRaceSection} from './../page_builders/race_builder.js';
import {updateSkills, updateAbilities} from './../../display_stat_updater.js';

let socket = null;
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function setSocket(io) {
    socket = io;
    socket.on('load_race_stats', data => {
        addEventListeners();
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
    dropdown_text.textContent = option.textContent;
    setRace(option.textContent);
    buildRaceSection(option.textContent);
    updateSkills();
    updateAbilities();
    socket.emit('save_race', {race_name: option.textContent, char_id: char_id});
}