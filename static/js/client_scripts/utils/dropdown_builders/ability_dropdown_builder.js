import {linkDropdown} from './../dropdown_handler.js';
import {addEventListeners} from './../race/race_ability_dropdown_handler.js';

export function createAbilityDropdown(parent_element, updateModifiers) {
    const head = document.createElement('div');
    head.classList.add('ability-selector');
    head.classList.add('dropdown-head');
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
    parent_element.appendChild(head);
    linkDropdown(head);
    addEventListeners(head, updateModifiers);
}