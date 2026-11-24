import { ABILITIES, ABILITY_NAMES, RACE_NAMES, RACES } from "../shared/data_enums.js";
import { OptionSelect } from "../shared/option_dropdown.js";
import { getRaceData } from "../shared/race_features.js";
import { emitSignal } from "./utils/socket_emitter.js";

export class RaceHandler {
    constructor(socket) {
        this.socket = socket;
        
        this.skills = [];
        this.abilities = [];
        this.languages = [];
        
        this.race_id = RACES.OPTION;

        const race_selection = document.querySelector('.race-selection');

        this.select_race_dropdown = new OptionSelect(this.buildRaceOptionArray(),
        (opt) => this.onRaceSelected(opt));

        this.select_race_dropdown.addTo(race_selection);
    }

    buildRaceOptionArray() {
        const options = Object.keys(RACES)
        .filter((race) => race != this.race_id)
        .map((race) => ({
            id: race, 
            value: RACE_NAMES[race]}));

        return options;
    }

    onRaceSelected(opt) {
        const race_id = opt.option_id;
        this.setRaceData(race_id);
        this.select_race_dropdown.setOptions(this.buildRaceOptionArray());
    }

    build() {
        this.linked_ability_options = [];
        const race_data = getRaceData(this.race_id);
        this.createAbilities(race_data.abilities);
    }

    createAbilities(abilities) {
        const abilities_table = document.querySelector('.race-abilities-table');
        abilities_table.textContent = '';

        abilities.forEach((ability_dict, i) => {
            const ability_id = ability_dict.id;
            const ability_value = ability_dict.value;
            const row = document.createElement('tr');
            
            if(ability_id != ABILITIES.OPTION) {
                console.log(ability_id);
                const ability_name = document.createElement('td');
                ability_name.textContent = ABILITY_NAMES[ability_id];
                row.appendChild(ability_name);

                const ability_value_text = document.createElement('td');
                ability_value_text.textContent = "+" + ability_value.toString();
                row.appendChild(ability_value_text);
                abilities_table.appendChild(row);       
            } else {
                const option_container = document.createElement('td');
                const ability_option = new OptionSelect(this.createAbilityOptionArray(), (opt) => {this.raceAbilitySelected(opt, i)});
                ability_option.addTo(option_container);
                this.linked_ability_options.push(ability_option);
                row.appendChild(option_container);

                const value_container = document.createElement('td');
                value_container.textContent = "+" + ability_value.toString();
                row.appendChild(value_container);
                abilities_table.appendChild(row);
            }
        });
    }

    createAbilityOptionArray() {
        const options = Object.keys(ABILITIES).filter(
            (ability_id) => !this.abilities.some(
                (dict) => dict.id == ability_id
            )).map(
                (ability_id) => ({
                    id: ability_id, value: ABILITY_NAMES[ability_id]
                }
            ));

        return options;
    }

    raceAbilitySelected(opt, option_index) {
        const ability_id = opt.option_id;
        this.abilities[option_index] = {id: ability_id, value: this.abilities[option_index]};
        this.linked_ability_options.forEach((linked) => {
            linked.setOptions(this.createAbilityOptionArray());
        });
    }

    resetRaceData() {
        this.skills = [];
        this.abilities = [];
        this.languages = [];
        this.race_id = RACES.OPTION;
    }

    setRaceData(race_id) {
        const race_data = getRaceData(race_id);
        this.race_id = race_id;
        this.abilities = race_data.abilities;
        this.languages = race_data.languages;
        this.skills = race_data.skills;

        this.build();
    }

    loadSaveData() {
        emitSignal('require_race_data', {char_id: char_id});
        return new Promise(resolve => {
            this.socket.once('sent_race_data', data => {
                this.resetRaceData();
                this.race_id = data.race_id;
                this.selected_skills = data.selected_skills;
                this.selected_languages = data.selected_languages;
                this.selected_abilities = data.selected_abilities;
                this.default_abilities = data.default_abilities;
                this.default_languages = data.default_languages;
                this.default_skills = data.default_skills;

                resolve(data);
            });
        });
    }

    getSaveData() {
        return {race_id: this.race_id, selected_skills: this.selected_skills,
            selected_languages: this.selected_languages, selected_abilities: this.selected_abilities,
            default_abilities: this.default_abilities, default_languages: this.default_languages,
            default_skills: this.default_skills
        };
    }
}