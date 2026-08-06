import { items } from "../../../../shared/inventory/items.js";
import { getMagicSlots } from "../../../../shared/spell_caster_slot_map.js";
import { getPlayerLevel } from "../../../player_level_handler.js";
import { wizard } from "../../../../shared/spell_lists/wizard.js";
import { addSpellToBookInventory, setSpellPrepared, getMaxPreparedSpells, getCharacterAbilityModifiers } from "../character_data_handler.js";
import { updateData as updateCombatSpellData } from "../page_builders/sub_builders/combat_builder.js";
import { saveInventory } from "./savers/inventory_saver.js";
import { getAbilities } from "../mappers/ability_mapper.js";
import { bus, EVENTS } from "../../event_bus.js";

const inventory_list = document.querySelector('.inventory-container');

export function addSpellbookToInventory(index, f='default', count=1, spells) {
    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');

    const data_div = document.createElement('div');
    data_div.classList.add('item-data-div');

    const spells_div = document.createElement('div');
    spells_div.classList.add('item-inv-div');


    item_div.classList.add('container');
    item_div.dataset.tag = 'container-item';
    item_div.setAttribute('data-from', f)

    const item_name = document.createElement('p');
    const item_data = items.spellbook;


    item_name.textContent = item_data.name;
    data_div.appendChild(item_name);

    const item_count = document.createElement('input');
    item_count.type = 'number';
    item_count.value = count;
    data_div.appendChild(item_count);
    item_div.appendChild(data_div);

    const prepared_spell_count_container = document.createElement('div');
    prepared_spell_count_container.classList.add('prepared-spell-count-container');
    data_div.appendChild(prepared_spell_count_container);

    const prepared_spell_count_label = document.createElement('p');
    prepared_spell_count_label.textContent = "Prepared: ";
    prepared_spell_count_label.classList.add('prepared-spell-label');
    prepared_spell_count_label.classList.add('prepared-spell-count-format');
    data_div.appendChild(prepared_spell_count_label);

    const prepared_spell_num = document.createElement('p');
    prepared_spell_num.textContent = "0";
    prepared_spell_num.classList.add('prepared_spell_num');
    prepared_spell_num.classList.add('prepared-spell-count-format');
    data_div.appendChild(prepared_spell_num);

    const spell_num_divider = document.createElement('p');
    spell_num_divider.classList.add('prepared-spell-count-format');
    spell_num_divider.textContent = "/";
    data_div.appendChild(spell_num_divider);

    const max_prepared_spell_num = document.createElement('p');
    max_prepared_spell_num.textContent = '0';
    max_prepared_spell_num.classList.add('max-prepared-spell-num');
    max_prepared_spell_num.classList.add('prepared-spell-count-format');
    data_div.appendChild(max_prepared_spell_num);

    item_count.addEventListener("change", function() {
        character_data_handler.getInventory()[index].count = item_count.value;
        saveInventory();
    });

    item_div.appendChild(spells_div);


    addSpellsToBook(spells, spells_div, index);

    inventory_list.appendChild(item_div);
}

export function addSpellsToBook(saved_spells, spell_div, book_index) {
    const spell_slots = getMagicSlots("Wizard");
    const player_level = getPlayerLevel();


    const spell_slot_map_object = spell_slots.spell_slots;
    let spell_slot_map = [];
    if(spell_slot_map_object !== undefined) {
        spell_slot_map = spell_slot_map_object[player_level - 1] || [];
    }

    const max_spell_level = spell_slot_map.length;
    const spells = wizard.spells;
    spell_div.innterHTML = '';
    const spell_count = saved_spells.length;

    const spell_container = document.createElement('div');
    spell_div.appendChild(spell_container);

    for (let spell_index = 0; spell_index < spell_count; spell_index++) {
        const book_spell_container = document.createElement('div');
        book_spell_container.classList.add('book-spell-container');
        spell_container.appendChild(book_spell_container);

        const prepare_option_container = document.createElement('div');
        prepare_option_container.classList.add("prepare-option-container");
        book_spell_container.appendChild(prepare_option_container);

        const spell_dropdown_head = document.createElement('div');
        spell_dropdown_head.classList.add('dropdown-head');
        spell_dropdown_head.classList.add('spell-selector');
        const head_text = document.createElement('p');
        let t = "Select Spell";
        let prepared = false;
        if(spell_index in saved_spells && saved_spells.length > 0) {
            let spell_name = saved_spells[spell_index].spell_name;
            if(spell_name !== undefined && spell_name !== null) {
                t = spell_name;
                prepared = saved_spells[spell_index].prepared;
            }
            
        }

        head_text.textContent = t;
        spell_dropdown_head.appendChild(head_text);

        if(head_text.textContent != "Select Spell") {
            addCheckboxToSpell(prepare_option_container, prepared, spell_index, book_index);
        }

        const d = document.createElement('div');
        d.classList.add('dropdown');
        spell_dropdown_head.appendChild(d);

        const spell_dropdown = document.createElement('div');
        spell_dropdown.classList.add('spell-options');
        spell_dropdown.classList.add('dropdown-content');
        spell_dropdown.classList.add('hidden');
        d.appendChild(spell_dropdown);

        spells.forEach((spell) => {
            if(spell.level <= max_spell_level && spell.level !== 0) {
                const name = spell.name;
                const spell_option = document.createElement('div');
                spell_option.classList.add('spell-option');
                const spell_option_text = document.createElement('p');
                spell_option_text.textContent = name;
                spell_option.appendChild(spell_option_text);
                spell_dropdown.appendChild(spell_option);

                spell_option.addEventListener("click", function() {spellOptionClickEvent(spell_dropdown_head, spell_option_text, saved_spells, spell_index, book_index, prepare_option_container)});

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

        book_spell_container.appendChild(spell_dropdown_head);
        spell_dropdown_head.addEventListener("click", function() {
            const content = spell_dropdown_head.querySelector(".dropdown-content");
            content.classList.toggle("hidden");
        });
    }
}

function addCheckboxToSpell(prepare_option_container, prepared, spell_index, book_index) {
    prepare_option_container.textContent = '';
    const prepared_spell_checkbox_label = document.createElement("p");
    prepared_spell_checkbox_label.textContent = "Prepared";
    prepare_option_container.appendChild(prepared_spell_checkbox_label);

    const prepared_spell_checkbox = document.createElement('input');
    prepared_spell_checkbox.type = 'checkbox';
    prepared_spell_checkbox.id = '';
    prepared_spell_checkbox.classList.add('prepared-spell-checkbox');
    prepared_spell_checkbox.addEventListener("click", function() {
        togglePreparedSpell(prepared_spell_checkbox, spell_index, book_index);
        bus.publish(EVENTS.SPELL_PREPARED);
    });
    prepared_spell_checkbox.checked = prepared;
    prepare_option_container.appendChild(prepared_spell_checkbox);
}

function spellOptionClickEvent(head, option, spells, spell_index, book_index, prepare_option_container, prepared) {
    const txt = head.querySelector('p');
    txt.textContent = option.textContent;
    spells[spell_index] = option.textContent;
    addSpellToBookInventory(book_index, spell_index, option.textContent, false);
    saveInventory();
    addCheckboxToSpell(prepare_option_container, prepared, spell_index, book_index);
    bus.publish(EVENTS.SPELL_BOOK_SPELL_SELECTED);
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

function togglePreparedSpell(checkbox, spell_index, book_index) {
    if(checkbox.checked) {
        setSpellPrepared(book_index, spell_index, true);
    } else {
        setSpellPrepared(book_index, spell_index, false);
    }
    saveInventory();
}
