import {saveCombat} from './combat_saver.js';
let socket = null;

export function setSocket(io) {
    socket = io;
}

export function combatUpdatePlayerHealth(char_id, damage, heal, health, health_id) {
    //finds all instances of the player health id and changes all of them
    //DOES NOT CLEAR THE INPUTS
    const h = parseFloat(health.textContent) || 0;
    const heal_val = parseFloat(heal.value) || 0;
    const damage_val = parseFloat(damage.value) || 0;
    let new_health = h + heal_val - damage_val;

    const max_health_value = document.querySelector(".max-health-" + char_id).value;

    if(new_health > max_health_value) {
        new_health = max_health_value;
    }

    health.textContent = new_health.toString();
    document.querySelectorAll("." + health_id).forEach((element) => {
        element.textContent = new_health.toString();
    });
    socket.emit("host_update_health", {result: new_health, char_id: char_id});
}

export function combatUpdateHealth(combat, damage, heal, health, health_id, initiative_array = []) {
    //finds all instances of the health id of enemies and changes all of them
    //DOES CLEAR THE INPUTS
    const h = parseFloat(health.textContent) || 0;
    const heal_val = parseFloat(heal.value) || 0;
    const damage_val = parseFloat(damage.value) || 0;

    const enemy_id = health_id.replace("enemy-health-", "");

    const enemy_health_section = combat.querySelector(".enemy-health-section-" + enemy_id);
    const max_health = enemy_health_section.querySelector(".enemy-max-health").value;

    damage.value = '';
    heal.value = '';

    let new_health = h + heal_val - damage_val;
    if (new_health > max_health) {
        new_health = max_health;
    }
    health.textContent = new_health.toString();
    document.querySelectorAll("."+ health_id).forEach((element) => {
        element.textContent = new_health.toString();
    });
    saveCombat(combat, initiative_array);
}

export function setPlayerHealth(health, char_id) {
    //finds all instances of the id and sets the number of all of them to a new number
    const health_elements = document.querySelectorAll(".player-health-" + char_id);
    health_elements.forEach((h) => {
        h.textContent = health.toString();
    });
}