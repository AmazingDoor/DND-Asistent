import { ABILITIES, ABILITY_NAMES, RACE_NAMES, RACES, LANGUAGE_NAMES, LANGUAGES, SKILLS, SKILL_NAMES } from "../shared/data_enums.js";
import { OptionSelect } from "../shared/option_dropdown.js";
import { getRaceData } from "../shared/race_features.js";
import { saveRace as sendSaveRace } from "./save_handler.js";
import { bus, EVENTS } from "./utils/event_bus.js";
import { emitSignal } from "./utils/socket_emitter.js";

export class RaceHandler {
    constructor(socket) {
        this.socket = socket;
        
        this.skills = [];
        this.abilities = [];
        this.languages = [];
        
        this.race_id = RACES.OPTION;

        this.race_selection = document.querySelector('.race-selection');
        this.createHeadder();
    }

    buildRaceOptionArray() {
        const options = Object.keys(RACES)
        .filter((race) => race != this.race_id)
        .map((race) => ({
            id: race, 
            value: RACE_NAMES[race]}));

        return options;
    }

    async onRaceSelected(opt) {
        const race_id = opt.option_id;
        this.setRaceData(race_id);
        this.select_race_dropdown.setOptions(this.buildRaceOptionArray());
        bus.publish(EVENTS.RACE_CHANGED);
        await this.saveRace();
    }

    build() {
        this.createHeadder();
        this.linked_ability_options = [];
        const race_data = getRaceData(this.race_id);
        this.createAbilities(race_data.abilities);
        this.setSize(race_data.size);
        this.setSpeed(race_data.speed);
        this.createTraits(race_data.features);
        this.createLanguages(race_data.languages);
        this.createSkills(race_data.skills);
    }

    createHeadder() {
        this.race_selection.textContent = '';

        const race_label = document.createElement('h3');
        race_label.textContent = "Race: ";
        this.race_selection.appendChild(race_label);

        this.select_race_dropdown = new OptionSelect(this.buildRaceOptionArray(),
        (opt) => this.onRaceSelected(opt), RACE_NAMES[this.race_id]);

        this.select_race_dropdown.addTo(this.race_selection);
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
                console.log(this.abilities);
                const option_container = document.createElement('td');
                const option_id = this.abilities[i].id || ability_id;
                const ability_option = new OptionSelect(this.createAbilityOptionArray(), (opt) => {this.raceAbilitySelected(opt, i)}, ABILITY_NAMES[option_id]);
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

    setSize(size) {
        const size_num = document.querySelector('.race-size');
        size_num.textContent = size;
    }

    setSpeed(speed) {
        const speed_num = document.querySelector('.speed-num');
        speed_num.textContent = speed.toString();
    }

    createTraits(traits) {
        const trait_list = document.querySelector('.trait-list');
        trait_list.innerHTML = "";
        traits.forEach((trait) => {
            const t = document.createElement('p');
            t.textContent = trait;
            trait_list.appendChild(t);
        });
    }

    createLanguages(languages) {
        const set_languages = languages;
        const language_list = document.querySelector('.language-list');
        language_list.innerHTML = '';
        set_languages.forEach((language_id, i) => {
            if(language_id != LANGUAGES.OPTION) {
                const t = document.createElement('p');
                t.textContent = LANGUAGE_NAMES[language_id];
                language_list.appendChild(t);
            } else {
                const language_option_text = LANGUAGE_NAMES[this.languages[i]] || LANGUAGE_NAMES[language_id];
                const language_option_select = new OptionSelect(this.createLanguagesArray(), (opt) => {this.languageOptionSelected(opt, i);}, language_option_text);
                language_option_select.addTo(language_list);
            }
        });
    }

    createSkills(skills) {
        const skill_list = document.querySelector('.skill-list');
        skill_list.innerHTML = '';
        skills.forEach((skill_id, i) => {
            if(skill_id != SKILLS.OPTION) {
                const t = document.createElement('p');
                t.textContent = SKILL_NAMES[skill_id];
                skill_list.appendChild(skill);
            } else {
                const skill_option_text = SKILL_NAMES[this.skills[i]] || SKILL_NAMES[skill_id];
                const skill_option = new OptionSelect(this.createSkillOptionArray(), (opt) => this.skillSelected(opt, i), skill_option_text);
                skill_option.addTo(skill_list);
            }
        });
    }

    createSkillOptionArray() {
        const skills = Object.keys(SKILLS)
        .filter((skill) => !this.skills.includes(skill))
        .map((skill_id) => ({
            id: skill_id, value: SKILL_NAMES[skill_id]
        }));
        return skills;
    }

    async skillSelected(opt, i) {
        const skill_id = opt.option_id;
        this.skills[i] = skill_id;
        await this.saveRace();
    }

    createLanguagesArray() {
        const languages = Object.keys(LANGUAGES)
        .filter((language_id) => !this.languages.includes(language_id))
        .map((language_id) => ({
            id: language_id, value: LANGUAGE_NAMES[language_id]
        }));
        return languages;
    }

    async languageOptionSelected(opt, i) {
        const language_id = opt.option_id;
        this.languages[i] = language_id;
        await this.saveRace();
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

    async raceAbilitySelected(opt, option_index) {
        const ability_id = opt.option_id;
        console.log(this.abilities);
        this.abilities[option_index] = {id: ability_id, value: this.abilities[option_index].value};
        this.linked_ability_options.forEach((linked) => {
            linked.setOptions(this.createAbilityOptionArray());
        });

        await this.saveRace();
    }

    async saveRace() {
        await sendSaveRace(this.getSaveData());
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
                this.skills = data.skills;
                this.languages = data.languages;
                this.abilities = data.abilities;

                this.build();
                resolve(data);
            });
        });
    }

    getSaveData() {
        return {race_id: this.race_id, skills: this.skills,
            languages: this.languages, abilities: this.abilities,
        };
    }
}