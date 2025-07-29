const combat_init_map = new WeakMap();
const combat_turn = new WeakMap();

function initCombatMap(element) {
    combat_init_map.set(element, []);
    combat_turn.set(element, 0);

}


function startCombat(element, initiative_array = []) {
    const start_combat_button = element.querySelector(".start-combat-button");
    const cancel_button = element.querySelector(".cancel-init-button");
    const end_combat_button = element.querySelector(".end-combat-button");
    const progress_combat_button = element.querySelector(".progress-combat-button");
    const initiative_list = element.querySelector(".initiative-list");

    start_combat_button.classList.add("hidden");
    cancel_button.classList.add("hidden");
    end_combat_button.classList.remove("hidden");
    progress_combat_button.classList.remove("hidden");

    let enemy_inits = {};
    let player_inits_dict = {};

    let turn_order = initiative_array;

    if(turn_order.length === 0) {
        if (Object.keys(enemy_inits).length === 0) {
            const enemies = element.querySelectorAll(".enemy-initiative");
            enemies.forEach((enemy) => {
                const init_num = enemy.querySelector(".enemy-init-num").value;
                const enemy_id = enemy.querySelector(".enemy-id-object").textContent;
                const enemy_name = enemy.querySelector(".enemy-init-name").textContent;
                enemy_inits[enemy_id] = {init: init_num, name: enemy_name};
            });
        }

        if (Object.keys(player_inits_dict).length === 0) {
            const player_inits_list = element.querySelectorAll(".player-init");
            player_inits_list.forEach((player_init) => {
                const init_num = player_init.querySelector(".player-init-num").value;
                const player_id = player_init.querySelector(".player-id-object").textContent;
                const player_name = player_init.querySelector(".player-init-name").textContent;
                player_inits_dict[player_id] = {init: init_num, name: player_name};

            });
        }
        turn_order = setUpOrder(element, player_inits_dict, enemy_inits);
    }
    buildFinalCombatList(initiative_list, turn_order, element);
    highlightInitialTurn(element);
    saveCombat(element, turn_order);
}

function setUpOrder(element, player_inits_dict, enemy_inits) {
    //creates the turn order of combat
    const players = Object.entries(player_inits_dict).map(([id, data]) => ({
      id,
      initiative: data.init,
      name: data.name,
      type: 'player'
    }))
    .filter(player => player.initiative !== 0 && player.initiative !=='');

    const enemies = Object.entries(enemy_inits).map(([id, data]) => ({
      id,
      initiative: data.init,
      name: data.name,
      type: 'enemy'
    }))
    .filter(enemy => enemy.initiative !== 0 && enemy.initiative !=='');

    const combat_order = [...players, ...enemies];

    combat_order.sort((a, b) => {
      if (b.initiative !== a.initiative) {
        return b.initiative - a.initiative; // Higher initiative first
      } else {
        return a.type === 'player' && b.type === 'enemy' ? -1 : 1; // Players go first if tied
      }
    });

    let combat_init = combat_init_map.get(element);
    combat_init = combat_order;
    return combat_init;
}


function buildFinalCombatList(initiative_list, combat_order, element) {
    const enemy_list = element.querySelector('.enemy-list');
    const add_button = element.querySelector('.add-enemy-button');
    const init_button = element.querySelector('.init-combat-button');
    initiative_list.replaceChildren();
    enemy_list.classList.add('hidden');
    add_button.classList.add('hidden');
    init_button.classList.add('hidden');
    initiative_list.classList.remove('hidden');

    combat_order.forEach((d) => {
        const id = d.id;
        const init = d.init;
        const name = d.name;
        const type = d.type;

        const entity = document.createElement("div");
        entity.classList.add("entity-combat-stats");
        entity.classList.add("enemy-style");

        const entity_name = document.createElement("h3");
        entity_name.textContent = name;
        entity_name.classList.add('enemy-name-style');
        entity_name.classList.add('entity-name');

        const entity_id_element = document.createElement('p');
        entity_id_element.textContent = id;
        entity_id_element.classList.add('entity-id-object');
        entity_id_element.classList.add('entity' + id);
        entity.appendChild(entity_id_element);

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
        hl.tetContent = "Health";
        const health = document.createElement("h3");


        const damage_label = document.createElement("h3");
        damage_label.textContent = "Damage";
        const damage_input = document.createElement("input");
        damage_input.classList.add("enemy-damage-input-style");
        damage_input.type = "number";
        health_left.appendChild(damage_label);
        health_left.appendChild(damage_input);

        const update_health_button = document.createElement("button");
        update_health_button.textContent = "Update";

        const heal_label = document.createElement("h3");
        heal_label.textContent = "Heal";
        const heal_input = document.createElement("input");
        heal_input.classList.add("enemy-heal-input-style");
        heal_input.type = "number";

        let health_id = null;
        let ac_label = null;
        let ac = null;
        if (type == 'player') {
            health_id = 'player-health-' + id;
            console.log('#client-' + id);
            const player_tab = document.querySelector('#client-' + id);
            const ac_value = player_tab.querySelector(".ac-input").value;


            health.textContent = player_tab.querySelector(".health-num").textContent;

            ac_label = document.createElement("h3");
            ac_label.textContent = "AC: "

            ac = document.createElement("h3");
            ac.classList.add("player-ac");
            ac.textContent = ac_value;

            update_health_button.onclick = function () { combatUpdatePlayerHealth(id, damage_input, heal_input, health, health_id); };

            heal_input.addEventListener("change", function(event) {
                combatUpdatePlayerHealth(id, damage_input, heal_input, health, health_id);
            });

            damage_input.addEventListener("change", function(event) {
                combatUpdatePlayerHealth(id, damage_input, heal_input, health, health_id);
            });



        } else {
            health_id = 'enemy-health-' + id;
            const initial_enemy = element.querySelector(".enemy-" + id).parentElement;
            const initial_health = initial_enemy.querySelector(".enemy-health-" + id);
            health.textContent = initial_health.textContent;

            update_health_button.onclick = function () { combatUpdateHealth(element, damage_input, heal_input, health, health_id); };

            heal_input.addEventListener("change", function(event) {
                combatUpdateHealth(element, damage_input, heal_input, health, health_id);
            });

            damage_input.addEventListener("change", function(event) {
                combatUpdateHealth(element, damage_input, heal_input, health, health_id);
            });

        }
        health.classList.add(health_id);

        health_middle.appendChild(hl);
        health_middle.appendChild(health);
        health_middle.appendChild(update_health_button);

        health_right.appendChild(heal_label);
        health_right.appendChild(heal_input);

        entity.appendChild(entity_name);
        entity.appendChild(health_section);
        if(ac_label !== null) {
            entity.appendChild(ac_label);
            entity.appendChild(ac);
        }
        initiative_list.appendChild(entity);
    });

}


function progressCombat(element) {
    const init_list = element.querySelector(".initiative-list");
    const entities = init_list.querySelectorAll(".entity-combat-stats");
    const combat_length = entities.length;
    entities[combat_turn.get(element)].classList.remove("current-turn");
    if(combat_turn.get(element) >= combat_length - 1) {
        combat_turn.set(element, 0);
    } else {
        combat_turn.set(element, combat_turn.get(element) + 1)
    }
    entities[combat_turn.get(element)].classList.add("current-turn");
    const turn_num = combat_turn.get(element);
    const combat_id = element.querySelector('.combat-id').textContent;

    socket.emit('update_turn', {combat_id: combat_id, turn_num: turn_num})

}

function highlightInitialTurn(element) {
    const init_list = element.querySelector(".initiative-list");
    const entities = init_list.querySelectorAll(".entity-combat-stats");
    entities[combat_turn.get(element)].classList.add("current-turn");
}

function endCombat(element) {
    initCombatMap(element);

    const end_combat_button = element.querySelector(".end-combat-button");
    const progress_combat_button = element.querySelector(".progress-combat-button");
    const add_button = element.querySelector(".add-enemy-button");
    const init_button = element.querySelector(".init-combat-button");
    const enemy_list = element.querySelector(".enemy-list");
    const initiative_list = element.querySelector(".initiative-list");
    const combat_id = element.querySelector(".combat-id").textContent;

    end_combat_button.classList.add("hidden");
    progress_combat_button.classList.add("hidden");
    add_button.classList.remove("hidden");
    init_button.classList.remove("hidden");
    enemy_list.classList.remove("hidden");
    initiative_list.replaceChildren();
    initiative_list.classList.add("hidden");

    socket.emit('end_combat', {combat_id: combat_id})

}



function saveCombat(combat, initiative_array = []) {
    const enemies = combat.querySelectorAll(".enemy");
    const combat_name = combat.querySelector(".combat-name").textContent;
    const combat_id = combat.querySelector(".combat-id").textContent;
    const current_turn = combat_turn.get(combat);
    let enemy_list = [];
    enemies.forEach(enemy => {
        const enemy_id = enemy.querySelector(".enemy-id-object").textContent;
        const enemy_name = enemy.querySelector(".enemy-name");
        //const enemy_ac = enemy.querySelector(".enemy-ac");
        const health_id = "enemy-health-" + enemy_id;
        const enemy_health = enemy.querySelector("." + health_id);
        d = {[enemy_id]:{enemy_name: enemy_name.value, enemy_ac: 0, enemy_health: enemy_health.textContent}};
        enemy_list.push(d);
    });

    socket.emit("saveCombat", {combat_id: combat_id, combat_name: combat_name, enemy_list: enemy_list, initiative_array: initiative_array, current_turn: current_turn});
}

function loadActiveCombat(element, initiative_list, current_turn) {
    console.log('loadActiveCombat');
    combat_turn.set(element, current_turn);
    startCombat(element, initiative_list);
}



