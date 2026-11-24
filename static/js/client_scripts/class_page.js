import { PROFICIENCIES } from "../shared/class_proficiencies.js";
import { ABILITY_NAMES, CLASS_NAMES, CLASSES, SKILL_NAMES, SKILLS } from "../shared/data_enums.js";
import { OptionSelect } from "../shared/option_dropdown.js";

export class ClassPage {
    constructor(classes_hanlder, update_tab_name) {
        this.main_main = false;
        this.chosen_skills = [];
        this.default_skills = [];
        this.class_level = 1;
        this.spells = [];
        this.cantrips = [];
        this.use_spell_book = false;
        this.concentration = '';
        this.saving_throws = [];

        this.class_id = CLASSES.OPTION;
        this.updateTabName = update_tab_name;
        this.classes_hanlder = classes_hanlder;

        this.main_div = document.createElement('div');
        document.querySelector("#class-pages").appendChild(this.main_div);

        this.main_div.classList.add('hidden');

        this.createMainContainers();
        this.createSelectClassButton();


    }

    setPageVisible(b) {
        if(b) {
            this.main_div.classList.remove('hidden');
        } else {
            this.main_div.classList.add('hidden');
        }
    }

    resetPage() {
        this.chosen_skills = [];
        this.default_skills = [];
        this.saving_throws = [];
        this.class_level = 1;
        this.class_id = CLASSES.OPTION;
    }

    createMainContainers() {
        this.select_class_container = document.createElement('div');
        this.hit_die_container = document.createElement('div');
        this.saving_throw_container = document.createElement('div');
        this.weapon_proficiency_container = document.createElement('div');
        this.armor_proficiency_container = document.createElement('div');
        this.tool_container = document.createElement('div');
        this.skill_container = document.createElement('div');

        [this.select_class_container, this.hit_die_container, this.saving_throw_container, this.weapon_proficiency_container,
            this.armor_proficiency_container, this.tool_container, this.skill_container
        ].forEach((container) => {this.main_div.appendChild(container);});
    }

    async optionSelected(value) {
        this.resetPage();
        this.updateTabName?.(value.getOptionValue());
        this.class_id = value.getOptionID();
        this.buildCharacterClass();
        await this.classes_hanlder.saveClasses();
    }

    buildCharacterClass() {
        this.handleSpellBuilding();
        this.buildClassStatSection();
    }

    handleSpellBuilding() {
        if(this.class_id != CLASSES.WIZARD) {
            console.warn("Spell section building not implemented");
        }
    }

    buildClassStatSection() {
        const class_data = PROFICIENCIES[this.class_id];
        if(class_data == null) {return;}

        const saving_throw_ids = class_data.saving_throws;
        const weapon_proficiencies = class_data.weapons.proficiencies;
        const armor_proficiencies = class_data.armor.proficiencies;
        const tools = class_data.tools;
        const skill_option_count = class_data.skills[0];
        for(let i = 0; i < skill_option_count; i++) {
            if(this.chosen_skills.length < i + 1) {
                this.chosen_skills.push(SKILLS.OPTION);
            }
        }
        const skill_option_ids = class_data.skills[1];

        const hit_die = class_data.hit_die;

        this.createSelectClassButton();
        this.createHitDie(hit_die);
        this.createSavingThrows(saving_throw_ids);
        this.createWeaponProficiencies(weapon_proficiencies);
        this.createArmorProficiencies(armor_proficiencies);
        this.createTools(tools);
        this.createSkillSections(skill_option_ids);
    }

    createSelectClassButton() {
        this.select_class_container.textContent = "";
        let class_options = Object.keys(CLASSES).map((class_id) => ({id: class_id, value: CLASS_NAMES[class_id]}));

        const class_dropdown = new OptionSelect(class_options, (option) => this.optionSelected(option), CLASS_NAMES[this.class_id]);
        class_dropdown.addTo(this.select_class_container);
    }

    createHitDie(hit_die) {
        this.hit_die_container.textContent = "";

        const level_1_container = document.createElement('div');
        this.hit_die_container.appendChild(level_1_container);

        const higher_level_container = document.createElement('div');
        this.hit_die_container.appendChild(higher_level_container);

        const hit_die_text = document.createElement('p');
        const level_1_text = document.createElement('p');
        const higher_level_text = document.createElement('p');

        hit_die_text.textContent = hit_die.number + " d" + hit_die.class;
        level_1_text.textContent = hit_die.level_1;
        higher_level_text.textContent = hit_die.higher_level;

        this.hit_die_container.appendChild(hit_die_text);
        level_1_container.appendChild(level_1_text);
        higher_level_container.appendChild(higher_level_text);

    }

    createSavingThrows(saving_throw_ids) {
        this.saving_throw_container.textContent = "";

        const saving_throw_text = document.createElement('p');
        this.saving_throw_container.appendChild(saving_throw_text);

        const count = saving_throw_ids.length;
        let str = '';
        for(let i = 0; i < count; i++) {
            str = str + ABILITY_NAMES[saving_throw_ids[i]];
            if(i < count - 1) {
                str = str + ", ";
            }
        }
        saving_throw_text.textContent = str;
    }

    createWeaponProficiencies(weapon_proficiencies) {
        this.weapon_proficiency_container.textContent = "";

        const weapon_proficiencies_text = document.createElement('p');
        this.weapon_proficiency_container.appendChild(weapon_proficiencies_text);

        const count = weapon_proficiencies.length;

        let str = '';
        for(let i = 0; i < count; i++) {
            str = str + weapon_proficiencies[i];
            if(i < count - 1) {
                str = str + ', ';
            }
        }
        weapon_proficiencies_text.textContent = str;
    }

    createArmorProficiencies(armor_proficiencies) {
        this.armor_proficiency_container.textContent = "";

        const armor_proficiencies_text = document.createElement('p');
        this.armor_proficiency_container.appendChild(armor_proficiencies_text);
        
        const count = armor_proficiencies.length;
        let str = '';
        for (let i = 0; i < length; i++) {
            str = str + armor_proficiencies[i];
            if(i < count - 1) {
                str = str + ', ';
            }
        }
        armor_proficiencies_text.textContent = str;
    }

    createTools(tools) {
        this.tool_container.textContent = "";

        const tool_text = document.createElement('p');
        this.tool_container.appendChild(tool_text);

        const count = tools.length;
        let str = '';
        for (let i = 0; i < length; i++) {
            str = str + tools[i];
            if(i < count - 1) {
                str = str + ', ';
            }
        }
        tool_text.textContent = str;
    }

    async selectedSkill(skill_option, option_select_id) {
        const skill_id = skill_option.getOptionID();
        this.chosen_skills[option_select_id] = skill_id;
        await this.classes_hanlder.saveClasses();
    }

    createSkillSections(skill_ids) {
       this.skill_container.textContent = "";
        const skill_options = skill_ids.map((skill_id) => ({id: skill_id, value: SKILL_NAMES[skill_id]}));
        

        const chosen_skill_names = [];

        this.chosen_skills.forEach((skill_option, i) => {
            let skill_div = new OptionSelect(skill_options, (skill_option) => {this.selectedSkill(skill_option, i);}, SKILL_NAMES[skill_option]);
            skill_div.addTo(this.skill_container);
        });
    }

    getSaveData() {
        let dict = {
            class_id: this.class_id,
            main_class: this.main_class,
            class_level: this.class_level,
            chosen_skills: this.chosen_skills, 
            default_skills: this.default_skills,
            spells: this.spells,
            cantrips: this.cantrips,
            use_spell_book: this.use_spell_book,
            concentration: this.concentration};
        
        return dict;
    }

    getClassID() {
        return this.class_id;
    }

    loadSaveData(dict) {
        this.class_id = dict.class_id;
        this.main_class = dict.main_class;
        this.class_level = dict.class_level;
        this.chosen_skills = dict.chosen_skills;
        this.default_skills = dict.default_skills;
        this.spells = dict.spells;
        this.cantrips = dict.cantrips;
        this.use_spell_book = dict.use_spell_book;
        this.concentration = dict.concentration;
        this.updateTabName(CLASS_NAMES[this.class_id]);
        this.buildCharacterClass();
    }
}