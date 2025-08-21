import {linkDropdown} from './../../dropdown_handler.js';
import {addEventListeners} from './../dropdown_handlers/race_skill_dropdown_handler.js';
import {updateSkills} from './../../display_stat_updater.js';
export function createSkillDropdown(parent_element, saved_skills, i) {
    const head = document.createElement('div');
    head.classList.add('skill-selector');
    head.classList.add('dropdown-head');
    head.innerHTML = `
        <p class="selected-skill">Select Skill</p>
        <div class="dropdown">
            <div class="skill-options dropdown-content hidden">
                <div>Athletics</div>
                <div>Acrobatics</div>
                <div>Sleight of Hand</div>
                <div>Stealth</div>
                <div>Arcana</div>
                <div>History</div>
                <div>Investigation</div>
                <div>Nature</div>
                <div>Religion</div>
                <div>Animal Handling</div>
                <div>Insight</div>
                <div>Medicine</div>
                <div>Perception</div>
                <div>Survival</div>
                <div>Deception</div>
                <div>Intimidation</div>
                <div>Performance</div>
                <div>Persuasion</div>
            </div>
        </div>`;

    if (i < saved_skills.length) {
        head.querySelector('.selected-skill').textContent = saved_skills[i];
    }
    parent_element.appendChild(head);
    linkDropdown(head);
    addEventListeners(head, updateSkills);
}