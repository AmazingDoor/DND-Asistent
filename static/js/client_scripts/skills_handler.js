import {getInputs} from './ability_handler.js';
import {loadPlayerClass, getSkills, getSavingThrows} from './class_stats_handler.js';
import {calculateSkills, calculateModifier} from './utils/skills_handler/skill_calculator.js';
import {addEventListeners} from './utils/skills_handler/event_listener_handler.js';
let socket = null;

export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", () => {
    addSkillsEventListeners();
    socket.on('load_player_class', (data) => {
        loadPlayerClass(data, updateSkills);
    });

});

function addSkillsEventListeners() {
    addEventListeners(updateSkills);
    const [str_input, dex_input, con_input, int_input, wis_input, cha_input] = getInputs();
    str_input.addEventListener('change', function() {updateSkills();});
    dex_input.addEventListener('change', function() {updateSkills();});
    con_input.addEventListener('change', function() {updateSkills();});
    int_input.addEventListener('change', function() {updateSkills();});
    wis_input.addEventListener('change', function() {updateSkills();});
    cha_input.addEventListener('change', function() {updateSkills();});

}



function updateSkills() {
    const skills = getSkills();
    const proficiencies = getSavingThrows();

    let str_mod = calculateModifier(document.querySelector('#strength-input').value);
    let dex_mod = calculateModifier(document.querySelector('#dexterity-input').value);
    let con_mod = calculateModifier(document.querySelector('#constitution-input').value);
    let int_mod = calculateModifier(document.querySelector('#intelligence-input').value);
    let wis_mod = calculateModifier(document.querySelector('#wisdom-input').value);
    let cha_mod = calculateModifier(document.querySelector('#charisma-input').value);

    const [athletics_skill, acrobatics_skill, sleight_of_hand_skill, stealth_skill, arcana_skill,
    history_skill, investigation_skill, nature_skill, religion_skill, animal_handling_skill,
    insight_skill, medicine_skill, perception_skill, survival_skill, deception_skill, intimidation_skill, performance_skill,
    persuasion_skill] = calculateSkills(skills, proficiencies);

    const athletics = document.querySelector("#athletics-num");
    const acrobatics = document.querySelector("#acrobatics-num");
    const sleight = document.querySelector("#sleight-num");
    const stealth = document.querySelector("#stealth-num");
    const arcana = document.querySelector("#arcana-num");
    const history = document.querySelector("#history-num");
    const investigation = document.querySelector("#investigation-num");
    const nature = document.querySelector("#nature-num");
    const religion = document.querySelector("#religion-num");
    const animal_handling = document.querySelector("#animal-handling-num");
    const insight = document.querySelector("#insight-num");
    const medicine = document.querySelector("#medicine-num");
    const perception = document.querySelector("#perception-num");
    const survival = document.querySelector("#survival-num");
    const deception = document.querySelector("#deception-num");
    const intimidation = document.querySelector("#intimidation-num");
    const performance = document.querySelector("#performance-num");
    const persuasion = document.querySelector("#persuasion-num");

    athletics.textContent = (str_mod + athletics_skill).toString();
    acrobatics.textContent = (dex_mod + acrobatics_skill).toString();
    sleight.textContent = (dex_mod + sleight_of_hand_skill).toString();
    stealth.textContent = (dex_mod + stealth_skill).toString();
    arcana.textContent = (int_mod + arcana_skill).toString();
    history.textContent = (int_mod + history_skill).toString();
    investigation.textContent = (int_mod + investigation_skill).toString();
    nature.textContent = (int_mod + nature_skill).toString();
    religion.textContent = (int_mod + religion_skill).toString();
    animal_handling.textContent = (wis_mod + animal_handling_skill).toString();
    insight.textContent = (wis_mod + insight_skill).toString();
    medicine.textContent = (wis_mod + medicine_skill).toString();
    perception.textContent = (wis_mod + perception_skill).toString();
    survival.textContent = (wis_mod + survival_skill).toString();
    deception.textContent = (cha_mod + deception_skill).toString();
    intimidation.textContent = (cha_mod + intimidation_skill).toString();
    performance.textContent = (cha_mod + performance_skill).toString();
    persuasion.textContent = (cha_mod + persuasion_skill).toString();
}

