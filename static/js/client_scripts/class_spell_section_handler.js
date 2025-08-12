import {bard} from './../shared/spell_lists/bard.js';
import {cleric} from './../shared/spell_lists/cleric.js';
import {druid} from './../shared/spell_lists/druid.js';
import {paladin} from './../shared/spell_lists/paladin.js';
import {ranger} from './../shared/spell_lists/ranger.js';
import {sorcerer} from './../shared/spell_lists/sorcerer.js';
import {warlock} from './../shared/spell_lists/warlock.js';
import {wizard} from './../shared/spell_lists/wizard.js';
import {full_caster} from './../shared/spell_caster_slot_map.js';
import {getPlayerLevel} from './player_level_handler.js';
import {linkDropdown} from './utils/dropdown_handler.js';
export function buildSpellSection(class_name) {
    const spell_div = document.querySelector('.class-spell-div');
    const [cantrips, spells] = getAllSpells(class_name);
    if(spells === undefined) {return;}

    const player_level = getPlayerLevel();
    const spell_slot_map = full_caster.slots[player_level];

    let i = 1;
    spell_slot_map.forEach((spell_level_count) => {
        const spell_level_label = document.createElement('p');
        spell_level_label.textContent = "Level " + i.toString() + " Slots";
        spell_div.appendChild(spell_level_label);
        const spell_container = document.createElement('div');
        spell_container.classList.add('spell_container');
        spell_container.id = "level-" + i.toString() + "-spell-container";
        spell_div.appendChild(spell_container);
        for (let n = 0; n < spell_level_count; n++) {
            const spell_dropdown_head = document.createElement('div');
            spell_dropdown_head.classList.add('dropdown-head');
            spell_dropdown_head.classList.add('spell-selector');
            const head_text = document.createElement('p');
            head_text.textContent = "Select Spell";
            spell_dropdown_head.appendChild(head_text);

            const d = document.createElement('div');
            d.classList.add('dropdown');
            spell_dropdown_head.appendChild(d);

            const spell_dropdown = document.createElement('div');
            spell_dropdown.classList.add('spell-options');
            spell_dropdown.classList.add('dropdown-content');
            spell_dropdown.classList.add('hidden');
            d.appendChild(spell_dropdown);

            spells.forEach((spell) => {
                const name = spell.name;
                const spell_option = document.createElement('div');
                spell_option.textContent = name;
                spell_dropdown.appendChild(spell_option);
            });
            spell_container.appendChild(spell_dropdown_head);
            linkDropdown(spell_dropdown_head);
        }
        i++;
    });

}

function getAllSpells(class_name) {
    switch(class_name) {
        case "Artificer":
            return[artificer.cantrips, artificer.spells]
        case "Bard":
            return[bard.cantrips, bard.spells]
        case "Cleric":
            return[cleric.cantrips, cleric.spells]
        case "Druid":
            return[druid.cantrips, druid.spells]
        case "Paladin":
            return[paladin.cantrips, paladin.spells]
        case "Ranger":
            return[ranger.cantrips, ranger.spells]
        case "Sorcerer":
            return[sorcerer.cantrips, sorcerer.spells]
        case "Warlock":
            return[warlock.cantrips, warlock.spells]
        case "Wizard":
            return[wizard.cantrips, wizard.spells]
        default:
            return [undefined, undefined];
    }
}