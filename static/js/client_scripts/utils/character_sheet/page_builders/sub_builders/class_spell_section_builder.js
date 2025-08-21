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
import {getClassSpells, getSpellData, getPreparedSpellCount, getPreparedCantripCount} from './../../../../../shared/spell_data_filterer.js';
import {getClassName} from './../../mappers/class_mapper.js';
import {setClassPreparedSpells, getClassPreparedSpells, setClassPreparedCantrips,getClassPreparedCantrips} from './../../character_data_handler.js';
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
        setClassPreparedSpells(saved_spells);
        setClassPreparedCantrips(saved_cantrips);
    });
});

export function buildSpellSection(class_name, saved_spells = [], saved_cantrips = []) {
    const [cantrips, spells] = getClassSpells(class_name);
    const player_level = getPlayerLevel();
    const spell_slots = getMagicSlots(class_name);
    const spell_slot_map_object = spell_slots.spell_slots;
    let spell_slot_map = [];
    let cantrip_slot_map = [];
    if(spell_slot_map_object !== undefined) {
        spell_slot_map = spell_slot_map_object[player_level - 1] || [];
        cantrip_slot_map = spell_slot_map_object[player_level - 1] || [];
    }
    const max_spell_level = spell_slot_map.length;

    saved_spells = getClassPreparedSpells();
    saved_cantrips = getClassPreparedCantrips();

    buildSpells(spell_slot_map, cantrip_slot_map, player_level, spells, cantrips, saved_spells, saved_cantrips, class_name, max_spell_level);

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

function findHighestCharacterLevelAvailable(d, level) {
    let highest = 1;
    for (const key in d) {
        if (parseInt(key) <= level) {
            highest = key;
        }
    }
    return highest;
}

export function saveSpells() {
    let class_name = getClassName();
    if(class_name !== "Wizard") {
        let s = [];
        const container = document.querySelector('.spell-container');
        const selected_spells = container.querySelectorAll('.spell-selector');
        selected_spells.forEach((spell) => {
            const spell_name = spell.querySelector('p').textContent;
            s.push(spell_name);
        });

        let c = [];
        const cantrip_container = document.querySelector('.cantrip-container');
        const selected_cantrips = document.querySelectorAll('.cantrip-selector');
        selected_cantrips.forEach((cantrip) => {
            const cantrip_name = cantrip.querySelector('p').textContent;
            c.push(cantrip_name);
        });

        socket.emit('save_spells', {char_id: char_id, spells: s, cantrips: c});
    }
}

function buildSpells(spell_slot_map, cantrip_slot_map, player_level, spells, cantrips, saved_spells, saved_cantrips, class_name, max_spell_level) {
    const spell_div = document.querySelector('.class-spell-div');
    spell_div.innerHTML = '';
    const prepared_spell_count = getPreparedSpellCount(class_name);
    const spell_container = document.createElement('div');
    spell_container.classList.add("spell-container");

    spell_div.appendChild(spell_container);
    for (let e = 0; e < prepared_spell_count; e++) {
        const spell_dropdown_head = document.createElement('div');
        spell_dropdown_head.classList.add('dropdown-head');
        spell_dropdown_head.classList.add('spell-selector');
        const head_text = document.createElement('p');
        let t = "Select Spell";
        if(e in saved_spells) {
            t = saved_spells[e];
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
            if(spell.level <= max_spell_level) {
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
                        let spell_level = findHighestCharacterLevelAvailable(spell.damage.damage_at_character_level, max_spell_level);
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

    const cantrip_div = document.querySelector('.class-cantrip-div');
    cantrip_div.innerHTML = '';
    const prepared_cantrip_count = getPreparedCantripCount(class_name);
    const max_cantrip_level = 0;
    const cantrip_container = document.createElement('div');
    cantrip_container.classList.add("cantrip-container");
    cantrip_div.appendChild(cantrip_container);

    for (let e = 0; e < prepared_cantrip_count; e++) {
        const cantrip_dropdown_head = document.createElement('div');
        cantrip_dropdown_head.classList.add('dropdown-head');
        cantrip_dropdown_head.classList.add('cantrip-selector');
        const head_text = document.createElement('p');
        let t = "Select Cantrip";
        if(e in saved_cantrips) {
            t = saved_cantrips[e];
        }

        head_text.textContent = t;
        cantrip_dropdown_head.appendChild(head_text);

        const d = document.createElement('div');
        d.classList.add('dropdown');
        cantrip_dropdown_head.appendChild(d);

        const cantrip_dropdown = document.createElement('div');
        cantrip_dropdown.classList.add('cantrip-options');
        cantrip_dropdown.classList.add('dropdown-content');
        cantrip_dropdown.classList.add('hidden');
        d.appendChild(cantrip_dropdown);

        cantrips.forEach((cantrip) => {
            if(cantrip.level <= max_cantrip_level) {
                const name = cantrip.name;
                const cantrip_option = document.createElement('div');
                cantrip_option.classList.add('cantrip-option');
                const cantrip_option_text = document.createElement('p');
                cantrip_option_text.textContent = name;
                cantrip_option.appendChild(cantrip_option_text);
                cantrip_dropdown.appendChild(cantrip_option);

                cantrip_option.addEventListener("click", function() {spellOptionClickEvent(cantrip_dropdown_head, cantrip_option_text)});

                const cantrip_data_container = document.createElement('div');
                cantrip_data_container.classList.add('cantrip-data-container');
                cantrip_option.appendChild(cantrip_data_container);

                const cantrip_description_container = document.createElement('div');
                cantrip_description_container.classList.add('cantrip-description-container');
                cantrip_data_container.appendChild(cantrip_description_container);

                const cantrip_description = document.createElement('p');
                cantrip_description.classList.add('cantrip-description');
                cantrip_description.textContent = cantrip.desc;
                cantrip_description_container.appendChild(cantrip_description);

                if ('dc' in cantrip) {
                    const die = document.createElement('p');
                    die.classList.add('dc-text');
                    die.textContent = "DC: " + cantrip.dc.dc_type.name;
                    cantrip_data_container.appendChild(die);
                }

                if ('damage' in cantrip) {
                    if ('damage_at_character_level' in cantrip.damage) {
                        let cantrip_level = findHighestCharacterLevelAvailable(cantrip.damage.damage_at_character_level, max_cantrip_level);
                        const hit_die_num = cantrip.damage.damage_at_character_level[cantrip_level];
                        const hit_die = document.createElement('p');
                        hit_die.classList.add('hit-die-text');
                        hit_die.textContent = "Damage: " + hit_die_num;
                    }

                    if('damage_at_slot_level' in cantrip.damage) {
                        let cantrip_level = findHighestSlotLevelAvailable(cantrip.damage.damage_at_slot_level, player_level);
                        const hit_die_num = cantrip.damage.damage_at_slot_level[cantrip_level];
                        const hit_die = document.createElement('p');
                        hit_die.classList.add('hit-die-text');
                        hit_die.textContent = "Damage: " + hit_die_num;
                        cantrip_data_container.appendChild(hit_die);
                    }
                }
            }
        });
        cantrip_container.appendChild(cantrip_dropdown_head);
        linkDropdown(cantrip_dropdown_head);
    }
}

/* OLD SPELL BUILDING STUFF */

/*spell_slot_map.forEach((spell_level_count) => {
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
    });*/