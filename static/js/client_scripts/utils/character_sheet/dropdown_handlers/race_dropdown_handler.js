import {setRace, setDefaultRaceData, resetRaceData, getRaceName} from './../mappers/race_mapper.js';
import {buildRaceSection} from './../page_builders/race_builder.js';
import {updateSkills, updateAbilities} from './../../display_stat_updater.js';
import { saveRace } from '../../../save_handler.js';
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

async function clickEvent(dropdown_text, option) {
    resetRaceData();
    dropdown_text.textContent = option.textContent;
    setDefaultRaceData(option.textContent);
    buildRaceSection(option.textContent);
    updateAbilities();
    updateSkills();
    await saveRace();
}

function loadEvent() {
    let race_name = getRaceName();
    const dropdown_head = document.querySelector('.race-selector');
    const dropdown_text = dropdown_head.querySelector('p');
    
    if(race_name !== null && race_name != "") {
        dropdown_text.textContent = race_name;
        buildRaceSection(race_name);
        updateAbilities();
        updateSkills();
    } else {
        dropdown_text.textContent = "Select Race";
    }
}