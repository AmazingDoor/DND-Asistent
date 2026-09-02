import { getClassSpells, getMaxSpellLevel } from "../../shared/spell_data_filterer.js";
import { getClassName, isUsingSpellbook } from "./character_sheet/mappers/class_mapper.js";


export class SpellOptionOverlay {
    static create(spell_chosen_callback, ...args) {
        return new SpellOptionOverlay(spell_chosen_callback, ...args);
    }

    static instance;
    constructor(spell_chosen_callback = () => {console.warn("No spell selected callback provided")}, ...args) {
        SpellOptionOverlay.instance = this;
        this.args = args;
        this.spellChosenCallback = spell_chosen_callback;
        this.buildOverlay();
    }

    buildOverlay() {
        this.spell_option_overlay = document.createElement('div');
        this.spell_option_overlay.classList.add('fullscreen-overlay', 'overlay-index-4', 'spell-selection-overlay');
        SpellOptionOverlay.instance.addTo(document.body);

        let close_button_container = document.createElement('div');
        close_button_container.classList.add('spell-select-overlay-close-container');
        this.spell_option_overlay.appendChild(close_button_container);

        let close_button = document.createElement('button');
        close_button.classList.add('spell-select-overlay-close');
        close_button.textContent = "X";
        close_button.addEventListener("click", () => {
            SpellOptionOverlay.instance.removeOverlay();
        });
        close_button_container.appendChild(close_button);

        let main_container = document.createElement('div');
        main_container.classList.add('spell-select-overlay-main');
        this.spell_option_overlay.appendChild(main_container);

        let class_spells = [];
        if(isUsingSpellbook()) {
            console.log('wrong');
            class_spells = getClassSpells("Wizard")[1];
        } else {
            class_spells = getClassSpells(getClassName())[1];
        }

        const max_spell_level = getMaxSpellLevel();
        class_spells.forEach((spell) => {
            if(spell.level != 0 && spell.level <= max_spell_level) {
                const spell_option = new SpellOption(spell, this);
                spell_option.addTo(main_container);
            }
        });
    }

    selectSpell(spell_name) {
        this.spellChosenCallback(spell_name, ...this.args);
    }

    removeOverlay() {
        this.spell_option_overlay.remove();
        SpellOptionOverlay.instance = null;
    }

    addTo(parent_element) {
        parent_element.appendChild(this.spell_option_overlay);
    }
}

export class CantripOptionOverlay {
    static create(spell_chosen_callback, ...args) {
        return new CantripOptionOverlay(spell_chosen_callback, ...args);
    }

    static instance;
    constructor(spell_chosen_callback = () => {console.warn("No spell selected callback provided")}, ...args) {
        CantripOptionOverlay.instance = this;
        this.args = args;
        this.spellChosenCallback = spell_chosen_callback;
        this.buildOverlay();
    }

    buildOverlay() {
        this.spell_option_overlay = document.createElement('div');
        this.spell_option_overlay.classList.add('fullscreen-overlay', 'overlay-index-4', 'spell-selection-overlay');
        CantripOptionOverlay.instance.addTo(document.body);

        let close_button_container = document.createElement('div');
        close_button_container.classList.add('spell-select-overlay-close-container');
        this.spell_option_overlay.appendChild(close_button_container);

        let close_button = document.createElement('button');
        close_button.classList.add('spell-select-overlay-close');
        close_button.textContent = "X";
        close_button.addEventListener("click", () => {
            CantripOptionOverlay.instance.removeOverlay();
        });
        close_button_container.appendChild(close_button);

        let main_container = document.createElement('div');
        main_container.classList.add('spell-select-overlay-main');
        this.spell_option_overlay.appendChild(main_container);

        const class_spells = getClassSpells(getClassName())[0];
        const max_spell_level = getMaxSpellLevel();
        class_spells.forEach((spell) => {
            if(spell.level != 0 && spell.level <= max_spell_level) {
                const spell_option = new SpellOption(spell, this);
                spell_option.addTo(main_container);
            }
        });
    }

    selectSpell(spell_name) {
        this.spellChosenCallback(spell_name, ...this.args);
    }

    removeOverlay() {
        this.spell_option_overlay.remove();
        CantripOptionOverlay.instance = null;
    }

    addTo(parent_element) {
        parent_element.appendChild(this.spell_option_overlay);
    }
}

export class SpellOption {
    //Spell options in the spell option overlay
    constructor(spell_data, linked_option) {
        this.spell_data = spell_data;
        this.linked_option = linked_option;
        this.buildItem();
    }

    buildItem() {
        this.main_div = document.createElement('div');
        this.main_div.classList.add('spell-option-main');

        this.main_div.addEventListener("click", () => {
            this.linked_option?.selectSpell(this.spell_data.name);
        });

        const name_container = document.createElement('div');
        name_container.classList.add('spell-option-name-container');
        this.main_div.appendChild(name_container);
        
        const spell_name = document.createElement('h3');
        spell_name.textContent = this.spell_data.name;
        if(this.spell_data.concentration) {
            spell_name.textContent += " (Uses Concentration)";
        }
        name_container.appendChild(spell_name);

        const top_container = document.createElement('div');
        top_container.classList.add('spell-option-top-container');
        this.main_div.appendChild(top_container);

        const name_level_container = document.createElement('div');
        top_container.appendChild(name_level_container)

        const level_container = document.createElement('div');
        level_container.classList.add('spell-option-stat-container');
        top_container.appendChild(level_container);

        const level_label = document.createElement('p');
        level_label.textContent = "Level: ";
        level_label.classList.add('spell-option-stat-label');
        level_container.appendChild(level_label);

        const level_num = document.createElement('p');
        level_num.textContent = this.spell_data.level;
        level_container.appendChild(level_num);

        const casting_time_container = document.createElement('div');
        casting_time_container.classList.add('spell-option-stat-container');
        top_container.appendChild(casting_time_container);

        const casting_time_label = document.createElement('p');
        casting_time_label.textContent = "Casting Time: ";
        casting_time_label.classList.add('spell-option-stat-label');
        casting_time_container.appendChild(casting_time_label);

        const casting_time_num = document.createElement('p');
        casting_time_num.textContent = this.spell_data.casting_time;
        casting_time_container.appendChild(casting_time_num);

        const range_container = document.createElement('div');
        range_container.classList.add('spell-option-stat-container');
        top_container.appendChild(range_container);

        const range_label = document.createElement('p');
        range_label.classList.add('spell-option-stat-label');
        range_label.textContent = "Range: ";
        range_container.appendChild(range_label);

        const range_num = document.createElement('p');
        range_num.textContent = this.spell_data.range;
        range_container.appendChild(range_num);

        const components_container = document.createElement('div');
        components_container.classList.add('spell-option-stat-container');
        top_container.appendChild(components_container);

        const components_label = document.createElement('p');
        components_label.classList.add('spell-option-stat-label');
        components_label.textContent = 'Components: ';
        components_container.appendChild(components_label);
        
        const components_text = document.createElement('p');
        if(this.spell_data.components.length > 0) {
            for(let i = 0; i < this.spell_data.components.length; i++) {
                components_text.textContent += this.spell_data.components[i];
                if(i < this.spell_data.components.length - 1) {
                    components_text.textContent += ", ";
                }
            }
        } else {
            components_text.textContent = "None";
        }
        components_container.appendChild(components_text);

        const school_container = document.createElement('div');
        school_container.classList.add('spell-option-stat-container');
        top_container.appendChild(school_container);

        const school_label = document.createElement('p');
        school_label.classList.add('spell-option-stat-label');
        school_label.textContent = "School: ";
        school_container.appendChild(school_label);

        const school_text = document.createElement('p');
        school_text.textContent = this.spell_data.school;
        school_container.appendChild(school_text);

        const duration_container = document.createElement('div');
        duration_container.classList.add('spell-option-stat-container');
        top_container.appendChild(duration_container);

        const duration_label = document.createElement('p');
        duration_label.classList.add('spell-option-stat-label');
        duration_label.textContent = "Duration: ";
        duration_container.appendChild(duration_label);

        const duration_num = document.createElement('p');
        duration_num.textContent = this.spell_data.duration;
        duration_container.appendChild(duration_num);
        
        if(this.spell_data.higher_level.length > 0) {
            const higher_level_container = document.createElement('div');
            this.main_div.appendChild(higher_level_container);

            const higher_level_top = document.createElement('div');
            higher_level_container.appendChild(higher_level_top);

            const higher_level_label = document.createElement('p');
            higher_level_label.classList.add('spell-option-stat-label');
            higher_level_label.textContent = "Higher Level: ";
            higher_level_top.appendChild(higher_level_label);

            const higher_level_bottom = document.createElement('div');
            higher_level_bottom.classList.add('spell-option-higher-level-text');
            higher_level_container.appendChild(higher_level_bottom);

            const higher_level_text = document.createElement('p');
            this.spell_data.higher_level.forEach((txt) => {
                higher_level_text.textContent += "-" + txt + "\n";
            });
            higher_level_bottom.appendChild(higher_level_text);
        }

        const description_container = document.createElement('div');
        description_container.classList.add('spell-option-description-container');
        this.main_div.appendChild(description_container);

        const description = document.createElement('p');
        description_container.appendChild(description);

        const descriptions = this.spell_data.desc;
        descriptions.forEach((d) => {
            description.textContent += " " + d;
        });
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }
}