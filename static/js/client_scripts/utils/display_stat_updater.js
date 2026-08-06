import {calculateSkills} from './character_sheet/calculators/skill_calculator.js';
import {calculateAbilities} from './character_sheet/calculators/ability_calculator.js';
import { getCharacterSkills } from './character_sheet/character_data_handler.js';
import { getRace, getRaceName } from './character_sheet/mappers/race_mapper.js';
import { getClassName } from './character_sheet/mappers/class_mapper.js';
import { bus, EVENTS } from './event_bus.js';

let socket = null;
export function setSocket(io) {
    socket = io;
    socket.on('update_display_data', function() {updateAbilities(); updateSkills();})
}

const update_abilities_subscribe_events = [EVENTS.ABILITY_CHANGED, 
    EVENTS.LEVEL_UPDATED, EVENTS.CLASS_CHANGED];

const update_skills_subscribe_events = [EVENTS.ABILITY_CHANGED, 
    EVENTS.LEVEL_UPDATED, EVENTS.CLASS_CHANGED];

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
    bus.subscribeToEvents(update_abilities_subscribe_events, updateAbilities);
    bus.subscribeToEvents(update_skills_subscribe_events, updateSkills);
    
});

export function updateAbilities() {
    if(getRace() == null || getRace() == undefined || getClassName() == null || getClassName() == undefined) {
        return;
    }
    let str_mod = document.querySelector('.strength-modifier-usable');
    let dex_mod = document.querySelector('.dexterity-modifier-usable');
    let con_mod = document.querySelector('.constitution-modifier-usable');
    let int_mod = document.querySelector('.intelligence-modifier-usable');
    let wis_mod = document.querySelector('.wisdom-modifier-usable');
    let cha_mod = document.querySelector('.charisma-modifier-usable');

    const [str_num, dex_num, con_num, int_num, wis_num, cha_num] = calculateAbilities();
    setModText(str_mod, str_num);
    setModText(dex_mod, dex_num);
    setModText(con_mod, con_num);
    setModText(int_mod, int_num);
    setModText(wis_mod, wis_num);
    setModText(cha_mod, cha_num);

}

export function updateSkills() {
    if(getRace() == null || getRace() == undefined || getClassName() == null || getClassName() == undefined) {
        return;
    }
    calculateSkills();
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

    const character_skills = getCharacterSkills();

    athletics.textContent = signNumber(character_skills["athletics"]);
    acrobatics.textContent = signNumber(character_skills["acrobatics"]);
    sleight.textContent = signNumber(character_skills["sleight_of_hand"]);
    stealth.textContent = signNumber(character_skills["stealth"]);
    arcana.textContent = signNumber(character_skills["arcana"]);
    history.textContent = signNumber(character_skills["history"]);
    investigation.textContent = signNumber(character_skills["investigation"]);
    nature.textContent = signNumber(character_skills["nature"]);
    religion.textContent = signNumber(character_skills["religion"]);
    animal_handling.textContent = signNumber(character_skills["animal_handling"]);
    insight.textContent = signNumber(character_skills["insight"]);
    medicine.textContent = signNumber(character_skills["medicine"]);
    perception.textContent = signNumber(character_skills["perception"]);
    survival.textContent = signNumber(character_skills["survival"]);
    deception.textContent = signNumber(character_skills["deception"]);
    intimidation.textContent = signNumber(character_skills["intimidation"]);
    performance.textContent = signNumber(character_skills["performance"]);
    persuasion.textContent = signNumber(character_skills["persuasion"]);
}

function calculateModifier(i) {
    const num = i.value;
    const new_num = Math.floor((parseInt(num) - 10) / 2);
    return new_num;
}

function signNumber(num) {
    if(num >= 0) {
        return "+" + num.toString();
    } else {
        const positive_num = Math.abs(num);
        return "-" + positive_num.toString();
    }
}

function setModText(mod, num) {

    mod.textContent = signNumber(num);
}