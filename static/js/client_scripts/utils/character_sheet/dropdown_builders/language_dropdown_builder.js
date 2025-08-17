import {linkDropdown} from './../dropdown_handler.js';
import {addEventListeners as addLanguageEventListeners} from './../race/race_language_dropdown.js';
export function createLanguageDropdown(parent_element) {
    const head = document.createElement('div');
    head.classList.add('language-selector');
    head.classList.add('dropdown-head');
    head.innerHTML = `
    <p class="selected-language">Select Language</p>
    <div class="dropdown">
        <div class="language-options dropdown-content hidden">
            <div>Common</div>
            <div>Dwarvish</div>
            <div>Elvish</div>
            <div>Giant</div>
            <div>Gnomish</div>
            <div>Goblin</div>
            <div>Halfling</div>
            <div>Orc</div>
            <div>Abyssal</div>
            <div>Celestial</div>
            <div>Draconic</div>
            <div>Deep Speech</div>
            <div>Infernal</div>
            <div>Primordial</div>
            <div>Sylvan</div>
            <div>Undercommon</div>

        </div>
    </div>`;
    parent_element.appendChild(head);
    linkDropdown(head);
    addLanguageEventListeners(head);
}