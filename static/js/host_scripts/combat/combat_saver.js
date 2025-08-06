let socket = null;
export const combat_turn = new WeakMap();

export function setSocket(io) {
    socket = io;
}

export function saveCombat(combat, initiative_array = []) {
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
        const max_health = enemy.querySelector(".enemy-max-health");
        const max_health_num = max_health.value;
        const d = {[enemy_id]:{enemy_name: enemy_name.value, enemy_ac: 0, enemy_health: enemy_health.textContent, max_health: max_health_num}};
        enemy_list.push(d);
    });

    socket.emit("saveCombat", {combat_id: combat_id, combat_name: combat_name, enemy_list: enemy_list, initiative_array: initiative_array, current_turn: current_turn});
}