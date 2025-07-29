function manageCombat() {
    const combat_div = document.getElementById("combat-div");
    combat_div.classList.toggle("hidden");
}

function generateCombatId(length = 8) {
  let id = Math.random().toString(36).substr(2, length);
  let combats = document.querySelectorAll(".combat-id");
  combats.forEach((combat) => {
        if(combat.textContent == id) {
            id = generateCombatId();
        }
  });

  return id;
}

function createCombat(c_id = null, c=null) {
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
    left_combat.appendChild(enemy_list);

    const initiative_list = document.createElement("div");
    initiative_list.classList.add("initiative-list");
    initiative_list.classList.add("hidden");
    left_combat.appendChild(initiative_list);

    add_button.onclick = function () { createEnemy(enemy_list, combat_element); };
    init_button.onclick = function() {initializeCombat(combat_element)}
    cancel_button.onclick = function() {cancelInitiate(combat_element);}
    end_combat_button.onclick = function () { endCombat(combat_element); };
    progress_combat_button.onclick = function () { progressCombat(combat_element); };
    start_combat_button.onclick = function() {startCombat(combat_element);}


    return combat_element;

}


function cancelInitiate(element) {
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

function initializeCombat(element) {
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


function deleteCombat(element) {
    let c = confirm("Delete combat with all enemies?");
    if (c == true) {
        element.remove();
        const combat_id = element.querySelector(".combat-id").textContent;
        socket.emit("remove_combat", {combat_id});
    }
}

function deleteEnemy(element, combat_element) {
    element.remove();
    saveCombat(combat_element);
}

function generateRandomId(length = 8) {
  return Math.random().toString(36).substr(2, length);
}

function createEnemy(enemy_list, combat_element, e_id=null, n=null, armor_class=null, h=null, save=true) {
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

    const health_section = document.createElement("div");
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


    const hl = document.createElement("h3");
    hl.textContent = "Health";
    const health = document.createElement("h3");
    const health_id = "enemy-health-" + enemy_id;
    health.classList.add(health_id);
    health.classList.add("enemy-health-style");

    if(h !== null) {
        health.textContent = h;
    } else {
        health.textContent = "0";
    }
    health.type = "number";


    const delete_button = document.createElement("button");
    delete_button.textContent = "X";
    delete_button.onclick = function () { deleteEnemy(enemy, combat_element); };

    const damage_label = document.createElement("h3");
    damage_label.textContent = "Damage";
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
    const heal_input = document.createElement("input");
    heal_input.classList.add("enemy-heal-input");
    heal_input.classList.add("enemy-heal-input-style");

    heal_input.type = "number";
    health_right.appendChild(heal_label);
    health_right.appendChild(heal_input);

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


function createEnemyInitiative(combat_element, name, h, enemy_id) {
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
    const health = document.createElement("h3");
    const health_id = "enemy-health-" + enemy_id;
    health.classList.add("enemy-health-style");
    if(h !== null) {
        health.textContent = h;
    } else {
        health.textContent = "0";
    }
    health.type = "number";

    const damage_label = document.createElement("h3");
    damage_label.textContent = "Damage";
    const damage_input = document.createElement("input");
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
    const heal_input = document.createElement("input");
    heal_input.classList.add("enemy-heal-input-style");
    heal_input.type = "number";
    health_right.appendChild(heal_label);
    health_right.appendChild(heal_input);

    const initiative_input = document.createElement("input");
    initiative_input.type = "number";
    initiative_input.classList.add("enemy-init-num");

    enemy.appendChild(enemy_name);
    enemy.appendChild(health_section);
    enemy.appendChild(initiative_input);
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



function combatUpdatePlayerHealth(char_id, damage, heal, health, health_id) {
    const h = parseFloat(health.textContent) || 0;
    const heal_val = parseFloat(heal.value) || 0;
    const damage_val = parseFloat(damage.value) || 0;


    console.log(health_id);


    damage.value = '';
    heal.value = '';

    const new_health = h + heal_val - damage_val;
    health.textContent = new_health.toString();
    document.querySelectorAll("." + health_id).forEach((element) => {
        element.textContent = new_health.toString();
    });

    socket.emit("host_update_health", {result: new_health, char_id: char_id});
}

function combatUpdateHealth(combat, damage, heal, health, health_id, initiative_array = []) {
    const h = parseFloat(health.textContent) || 0;
    const heal_val = parseFloat(heal.value) || 0;
    const damage_val = parseFloat(damage.value) || 0;


    damage.value = '';
    heal.value = '';

    const new_health = h + heal_val - damage_val;
    health.textContent = new_health.toString();
    document.querySelectorAll("."+ health_id).forEach((element) => {
        element.textContent = new_health.toString();
    });
    console.log('yes');
    saveCombat(combat, initiative_array);
}

function loadCombats() {
    socket.emit("load_combats");
}

function setPlayerHealth(health, char_id) {
    const health_elements = document.querySelectorAll(".player-health-" + char_id);
    health_elements.forEach((h) => {
        h.textContent = health.toString();
    });
}


function updatePlayerAC(char_id, new_ac) {
    const combat_list = document.querySelector(".combat-list");
    const player_inits = combat_list.querySelectorAll(".player-init");
    player_inits.forEach((player_init) => {
        const player_id = player_init.querySelector(".player-id-object").textContent;
        if(player_id == char_id) {
            const ac = player_init.querySelector('.player-ac');
            ac.textContent = new_ac;
        }
    });

    const entity_stats = combat_list.querySelectorAll(".entity-combat-stats");
    entity_stats.forEach((stats) => {
        const entity_id = stats.querySelector(".entity-id-object").textContent;
        if(entity_id == char_id) {
            const ac = stats.querySelector('.player-ac');
            ac.textContent = new_ac;
        }
    });
}


function addPlayerInit(combat_element, player_id, player_name, player_health, player_ac) {
    const player_init = document.createElement("div");
    const initiative_list = combat_element.querySelector(".initiative-list");
    player_init.classList.add("player-init");
    player_init.classList.add("enemy-style");

    const player_init_name = document.createElement("h3");
    player_init_name.textContent = player_name;
    player_init_name.classList.add("player-init-name");
    player_init_name.classList.add("enemy-name-style");

    const player_id_element = document.createElement("p");
    player_id_element.textContent = player_id;
    player_id_element.classList.add("player-id-object");
    player_id_element.classList.add("player-" + player_id);
    player_init.appendChild(player_id_element);

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
    const health = document.createElement("h3");
    const health_id = "player-health-" + player_id;
    health.classList.add(health_id);
    health.classList.add("enemy-health-style");
    if(player_health !== null) {
        health.textContent = player_health;
    } else {
        health.textContent = "0";
    }
    health.type = "number";

    const damage_label = document.createElement("h3");
    damage_label.textContent = "Damage";
    const damage_input = document.createElement("input");
    damage_input.classList.add("enemy-damage-input-style");
    damage_input.type = "number";
    health_left.appendChild(damage_label);
    health_left.appendChild(damage_input);

    const update_health_button = document.createElement("button");
    update_health_button.textContent = "Update";
    update_health_button.onclick = function () { combatUpdatePlayerHealth(player_id, damage_input, heal_input, health, health_id); };
    health_middle.appendChild(hl);
    health_middle.appendChild(health);
    health_middle.appendChild(update_health_button);

    const heal_label = document.createElement("h3");
    heal_label.textContent = "Heal";
    const heal_input = document.createElement("input");
    heal_input.classList.add("enemy-heal-input-style");
    heal_input.type = "number";
    health_right.appendChild(heal_label);
    health_right.appendChild(heal_input);


    const ac_label = document.createElement("h3");
    ac_label.textContent = "AC: "

    const ac = document.createElement("h3");
    ac.classList.add("player-ac");
    ac.textContent = player_ac;

    const initiative_input = document.createElement("input");
    initiative_input.type = "number";
    initiative_input.classList.add("player-init-num");

    player_init.appendChild(player_init_name);
    player_init.appendChild(health_section);
    player_init.appendChild(ac_label);
    player_init.appendChild(ac);
    player_init.appendChild(initiative_input);
    initiative_list.appendChild(player_init);

    heal_input.addEventListener("change", function(event) {
        combatUpdatePlayerHealth(player_id, damage_input, heal_input, health, health_id);
    });

    damage_input.addEventListener("change", function(event) {
        combatUpdatePlayerHealth(player_id, damage_input, heal_input, health, health_id);
    });
}

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

        addPlayerInit(combat_element, player_id, player_name, player_health, player_ac);
    });
});



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
            const enemy_list = combat_element.querySelector(".enemy-list");
            createEnemy(enemy_list, combat_element, enemy_id, name, ac, health, false);
        });


        if(initiative_array.length > 0) {
            loadActiveCombat(combat_element, initiative_array, current_turn);
        }

    });

});

socket.on('player_input_init', data => {
    const combat_list = document.querySelector(".combat-list");
    const combat_id = data.combat_id;
    const combat_element = combat_list.querySelector(".combat-id").parentElement;
    const char_id = data.char_id;
    const init = data.init;
    const char_name = data.char_name;
    const player_init = combat_element.querySelector(".player-" + char_id).parentElement;
    const player_init_num = player_init.querySelector(".player-init-num");
    player_init_num.value = init;



});
