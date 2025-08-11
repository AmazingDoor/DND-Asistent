import {getSkills, getSavingThrows} from './class_stats_handler.js';
import {addEventListeners, getInputs} from './ability_handler.js';
import {addEventListeners as addClassStatsEventListeners, loadPlayerClass} from './class_stats_handler.js';

let socket = null;

export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", () => {
    addSkillsEventListeners();
    addClassStatsEventListeners(updateSkills);
    socket.on('load_player_class', (data) => {
        loadPlayerClass(data, updateSkills);
    });

});

function addSkillsEventListeners() {
    addEventListeners();
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
    const player_level_mod_num = 1;

    let str_mod = parseInt(document.querySelector('.strength-modifier').textContent.replace('(', '').replace(')', ''));
    let dex_mod = parseInt(document.querySelector('.dexterity-modifier').textContent.replace('(', '').replace(')', ''));
    let con_mod = parseInt(document.querySelector('.constitution-modifier').textContent.replace('(', '').replace(')', ''));
    let int_mod = parseInt(document.querySelector('.intelligence-modifier').textContent.replace('(', '').replace(')', ''));
    let wis_mod = parseInt(document.querySelector('.wisdom-modifier').textContent.replace('(', '').replace(')', ''));
    let cha_mod = parseInt(document.querySelector('.charisma-modifier').textContent.replace('(', '').replace(')', ''));

    let athletics_skill = 0,
    acrobatics_skill = 0,
    sleight_of_hand_skill = 0,
    stealth_skill = 0,
    arcana_skill = 0,
    history_skill = 0,
    investigation_skill = 0,
    nature_skill = 0,
    religion_skill = 0,
    animal_handling_skill = 0,
    insight_skill = 0,
    medicine_skill = 0,
    perception_skill = 0,
    survival_skill = 0,
    deception_skill = 0,
    intimidation_skill = 0,
    performance_skill = 0,
    persuasion_skill = 0;

    if (skills.length > 0) {
        skills.forEach(skill => {
            switch(skill) {
                case "Athletics":
                    athletics_skill = player_level_mod_num;
                    break;
                case "Acrobatics":
                    acrobatics_skill = player_level_mod_num;
                    break;
                case "Sleight of Hand":
                    sleight_of_hand_skill = player_level_mod_num;
                    break;
                case "Stealth":
                    stealth_skill = player_level_mod_num;
                    break;
                case "Constitution":
                    constitution_skill = player_level_mod_num;
                    break;
                case "Arcana":
                    arcana_skill = player_level_mod_num;
                    break;
                case "History":
                    history_skill = player_level_mod_num;
                    break;
                case "Investigation":
                    investigation_skill = player_level_mod_num;
                    break;
                case "Nature":
                    nature_skill = player_level_mod_num;
                    break;
                case "Religion":
                    religion_skill = player_level_mod_num;
                    break;
                case "Animal Handling":
                    animal_handling_skill = player_level_mod_num;
                    break;
                case "Insight":
                    insight_skill = player_level_mod_num;
                    break;
                case "Medicine":
                    medicine_skill = player_level_mod_num;
                    break;
                case "Perception":
                    perception_skill = player_level_mod_num;
                    break;
                case "Survival":
                    survival_skill = player_level_mod_num;
                    break;
                case "Deception":
                    deception_skill = player_level_mod_num;
                    break;
                case "Intimidation":
                    intimidation_skill = player_level_mod_num;
                    break;
                case "Performance":
                    perception_skill = player_level_mod_num;
                    break;
                case "Persuasion":
                    persuasion_skill = player_level_mod_num;
                    break;
                default:
                break;
            }
        });
    }

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

