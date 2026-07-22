import {setRace, resetRaceData, getRaceName} from './../mappers/race_mapper.js';
import {buildRaceSection} from './../page_builders/race_builder.js';
import {updateSkills, updateAbilities} from './../../display_stat_updater.js';
let socket = null;
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');

    addEventListeners();
});

export function setSocket(io) {
    socket = io;
}

export function Initialize() {
    loadEvent();
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
    resetRaceData();
    dropdown_text.textContent = option.textContent;
    setRace(option.textContent);
    buildRaceSection(option.textContent);
    updateSkills();
    updateAbilities();
    socket.emit('save_race', {race_name: option.textContent, char_id: char_id});
}

function loadEvent() {
    let race_name = getRaceName();
    console.log(race_name);
    if(race_name !== null) {
        const dropdown_head = document.querySelector('.race-selector');
        const dropdown_text = dropdown_head.querySelector('p');
        dropdown_text.textContent = race_name;
        //setRace(race_name);
        buildRaceSection(race_name);
        updateSkills();
        updateAbilities();
    }
}