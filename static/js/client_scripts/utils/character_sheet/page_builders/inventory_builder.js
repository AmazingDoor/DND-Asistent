import * as inv_manager from './../inventory/inventory_item_manager.js';
import {weapons} from './../../../../shared/inventory/weapons.js';
import {getAllArmors} from './../../../../shared/inventory/armor.js';
import {items} from './../../../../shared/inventory/items.js';
import {getClassData, isUsingSpellbook} from './../mappers/class_mapper.js';
import * as character_data_handler from './../character_data_handler.js';
import {options as class_loadout_options} from './../../../../shared/inventory/class_loadout_options.js';
import { getPlayerLevel } from '../../../player_level_handler.js';
import { getAbilities } from '../mappers/ability_mapper.js';
import * as inventory_items from '../inventory_items.js';

let socket = null;
let name;
let char_id;
export function setSocket(io) {
    socket = io;
}

export async function Initialize() {
    name = sessionStorage.getItem("charName");
    char_id = sessionStorage.getItem("charId");
}

export async function rebuildInventory() {
    await inv_manager.clearVisualInventory();
    await buildInventory();
}

export function buildInventory() {
    const inventory_container = document.querySelector('.inventory-container');
    const test_inv = new inventory_items.InventoryContainer("Test Inventory");
    test_inv.addTo(inventory_container);

    const test_item = new inventory_items.InventoryItem(test_inv, "alchemists_fire_flask",'default', 1);
    test_inv.addItem(test_item);

    console.log(test_inv.getSaveData());
    //document.querySelector('.inventory-container').innerHTML = '';
    document.querySelector('.inventory-weapons').innerHTML = '';
    document.querySelector('.inventory-armor').innerHTML = '';
    document.querySelector('.mounts-container').innerHTML = '';
    character_data_handler.setMaxPreparedSpells();
    //createClassOptions();

    const class_data = getClassData();
    if (class_data === null || class_data === undefined) {
        return;
    }

    const inventory = character_data_handler.getInventory();
    let i = 0;
    inventory.forEach(item => {
        if(item.type === "item") {
            inv_manager.addItemToInventory(item.reference, i, item.from, item.count);
        } else if(item.type === "item_option") {
            inv_manager.addItemOptionToInventory(item.options, item.from, buildInventory);
        } else if( item.type === "container_item") {
            inv_manager.addContainerToInventory(item.reference, i, item.from, item.count, item.inventory);
        } else if(item.type === "spellbook_item") {
            inv_manager.addSpellbookToInventory(i, item.from, item.count, item.spells);
        }
        i++;
    });

    i = 0;
    const weapon_inventory = character_data_handler.getWeaponInventory();
    weapon_inventory.forEach(item => {
        if(item.type === "weapon_option") {
            inv_manager.addWeaponOptionToInventory(item.options, item.from, buildInventory);
        } else if(item.type === "weapon") {
            inv_manager.addWeaponToInventory(item.reference, i, item.from, item.count);
        }
        i++;
    });

    i = 0;
    const armor_inventory = character_data_handler.getArmorInventory();
    armor_inventory.forEach(item => {
        if(item.type === "armor_option") {
            inv_manager.addArmorOptionToInventory(item.options, item.from, buildInventory);
        } else if(item.type === "armor") {
            inv_manager.addArmorToInventory(item.reference, i, item.from, item.count);
        }
        i++;
    });

}



function getKey(d, d2) {
    for (let key in d) {
        if (d[key] === d2) {
            return key;
        }
    }
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}