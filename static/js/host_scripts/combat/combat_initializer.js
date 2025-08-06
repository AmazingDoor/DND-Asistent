import {createPlayerHealthSection, createEnemyHealthSection} from './health_section_builder.js';
let socket = null;

export function setSocket(io) {
    socket = io;
    addEventListeners();
}


export function cancelInitiate(element) {
    //Set the combat list to the original state from the initiative state
    //hide and clear the initiative list
    //unhide the enemy list
    if(event) {
        event.stopPropagation()
    }
    const enemy_list = element.querySelector(".enemy-list");
    const initiative_list = element.querySelector(".initiative-list");
    const cancel_init_button = element.querySelector(".cancel-init-button");
    const add_enemy_button = element.querySelector(".add-enemy-button");
    const initiate_button = element.querySelector(".init-combat-button");
    const start_combat_button = element.querySelector(".start-combat-button");
    enemy_list.classList.remove("hidden");
    cancel_init_button.classList.add("hidden");
    initiate_button.classList.remove("hidden");
    start_combat_button.classList.add("hidden");
    add_enemy_button.classList.remove("hidden");

    const enemies = initiative_list.querySelectorAll(".enemy-initiative");
    enemies.forEach((enemy) => {
        enemy.remove();
    });

    const players = initiative_list.querySelectorAll(".player-init");
    players.forEach((player) => {
        player.remove();
    })

    initiative_list.classList.add("hidden");

}

export function initializeCombat(element) {
    //set the combat element to the initialize state
    //unhide initialize list
    //hide enemy list
    //create enemy initiative elements
    //create player initiative elements under the enemy elements
    if(event) {
        event.stopPropagation()
    }
    const enemy_list = element.querySelector(".enemy-list");
    const initiative_list = element.querySelector(".initiative-list");
    const cancel_init_button = element.querySelector(".cancel-init-button");
    const add_enemy_button = element.querySelector(".add-enemy-button");
    const initiate_button = element.querySelector(".init-combat-button");
    const start_combat_button = element.querySelector(".start-combat-button");
    const combat_id = element.querySelector(".combat-id").textContent;

    start_combat_button.classList.remove("hidden");
    initiate_button.classList.add("hidden");
    enemy_list.classList.add("hidden");
    initiative_list.classList.remove("hidden");
    cancel_init_button.classList.remove("hidden");
    add_enemy_button.classList.add("hidden");
    const enemies = enemy_list.querySelectorAll(".enemy");
    enemies.forEach((enemy) => {
        const enemy_name = enemy.querySelector(".enemy-name");
        const enemy_id = enemy.querySelector(".enemy-id-object").textContent;
        const health_id = "enemy-health-" + enemy_id;
        const health = enemy.querySelector("." + health_id);
        createEnemyInitiative(element, enemy_name.value,
        health.textContent, enemy_id);
    });

    socket.emit("initialize_combat", {combat_id});
    socket.emit("add_player_inits", {combat_id});
}

function createEnemyInitiative(combat_element, name, h, enemy_id) {
    //create an enemy initiative element in the initiative list
    const enemy = document.createElement("div");
    const initiative_list = combat_element.querySelector(".initiative-list");
    enemy.classList.add("enemy-initiative");
    enemy.classList.add("enemy-style");

    const enemy_name = document.createElement("h3");
    enemy_name.textContent = name;
    enemy_name.classList.add("enemy-init-name");
    enemy_name.classList.add("enemy-name-style");

    const enemy_id_element = document.createElement("p");
    enemy_id_element.textContent = enemy_id;
    enemy_id_element.classList.add("enemy-id-object");
    enemy.appendChild(enemy_id_element);
    const enemy_element = combat_element.querySelector(".enemy-" + enemy_id).parentElement;
    const enemy_max_health = enemy_element.querySelector(".enemy-max-health").value;

    const [health_section, heal_input, damage_input, health, health_id] = createEnemyHealthSection(h, enemy_id, combat_element, enemy_max_health);

    const init_container = document.createElement('div');
    init_container.classList.add('initiative-container');

    const initiative_label = document.createElement("h3");
    initiative_label.classList.add('initiative-label');
    initiative_label.textContent = "Initiative"

    const initiative_input = document.createElement("input");
    initiative_input.type = "number";
    initiative_input.classList.add("enemy-init-num");
    initiative_input.classList.add("initiative-input");



    enemy.appendChild(enemy_name);
    enemy.appendChild(health_section);
    enemy.appendChild(init_container);
    init_container.appendChild(initiative_label);
    init_container.appendChild(initiative_input);
    initiative_list.appendChild(enemy);

    enemy_name.addEventListener("change", function(event) {
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

function addPlayerInit(combat_element, player_id, player_name, player_health, player_ac, player_max_health = 0) {
    //creates a player initiative element in the initiative list of the combat element
    const player_init = document.createElement("div");
    const initiative_list = combat_element.querySelector(".initiative-list");
    player_init.classList.add("player-init");
    player_init.classList.add("enemy-style");

    const [health_section, heal_input, damage_input, health, health_id] = createPlayerHealthSection(player_health, player_id, combat_element, player_max_health);
    const player_init_name = document.createElement("h3");
    player_init_name.textContent = player_name;
    player_init_name.classList.add("player-init-name");
    player_init_name.classList.add("enemy-name-style");

    const player_id_element = document.createElement("p");
    player_id_element.textContent = player_id;
    player_id_element.classList.add("player-id-object");
    player_id_element.classList.add("player-" + player_id);
    player_init.appendChild(player_id_element);


    const ac_label = document.createElement("h3");
    ac_label.textContent = "AC: "

    const ac = document.createElement("h3");
    ac.classList.add("player-ac");
    ac.textContent = player_ac;

    const init_container = document.createElement('div');
    init_container.classList.add('initiative-container');

    const initiative_label = document.createElement("h3");
    initiative_label.classList.add('initiative-label');
    initiative_label.textContent = "Initiative"

    const initiative_input = document.createElement("input");
    initiative_input.type = "number";
    initiative_input.classList.add("player-init-num");
    initiative_input.classList.add("initiative-input");

    player_init.appendChild(player_init_name);
    player_init.appendChild(health_section);
    player_init.appendChild(ac_label);
    player_init.appendChild(ac);
    player_init.appendChild(init_container);
    init_container.appendChild(initiative_label);
    init_container.appendChild(initiative_input);
    initiative_list.appendChild(player_init);

    heal_input.addEventListener("change", function(event) {
        combatUpdatePlayerHealth(player_id, damage_input, heal_input, health, health_id);
        heal_input.value = '';
        damage_input.value = '';
    });

    damage_input.addEventListener("change", function(event) {
        combatUpdatePlayerHealth(player_id, damage_input, heal_input, health, health_id);
        heal_input.value = '';
        damage_input.value = '';
    });
}

function addEventListeners() {
    //get the list of players, parse the json data, and create elements in the initiative list
    socket.on('add_player_inits', data => {
        const combat_id = data.combat_id;
        const players_data = data.players_data;
        let combat_element = null;
        const combats = document.querySelectorAll(".combat-id").forEach((combat) => {
            const c_id = combat.textContent;
            if(c_id == combat_id) {
                combat_element = combat.parentElement;
            }
        });
        Object.entries(players_data).forEach(([player_id, player_data]) => {
            const player_name = player_data.player_name;
            const player_health = player_data.player_health;
            const player_ac = player_data.player_ac;
            const player_max_health = player_data.max_health;
            addPlayerInit(combat_element, player_id, player_name, player_health, player_ac, player_max_health);
        });
    });


    //set the player initiative when input by the player
    socket.on('player_input_init', data => {
        const combat_list = document.querySelector(".combat-list");
        const combat_id = data.combat_id;
        const combat_element = combat_list.querySelector(".combat-id").parentElement;
        const char_id = data.char_id;
        const init = data.init;
        const char_name = data.char_name;
        const player_element_id = combat_element.querySelector(".player-" + char_id);
        if(player_element_id != null) {
            const player_init = player_element_id.parentElement;
            const player_init_num = player_init.querySelector(".player-init-num");
            player_init_num.value = init;
        }
    });
}