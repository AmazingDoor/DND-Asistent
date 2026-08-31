import {updateAbilities} from './../../display_stat_updater.js';
import {setRaceAbilities, setSavedAbility, getRaceAbilities } from '../mappers/race_mapper.js';
import { ABILITIES } from '../../../../shared/data_enums.js';
import { saveRaceAbilities } from '../../../save_handler.js';
import { bus, EVENTS } from '../../event_bus.js';

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

    updateAbilities();
    await saveRaceAbilities();
    bus.publish(EVENTS.RACE_ABILITY_SELECTED);
}

