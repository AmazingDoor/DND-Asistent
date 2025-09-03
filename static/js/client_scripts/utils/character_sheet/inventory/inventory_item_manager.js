import * as character_data_handler from './../character_data_handler.js';
import {weapons} from './../../../../shared/inventory/weapons.js';
import {getAllArmors} from './../../../../shared/inventory/armor.js';
import {items} from './../../../../shared/inventory/items.js';

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
        const children_array = [...dropdown.parentElement.parentElement.children];

        const index = children_array.indexOf(dropdown.parentElement);
        character_data_handler.removeWeapon(index);
        character_data_handler.addInvWeapon(weapon_reference, f, weapon_count);
        build_inventory();
        item_div.remove();
        saveInventory();
    });

    item_div.appendChild(dropdown);
    weapon_list.appendChild(item_div);
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
        const children_array = [...dropdown.parentElement.parentElement.children];
        const inv_container_children = [...inventory_list.children];
        const inv_weapons = [...weapon_list.children];
        const index = children_array.indexOf(dropdown.parentElement);
        character_data_handler.removeArmor(index);
        character_data_handler.addInvArmor(armor_reference, f, armor_count);
        build_inventory();
        item_div.remove();
        saveInventory();
    });

    item_div.appendChild(dropdown);
    armor_list.appendChild(item_div);
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
        option.dataset.item_inv = "0";
        if (opt.item.contents.length > 0) {
            option.dataset.item_inv = "1";
        }
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        const item = dropdown.options[dropdown.selectedIndex];
        const item_reference = item.dataset.item_reference;
        const item_count = item.dataset.item_count;
        const label = item.textContent;
        const children_array = [...dropdown.parentElement.parentElement.children];
        const index = children_array.indexOf(dropdown.parentElement);
        character_data_handler.removeItem(index);
        if (item.dataset.item_inv === "1") {
            character_data_handler.addInvContainerItem(item_reference, f, item_count);
        } else {
            character_data_handler.addInvItem(item_reference, f, item_count);
        }
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


    buildItemInv(inv, inv_div);

    inventory_list.appendChild(item_div);
}

export function buildItemInv(inv, display) {
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
    }
    display.appendChild(item_table);
}

export function clearItems() {
    inventory_list.innerHTML = '';
    weapon_list.innerHTML = '';
    armor_list.innerHTML = '';
    character_data_handler.setInventory({inv: [], weapon: [], armor: []});

}

export function saveInventory() {
    const inventory = character_data_handler.getInventory();
    const weapon_inventory = character_data_handler.getWeaponInventory();
    const armor_inventory = character_data_handler.getArmorInventory();
    const mount_inventory = character_data_handler.getMountInventory();
    const inv = {inv: inventory, weapon: weapon_inventory, armor: armor_inventory, mount: mount_inventory};
    socket.emit('save_inventory', { char_id: char_id, inventory: inv});
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}