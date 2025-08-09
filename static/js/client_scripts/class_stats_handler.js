import * as class_proficiencies from './../shared/class_proficiencies.js';
import {linkDropdown} from './utils/dropdown_handler.js';
document.addEventListener("DOMContentLoaded", () => {
    const class_options = [...document.querySelector(".class-options").children];
    const head = document.querySelector(".class-selector");
    class_options.forEach((option) => {
        option.addEventListener("click", function () {addClickListener(option, head)});
    });
});

function addClickListener(option, head) {
    head.querySelector('.selected-class').textContent = option.textContent;
    buildClasStatSection(option.textContent);
}

function buildClasStatSection(c) {
    const profs = getProfs(c);
    if (Object.keys(profs).length === 0) {
        return;
    }
    const saving_throws = profs.saving_throws;
    const weapons = profs.weapons;
    const armor = profs.armor;
    const tools = profs.tools;
    const skill_count = profs.skills[0];
    const skills = profs.skills[1];

    createSavingThrows(saving_throws)
    createWeapons(weapons)
    createArmor(armor)
    createTools(tools)
    createSkillSelections(skill_count, skills)


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

function createWeapons(weapons) {
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

function createArmor(armor) {
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

function createSkillSelections(skill_count, skills) {
    console.log(skills);
    const d = document.querySelector('.class-skills-div');
    removeSkills();
    for (let i = 0; i < skill_count; i++) {
        let skill_div = document.createElement('div');
        skill_div.classList.add('skill-selection');
        skill_div.classList.add('dropdown-head');
        skill_div.innerHTML = `
            <p>Select Skill</p>
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
    }

}

function removeSkills() {
    const d = document.querySelector('.class-skills-div');
    d.innerHTML = '';

}

function getProfs(c) {
    let profs;

    switch (c) {
    case "Barbarian":
        profs = class_proficiencies.barbarian;
        break;
    case "Bard":
        profs = class_proficiencies.bard;
        break;
    case "Cleric":
        profs = class_proficiencies.cleric;
        break;
    case "Druid":
        profs = class_proficiencies.druid;
        break;
    case "Fighter":
        profs = class_proficiencies.fighter;
        break;
    case "Monk":
        profs = class_proficiencies.monk;
        break;
    case "Paladin":
        profs = class_proficiencies.paladin;
        break;
    case "Ranger":
        profs = class_proficiencies.ranger;
        break;
    case "Rogue":
        profs = class_proficiencies.rogue;
        break;
    case "Sourcerer":
        profs = class_proficiencies.sorcerer;
        break;
    case "Warlock":
        profs = class_proficiencies.warlock;
        break;
    case "Wizard":
        profs = class_proficiencies.wizard;
        break;
    default:
        profs = {};
        break;
    }
    return profs;
}