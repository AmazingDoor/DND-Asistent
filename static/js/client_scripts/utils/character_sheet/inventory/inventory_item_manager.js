import * as character_data_handler from './../character_data_handler.js';
import {weapons} from './../../../../shared/inventory/weapons.js';
import {getAllArmors} from './../../../../shared/inventory/armor.js';

const inventory_list = document.querySelector('.inventory-container');

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

export function addWeaponOptionToInventory(options) {
    if (options.length === 0 || options === null || options === undefined) {
        return;
    }

    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('weapon-option');

    const dropdown = document.createElement('select');
    dropdown.name = 'weapon-options';

    const placeholder = document.createElement('option');
    placeholder.textContent = "Select Weapon";
    dropdown.appendChild(placeholder);

    options.forEach(opt => {
        let weapon_key = null;
        for (let key in weapons) {
            if(weapons[key] === opt.weapon) {
                weapon_key = key;
            }
        }
        const option = document.createElement('option');
        option.textContent = opt.weapon.name;
        option.dataset.weapon_reference = weapon_key;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        const weapon = dropdown.options[dropdown.selectedIndex];
        const weapon_reference = weapon.dataset.weapon_reference;
        const label = weapon.textContent;
        const children_array = [...dropdown.parentElement.children];
        const index = children_array.indexOf(dropdown);
        character_data_handler.removeItem(index);
        addWeaponToInventory(weapon_reference);
        character_data_handler.addInvWeapon(weapon_reference);
        item_div.remove();
        saveInventory();
    });

    item_div.appendChild(dropdown);
    inventory_list.appendChild(item_div);
}

export function addArmorOptionToInventory(options) {
    if (options.length === 0 || options === null || options === undefined) {
        return;
    }

    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('weapon-option');

    const dropdown = document.createElement('select');
    dropdown.name = 'armor-options';

    const placeholder = document.createElement('option');
    placeholder.textContent = "Select Armor";
    dropdown.appendChild(placeholder);

    options.forEach(opt => {
        let armor_key = null;
        for (let key in armors) {
            if(armors[key] === opt) {
                armor_key = key;
            }
        }
        const option = document.createElement('option');
        option.textContent = opt.name;
        option.dataset.armor_reference = armor_key;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        const armor = dropdown.options[dropdown.selectedIndex];
        const armor_reference = armor.dataset.armor_reference;
        const label = armor.textContent;
        const children_array = [...dropdown.parentElement.children];
        const index = children_array.indexOf(dropdown);
        character_data_handler.removeItem(index);
        addArmorToInventory(armor_reference);
        character_data_handler.addInvArmor(armor_reference);
        item_div.remove();
        saveInventory();
    });

    item_div.appendChild(dropdown);
    inventory_list.appendChild(item_div);
}

export function addItemOptionToInventory(options) {

}

export function addWeaponToInventory(weapon_reference, count = 1) {
    const weapon_div = document.createElement('div');
    weapon_div.classList.add('inventory-item');
    weapon_div.dataset.tag = 'weapon';

    const weapon_name = document.createElement('h3');
    const weapon_data = weapons[weapon_reference];

    weapon_name.textContent = weapon_data.name;
    weapon_div.appendChild(weapon_name);

    inventory_list.appendChild(weapon_div);


}

export function addArmorToInventory(armor_reference) {
    console.log(armor_reference);

    const armor_div = document.createElement('div');
    armor_div.classList.add('inventory-item');
    armor_div.dataset.tag = 'armor';

    const armor_name = document.createElement('h3');
    const armor_data = armors[armor_reference];

    armor_name.textContent = armor_data.name;
    armor_div.appendChild(armor_name);

    inventory_list.appendChild(armor_div);
}

export function addItemToInventory(item) {

}

export function clearItems() {
    inventory_list.innerHTML = '';
    character_data_handler.setInventory([]);

}

export function saveInventory() {
    const inv = character_data_handler.getInventory();
    socket.emit('save_inventory', { char_id: char_id, inventory: inv});
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}