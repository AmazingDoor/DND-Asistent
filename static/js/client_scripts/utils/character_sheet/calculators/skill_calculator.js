import * as character_data_handler from "./../character_data_handler.js";
import {getProficiencyBonus} from "./../../../player_level_handler.js";

export function calculateSkills() {
    const class_skills = character_data_handler.getClassSkillNames();
    const race_skills_main = character_data_handler.getRaceSkillNames();
    let race_skills = [...race_skills_main];

    if(race_skills === undefined) {
        race_skills = [];
    }

    let chosen_skill_objects = [...document.querySelectorAll('.selected-skill')];
    let chosen_skills = [];
    chosen_skill_objects.forEach((o) => {
        const txt = o.textContent;
        if (txt !== "Select Skill") {
            chosen_skills.push(txt);
        }
    });
    race_skills = race_skills.concat(chosen_skills);

    if (class_skills === undefined) {
        class_skills = [];
    }
    if (race_skills.length > 0) {
        race_skills.forEach((skill) => {
            if (class_skills.includes(skill)) {
                race_skills = race_skills.filter(s => s !== skill && s !== "Any");
            }
        });
    }
    const all_skills = class_skills.concat(race_skills);
    const player_level_mod_num = getProficiencyBonus();

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

    if (all_skills.length > 0) {
        all_skills.forEach(skill => {
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

    return [athletics_skill, acrobatics_skill, sleight_of_hand_skill, stealth_skill, arcana_skill,
    history_skill, investigation_skill, nature_skill, religion_skill, animal_handling_skill,
    insight_skill, medicine_skill, perception_skill, survival_skill, deception_skill, intimidation_skill, performance_skill,
    persuasion_skill];
}