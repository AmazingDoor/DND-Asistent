import { saveRaceSkills } from "../../../save_handler.js";
import { setRaceSkills } from "../mappers/race_mapper.js";
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

let socket = null;

export function setSocket(io) {
    socket = io;
}

export function addEventListeners(head, updateSkills) {
    const options = [...head.querySelector('.skill-options').children];
    options.forEach((option) => {
        option.addEventListener("click", async function() {clickListener(head, option, updateSkills);});
    });
}

async function clickListener(head, option, updateSkills) {
    head.querySelector('p').textContent = option.textContent;
    const selected_skills = head.parentElement.querySelectorAll('.selected-skill');
    let txts = [];
    selected_skills.forEach((skill) => {txts.push(skill.textContent);});
    setRaceSkills(txts);
    updateSkills();
    await saveRaceSkills();
}