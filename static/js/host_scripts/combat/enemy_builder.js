import {createEnemyHealthSection} from './health_section_builder.js';
import{saveCombat} from './combat_saver.js';
import{combatUpdateHealth} from './health_handler.js';

export function createEnemy(enemy_list, combat_element, e_id=null, n=null, armor_class=null, h=null, max_health = 0, save=true) {
    //create an enemy for the enemy_list of the combat element
    if(event) {
        event.stopPropagation()
    }

    const enemy = document.createElement("div");
    let enemy_id = e_id;
    if(enemy_id == null) {
        /*this should really be changed at some point
        to make sure there are no duplicates created.
        Currently its very unlikely that it would happen,
        but still possible.*/
        enemy_id = generateRandomId();
    }
    enemy.classList.add("enemy");
    enemy.classList.add("enemy-style");

    const enemy_id_object = document.createElement("p");
    enemy_id_object.classList.add("enemy-id-object");
    enemy_id_object.classList.add("enemy-" + enemy_id);
    enemy_id_object.textContent = enemy_id;
    enemy.appendChild(enemy_id_object);
    const enemy_name = document.createElement("input");
    enemy_name.type = "text";
    if (n !== null) {
        enemy_name.value = n;
    }
    enemy_name.placeholder = "Enemy Name";
    enemy_name.classList.add("enemy-name");
    enemy_name.classList.add("enemy-name-style");


    const acl = document.createElement("h3");
    acl.textContent = "Armor Class: "
    const ac = document.createElement("input");
    ac.type = "number";
    ac.classList.add("enemy-ac");
    ac.classList.add("enemy-ac-style");



    const [health_section, heal_input, damage_input, health, health_id] = createEnemyHealthSection(h, enemy_id, combat_element, max_health);

    const delete_button = document.createElement("button");
    delete_button.textContent = "X";
    delete_button.onclick = function () { deleteEnemy(enemy, combat_element); };


    enemy.appendChild(enemy_name);
    enemy.appendChild(health_section);
    enemy.appendChild(delete_button);
    enemy_list.appendChild(enemy);
    if (save) {
        saveCombat(combat_element);
    }

    enemy_name.addEventListener("change", function(event) {
        saveCombat(combat_element);
    });

    ac.addEventListener("change", function(event) {
        saveCombat(combat_element);
    });

    heal_input.addEventListener("change", function(event) {
        combatUpdateHealth(combat_element, damage_input, heal_input, health, health_id);
        heal_input.value = '';
    });

    damage_input.addEventListener("change", function(event) {
        combatUpdateHealth(combat_element, damage_input, heal_input, health, health_id);
        damage_input.value = '';
    });

}

function deleteEnemy(element, combat_element) {
    //delete an enemy from a combat
    element.remove();
    saveCombat(combat_element);
}

function generateRandomId(length = 8) {
    //creates a random id for an enemy
  return Math.random().toString(36).substr(2, length);
}