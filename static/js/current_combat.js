const combat_init_map = new WeakMap();

function initCombatMap(element) {
    combat_init_map.set(element, []);

}


function startCombat(element, p_inits = {}, e_ints = {}) {
    let enemy_inits = e_ints;
    let player_inits = p_inits;
    if (Object.keys(enemy_inits).length === 0) {
        const enemies = element.querySelectorAll(".enemy-initiative");
        enemies.forEach((enemy) => {
            const init_num = enemy.querySelector(".enemy-init-num").value;
            const enemy_id = enemy.querySelector(".enemy-id-object").textContent;
            const enemy_name = enemy.querySelector(".enemy-init-name").textContent;
            enemy_inits[enemy_id] = {init: init_num, name: enemy_name};
        });
    }

    if (Object.keys(player_inits).length === 0) {
        const player_inits_list = element.querySelectorAll(".player-init");
        player_inits_list.forEach((player_init) => {
            const init_num = player_init.querySelector(".player-init-num").value;
            const player_id = player_init.querySelector(".player-id-object").textContent;
            const player_name = player_init.querySelector(".player-init-name").textContent;
            player_inits[player_id] = {init: init_num, name: player_name};

        });
    }

    setUpOrder(element, player_inits, enemy_inits);
}

function setUpOrder(element, player_inits, enemy_inits) {
    //creates the turn order of combat
    const players = Object.entries(player_inits).map(([id, data]) => ({
      id,
      initiative: data.init,
      name: data.name,
      type: 'player'
    }));

    const enemies = Object.entries(enemy_inits).map(([id, data]) => ({
      id,
      initiative: data.init,
      name: data.name,
      type: 'enemy'
    }));

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
    console.log(combat_init);
    console.log("");
}

function progressCombat(element) {

}

function endCombat(element) {
    initCombatMap(element);
}



