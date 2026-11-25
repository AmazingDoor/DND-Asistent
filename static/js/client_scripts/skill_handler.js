import { ABILITIES, SKILLS } from "../shared/data_enums.js";

export class SkillHandler {
    constructor(socket, classes_handler, race_handler, ability_handler) {
        this.socket = socket;
        this.classes_handler = classes_handler;
        this.race_handler = race_handler;
        this.ability_handler = ability_handler;

        this.athletics_skill = 0;
        this.acrobatics_skill = 0;
        this.sleight_of_hand_skill = 0;
        this.stealth_skill = 0;
        this.arcana_skill = 0;
        this.history_skill = 0;
        this.investigation_skill = 0;
        this.nature_skill = 0;
        this.religion_skill = 0;
        this.animal_handling_skill = 0;
        this.insight_skill = 0;
        this.medicine_skill = 0;
        this.perception_skill = 0;
        this.survival_skill = 0;
        this.deception_skill = 0;
        this.intimidation_skill = 0;
        this.performance_skill = 0;
        this.persuasion_skill = 0;
    }

    calculateSkills() {
        const class_skills = this.classes_handler.getFilteredSkills();
        const race_skills = this.race_handler.skills.filter((skill) => skill != SKILLS.OPTION);
        const all_skills = [...new Set([...class_skills, ...race_skills])];
        const prof_bonus = this.classes_handler.getProficiencyBonus();
        const abilities = this.ability_handler.getAbilityModifiers();

        this.athletics_skill = abilities[ABILITIES.STR];
        this.acrobatics_skill = abilities[ABILITIES.DEX];
        this.sleight_of_hand_skill = abilities[ABILITIES.DEX];
        this.stealth_skill = abilities[ABILITIES.DEX];
        this.arcana_skill = abilities[ABILITIES.INT];
        this.history_skill = abilities[ABILITIES.INT];
        this.investigation_skill = abilities[ABILITIES.INT];
        this.nature_skill = abilities[ABILITIES.INT];
        this.religion_skill = abilities[ABILITIES.INT];
        this.animal_handling_skill = abilities[ABILITIES.WIS];
        this.insight_skill = abilities[ABILITIES.WIS];
        this.medicine_skill = abilities[ABILITIES.WIS];
        this.perception_skill = abilities[ABILITIES.WIS];
        this.survival_skill = abilities[ABILITIES.CHA];
        this.deception_skill = abilities[ABILITIES.CHA];
        this.intimidation_skill = abilities[ABILITIES.CHA];
        this.performance_skill = abilities[ABILITIES.CHA];
        this.persuasion_skill = abilities[ABILITIES.CHA];

        all_skills.forEach((skill) => {
            switch(skill) {
                case SKILLS.ATHLETICS:
                    this.athletics_skill += prof_bonus;
                    break;
                case SKILLS.ACROBATICS:
                    this.acrobatics_skill += prof_bonus;
                    break;
                case SKILLS.SLEIGHT_OF_HAND:
                    this.sleight_of_hand_skill += prof_bonus;
                    break;
                case SKILLS.STEALTH:
                    this.stealth_skill += prof_bonus;
                    break;
                case SKILLS.ARCANA:
                    this.arcana_skill += prof_bonus;
                    break;
                case SKILLS.HISTORY:
                    this.history_skill += prof_bonus;
                    break;
                case SKILLS.INVESTIGATION:
                    this.investigation_skill += prof_bonus;
                    break;
                case SKILLS.NATURE:
                    this.nature_skill += prof_bonus;
                    break;
                case SKILLS.RELIGION:
                    this.religion_skill += prof_bonus;
                    break;
                case SKILLS.ANIMAL_HANDLING:
                    this.animal_handling_skill += prof_bonus;
                    break;
                case SKILLS.INSIGHT:
                    this.insight_skill += prof_bonus;
                    break;
                case SKILLS.MEDICINE:
                    this.medicine_skill += prof_bonus;
                    break;
                case SKILLS.PERCEPTION:
                    this.perception_skill += prof_bonus;
                    break;
                case SKILLS.SURVIVAL:
                    this.survival_skill += prof_bonus;
                    break;
                case SKILLS.DECEPTION:
                    this.deception_skill += prof_bonus;
                    break;
                case SKILLS.INTIMIDATION:
                    this.intimidation_skill += prof_bonus;
                    break;
                case SKILLS.PERFORMANCE:
                    this.performance_skill += prof_bonus;
                    break;
                case SKILLS.PERSUASION:
                    this.persuasion_skill += prof_bonus;
                    break;
                default:
                    break;
            }
        });
    }
}