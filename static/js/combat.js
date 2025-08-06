import {createCombat} from './host_scripts/combat/combat_builder.js';
let socket = null;

export function setSocket(io) {
    socket = io;
    addEventListeners();
}


export function manageCombat() {
    //Show or hide the combat GUI
    const combat_div = document.getElementById("combat-div");
    combat_div.classList.toggle("hidden");
}

function loadCombats() {
    //tells the server to load the saved combats
    socket.emit("load_combats");
}




export function updatePlayerAC(char_id, new_ac) {
    //finds each instance of the player ac of that id and changes all of them to new_ac
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

function addEventListeners() {
    document.querySelector("#create-combat-button").addEventListener("click", function() {createCombat()});

}