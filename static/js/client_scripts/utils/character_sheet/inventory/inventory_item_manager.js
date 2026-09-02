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
import { addSpellToBookInventory, setSpellPrepared } from './../character_data_handler.js';
import { updateData as updateCombatSpellData, updateData } from '../page_builders/sub_builders/combat_builder.js';
import { saveInventory } from '../../../save_handler.js';
import * as spell_book_manager from './spell_book_manager.js';

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

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}
