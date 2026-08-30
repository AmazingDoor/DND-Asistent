import { saveRaceSkills } from "../../../save_handler.js";
import { setRaceSavedSkill, setRaceSkills } from "../mappers/race_mapper.js";
import { bus, EVENTS } from "../../event_bus.js";
document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

let socket = null;

export function setSocket(io) {
    socket = io;
}

export function addEventListeners(head, updateSkills, i) {
    const options = [...head.querySelector('.skill-options').children];
    options.forEach((option) => {
        option.addEventListener("click", async function() {clickListener(head, option, updateSkills, i);});
    });
}

async function clickListener(head, option, updateSkills, i) {
    head.querySelector('p').textContent = option.textContent;
    const selected_skills = head.parentElement.querySelectorAll('.selected-skill');
    setRaceSavedSkill(i, option.textContent);
    updateSkills();
    await saveRaceSkills();
    bus.publish(EVENTS.RACE_SKILL_SELECTED);
}