import * as character_data_handler from './../character_data_handler.js';
import {weapons} from './../../../../shared/inventory/weapons.js';
import {other_item_types} from './../../../../shared/class_proficiencies.js';
import {getAllArmors} from './../../../../shared/inventory/armor.js';
import {items} from './../../../../shared/inventory/items.js';
import {getPlayerLevel} from './../../../player_level_handler.js';
import {linkDropdown} from './../../dropdown_handler.js';
import {getClassName} from './../mappers/class_mapper.js';
import {wizard} from './../../../../shared/spell_lists/wizard.js';
import {getMagicSlots} from './../../../../shared/spell_caster_slot_map.js';
import {options as class_loadout_options} from './../../../../shared/inventory/class_loadout_options.js';
import { addSpellToBookInventory } from './../character_data_handler.js';
import { updateData as updateCombatSpellData } from '../page_builders/sub_builders/combat_builder.js';

const inventory_list = document.querySelector('.inventory-container');
const weapon_list = document.querySelector('.inventory-weapons');
const armor_list = document.querySelector('.inventory-armor');
const mount_list = document.querySelector('.mounts-container');

let armors;
document.addEventListener("DOMContentLoaded", function() {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
    armors = getAllArmors();
});

let socket = null;

export function setSocket(io) {
    socket = io;
}


export function addWeaponOptionToInventory(option_ref, f = 'default', build_inventory) {
    if (option_ref === null || option_ref === undefined || option_ref.length === 0) {
        return;
    }
    const options = class_loadout_options[option_ref];

    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('weapon-option');
    item_div.setAttribute('data-from', f);

    // Create the custom dropdown container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('custom-dropdown');

    // Create the dropdown toggle (displayed item)
    const dropdownToggle = document.createElement('div');
    dropdownToggle.classList.add('dropdown-toggle');
    dropdownToggle.textContent = 'Select Weapon';  // Placeholder text

    // Create the options container (hidden by default)
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    optionsContainer.style.display = 'none';  // Initially hidden

    // Iterate over the options to create custom options

    options.forEach(opt => {
        let weapon_key = null;
        for (let key in weapons) {
            if (weapons[key] === opt.weapon) {
                weapon_key = key;
            }
        }

        let option = document.createElement('div');
        option.classList.add('custom-option');

        let option_row = document.createElement('div');

        option_row.textContent = opt.count.toString() + " " + opt.weapon.name;
        option.dataset.weapon_reference = weapon_key;
        option.dataset.weapon_count = opt.count;
        option.appendChild(option_row);
        const other_items = opt.other;

        if(opt.ammo !== 0 && opt.ammo !== undefined) {
            const ammo_row = document.createElement('div');
            ammo_row.classList.add('display-horizontal');
            const ammo_name = document.createElement('p');
            const ammo_count = document.createElement('p');
            ammo_name.textContent = items[weapons[weapon_key].ammo_type].name;
            ammo_count.textContent = opt.ammo.toString();

            ammo_row.appendChild(ammo_count);
            ammo_row.appendChild(ammo_name);
            option.appendChild(ammo_row);
            option.dataset.ammo_count = opt.ammo;
        }

        if(opt.other !== undefined) {
            option = addOtherItemsToOption(option, other_items);
        }


        // Handle option selection
        option.addEventListener('click', () => {
            const weapon_reference = option.dataset.weapon_reference;
            const weapon_count = option.dataset.weapon_count;
            const ammo_count = option.dataset.ammo_count;

            const label = option.textContent;
            const children_array = [...dropdownContainer.parentElement.parentElement.children];
            const index = children_array.indexOf(dropdownContainer.parentElement);

            character_data_handler.removeWeapon(index);
            character_data_handler.addInvWeapon(weapon_reference, f, weapon_count);

            const ammo_type = weapons[weapon_reference].ammo_type;
            if (ammo_type !== null) {
                character_data_handler.addInvItem(ammo_type, f, ammo_count);
            }


            if(opt.other !== undefined) {
                const other_items = opt.other;
                addOtherItemsToInventory(other_items, f);
            }

            build_inventory();
            item_div.remove();
            saveInventory();
        });

        optionsContainer.appendChild(option);
    });

    // Append options container to dropdown container
    dropdownContainer.appendChild(dropdownToggle);
    dropdownContainer.appendChild(optionsContainer);
    item_div.appendChild(dropdownContainer);

    // Append the item_div to the weapon list (parent container)
    weapon_list.appendChild(item_div);

    // Toggle dropdown visibility on click
    dropdownToggle.addEventListener('click', () => {
        const isOpen = optionsContainer.style.display === 'block';
        optionsContainer.style.display = isOpen ? 'none' : 'block';
    });
}


export function addArmorOptionToInventory(option_ref, f = 'default', build_inventory) {
    if (option_ref === null || option_ref === undefined || option_ref.length === 0) {
        return;
    }


    const options = class_loadout_options[option_ref];

    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('armor-option');
    item_div.setAttribute('data-from', f);

    // Create the custom dropdown container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('custom-dropdown');

    // Create the dropdown toggle (displayed item)
    const dropdownToggle = document.createElement('div');
    dropdownToggle.classList.add('dropdown-toggle');
    dropdownToggle.textContent = 'Select Armor';  // Placeholder text

    // Create the options container (hidden by default)
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    optionsContainer.style.display = 'none';  // Initially hidden

    // Iterate over the options to create the custom options
    options.forEach(opt => {
        let armor_key = null;
        for (let key in armors) {
            if (armors[key] === opt.armor) {
                armor_key = key;
            }
        }

        let option = document.createElement('div');
        option.classList.add('custom-option');

        let option_row = document.createElement('div');

        option_row.textContent = opt.count.toString() + " " + opt.armor.name;
        option.dataset.armor_reference = armor_key;
        option.dataset.armor_count = opt.count;
        option.appendChild(option_row);
        const other_items = opt.other;
        if(opt.other !== undefined) {
            option = addOtherItemsToOption(option, other_items);
        }


        // Handle option selection
        option.addEventListener('click', () => {
            const armor_reference = option.dataset.armor_reference;
            const armor_count = option.dataset.armor_count;


            const label = option.textContent;
            const children_array = [...dropdownContainer.parentElement.parentElement.children];
            const index = children_array.indexOf(dropdownContainer.parentElement);

            character_data_handler.removeArmor(index);
            character_data_handler.addInvArmor(armor_reference, f, armor_count);

            if(opt.other !== undefined) {
                const other_items = opt.other;
                addOtherItemsToInventory(other_items, f);
            }

            build_inventory();
            item_div.remove();
            saveInventory();
        });

        optionsContainer.appendChild(option);
    });

    // Append options container to dropdown container
    dropdownContainer.appendChild(dropdownToggle);
    dropdownContainer.appendChild(optionsContainer);
    item_div.appendChild(dropdownContainer);

    // Append the item_div to the armor list (parent container)
    armor_list.appendChild(item_div);

    // Toggle dropdown visibility on click
    dropdownToggle.addEventListener('click', () => {
        const isOpen = optionsContainer.style.display === 'block';
        optionsContainer.style.display = isOpen ? 'none' : 'block';
    });
}

export function addItemOptionToInventory(option_ref, f = 'default', build_inventory) {
    if (option_ref === null || option_ref === undefined || option_ref.length === 0) {
        return;
    }

    const options = class_loadout_options[option_ref];

    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('inventory-option');
    item_div.setAttribute('data-from', f);

    // Create a custom dropdown container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('custom-dropdown');

    // Create the dropdown toggle (displayed item)
    const dropdownToggle = document.createElement('div');
    dropdownToggle.classList.add('dropdown-toggle');
    dropdownToggle.textContent = 'Select Item';  // Placeholder text

    // Create the options container (hidden by default)
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    optionsContainer.style.display = 'none';  // Initially hidden

    // Iterate over the options to create the custom options
    options.forEach(opt => {
        let item_key = null;
        for (let key in items) {
            if (items[key] === opt.item) {
                item_key = key;
            }
        }

        const option = document.createElement('div');
        option.classList.add('custom-option');

        let option_row = document.createElement('div');
        option_row.textContent = opt.count.toString() + " " + opt.item.name;
        option.dataset.item_reference = item_key;
        option.dataset.item_count = opt.count;
        option.appendChild(option_row);
        const other_items = opt.other;
        if(opt.other !== undefined) {
            option = addOtherItemsToOption(option, other_items);
        }

        option.dataset.item_inv = "0";
        if (opt.item.contents.length > 0) {
            option.dataset.item_inv = "1";
        }

        option.addEventListener('click', () => {
            const item_reference = option.dataset.item_reference;
            const item_count = option.dataset.item_count;
            const label = option.textContent;

            // Find the index of the item_div in the parent
            const children_array = [...dropdownContainer.parentElement.parentElement.children];
            const index = children_array.indexOf(dropdownContainer.parentElement);

            character_data_handler.removeItem(index);
            if (option.dataset.item_inv === "1") {
                character_data_handler.addInvContainerItem(item_reference, f, item_count);
            } else {
                character_data_handler.addInvItem(item_reference, f, item_count);
            }


            if(opt.other !== undefined) {
                const other_items = opt.other;
                addOtherItemsToInventory(other_items, f);
            }

            build_inventory();
            item_div.remove();
            saveInventory();
        });

        optionsContainer.appendChild(option);
    });

    // Append options container to dropdown container
    dropdownContainer.appendChild(dropdownToggle);
    dropdownContainer.appendChild(optionsContainer);
    item_div.appendChild(dropdownContainer);
    inventory_list.appendChild(item_div);

    // Toggle dropdown visibility on click
    dropdownToggle.addEventListener('click', () => {
        const isOpen = optionsContainer.style.display === 'block';
        optionsContainer.style.display = isOpen ? 'none' : 'block';
    });
}



export function addWeaponToInventory(weapon_reference, index, f='default', count=1, ammo=0) {
    const weapon_div = document.createElement('div');
    weapon_div.classList.add('inventory-item');
    weapon_div.dataset.tag = 'weapon';
    weapon_div.setAttribute('data-from', f)

    const weapon_name = document.createElement('p');
    const weapon_data = weapons[weapon_reference];

    weapon_name.textContent = weapon_data.name;
    weapon_div.appendChild(weapon_name);

    const weapon_count = document.createElement('input');
    weapon_count.type = 'number';
    weapon_count.value = count.toString();
    weapon_div.appendChild(weapon_count);

    weapon_count.addEventListener("change", function() {
        character_data_handler.getWeaponInventory()[index].count = weapon_count.value;
        saveInventory();
    });

    weapon_list.appendChild(weapon_div);


}

export function addArmorToInventory(armor_reference, index, f='default', count=1) {
    const armor_div = document.createElement('div');
    armor_div.classList.add('inventory-item');
    armor_div.dataset.tag = 'armor';
    armor_div.setAttribute('data-from', f)

    const armor_name = document.createElement('p');
    const armor_data = armors[armor_reference];

    armor_name.textContent = armor_data.name;
    armor_div.appendChild(armor_name);

    const armor_count = document.createElement('input');
    armor_count.type = 'number';
    armor_count.value = count.toString();
    armor_div.appendChild(armor_count);

    armor_count.addEventListener("change", function() {
        character_data_handler.getArmorInventory()[index].count = armor_count.value;
        saveInventory();
    });

    armor_list.appendChild(armor_div);
}

export function addItemToInventory(item_reference, index, f='default', count=1) {
    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.dataset.tag = 'item';
    item_div.setAttribute('data-from', f)

    const item_name = document.createElement('p');
    const item_data = items[item_reference];

    item_name.textContent = item_data.name;
    item_div.appendChild(item_name);

    const item_count = document.createElement('input');
    item_count.type = 'number';
    item_count.value = count;
    item_div.appendChild(item_count);

    item_count.addEventListener("change", function() {
        character_data_handler.getInventory()[index].count = item_count.value;
        saveInventory();
    });

    inventory_list.appendChild(item_div);
}

export function addContainerToInventory(item_reference, index, f='default', count=1, inv) {
    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');

    const data_div = document.createElement('div');
    data_div.classList.add('item-data-div');

    const inv_div = document.createElement('div');
    inv_div.classList.add('item-inv-div');


    item_div.classList.add('container');
    item_div.dataset.tag = 'container-item';
    item_div.setAttribute('data-from', f)

    const item_name = document.createElement('p');
    const item_data = items[item_reference];


    item_name.textContent = item_data.name;
    data_div.appendChild(item_name);

    const item_count = document.createElement('input');
    item_count.type = 'number';
    item_count.value = count;
    data_div.appendChild(item_count);
    item_div.appendChild(data_div);

    item_count.addEventListener("change", function() {
        character_data_handler.getInventory()[index].count = item_count.value;
        saveInventory();
    });

    item_div.appendChild(inv_div);


    buildItemContainerInv(inv, inv_div);

    inventory_list.appendChild(item_div);
}

export function buildItemContainerInv(inv, display) {
    const item_table = document.createElement('table');
    for(let i = 0; i < inv.length; i++) {
        const item = inv[i];
        const item_reference = item.item_reference;
        const count = item.count;
        const item_data = items[item_reference];

        const item_name = document.createElement('p');
        item_name.textContent = item_data.name;

        const item_count = document.createElement('input');
        item_count.type = 'number';
        item_count.value = count;

        const table_row = document.createElement('tr');
        const left_side = document.createElement('td');
        const right_side = document.createElement('td');

        left_side.appendChild(item_name);
        right_side.appendChild(item_count);
        table_row.appendChild(left_side);
        table_row.appendChild(right_side);

        item_table.appendChild(table_row);

        item_count.addEventListener('change', function() {
            inv[i].count = item_count.value;
            saveInventory();
        });
    }
    display.appendChild(item_table);
}

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

        const spell_dropdown_head = document.createElement('div');
        spell_dropdown_head.classList.add('dropdown-head');
        spell_dropdown_head.classList.add('spell-selector');
        const head_text = document.createElement('p');
        let t = "Select Spell";
        if(spell_index in saved_spells && saved_spells.length > 0) {
            t = saved_spells[spell_index];
        }

        head_text.textContent = t;
        spell_dropdown_head.appendChild(head_text);

        if(head_text.textContent != "Select Spell") {
            const prepared_spell_checkbox = document.createElement('input');
            prepared_spell_checkbox.type = 'checkbox';
            prepared_spell_checkbox.id = '';
            prepared_spell_checkbox.classList.add('prepared-spell-checkbox');
            book_spell_container.appendChild(prepared_spell_checkbox);
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

                spell_option.addEventListener("click", function() {spellOptionClickEvent(spell_dropdown_head, spell_option_text, saved_spells, spell_index, book_index)});

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

//SPELL STUFF//
function spellOptionClickEvent(head, option, spells, spell_index, book_index) {
    const txt = head.querySelector('p');
    txt.textContent = option.textContent;
    spells[spell_index] = option.textContent;
    addSpellToBookInventory(book_index, spell_index, option.textContent);
    saveInventory();
    updateCombatSpellData();
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
///////////////

export function clearVisualInventory() {
    inventory_list.innerHTML = '';
    weapon_list.innerHTML = '';
    armor_list.innerHTML = '';
}

export function clearItems() {
    inventory_list.innerHTML = '';
    weapon_list.innerHTML = '';
    armor_list.innerHTML = '';
    character_data_handler.setInventory({inv: [], weapon: [], armor: []});

}

export function saveInventory() {
    const inventory = character_data_handler.getInventory();
    console.log(inventory);
    const weapon_inventory = character_data_handler.getWeaponInventory();
    const armor_inventory = character_data_handler.getArmorInventory();
    const mount_inventory = character_data_handler.getMountInventory();
    const inv = {inv: inventory, weapon: weapon_inventory, armor: armor_inventory, mount: mount_inventory};
    socket.emit('save_inventory', { char_id: char_id, inventory: inv});
}

function addOtherItemsToInventory(other_items, f) {
    other_items.forEach(item => {
        const item_type = item.type;
        let item_key = null;
        const item_count = item.count;

        if(item_type === other_item_types.weapon) {
            for (let key in weapons) {
                if (weapons[key] === item.item) {
                    item_key = key;
                }
            }
            character_data_handler.addInvWeapon(item_key, f, item_count);
            const ammo_type = weapons[item_key].ammo_type;
            if (ammo_type !== null) {
                character_data_handler.addInvItem(ammo_type, f, item.ammo);
            }

        } else if (item_type === other_item_types.armor) {
            for (let key in armors) {
                if (getAllArmors()[key] === item.item) {
                    item_key = key;
                }
            }
            character_data_handler.addInvArmor(item_key, f, item_count);

        } else if (item_type === other_item_types.item) {
            for (let key in items) {
                if (items[key] === item.item) {
                    item_key = key;
                }
            }
            character_data_handler.addInvItem(item_key, f, item_count);
        } else if (item_type === other_item_types.weapon_choice) {
            character_data_handler.addInvOption("weapon_option", item.options, f);
        }
    });
}

function addOtherItemsToOption(option, other_items) {
    const item_row = document.createElement('div');
    item_row.classList.add('display-horizontal');
    other_items.forEach(item => {

        if(item.type === other_item_types.weapon || item.type === other_item_types.armor || item.type === other_item_types.item) {
            const item_name = document.createElement('p');
            const item_count = document.createElement('p');

            item_name.textContent = item.item.name  + " ";
            item_count.textContent = item.count;

            item_row.appendChild(item_count);
            item_row.appendChild(item_name);
            option.appendChild(item_row);

            if(item.ammo !== 0 && item.ammo !== undefined) {
                const item_type = item.type;
                let item_key = null;
                if(item_type === other_item_types.weapon) {
                    for (let key in weapons) {
                        if (weapons[key] === item.item) {
                            item_key = key;
                        }
                    }

                } else if (item_type === other_item_types.armor) {
                    for (let key in armors) {
                        if (getAllArmors()[key] === item.item) {
                            item_key = key;
                        }
                    }
                } else if (item_type === other_item_types.item) {
                    for (let key in items) {
                        if (items[key] === item.item) {
                            item_key = key;
                        }
                    }
                }
                const ammo_row = document.createElement('div');
                ammo_row.classList.add('display-horizontal');
                const ammo_name = document.createElement('p');
                const ammo_count = document.createElement('p');
                ammo_name.textContent = items[weapons[item_key].ammo_type].name;
                ammo_count.textContent = item.ammo.toString() + " ";

                ammo_row.appendChild(ammo_count);
                ammo_row.appendChild(ammo_name);
                option.appendChild(ammo_row);
            }
        } else {
            const item_name = document.createElement('p');
            item_name.textContent = item.label;
            item_row.appendChild(item_name);
            option.appendChild(item_row);
        }
    });

    return option;
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}
