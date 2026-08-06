import * as character_data_handler from "../../character_data_handler.js";

let socket = null;
let char_id = '';


export function SetSocket(io) {
    socket = io;
    char_id = sessionStorage.getItem('charId');
}

export function saveInventory() {
    const inventory = character_data_handler.getInventory();
    const weapon_inventory = character_data_handler.getWeaponInventory();
    const armor_inventory = character_data_handler.getArmorInventory();
    const mount_inventory = character_data_handler.getMountInventory();
    const inv = {inv: inventory, weapon: weapon_inventory, armor: armor_inventory, mount: mount_inventory};
    socket.emit('save_inventory', { char_id: char_id, inventory: inv});
}