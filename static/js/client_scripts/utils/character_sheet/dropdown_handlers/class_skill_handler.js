import * as character_data_handler from './../character_data_handler.js';

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function addClassSkillEventListeners(socket, setSkills) {
    const skills_container = document.querySelector('.class-skills-div');
    const skill_heads = skills_container.querySelectorAll('.dropdown-head') || [];
    skill_heads.forEach((skill_head) => {
        const skill_options = skill_head.querySelectorAll('.skill-option');
        skill_options.forEach((option) => {
            option.addEventListener('click', function() {
                changeHeadText(skill_head, option);
                setSkills();
                const skills = character_data_handler.getClassSkills();
                socket.emit('save_player_skills', {skills: skills, char_id: char_id});
            });
        });
    });
}

function changeHeadText(head, option) {
    head.querySelector("p").textContent = option.textContent;
}