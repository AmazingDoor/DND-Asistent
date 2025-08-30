import * as character_data_handler from './../character_data_handler.js';
import {weapons} from './../../../../shared/inventory/weapons.js';
import {getAllArmors} from './../../../../shared/inventory/armor.js';
import {items} from './../../../../shared/inventory/items.js';

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

export function addWeaponOptionToInventory(options, f='default', build_inventory) {
    if (options === null || options === undefined) {
        return;
    }
    if (options.length === 0) {
        return;
    }

    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('weapon-option');
    item_div.setAttribute('data-from', f);

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
        option.textContent = opt.count.toString() + " " + opt.weapon.name;
        option.dataset.weapon_reference = weapon_key;
        option.dataset.weapon_count = opt.count;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        const weapon = dropdown.options[dropdown.selectedIndex];
        const weapon_reference = weapon.dataset.weapon_reference;
        const weapon_count = weapon.dataset.weapon_count;
        const label = weapon.textContent;
        const children_array = [...dropdown.parentElement.children];
        const index = children_array.indexOf(dropdown);
        character_data_handler.removeItem(index);
        //addWeaponToInventory(weapon_reference, index, "default", weapon_count);
        character_data_handler.addInvWeapon(weapon_reference, f, weapon_count);
        build_inventory();
        item_div.remove();
        saveInventory();
    });

    item_div.appendChild(dropdown);
    inventory_list.appendChild(item_div);
}

export function addArmorOptionToInventory(options, f='default', build_inventory) {
        if (options === null || options === undefined) {
        return;
    }
    if (options.length === 0) {
        return;
    }

    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('weapon-option');
    item_div.setAttribute('data-from', f)

    const dropdown = document.createElement('select');
    dropdown.name = 'armor-options';

    const placeholder = document.createElement('option');
    placeholder.textContent = "Select Armor";
    dropdown.appendChild(placeholder);


    options.forEach(opt => {
        let armor_key = null;
        for (let key in armors) {
            if(armors[key] === opt.armor) {
                armor_key = key;
            }
        }
        const option = document.createElement('option');
        option.textContent = opt.count.toString() + " " + opt.armor.name;
        option.dataset.armor_reference = armor_key;
        option.dataset.armor_count = opt.count;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        const armor = dropdown.options[dropdown.selectedIndex];
        const armor_reference = armor.dataset.armor_reference;
        const armor_count = armor.dataset.armor_count;
        const label = armor.textContent;
        const children_array = [...dropdown.parentElement.children];
        const index = children_array.indexOf(dropdown);
        character_data_handler.removeItem(index);
        //addArmorToInventory(armor_reference, index, "default", armor_count);
        character_data_handler.addInvArmor(armor_reference, f, armor_count);
        build_inventory();
        item_div.remove();
        saveInventory();
    });

    item_div.appendChild(dropdown);
    inventory_list.appendChild(item_div);
}

export function addItemOptionToInventory(options, f='default', build_inventory) {
    if (options === null || options === undefined) {
        return;
    }
    if (options.length === 0) {
        return;
    }

    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('inventory-option');
    item_div.setAttribute('data-from', f)

    const dropdown = document.createElement('select');
    dropdown.name = 'armor-options';

    const placeholder = document.createElement('option');
    placeholder.textContent = "Select Item";
    dropdown.appendChild(placeholder);

    options.forEach(opt => {
        let item_key = null;
        for (let key in items) {
            if(items[key] === opt.item) {
                item_key = key;
            }
        }
        const option = document.createElement('option');
        option.textContent = opt.count.toString() + " " + opt.item.name;
        option.dataset.item_reference = item_key;
        option.dataset.item_count = opt.count;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        const item = dropdown.options[dropdown.selectedIndex];
        const item_reference = item.dataset.item_reference;
        const item_count = item.dataset.item_count;
        const label = item.textContent;
        const children_array = [...dropdown.parentElement.children];
        const index = children_array.indexOf(dropdown);
        character_data_handler.removeItem(index);
        //addItemToInventory(item_reference, index, "default", item_count);
        character_data_handler.addInvItem(item_reference, f, item_count);
        build_inventory();
        item_div.remove();
        saveInventory();
    });

    item_div.appendChild(dropdown);
    inventory_list.appendChild(item_div);
}

export function addWeaponToInventory(weapon_reference, index, f='default', count=1) {
    const weapon_div = document.createElement('div');
    weapon_div.classList.add('inventory-item');
    weapon_div.dataset.tag = 'weapon';

    const weapon_name = document.createElement('h3');
    const weapon_data = weapons[weapon_reference];

    weapon_name.textContent = weapon_data.name;
    weapon_div.appendChild(weapon_name);

    const weapon_count = document.createElement('input');
    weapon_count.type = 'number';
    weapon_count.value = count.toString();
    weapon_div.appendChild(weapon_count);

    weapon_count.addEventListener("change", function() {
        console.log(index);
        console.log(character_data_handler.getInventory());
        character_data_handler.getInventory()[index].count = weapon_count.value;
        saveInventory();
    });

    inventory_list.appendChild(weapon_div);


}

export function addArmorToInventory(armor_reference, index, f='default', count=1) {
    const armor_div = document.createElement('div');
    armor_div.classList.add('inventory-item');
    armor_div.dataset.tag = 'armor';

    const armor_name = document.createElement('h3');
    const armor_data = armors[armor_reference];


    armor_name.textContent = armor_data.name;
    armor_div.appendChild(armor_name);

    const armor_count = document.createElement('input');
    armor_count.type = 'number';
    armor_count.value = count.toString();
    armor_div.appendChild(armor_count);

    armor_count.addEventListener("change", function() {
        character_data_handler.getInventory()[index].count = armor_count.value;
        saveInventory();
    });

    inventory_list.appendChild(armor_div);
}

export function addItemToInventory(item_reference, index, f='default', count=1) {
    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.dataset.tag = 'item';

    const item_name = document.createElement('h3');
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

    inventory_list.appendChild(item_div);}

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