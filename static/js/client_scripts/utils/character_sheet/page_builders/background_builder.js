import * as character_data_handler from './../character_data_handler.js';
import {setBackground, getBackgroundData, getBackgroundName} from './../mappers/background_mapper.js';
import {linkDropdown} from './../../dropdown_handler.js';
import {updateSkills, updateAbilities} from './../../display_stat_updater.js';
import * as inventory_builder from './inventory_builder.js';

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

let socket = null;
let class_data;
export function setSocket(io) {
    socket = io;
    buildCharacterBackground();
}

function buildCharacterBackground() {
    const background_name = getBackgroundName();

    const background_options = [...document.querySelector(".background-options").children];
    const head = document.querySelector(".background-selector");
    background_options.forEach((option) => {
        option.addEventListener("click", function() {clickEvent(option, head)})
    });

    if (background_name !== null) {
        document.querySelector('.selected-background').textContent = class_name;
    } else {
        document.querySelector('.selected-background').textContent = 'Select Background';
    }
}

function clickEvent(option, head) {
    head.querySelector('.selected-background').textContent = option.textContent;
    setBackground(option.textContent);
    character_data_handler.setBackgroundSkills(getBackgroundData().skills);
    updateSkills();
}