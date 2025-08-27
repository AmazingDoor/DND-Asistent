import * as character_data_handler from './../character_data_handler.js';

const inventory_list = document.querySelector('.inventory-container');

export function addWeaponOptionToInventory(options) {
    const item_div = document.createElement('div');
    item_div.classList.add('inventory-item');
    item_div.classList.add('weapon-option');

    const dropdown = document.createElement('select');
    dropdown.name = 'weapon-options';

    const placeholder = document.createElement('option');
    placeholder.textContent = "Select Weapon";
    dropdown.appendChild(placeholder);


    options.forEach(opt => {
        const option = document.createElement('option');
        option.textContent = opt.weapon.name;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        const weapon = dropdown.options[dropdown.selectedIndex];
        const value = weapon.value;
        const label = weapon.textContent;
        addWeaponToInventory(value);
        item_div.remove();
    });

    item_div.appendChild(dropdown);
    inventory_list.appendChild(item_div);
}

export function addArmorOptionToInventory(options) {

}

export function addItemOptionToInventory(options) {

}

export function addWeaponToInventory(weapon) {
    const weapon_div = document.createElement('div');
    weapon_div.classList.add('inventory-item');
    weapon_div.dataset.tag = 'weapon';

    const weapon_name = document.createElement('h3');
    weapon_name.textContent = weapon;
    weapon_div.appendChild(weapon_name);

    inventory_list.appendChild(weapon_div);

}

export function addArmorToInventory(armor) {

}

export function addItemToInventory(item) {

}

export function clearItems() {
    inventory_list.innerHTML = '';
    character_data_handler.setInventory([]);

}