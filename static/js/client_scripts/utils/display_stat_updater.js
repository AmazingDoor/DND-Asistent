import {calculateSkills} from './character_sheet/calculators/skill_calculator.js';
import {calculateAbilities} from './character_sheet/calculators/ability_calculator.js';

let socket = null;
export function setSocket(io) {
    socket = io;
    socket.on('update_display_data', function() {updateAbilities(); updateSkills();})
}


document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

export function updateAbilities() {
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

    let str_mod = calculateModifier(document.querySelector('#strength-input'));
    let dex_mod = calculateModifier(document.querySelector('#dexterity-input'));
    let con_mod = calculateModifier(document.querySelector('#constitution-input'));
    let int_mod = calculateModifier(document.querySelector('#intelligence-input'));
    let wis_mod = calculateModifier(document.querySelector('#wisdom-input'));
    let cha_mod = calculateModifier(document.querySelector('#charisma-input'));

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

    const [athletics_skill, acrobatics_skill, sleight_of_hand_skill, stealth_skill, arcana_skill,
    history_skill, investigation_skill, nature_skill, religion_skill, animal_handling_skill,
    insight_skill, medicine_skill, perception_skill, survival_skill, deception_skill, intimidation_skill, performance_skill,
    persuasion_skill] = calculateSkills();

    athletics.textContent = signNumber(str_mod + athletics_skill);
    acrobatics.textContent = signNumber(dex_mod + acrobatics_skill);
    sleight.textContent = signNumber(dex_mod + sleight_of_hand_skill);
    stealth.textContent = signNumber(dex_mod + stealth_skill);
    arcana.textContent = signNumber(int_mod + arcana_skill);
    history.textContent = signNumber(int_mod + history_skill);
    investigation.textContent = signNumber(int_mod + investigation_skill);
    nature.textContent = signNumber(int_mod + nature_skill);
    religion.textContent = signNumber(int_mod + religion_skill);
    animal_handling.textContent = signNumber(wis_mod + animal_handling_skill);
    insight.textContent = signNumber(wis_mod + insight_skill);
    medicine.textContent = signNumber(wis_mod + medicine_skill);
    perception.textContent = signNumber(wis_mod + perception_skill);
    survival.textContent = signNumber(wis_mod + survival_skill);
    deception.textContent = signNumber(cha_mod + deception_skill);
    intimidation.textContent = signNumber(cha_mod + intimidation_skill);
    performance.textContent = signNumber(cha_mod + performance_skill);
    persuasion.textContent = signNumber(cha_mod + persuasion_skill);
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