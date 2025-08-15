import {linkDropdown} from './../dropdown_handler.js';
export function createLanguageDropdown(parent_element) {
    const head = document.createElement('div');
    head.classList.add('language-selector');
    head.classList.add('dropdown-head');
    head.innerHTML = `
    <p class="selected-language">Select Language</p>
    <div class="dropdown">
        <div class="language-options dropdown-content hidden">
            <div>Common</div>
            <div>Language2</div>
        </div>
    </div>`;
    parent_element.appendChild(head);
    linkDropdown(head);
}