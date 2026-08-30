import * as character_data_handler from "./../character_data_handler.js";
import {getProficiencyBonus} from "./../../../player_level_handler.js";
import { getRaceAbilities, getRaceSkills, getSavedRaceSkills } from "../mappers/race_mapper.js";
import { getClassSkillNames } from "../mappers/class_mapper.js";

let abilities = {};

export function calculateSkills() {
    const class_skills = getClassSkillNames();
    const race_skills_main = getRaceSkills();
    const background_skills = character_data_handler.getBackgroundSkills();


    let race_skills = [...race_skills_main];

    if(race_skills === undefined) {
        race_skills = [];
    }

    //let chosen_skill_objects = [...document.querySelectorAll('.selected-skill')];
    let chosen_skills = getSavedRaceSkills();

    race_skills = race_skills.concat(chosen_skills);

    if (class_skills === undefined) {
        class_skills = [];
    }
    if (race_skills.length > 0) {
        race_skills.forEach((skill) => {
            if (class_skills.includes(skill)) {
                race_skills = race_skills.filter(s => s !== skill && s !== "Any" && s !== "Select Skill");
            }
        });
    }

    if(background_skills.length > 0) {
        background_skills.forEach((skill) => {
            if(class_skills.includes(skill)) {
                background_skills = background_skills.filter(s => s !== skill);
            }
        });
    }

    if(background_skills.length > 0) {
        background_skills.forEach((skill) => {
            if(race_skills.includes(skill)) {
                background_skills = background_skills.filter(s => s !== skill);
            }
        });
    }
    const all_skills = class_skills.concat(race_skills).concat(background_skills);
    const player_level_mod_num = getProficiencyBonus();

    abilities = character_data_handler.getCharacterAbilityModifiers();


    let athletics_skill = abilities["str"],
    acrobatics_skill = abilities["dex"],
    sleight_of_hand_skill = abilities["dex"],
    stealth_skill = abilities["dex"],
    arcana_skill = abilities["int"],
    history_skill = abilities["int"],
    investigation_skill = abilities["int"],
    nature_skill = abilities["int"],
    religion_skill = abilities["int"],
    animal_handling_skill = abilities["wis"],
    insight_skill = abilities["wis"],
    medicine_skill = abilities["wis"],
    perception_skill = abilities["wis"],
    survival_skill = abilities["wis"],
    deception_skill = abilities["cha"],
    intimidation_skill = abilities["cha"],
    performance_skill = abilities["cha"],
    persuasion_skill = abilities["cha"];


    if (all_skills.length > 0) {
        all_skills.forEach(skill => {
            switch(skill) {
                case "Athletics":
                    athletics_skill += player_level_mod_num;
                    break;
                case "Acrobatics":
                    acrobatics_skill += player_level_mod_num;
                    break;
                case "Sleight of Hand":
                    sleight_of_hand_skill += player_level_mod_num;
                    break;
                case "Stealth":
                    stealth_skill += player_level_mod_num;
                    break;
                case "Arcana":
                    arcana_skill += player_level_mod_num;
                    break;
                case "History":
                    history_skill += player_level_mod_num;
                    break;
                case "Investigation":
                    investigation_skill += player_level_mod_num;
                    break;
                case "Nature":
                    nature_skill += player_level_mod_num;
                    break;
                case "Religion":
                    religion_skill += player_level_mod_num;
                    break;
                case "Animal Handling":
                    animal_handling_skill += player_level_mod_num;
                    break;
                case "Insight":
                    insight_skill += player_level_mod_num;
                    break;
                case "Medicine":
                    medicine_skill += player_level_mod_num;
                    break;
                case "Perception":
                    perception_skill += player_level_mod_num;
                    break;
                case "Survival":
                    survival_skill += player_level_mod_num;
                    break;
                case "Deception":
                    deception_skill += player_level_mod_num;
                    break;
                case "Intimidation":
                    intimidation_skill += player_level_mod_num;
                    break;
                case "Performance":
                    perception_skill += player_level_mod_num;
                    break;
                case "Persuasion":
                    persuasion_skill += player_level_mod_num;
                    break;
                default:
                break;
            }
        });
    }

    character_data_handler.setCharacterSkills([athletics_skill, acrobatics_skill, sleight_of_hand_skill, stealth_skill, arcana_skill,
    history_skill, investigation_skill, nature_skill, religion_skill, animal_handling_skill,
    insight_skill, medicine_skill, perception_skill, survival_skill, deception_skill, intimidation_skill, performance_skill,
    persuasion_skill]);
}

function addModifier(num, ability_name) {
    if(ability_name in abilities) {
        return num + abilities[ability_name];
    }
    return num;
}