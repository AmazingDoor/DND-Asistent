import {setDefaultClassData, getClassData, getClassName, setClassSkills, getClassSkills, resetClassData, getCurrentSpellSlots} from './../mappers/class_mapper.js';
import {linkDropdown} from './../../dropdown_handler.js';
import {addClassSkillEventListeners} from './../dropdown_handlers/class_skill_handler.js';
import {buildSpellSection} from './sub_builders/class_spell_section_builder.js';
import {updateSkills, updateAbilities} from './../../display_stat_updater.js';
import * as inventory_builder from './inventory_builder.js';
import { clearItems as clearInventory, clearItems} from '../inventory/inventory_item_manager.js';
import { saveInventory } from '../../../save_handler.js';
import { updateSpells } from '../../spell_handler.js';
import { setUsingSpellbook, isUsingSpellbook } from './../mappers/class_mapper.js';
import { saveClassData } from '../../../save_handler.js';
import { updateData as updateCombatSpellData } from './sub_builders/combat_builder.js';
import { getInventory, getInventoryHandler } from '../character_data_handler.js';
import * as inventory_handler from '../../inventory_handler.js';
import { bus, EVENTS, SAVE_EVENTS } from '../../event_bus.js';
import { emitAndWait } from '../../socket_emitter.js';
import { ITEM_SOURCES } from '../../../../shared/inventory/item_metadata.js';


let socket = null;
let spell_book_option;
let name;
let char_id;

const build_character_class_subscriptions = [EVENTS.LEVEL_UPDATED];


export function setSocket(io) {
    socket = io;

    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');

    spell_book_option = document.querySelector('#use-spell-book');

    spell_book_option.addEventListener("click", async function() {
        let class_name = getClassName();
        if(class_name != "Wizard") {
            spell_book_option.checked = false;
        }
        setUsingSpellbook(spell_book_option.checked);
        socket.emit('use_spell_book', {char_id: char_id, use_spell_book: spell_book_option.checked})
        await inventory_builder.rebuildInventory();
        bus.publish(EVENTS.USE_SPELL_BOOK_CLICKED);
    });

    bus.subscribeToEvents(build_character_class_subscriptions, buildCharacterClass);
}

export function buildCharacterClass() {
    const class_name = getClassName();
    const skills = getClassSkills();

    const class_options = [...document.querySelector(".class-options").children];
    const head = document.querySelector(".class-selector");
    class_options.forEach((option) => {
        option.addEventListener("click", function() {clickEvent(option, head)});
    });

    if (class_name !== null) {
        document.querySelector('.selected-class').textContent = class_name;
    } else {
        document.querySelector('.selected-class').textContent = "Select Class";

    }
    handleSpellBuilding();
    buildClassStatSection(class_name, skills);
    setSkills();
}

function handleSpellBuilding() {
    let class_name = getClassName();
    if (class_name !== "Wizard") {
        document.querySelector('#spell-book-option-div').classList.add('hidden');
        buildSpellSection();
    } else {
        document.querySelector('#spell-book-option-div').classList.remove('hidden');
        
        spell_book_option.checked = isUsingSpellbook();

        buildSpellSection();
    }

}

let building = false;
async function clickEvent(option, head) {
    let same_class = head.querySelector('.selected-class').textContent === option.textContent;
    if(same_class) {
        return;
    }

    if(building) {
        return;
    }
    building = true;
    resetClassData();
    setUsingSpellbook(false);


    if(option.textContent == "Wizard") {
        setUsingSpellbook(true);
    }

    head.querySelector('.selected-class').textContent = option.textContent;

    setDefaultClassData(option.textContent);


    let inv_manager = getInventoryHandler();
    inv_manager.clearInventories(ITEM_SOURCES.CLASS);
    inv_manager.setDefaultClassData();
    await saveInventory();
    handleSpellBuilding();
    setSkills()
    const skill_array = getClassSkills();
    await emitAndWait('use_spell_book', {char_id: char_id, use_spell_book: isUsingSpellbook()});
    bus.publish(SAVE_EVENTS.SAVE_CLASS);    
    bus.publish(EVENTS.CLASS_CHANGED);
    building = false;

    return;


    inventory_handler.clearInventory();
    await inventory_handler.setDefaultInventory();
    await saveInventory();
   
    await inventory_builder.rebuildInventory();
}

const save_class_data_subscriptions = [SAVE_EVENTS.SAVE_CLASS];
bus.subscribeToEvents(save_class_data_subscriptions, saveClassData);

function setSkills() {
    const skills_container = document.querySelector('.class-skills-div');
    const skills = skills_container.querySelectorAll('.dropdown-head') || [];
    const skill_names = [];
    skills.forEach((skill) => {
        const skill_text = skill.querySelector('p').textContent;

        if(skill_text !== "Select Skill") {
            skill_names.push(skill_text);
        }
    });

    setClassSkills([skill_names.length, skill_names]);
}

function buildClassStatSection(c, active_skills = []) {
    let class_data = getClassData();
    if (class_data === null || class_data === undefined) {
        return;
    }
    if (Object.keys(class_data).length === 0) {
        return;
    }
    const saving_throws = class_data.saving_throws;
    const weapon_proficiencies = class_data.weapons.proficiencies;
    const armor_proficiencies = class_data.armor.proficiencies;
    const tools = class_data.tools;
    const skill_count = class_data.skills[0];
    const skills = class_data.skills[1];

    setClassSkills(class_data.skills);

    createSavingThrows(saving_throws)
    createWeaponProficiencies(weapon_proficiencies)
    createArmorProficiencies(armor_proficiencies)
    createTools(tools)
    createSkillSelections(skill_count, skills, active_skills)
}

function createSavingThrows(saving_throws) {
    const count = saving_throws.length;
    let str = '';
    for (let i = 0; i < count; i++) {
        str = str + saving_throws[i];
        if(i < count - 1) {
            str = str + ', ';
        }
    }

    document.querySelector('.saving-throw-display').textContent = str;

}

function createWeaponProficiencies(weapons) {
    const count = weapons.length;
    let str = '';
    for (let i = 0; i < count; i++) {
        str = str + weapons[i];
        if(i < count - 1) {
            str = str + ', ';
        }
    }

    document.querySelector('.weapons-display').textContent = str;
}

function createArmorProficiencies(armor) {
    const count = armor.length;
    let str = '';
    for (let i = 0; i < count; i++) {
        str = str + armor[i];
        if(i < count - 1) {
            str = str + ', ';
        }
    }

    document.querySelector('.armor-display').textContent = str;
}

function createTools(tools) {
    const count = tools.length;
    let str = '';
    for (let i = 0; i < count; i++) {
        str = str + tools[i];
        if(i < count - 1) {
            str = str + ', ';
        }
    }

    document.querySelector('.tools-display').textContent = str;
}

function createSkillSelections(skill_count, skills, active_skills, updateSkills) {
    const d = document.querySelector('.class-skills-div');
    removeSkills();
    const skill_names = active_skills[1] || [];
    for (let i = 0; i < skill_count; i++) {
        let skill_text = "Select Skill";
        if (skill_names.length > 0) {
            if (skill_names[i] !== undefined) {
                skill_text = skill_names[i];
            }
        }
        let skill_div = document.createElement('div');
        skill_div.classList.add('skill-selection');
        skill_div.classList.add('dropdown-head');
        skill_div.innerHTML = `
            <p>${skill_text}</p>
            <div class="dropdown">
                <div class="skill-dropdown dropdown-content hidden">
                </div>
            </div>
        `;

        d.appendChild(skill_div);
        const dropdown = skill_div.querySelector('.dropdown-content');
        skills.forEach((skill) => {
            let option = document.createElement('div');
            option.classList.add('skill-option');
            option.textContent = skill;
            dropdown.appendChild(option);
        });
        skill_div.appendChild(dropdown);
        linkDropdown(skill_div);
        addClassSkillEventListeners(socket, setSkills);
    }

}

function removeSkills() {
    const d = document.querySelector('.class-skills-div');
    d.innerHTML = '';

}