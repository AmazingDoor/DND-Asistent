import {bard} from './../../../../../shared/spell_lists/bard.js';
import {cleric} from './../../../../../shared/spell_lists/cleric.js';
import {druid} from './../../../../../shared/spell_lists/druid.js';
import {paladin} from './../../../../../shared/spell_lists/paladin.js';
import {ranger} from './../../../../../shared/spell_lists/ranger.js';
import {sorcerer} from './../../../../../shared/spell_lists/sorcerer.js';
import {warlock} from './../../../../../shared/spell_lists/warlock.js';
import {wizard} from './../../../../../shared/spell_lists/wizard.js';
import {full_caster, half_caster, third_caster, warlock_pact_magic, getMagicSlots} from './../../../../../shared/spell_caster_slot_map.js';
import {getPlayerLevel} from './../../../../player_level_handler.js';
import {linkDropdown} from './../../../dropdown_handler.js';
import {getClassSpells, getSpellData} from './../../../../../shared/spell_data_filterer.js';
let socket = null;
export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", function() {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');

    socket.on('load_spells', (data) => {
        const saved_spells = data.spells;
        const saved_cantrips = data.cantrips;
        const class_name = data.class_name;
        buildSpellSection(class_name, saved_spells, saved_cantrips);
    });
});

export function buildSpellSection(class_name, saved_spells = [], saved_cantrips = []) {
    const [cantrips, spells] = getClassSpells(class_name);
    if(spells === undefined) {return;}
    const player_level = getPlayerLevel();
    const spell_slots = getMagicSlots(class_name);
    if(spell_slots.length <= 0) {return;}
    const spell_slot_map = spell_slots.spell_slots[player_level - 1];

    buildSpells(spell_slot_map, player_level, spells, saved_spells);

    saveSpells();

}

function spellOptionClickEvent(head, option) {
    const txt = head.querySelector('p');
    txt.textContent = option.textContent;
    saveSpells();
}

function findHighestSlotLevelAvailable(d, level) {
    let highest = 1;
    for (const key in d) {
        if (parseInt(key) <= level) {
            highest = key;
        }
    }
    return highest;
}

function findHighestPlayerLevelAvailable(d, level) {
    let highest = 1;
    for (const key in d) {
        if (parseInt(key) <= level) {
            highest = key;
        }
    }
    return highest;
}

export function saveSpells() {
    let cantrips = [];
    let spells = [];
    const spell_containers = document.querySelectorAll('.spell-container');
    spell_containers.forEach((container) => {
        let same_level_spells = [];
        const selected_spells = container.querySelectorAll('.spell-selector');
        selected_spells.forEach((spell) => {
            const spell_name = spell.querySelector('p').textContent;
            same_level_spells.push(spell_name);
        });
        spells.push(same_level_spells);
    });

    socket.emit('save_spells', {char_id: char_id, spells: spells, cantrips: cantrips})
}

function buildSpells(spell_slot_map, player_level, spells, saved_spells) {
    const spell_div = document.querySelector('.class-spell-div');
    spell_div.innerHTML = '';
    let i = 1;
    spell_slot_map.forEach((spell_level_count) => {
        if (spell_level_count !== 0) {
            const spell_level_label = document.createElement('p');
            spell_level_label.textContent = "Level " + i.toString() + " Slots";
            spell_div.appendChild(spell_level_label);
        }
        const spell_container = document.createElement('div');
        spell_container.classList.add('spell-container');
        spell_container.id = "level-" + i.toString() + "-spell-container";
        spell_div.appendChild(spell_container);
        for (let n = 0; n < spell_level_count; n++) {
            const spell_dropdown_head = document.createElement('div');
            spell_dropdown_head.classList.add('dropdown-head');
            spell_dropdown_head.classList.add('spell-selector');
            const head_text = document.createElement('p');
            const i_check = i - 1;
            let t = "Select Spell";
            if (i_check in saved_spells) {
                if(n in saved_spells[i_check]) {
                    t = saved_spells[i_check][n];
                }

            }
            head_text.textContent = t;
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
                if(spell.level <= i) {
                    const name = spell.name;
                    const spell_option = document.createElement('div');
                    spell_option.classList.add('spell-option');
                    const spell_option_text = document.createElement('p');
                    spell_option_text.textContent = name;
                    spell_option.appendChild(spell_option_text);
                    spell_dropdown.appendChild(spell_option);

                    spell_option.addEventListener("click", function() {spellOptionClickEvent(spell_dropdown_head, spell_option_text)});

                    const spell_data_container = document.createElement('div');
                    spell_data_container.classList.add('spell-data-container');
                    spell_option.appendChild(spell_data_container);

                    const spell_description_container = document.createElement('div');
                    spell_description_container.classList.add('spell-description-container');
                    spell_data_container.appendChild(spell_description_container);

                    const spell_description = document.createElement('p');
                    spell_description.classList.add('spell-description');
                    spell_description.textContent = spell.desc;
                    spell_description_container.appendChild(spell_description);

                    if ('dc' in spell) {
                        const die = document.createElement('p');
                        die.classList.add('dc-text');
                        die.textContent = "DC: " + spell.dc.dc_type.name;
                        spell_data_container.appendChild(die);
                    }

                    if ('damage' in spell) {
                        if ('damage_at_character_level' in spell.damage) {
                            let spell_level = findHighestCharacterLevelAvailable(spell.damage.damage_at_character_level, i);
                            const hit_die_num = spell.damage.damage_at_character_level[spell_level];
                            const hit_die = document.createElement('p');
                            hit_die.classList.add('hit-die-text');
                            hit_die.textContent = "Damage: " + hit_die_num;
                        }

                        if('damage_at_slot_level' in spell.damage) {
                            let spell_level = findHighestSlotLevelAvailable(spell.damage.damage_at_slot_level, player_level);
                            const hit_die_num = spell.damage.damage_at_slot_level[spell_level];
                            const hit_die = document.createElement('p');
                            hit_die.classList.add('hit-die-text');
                            hit_die.textContent = "Damage: " + hit_die_num;
                            spell_data_container.appendChild(hit_die);
                        }
                    }
                }
            });
            spell_container.appendChild(spell_dropdown_head);
            linkDropdown(spell_dropdown_head);
        }
        i++;
    });
}