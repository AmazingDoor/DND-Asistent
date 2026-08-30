import {linkDropdown} from './../../dropdown_handler.js';
import {addEventListeners} from './../dropdown_handlers/race_ability_dropdown_handler.js';
export function createAbilityDropdown(parent_element, saved_abilities, i, mod_num) {
    const head = document.createElement('div');
    head.classList.add('ability-selector');
    head.classList.add('dropdown-head');
    let text_string = "Select Ability";
    head.innerHTML = `
    <p class="selected-ability">Select Ability</p>
    <div class="dropdown">
        <div class="ability-options dropdown-content hidden">
            <div>Strength</div>
            <div>Dexterity</div>
            <div>Constitution</div>
            <div>Intelligence</div>
            <div>Wisdom</div>
            <div>Charisma</div>
        </div>
    </div>`;

    if(i < saved_abilities.length) {
        const [key, value] = Object.entries(saved_abilities[i])[0];

        const ability_name = key;

        const txt = head.querySelector('.selected-ability');
        txt.textContent = ability_name;
    }

    parent_element.appendChild(head);
    linkDropdown(head);
    addEventListeners(head, i, mod_num);
}