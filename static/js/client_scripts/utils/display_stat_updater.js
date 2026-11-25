import {calculateSkills} from './character_sheet/calculators/skill_calculator.js';
import {calculateAbilities} from './character_sheet/calculators/ability_calculator.js';
import { getCharacterSkills } from './character_sheet/character_data_handler.js';
import { getRace, getRaceName } from './character_sheet/mappers/race_mapper.js';
import { getClassName } from './character_sheet/mappers/class_mapper.js';
import { bus, EVENTS } from './event_bus.js';
import { ABILITIES, RACES } from '../../shared/data_enums.js';


export class DisplayStatHandler {
    constructor(socket, client) {
        this.socket = socket;
        this.client = client;
        this.ability_handler = client.ability_handler;
        this.skill_handler = client.skill_handler;
        this.classes_handler = client.classes_handler;
        this.race_handler = client.race_handler;

        const update_abilities_subscribe_events = [EVENTS.ABILITY_CHANGED, 
        EVENTS.LEVEL_UPDATED, EVENTS.CLASS_CHANGED, EVENTS.RACE_CHANGED];

        const update_skills_subscribe_events = [EVENTS.ABILITY_CHANGED, 
        EVENTS.LEVEL_UPDATED, EVENTS.CLASS_CHANGED, EVENTS.RACE_CHANGED];
        
        bus.subscribeToEvents(update_abilities_subscribe_events, () => {this.updateAbilities()});
        bus.subscribeToEvents(update_skills_subscribe_events, () => {this.updateSkills()});


    }

    Initialize() {
        this.updateAbilities();
        this.updateSkills();
    }

    updateAbilities() {
        if(this.classes_handler.getClassIDs.length <= 0 && this.race_handler.race_id == RACES.OPTION) {return;}
        let str_mod = document.querySelector('.strength-modifier-usable');
        let dex_mod = document.querySelector('.dexterity-modifier-usable');
        let con_mod = document.querySelector('.constitution-modifier-usable');
        let int_mod = document.querySelector('.intelligence-modifier-usable');
        let wis_mod = document.querySelector('.wisdom-modifier-usable');
        let cha_mod = document.querySelector('.charisma-modifier-usable');

        const saving_throw_dict = this.ability_handler.getCharacterSavingThrowModifiers();
        this.setModText(str_mod, saving_throw_dict[ABILITIES.STR]);
        this.setModText(dex_mod, saving_throw_dict[ABILITIES.DEX]);
        this.setModText(con_mod, saving_throw_dict[ABILITIES.CON]);
        this.setModText(int_mod, saving_throw_dict[ABILITIES.INT]);
        this.setModText(wis_mod, saving_throw_dict[ABILITIES.WIS]);
        this.setModText(cha_mod, saving_throw_dict[ABILITIES.CHA]);

    }

    updateSkills() {
        if(this.classes_handler.getClassIDs.length <= 0 && this.race_handler.race_id == RACES.OPTION) {return;}
        this.skill_handler.calculateSkills();
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

        athletics.textContent = this.signNumber(this.skill_handler.athletics_skill);
        acrobatics.textContent = this.signNumber(this.skill_handler.acrobatics_skill);
        sleight.textContent = this.signNumber(this.skill_handler.sleight_of_hand_skill);
        stealth.textContent = this.signNumber(this.skill_handler.stealth_skill);
        arcana.textContent = this.signNumber(this.skill_handler.arcana_skill);
        history.textContent = this.signNumber(this.skill_handler.history_skill);
        investigation.textContent = this.signNumber(this.skill_handler.investigation_skill);
        nature.textContent = this.signNumber(this.skill_handler.nature_skill);
        religion.textContent = this.signNumber(this.skill_handler.religion_skill);
        animal_handling.textContent = this.signNumber(this.skill_handler.animal_handling_skill);
        insight.textContent = this.signNumber(this.skill_handler.insight_skill);
        medicine.textContent = this.signNumber(this.skill_handler.medicine_skill);
        perception.textContent = this.signNumber(this.skill_handler.perception_skill);
        survival.textContent = this.signNumber(this.skill_handler.survival_skill);
        deception.textContent = this.signNumber(this.skill_handler.deception_skill);
        intimidation.textContent = this.signNumber(this.skill_handler.intimidation_skill);
        performance.textContent = this.signNumber(this.skill_handler.performance_skill);
        persuasion.textContent = this.signNumber(this.skill_handler.persuasion_skill);
        console.log(this.skill_handler);
        console.log(this.signNumber(this.skill_handler.athletics));
    }

    signNumber(num) {
        if(num >= 0) {
            return "+" + num.toString();
        } else {
            const positive_num = Math.abs(num);
            return "-" + positive_num.toString();
        }
    }

    setModText(mod, num) {
        mod.textContent = this.signNumber(num);
    }
}
