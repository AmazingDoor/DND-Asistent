window.onload = function() {
    loadCombats();
}

function manageCombat() {
    const combat_div = document.getElementById("combat-div");
    combat_div.classList.toggle("hidden");
}

function createCombat(c=null) {
    let name = c;
    if (name === null) {
        name = prompt("Combat Name:");
    }
    const combat_list = document.getElementById("combat-list");
    const combat_element = document.createElement("div");
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
    init_button.onclick = function() {initiateCombat(combat_element)}
    cancel_button.onclick = function() {cancelInitiate(combat_element);}
    return combat_element;

}


function cancelInitiate(element) {
    const enemy_list = element.querySelector(".enemy-list");
    const initiative_list = element.querySelector(".initiative-list");
    const cancel_init_button = element.querySelector(".cancel-init-button");
    const initiate_button = element.querySelector(".init-combat-button");
    const start_combat_button = element.querySelector(".start-combat-button");
    enemy_list.classList.remove("hidden");
    cancel_init_button.classList.add("hidden");
    initiate_button.classList.remove("hidden");
    start_combat_button.classList.add("hidden");

    const enemies = initiative_list.querySelectorAll(".enemy-initiative");
    enemies.forEach((enemy) => {
        enemy.remove();
    });

    initiative_list.classList.add("hidden");

}

function initiateCombat(element) {
    const enemy_list = element.querySelector(".enemy-list");
    const initiative_list = element.querySelector(".initiative-list");
    const cancel_init_button = element.querySelector(".cancel-init-button");
    const initiate_button = element.querySelector(".init-combat-button");
    const start_combat_button = element.querySelector(".start-combat-button");

    start_combat_button.classList.remove("hidden");
    initiate_button.classList.add("hidden");
    enemy_list.classList.add("hidden");
    initiative_list.classList.remove("hidden");
    cancel_init_button.classList.remove("hidden");
    const enemies = enemy_list.querySelectorAll(".enemy");
    enemies.forEach((enemy) => {
        const enemy_name = enemy.querySelector(".enemy-name");
        const health = enemy.querySelector(".enemy-health");
        createEnemyInitiative(element, enemy_name.value,
        health.textContent);
    });





}


function deleteCombat(element) {
    let c = confirm("Delete combat with all enemies?");
    if (c == true) {
        element.remove();
        const name = element.querySelector(".combat-name").textContent;
        socket.emit("remove_combat", {name});
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
        enemy_id = generateRandomId();
    }
    enemy.classList.add("enemy");
    enemy.classList.add("enemy-style");

    const enemy_id_object = document.createElement("p");
    enemy_id_object.classList.add("enemy-id-object");
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
    health.classList.add("enemy-health");
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
    update_health_button.onclick = function () { combatUpdateHealth(combat_element, damage_input, heal_input, health); };
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
        combatUpdateHealth(combat_element, damage_input, heal_input, health);
        heal_input.value = '';
    });

    damage_input.addEventListener("change", function(event) {
        combatUpdateHealth(combat_element, damage_input, heal_input, health);
        damage_input.value = '';
    });

}


function createEnemyInitiative(combatElement, name, h) {
    const enemy = document.createElement("div");
    const initiative_list = combatElement.querySelector(".initiative-list");
    enemy.classList.add("enemy-initiative");
    enemy.classList.add("enemy-style");

    const enemy_name = document.createElement("h3");
    enemy_name.textContent = name;
    enemy_name.classList.add("enemy-name-style");



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
    damage_input.classList.add("enemy-damage-input-style");
    damage_input.type = "number";
    health_left.appendChild(damage_label);
    health_left.appendChild(damage_input);

    const update_health_button = document.createElement("button");
    update_health_button.textContent = "Update";
    update_health_button.onclick = function () { combatUpdateHealth(combat_element, damage_input, heal_input, health); };
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

    enemy.appendChild(enemy_name);
    enemy.appendChild(health_section);
    enemy.appendChild(initiative_input);
    enemy.appendChild(delete_button);
    initiative_list.appendChild(enemy);

    enemy_name.addEventListener("change", function(event) {
        saveCombat(combat_element);
    });

    heal_input.addEventListener("change", function(event) {
        combatUpdateHealth(combat_element, damage_input, heal_input, health);
        heal_input.value = '';
    });

    damage_input.addEventListener("change", function(event) {
        combatUpdateHealth(combat_element, damage_input, heal_input, health);
        damage_input.value = '';
    });
}


function saveCombat(combat) {
    const enemies = combat.querySelectorAll(".enemy");
    const combat_name = combat.querySelector(".combat-name").textContent;
    let data = [];
    enemies.forEach(enemy => {
        const enemy_id = enemy.querySelector(".enemy-id-object").textContent;
        const enemy_name = enemy.querySelector(".enemy-name");
        //const enemy_ac = enemy.querySelector(".enemy-ac");
        const enemy_health = enemy.querySelector(".enemy-health");
        d = {[enemy_id]:{enemy_name: enemy_name.value, enemy_ac: 0, enemy_health: enemy_health.textContent}};
        data.push(d);
    });
    socket.emit("saveCombat", {combat_name: combat_name, data: data});


}

function combatUpdateHealth(combat, damage, heal, health) {
    const h = parseFloat(health.textContent) || 0;
    const heal_val = parseFloat(heal.value) || 0;
    const damage_val = parseFloat(damage.value) || 0;

    const new_health = h + heal_val - damage_val;
    health.textContent = new_health.toString();
    saveCombat(combat);
}

function loadCombats() {
    socket.emit("load_combats");
}

socket.on("combat_list", function ({combats}) {
    Object.entries(combats).forEach(([combat, enemy_list]) => {
        const combat_element = createCombat(combat);
        enemy_list.forEach((enemy_object) => {
            const [enemy_id, enemy] = Object.entries(enemy_object)[0];
            console.log(enemy_id);
            console.log(enemy);
            const name = enemy.enemy_name;
            const ac = enemy.enemy_ac;
            const health = enemy.enemy_health;
            const enemy_list = combat_element.querySelector(".enemy-list");
            createEnemy(enemy_list, combat_element, enemy_id, name, ac, health, false);
        });
    });

});
