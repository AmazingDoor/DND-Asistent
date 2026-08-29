import {updateAbilities} from './../../display_stat_updater.js';
import {setRaceAbilities, ABILITIES, setSavedAbility } from '../mappers/race_mapper.js';
import { saveRaceAbilities } from '../../../save_handler.js';
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

let socket = null;

export function setSocket(io) {
    socket = io;
}

export function addEventListeners(head, index, mod_num) {
    const options = [...head.querySelector('.ability-options').children];
    options.forEach((option) => {
        option.addEventListener("click", function() {clickListener(head, option, index, mod_num);});
    });
}

async function clickListener(head, option, index, mod_num) {
    head.querySelector('p').textContent = option.textContent;
    const data = {[option.textContent]: mod_num};
    setSavedAbility(index, data);
    const selected_abilities = head.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll('.selected-ability');
    let abilities = {};
    selected_abilities.forEach((ability) => {
        const row = ability.parentElement.parentElement.parentElement;
        const table_datas = row.querySelectorAll('td');
        const mod_num = parseInt(table_datas[1].textContent.replace("+", ""));
        abilities[ability.textContent] = mod_num;
    });
    setRaceAbilities(abilities);
    updateAbilities();
    await saveRaceAbilities();
}

