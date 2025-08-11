let socket = null;

export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function addClassSkillEventListeners(updateSkills, getSkills) {
    const skills_container = document.querySelector('.class-skills-div');
    const skill_heads = skills_container.querySelectorAll('.dropdown-head') || [];
    skill_heads.forEach((skill_head) => {
        const skill_options = skill_head.querySelectorAll('.skill-option');
        skill_options.forEach((option) => {
            option.addEventListener('click', function () {
                changeHeadText(skill_head, option);
                updateSkills();
                const skills = getSkills();
                const skill_array = [skills.length, skills];
                socket.emit('save_player_skills', {skills: skill_array, char_id: char_id});
            });
        });
    });
}

function changeHeadText(head, option) {
    head.querySelector("p").textContent = option.textContent;
}