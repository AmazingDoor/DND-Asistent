import {combatUpdatePlayerHealth, combatUpdateHealth} from './health_handler.js';
import {saveCombat} from './combat_saver.js';
let socket = null;

export function setSocket(io) {
    socket = io;
}

export function createEnemyHealthSection(h, enemy_id, combat_element, enemy_max_health = 0, combat_order = []) {
    const health_section = document.createElement("div");
    health_section.classList.add("enemy-health-section-" + enemy_id);
    health_section.classList.add("enemy-health-section");
    health_section.classList.add("enemy-health-section-style");

    const health_left = document.createElement("div");
    health_left.classList.add("enemy-health-inner");
    health_left.classList.add("enemy-health-inner-style");
    health_section.appendChild(health_left);

    const health_middle = document.createElement("div");
    health_middle.classList.add("enemy-health-inner");
    health_middle.classList.add("enemy-health-inner-style");
    health_section.appendChild(health_middle);

    const health_right = document.createElement("div");
    health_right.classList.add("enemy-health-inner");
    health_right.classList.add("enemy-health-inner-style");
    health_section.appendChild(health_right);


    const max_health_label = document.createElement('p');
    max_health_label.classList.add('enemy-max-health-label');
    max_health_label.textContent = "Max Health";

    const max_health = document.createElement('input');
    max_health.type = 'number';
    max_health.value = enemy_max_health;
    max_health.classList.add('enemy-max-health');
    health_middle.appendChild(max_health_label);
    health_middle.appendChild(max_health);


    let hl = document.createElement("h3");
    hl.textContent = "Health";
    hl.classList.add('enemy-health-label');
    const health = document.createElement("h3");
    const health_id = "enemy-health-" + enemy_id;
    health.classList.add("enemy-health-num");
    health.classList.add(health_id);
    health.classList.add("enemy-health-style");

    if(h !== null) {
        health.textContent = h;
    } else {
        health.textContent = "0";
    }

    const damage_label = document.createElement("h3");
    damage_label.textContent = "Damage";
    damage_label.classList.add("enemy-damage-label");
    const damage_input = document.createElement("input");
    damage_input.classList.add("enemy-damage-input");
    damage_input.classList.add("enemy-damage-input-style");

    damage_input.type = "number";
    health_left.appendChild(damage_label);
    health_left.appendChild(damage_input);

    const update_health_button = document.createElement("button");
    update_health_button.textContent = "Update";
    update_health_button.onclick = function () { combatUpdateHealth(combat_element, damage_input, heal_input, health, health_id); };
    health_middle.appendChild(hl);
    health_middle.appendChild(health);
    health_middle.appendChild(update_health_button);

    const heal_label = document.createElement("h3");
    heal_label.textContent = "Heal";
    heal_label.classList.add("enemy-heal-label");
    const heal_input = document.createElement("input");
    heal_input.classList.add("enemy-heal-input");
    heal_input.classList.add("enemy-heal-input-style");

    heal_input.type = "number";
    health_right.appendChild(heal_label);
    health_right.appendChild(heal_input);

    max_health.addEventListener("change", function() {
        const health_sections = combat_element.querySelectorAll(".enemy-health-section-" + enemy_id);
        health_sections.forEach((section) => {
            const max_health_input = section.querySelector(".enemy-max-health");
            const health_num = section.querySelector(".enemy-health-num");

            max_health_input.value = max_health.value;
            if(max_health.value < parseInt(health_num.textContent)) {
                health_num.textContent = max_health.value.toString();
            }
        });

        saveCombat(combat_element, combat_order);
    });

    return [health_section, heal_input, damage_input, health, health_id];
}

export function createPlayerHealthSection(player_health_num, player_id, combat_element, player_max_health = 0) {
    const health_section = document.createElement("div");
    health_section.classList.add("enemy-health-section-style");

    const health_left = document.createElement("div");
    health_left.classList.add("enemy-health-inner-style");
    health_section.appendChild(health_left);

    const health_middle = document.createElement("div");
    health_middle.classList.add("enemy-health-inner-style");
    health_section.appendChild(health_middle);

    const health_right = document.createElement("div");
    health_right.classList.add("enemy-health-inner-style");
    health_section.appendChild(health_right);


    const hl = document.createElement("h3");
    hl.textContent = "Health";
    hl.classList.add('player-health-label');
    const health = document.createElement("h3");
    const health_id = "player-health-" + player_id;
    health.classList.add(health_id);
    health.classList.add("enemy-health-style");
    if(player_health_num !== null) {
        health.textContent = player_health_num;
    } else {
        health.textContent = "0";
    }
    health.type = "number";

    const damage_label = document.createElement("h3");
    damage_label.textContent = "Damage";
    damage_label.classList.add('player-damage-label');
    const damage_input = document.createElement("input");
    damage_input.classList.add("enemy-damage-input-style");
    damage_input.type = "number";
    health_left.appendChild(damage_label);
    health_left.appendChild(damage_input);

    const max_health_label = document.createElement("p");
    max_health_label.textContent = "Max Health";
    max_health_label.classList.add('player-max-health-label');
    const max_health = document.createElement('input');
    max_health.type = 'number';
    max_health.classList.add('player-max-health');
    const max_health_id = 'max-health-' + player_id;
    max_health.classList.add(max_health_id);
    max_health.value = player_max_health;

    health_middle.appendChild(max_health_label);
    health_middle.appendChild(max_health);

    const update_health_button = document.createElement("button");
    update_health_button.textContent = "Update";
    update_health_button.onclick = function () {
        combatUpdatePlayerHealth(player_id, damage_input, heal_input, health, health_id);
        heal_input.value = '';
        damage_input.value = '';
    };
    health_middle.appendChild(hl);
    health_middle.appendChild(health);
    health_middle.appendChild(update_health_button);

    const heal_label = document.createElement("h3");
    heal_label.textContent = "Heal";
    heal_label.classList.add('player-heal-label');
    const heal_input = document.createElement("input");
    heal_input.classList.add("enemy-heal-input-style");
    heal_input.type = "number";
    health_right.appendChild(heal_label);
    health_right.appendChild(heal_input);

    max_health.addEventListener("change", function() {
        hostUpdateMaxHealth(max_health.value, player_id);
    });

    return [health_section, heal_input, damage_input, health, health_id];
}

export function hostUpdateMaxHealth(health, player_id) {
    updateMaxHealth(health, player_id);
    socket.emit('host_update_max_health', {health: health, player_id: player_id});
}

export function updateMaxHealth(health, player_id) {
    const max_health_instances = document.querySelectorAll('.max-health-' + player_id);
    max_health_instances.forEach((max_health_instance) => {
        max_health_instance.value = health;
    });
    const health_id = "player-health-" + player_id;
    const current_health = document.querySelector("." + health_id).textContent;

    if(parseInt(health)  < parseInt(current_health)) {
         let new_health = health;
         document.querySelectorAll("." + health_id).forEach((element) => {
             element.textContent = new_health.toString();
         });
         socket.emit("host_update_health", {result: new_health, char_id: player_id});
    }
}