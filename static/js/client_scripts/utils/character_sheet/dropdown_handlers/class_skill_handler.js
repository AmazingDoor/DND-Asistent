import { savePlayerSkills } from '../../../save_handler.js';
import { getClassSkills } from '../mappers/class_mapper.js';
import {updateSkills, updateAbilities} from './../../display_stat_updater.js';

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export async function addClassSkillEventListeners(socket, setSkills) {
    const skills_container = document.querySelector('.class-skills-div');
    const skill_heads = skills_container.querySelectorAll('.dropdown-head') || [];
    skill_heads.forEach((skill_head) => {
        const skill_options = skill_head.querySelectorAll('.skill-option');
        skill_options.forEach((option) => {
            option.addEventListener('click', async function() {
                changeHeadText(skill_head, option);
                setSkills();
                const skills = getClassSkills();
                updateSkills();
                updateAbilities();
                await savePlayerSkills();
            });
        });
    });
}

function changeHeadText(head, option) {
    head.querySelector("p").textContent = option.textContent;
}