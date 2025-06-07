const socket = io();
let trapCount = 0;
let currentDiv = null;


window.onload = function() {
    socket.emit('get_traps_json');
}

socket.on('load_traps_json', (json_file) => {
    const traps = json_file.traps;
    traps.forEach((trap) => {
        const name = trap.trap_name;
        const text = trap.trap_text;
        loadTrapDiv(name, text);
    });
});


function loadTrapDiv(name, text) {
    const box = document.getElementById('trapBox');

    const trap_row = document.createElement('div');
    trap_row.className = ('trap-row');
    trap_row.addEventListener("click", function() {
        const divs = document.querySelectorAll('.trap-row');
        divs.forEach(d => d.style.backgroundColor = "white");
        trap_row.style.backgroundColor = "lightgray";
        currentDiv = trap_row;
    });

    const trap_name = document.createElement('input');
    trap_name.type = 'text';
    trap_name.placeholder = 'Trap Name';
    trap_name.className = 'trap-name';
    trap_name.value = name;

    const trap_text = document.createElement('input');
    trap_text.type = 'text';
    trap_text.placeholder = 'Trap Text';
    trap_text.className = 'trap-text';
    trap_text.value = text;

    trap_row.appendChild(trap_name);
    trap_row.appendChild(trap_text);
    box.appendChild(trap_row);
}

function deleteTrap() {
  if (currentDiv !== null) {
    currentDiv.remove()
  }
}



function addTrap() {
    createTrapDiv();
}


function createTrapDiv() {
    const box = document.getElementById('trapBox');

    const trap_row = document.createElement('div');
    trap_row.className = ('trap-row');
    trap_row.addEventListener("click", function() {
        const divs = document.querySelectorAll('.trap-row');
        divs.forEach(d => d.style.backgroundColor = "white");
        trap_row.style.backgroundColor = "lightgray";
        currentDiv = trap_row;
    });

    const trap_name = document.createElement('input');
    trap_name.type = 'text';
    trap_name.placeholder = 'Trap Name';
    trap_name.className = 'trap-name';

    const trap_text = document.createElement('input');
    trap_text.type = 'text';
    trap_text.placeholder = 'Trap Text';
    trap_text.className = 'trap-text';

    trap_row.appendChild(trap_name);
    trap_row.appendChild(trap_text);
    box.appendChild(trap_row);
}

function saveTraps() {
    const trapsToSave = [];
    const trap_rows = document.querySelectorAll('.trap-row');

    trap_rows.forEach(row => {
        const trap_name = row.querySelector('.trap-name').value;
        const trap_text = row.querySelector('.trap-text').value;
        trap_data = {trap_name: trap_name, trap_text: trap_text};
        trapsToSave.push(trap_data);
    });
    socket.emit("add_traps", trapsToSave);
    window.location.href='/host';

}

function cancelChanges() {
    window.location.href='/host';
}






function appendTrap() {
  const box = document.getElementById('trapBox');
  const trap = document.createElement('div');
  trap.className = 'trap';
  trap.textContent = `Trap ${++trapCount}`;
  trap.dataset.id = trapCount;
  box.appendChild(trap);
}


function closeTrapPrompt() {
  document.getElementById("trapPrompt").classList.add("hidden");
}

function submitTrap() {
  const name = document.getElementById("trapName").value;
  const text = document.getElementById("trapText").value;
  closeTrapPrompt();
  let trap_data = [name, text];
  trapsToAdd.append(trap_data);
  //socket.emit("add_trap", {trap_name: name, trap_text: text});
  document.getElementById("trapName").value = '';
  document.getElementById("trapText").value = '';
}

