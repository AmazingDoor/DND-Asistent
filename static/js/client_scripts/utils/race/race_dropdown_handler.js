import {setRace} from './race_mapper.js';
import {buildRaceSection} from './race_section_builder.js';
let socket = null;
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function setSocket(io) {
    socket = io;
}

export function addEventListeners(updateSkills) {
    const dropdown_head = document.querySelector('.race-selector');
    const dropdown_text = dropdown_head.querySelector('p');
    const race_options = [...document.querySelector('.race-options').children];
    race_options.forEach((option) => {
        option.addEventListener('click', function() {
            clickEvent(dropdown_text, option, updateSkills)
        });
    });
}

function clickEvent(dropdown_text, option, updateSkills) {
    dropdown_text.textContent = option.textContent;
    setRace(option.textContent);
    buildRaceSection(option.textContent, updateSkills);
    updateSkills();
}