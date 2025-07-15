

function selectCombat(combat_element) {
    const enemy_list = combat_element.querySelector('.left-combat').querySelector('.enemy-list');
    const enemies = enemy_list.querySelectorAll('.enemy');
    const active_combat = document.getElementById("active-combat");
    const entity_list = active_combat.querySelector(".combat-entity-list");
    entity_list.replaceChildren();
    document.querySelector("#combat-div").classList.add("hidden");
    active_combat.classList.toggle("hidden");
    enemies.forEach((enemy) => {
        console.log(enemy);
        const enemy_name_text = enemy.querySelector(".enemy-name").value;
        const enemy_div = document.createElement("div");
        const enemy_name = document.createElement("p");
        enemy_name.textContent = enemy_name_text;
        const initiative  = document.createElement("input");
        initiative.type = "number";

        enemy_div.appendChild(enemy_name);
        enemy_div.appendChild(initiative);
        entity_list.appendChild(enemy_div);
    });

    socket.emit("add_players_to_combat");

}


function closeActiveCombat() {
    const active_combat = document.getElementById("active-combat");
    const entity_list = active_combat.querySelector(".combat-entity-list");
    entity_list.replaceChildren();
    active_combat.classList.add("hidden");

}

socket.on("return_players_for_combat", function({clients}) {
      if (clients !== {}) {
        const active_combat = document.getElementById("active-combat");
        const entity_list = active_combat.querySelector(".combat-entity-list");

        Object.entries(clients).forEach(([client, data]) => {
            console.log(client);
            console.log(data.name);

        const player_name_text = data.name;
        const player_div = document.createElement("div");
        const player_name = document.createElement("p");
        player_name.textContent = player_name_text;
        const initiative  = document.createElement("input");
        initiative.type = "number";

        player_div.appendChild(player_name);
        player_div.appendChild(initiative);
        entity_list.appendChild(player_div);

        });
      }
});