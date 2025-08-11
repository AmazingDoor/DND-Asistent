let socket = null;

export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", function () {
    addEventListeners();
    document.querySelector('.import-encounter-button').addEventListener("click", function() {openImportEncounterOverlay()});
    document.querySelector('.import-button').addEventListener('click', function() {importSelections()});
    document.querySelector('.close-import-overlay').addEventListener('click', function() {hideImportOverlay()});
});

export function saveCombatGlobal(combat) {
    //saves the enemy list, id, and name of the combat to a global folder
    const enemies = combat.querySelectorAll(".enemy");
    const combat_name = combat.querySelector(".combat-name").textContent;
    const combat_id = combat.querySelector(".combat-id").textContent;
    let enemy_list = [];
    enemies.forEach(enemy => {
        const enemy_id = enemy.querySelector(".enemy-id-object").textContent;
        const enemy_name = enemy.querySelector(".enemy-name");
        //const enemy_ac = enemy.querySelector(".enemy-ac");
        const health_id = "enemy-health-" + enemy_id;
        const enemy_health = enemy.querySelector("." + health_id);
        const max_health = enemy.querySelector('.enemy-max-health');
        let d = {[enemy_id]:{enemy_name: enemy_name.value, enemy_ac: 0, enemy_health: enemy_health.textContent, max_health: max_health.value}};
        enemy_list.push(d);
    });

    socket.emit("save_combat_global", {combat_id: combat_id, combat_name: combat_name, enemy_list: enemy_list});
}


export function displayContextMenu(combat) {
    //Creates and shows the rightclick menu for saving to global
    const menu = document.getElementById('customMenu');
    menu.replaceChildren();
    const option_1 = document.createElement("div");
    option_1.textContent = "Save to Global";
    option_1.addEventListener('click', function() {saveCombatGlobal(combat)});
    menu.appendChild(option_1);
    event.preventDefault(); // Prevent default context menu

    // Position and show custom menu
    menu.classList.remove("hidden");
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.style.display = 'block';
}

export function hideContextMenu() {
    //remove all children and hide the right click menu
    const menu = document.getElementById('customMenu');
    menu.replaceChildren();
    menu.classList.add("hidden");

}

function openImportEncounterOverlay() {
    //opens the GUI to import from global encounters
    const overlay = document.querySelector(".import-encounter-overlay");
    overlay.classList.remove("hidden");
    socket.emit('populate_import_encounters');
}

//array to keep track of all selected import options
let selected_import_options = [];

function addImportOption(id, name) {
    //create an import option for each saved encounter in the global folder
    const list = document.querySelector(".encounter-list");
    const encounter = document.createElement('div');
    encounter.classList.add('encounter-option');
    const encounter_name = document.createElement('h3');
    const encounter_id = document.createElement('p');
    encounter_name.textContent = name;
    encounter_id.textContent = id;
    encounter.appendChild(encounter_name);
    encounter.appendChild(encounter_id);
    list.appendChild(encounter);

    encounter.addEventListener('click', function(event) {
        if(event.shiftKey) {
            addImportSelection(id, encounter);
        } else {
            setImportSelection(id, encounter);
        }
    });
}

function addImportSelection(encounter_id, encounter) {
    //add an import to the array if its not already selected
    //only runs if shift key is held
    if(!selected_import_options.includes(encounter_id)) {
        encounter.classList.add('selected');
        selected_import_options.push(encounter_id);
    } else {
        const index = selected_import_options.indexOf(encounter_id);
        if(index !== -1) {
            selected_import_options.splice(index, 1);
            encounter.classList.remove('selected');
        }
    }
}

function setImportSelection(encounter_id, encounter) {
    //sets the encounter as the only element in the array
    const options = document.querySelectorAll('.encounter-option');
    options.forEach((option) => {option.classList.remove('selected')});
    encounter.classList.add('selected');
    selected_import_options = [encounter_id];
}

function resetImportSelection() {
    //clears the array
    const options = document.querySelectorAll('.encounter-option');
    options.forEach((option) => {option.classList.remove('selected')});
    selected_import_options = [];
}

function importSelections() {
    //tells the server to create a new json file in the campaign for each import that was selected
    //hides the GUI
    selected_import_options.forEach((id) => {
        socket.emit('import_id', {id: id});
    });
    hideImportOverlay();
}

function hideImportOverlay() {
    //hide the import GUI
    const overlay = document.querySelector(".import-encounter-overlay");
    overlay.classList.add("hidden");
    const list = overlay.querySelector(".encounter-list");
    resetImportSelection();
    list.replaceChildren();
}

function addEventListeners() {
    //add import option from data received from the server
    socket.on('add_import_option', data => {
        const encounter_id = data.encounter_id;
        const name = data.name;
        addImportOption(encounter_id, name);
    });
}