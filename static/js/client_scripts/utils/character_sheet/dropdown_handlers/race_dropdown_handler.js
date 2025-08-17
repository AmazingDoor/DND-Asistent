import {setRace} from './../mappers/race_mapper.js';
import {buildRaceSection} from './../page_builders/race_builder.js';
let socket = null;
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function setSocket(io) {
    socket = io;
}

export function addEventListeners(updateSkills, updateModifiers) {
    const dropdown_head = document.querySelector('.race-selector');
    const dropdown_text = dropdown_head.querySelector('p');
    const race_options = [...document.querySelector('.race-options').children];
    race_options.forEach((option) => {
        option.addEventListener('click', function() {
            clickEvent(dropdown_text, option, updateSkills, updateModifiers)
        });
    });
}

function clickEvent(dropdown_text, option, updateSkills, updateModifiers) {
    dropdown_text.textContent = option.textContent;
    setRace(option.textContent);
    buildRaceSection(option.textContent, updateSkills, updateModifiers);
    updateSkills();
    updateModifiers();
    socket.emit('save_race', {race_name: option.textContent, char_id: char_id});
}