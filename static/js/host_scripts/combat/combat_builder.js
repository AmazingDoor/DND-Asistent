import {saveCombatGlobal, displayContextMenu} from './save_combat_global_handler.js';
import {cancelInitiate, initializeCombat} from './combat_initializer.js';
import {initCombatMap, startCombat, progressCombat, endCombat, loadActiveCombat} from './current_combat.js';
import {createEnemy} from './enemy_builder.js';
import {hideContextMenu} from './save_combat_global_handler.js';
let socket = null;

export function setSocket(io) {
    socket = io;
    addEventListeners();
}

export function createCombat(c_id = null, c=null) {
    //Create a combat element that will hold all of the enemies
    //Enemies are stored in the enemy_list
    //enemy_list is the only thing that gets saved to the global folder
    //The initiative list holds the initiative and final list of enemies and players
    let name = c;
    if (name === null) {
        name = prompt("Combat Name:");
    }
    let enemy_inits = {};
    let player_inits = {};
    const combat_list = document.getElementById("combat-list");
    const combat_element = document.createElement("div");
    initCombatMap(combat_element);

    const combat_id = document.createElement("p");

    if (c_id === null) {
        combat_id.textContent = generateCombatId();
    } else {
        combat_id.textContent = c_id;
    }
    combat_id.classList.add("hidden");
    combat_id.classList.add("combat-id");
    combat_element.appendChild(combat_id);

    combat_element.classList.add("combat-element");

    const left_combat = document.createElement("div");
    left_combat.classList.add("left-combat");
    combat_element.appendChild(left_combat);



    const upper = document.createElement("div");
    upper.classList.add("upper-combat")
    left_combat.appendChild(upper);

    const lower = document.createElement("div");
    lower.classList.add("lower-combat");
    left_combat.appendChild(lower);

    const list_object = document.createElement("div");
    list_object.classList.add("list-object");
    left_combat.appendChild(list_object);

    const combat_name = document.createElement("h3");
    combat_name.textContent = name;
    combat_name.classList.add("combat-name");
    upper.appendChild(combat_name);


    const add_button = document.createElement("button");
    add_button.textContent = "Add Enemy";
    add_button.classList.add("add-enemy-button");
    lower.appendChild(add_button);

    const init_button = document.createElement("button");
    init_button.textContent = "Initialize";
    init_button.classList.add("init-combat-button");
    lower.appendChild(init_button);

    const cancel_button = document.createElement("button");
    cancel_button.textContent = "Cancel";
    cancel_button.classList.add("cancel-init-button");
    cancel_button.classList.add("hidden");
    lower.appendChild(cancel_button);

    const start_combat_button = document.createElement("button");
    start_combat_button.textContent = "Start Combat";
    start_combat_button.classList.add("start-combat-button");
    start_combat_button.classList.add("hidden");
    lower.appendChild(start_combat_button);

    const end_combat_button = document.createElement("button");
    end_combat_button.textContent = "End Combat";
    end_combat_button.classList.add("end-combat-button");
    end_combat_button.classList.add("hidden");
    lower.appendChild(end_combat_button);

    const progress_combat_button = document.createElement("button");
    progress_combat_button.textContent = "End Turn";
    progress_combat_button.classList.add("progress-combat-button");
    progress_combat_button.classList.add("hidden");
    lower.appendChild(progress_combat_button);

    const right_combat = document.createElement("div");
    right_combat.classList.add("right-combat");
    upper.appendChild(right_combat);


    const delete_button = document.createElement("button");
    delete_button.textContent = "X";
    delete_button.onclick = function () { deleteCombat(combat_element); };

    right_combat.appendChild(delete_button);
    combat_list.appendChild(combat_element);

    const enemy_list = document.createElement("div");
    enemy_list.classList.add("enemy-list");
    list_object.appendChild(enemy_list);

    const initiative_list = document.createElement("div");
    initiative_list.classList.add("initiative-list");
    initiative_list.classList.add("hidden");
    list_object.appendChild(initiative_list);

    add_button.onclick = function (event) { createEnemy(enemy_list, combat_element); };
    init_button.onclick = function(event) {initializeCombat(combat_element)}
    cancel_button.onclick = function(event) {cancelInitiate(combat_element);}
    end_combat_button.onclick = function (event) { endCombat(combat_element); };
    progress_combat_button.onclick = function (event) { progressCombat(combat_element); };
    start_combat_button.onclick = function(event) {startCombat(combat_element);}

    lower.addEventListener('click', function () {toggleListObject(list_object, upper, lower);});
    lower.addEventListener('mouseenter', function() {handleCombatHoverEnter(upper, lower, right_combat)});
    lower.addEventListener('mouseleave', function() {handleCombatHoverExit(upper, lower, right_combat)});
    lower.addEventListener('contextmenu', function(event) {displayContextMenu(event)});


    upper.addEventListener('click', function () {toggleListObject(list_object, upper, lower);});
    upper.addEventListener('mouseenter', function() {handleCombatHoverEnter(upper, lower, right_combat)});
    upper.addEventListener('mouseleave', function() {handleCombatHoverExit(upper, lower, right_combat)});
    upper.addEventListener('contextmenu', function(event) {displayContextMenu(combat_element)});


  document.addEventListener('click', function() {hideContextMenu()});

    return combat_element;

}

function generateCombatId(length = 8) {
    //Generate an id for the combat to be saved with
  let id = Math.random().toString(36).substr(2, length);
  let combats = document.querySelectorAll(".combat-id");
  combats.forEach((combat) => {
        if(combat.textContent == id) {
            id = generateCombatId();
        }
  });

  return id;
}

function deleteCombat(element) {
    //deletes the combat and all enemies in the combat
    let c = confirm("Delete combat with all enemies?");
    if (c == true) {
        element.remove();
        const combat_id = element.querySelector(".combat-id").textContent;
        socket.emit("remove_combat", {combat_id});
    }
}

function toggleListObject(list_object, upper, lower) {
    //Show or hide the list of enemies/players in a combat element
    list_object.classList.toggle("hidden");
    lower.classList.toggle("hidden");

}

function handleCombatHoverEnter(upper, lower, right_combat) {
    //change the background of the object to a darker color when hovered over
    upper.style.backgroundColor = 'gray';
    lower.style.backgroundColor = 'gray';
    right_combat.style.backgroundColor = 'gray';


}

function handleCombatHoverExit(upper, lower, right_combat) {
    //change the background of the object to a lighter color when the mouse leaves
    upper.style.backgroundColor = 'lightgray';
    lower.style.backgroundColor = 'lightgray';
    right_combat.style.backgroundColor = 'lightgray';

}

function addEventListeners() {
    //create the combat element for the imported encounter
    socket.on('add_imported_encounter', function ({combat}) {
        const combat_id = combat.id;
        const combat_name = combat.name;
        const enemy_list = combat.enemy_list;
        const combat_element = createCombat(combat_id, combat_name);

        enemy_list.forEach((enemy_object) => {
            const[enemy_id, enemy] = Object.entries(enemy_object)[0];
            const name = enemy.enemy_name;
            const ac = enemy.enemy_ac;
            const health = enemy.enemy_health;
            const max_health = enemy.max_health;
            const enemy_list = combat_element.querySelector(".enemy-list");
            createEnemy(enemy_list, combat_element, enemy_id, name, ac, health, max_health, false);

        });
    });

    //create the combat elements and enemies in the combat list from saved json
    socket.on("combat_list", function ({combats}) {
        Object.entries(combats).forEach(([combat_id, combat_data]) => {
            const combat_name = combat_data.name;
            const enemy_list = combat_data.enemy_list;
            const initiative_array = combat_data.initiative_array;
            const current_turn = combat_data.current_turn;
            const combat_element = createCombat(combat_id, combat_name);
            enemy_list.forEach((enemy_object) => {
                const [enemy_id, enemy] = Object.entries(enemy_object)[0];
                const name = enemy.enemy_name;
                const ac = enemy.enemy_ac;
                const health = enemy.enemy_health;
                const enemy_max_health = enemy.max_health;
                const enemy_list = combat_element.querySelector(".enemy-list");
                createEnemy(enemy_list, combat_element, enemy_id, name, ac, health, enemy_max_health, false);
            });


            if(initiative_array.length > 0) {
                loadActiveCombat(combat_element, initiative_array, current_turn);
            }

        });
    });
}