const socket = io({ query: { role: "host" } });
const clientMap = {};
let clientCount = 0;
let affected_tabs = [];
const tabMap = {};
const charMap = {};
const clientToTab = {};
const menuToClientId = new Map();

document.addEventListener("DOMContentLoaded", function () {
    socket.emit('host_page_load');
});


function sendMessage(active_client) {
    const msg = document.getElementById(`client-${active_client}`).querySelector('#msg').value;
    affected_tabs.forEach((char_id) => {
        const tab = document.getElementById(`client-${char_id}`);
        if (!msg) return;
        socket.emit("message_to_client", {message: msg, char_id: char_id});
        appendMessage("You", char_id, msg);
        tab.querySelector('#msg').value = '';
    });

}

function addNotification(char_id, tab_id) {
    const b = document.getElementById(`tab-btn-${char_id}`);
    const active_button = document.querySelector('.tab.active');
    if(active_button) {
        if (active_button.id == `tab-btn-${char_id}`) {
            return;
        }
    }
    if (b.style.backgroundColor === "white") {
        b.style.backgroundColor = "red"
    }

}

function removeNotification(char_id) {
    const b = document.getElementById(`tab-btn-${char_id}`);
    if (b.style.backgroundColor === "red") {
        b.style.backgroundColor = "white"
    }

}

function load_image(imageUrl, char_id) {
    const tab = document.getElementById(`client-${char_id}`);
    add_image_to_host(imageUrl, tab);
}


function add_image_to_host(imageUrl, tab) {
    const img_list = tab.querySelector("#img-list");
    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Shared by DM";

    imageBox.appendChild(img);
    img_list.appendChild(imageBox);
}

function showTabAndMark(event, char_id, tab_id, button_id) {
    let change_tab = true;
    if(event.shiftKey) {
        let active_tab = document.querySelector(".tab.active");
        if (active_tab.id !== button_id) {
            if(affected_tabs.includes(char_id)) {
                let index = affected_tabs.indexOf(char_id);
                if (index !== -1) {
                    affected_tabs.splice(index, 1);
                    document.getElementById(button_id).classList.remove("affected-tab");
                    change_tab = false;
                }
            } else {
                affected_tabs.push(char_id);
                document.getElementById(button_id).classList.add("affected-tab");
            }
        }
    } else {
        remove_class_tabs = document.querySelectorAll(".affected-tab");
        remove_class_tabs.forEach((tab) => {
            tab.classList.remove('affected-tab');
        });
        document.getElementById(button_id).classList.add("affected-tab");
        affected_tabs = [char_id];
    }

    removeNotification(char_id);
    if (change_tab) {
        showTab(tab_id);
    }
}

function showTab(tabId) {
    // Deactivate all tabs and contents
    document.querySelectorAll('.tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tabId === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });
}

function appendMessage(from, char_id, message) {
    const tab = document.getElementById(`client-${char_id}`);
    const chat = tab.querySelector('#chat');

    const line = document.createElement("p");
    line.innerHTML = `<strong>${from}:</strong> ${message}`;
    chat.appendChild(line);
    chat.scrollTop = chat.scrollHeight;
}


function changeArmorClass(value) {
    affected_tabs.forEach((char_id) => {
        updateArmorClass(char_id, value);
        socket.emit("host_change_armor_class", {value: value, char_id: char_id})
    });
}

function updateHealth(c) {
    const heal_input = document.getElementById(`heal-input-${c}`);
    const damage_input = document.getElementById(`damage-input-${c}`);
    const heal_val = parseFloat(heal_input.value) || 0;
    const damage_val = parseFloat(damage_input.value || 0);
    affected_tabs.forEach((char_id) => {
        const health = document.getElementById(`health-num-${char_id}`);
        const health_val = parseFloat(health.textContent) || 0;
        //const result = health_val - damage_val + heal_val;
        //health.textContent = result.toString();
        combatUpdatePlayerHealth(char_id, damage_input, heal_input, health, "player-health-" + char_id);
        //socket.emit("host_update_health", {result: result, char_id: char_id});
    });
    heal_input.value = '';
    damage_input.value  = '';
}

function loadMessage(message, char_id) {
    const tab = document.getElementById(`client-${char_id}`);
    const chat = tab.querySelector('#chat');
    const line = document.createElement("p");

    const index = message.indexOf(":");
    let from = message.slice(0, index);
    if (from === "DM") {
        from = "You"
    }
    const msg = message.slice(index + 1);
    line.innerHTML = `<strong>${from}:</strong> ${msg}`;
    chat.appendChild(line);
    chat.scrollTop = chat.scrollHeight;
}

function manageTraps() {
window.location.href='/manage_traps';
}

function sendTrapMessage(text) {
    affected_tabs.forEach((char_id) => {
        socket.emit("message_to_client", {message: text, char_id: char_id});
        appendMessage("You", char_id, text);
    });
}

function updateArmorClass(char_id, value) {
    const ac_input = document.getElementById(`ac-input-${char_id}`);
    ac_input.value = value;
    updatePlayerAC(char_id, value);

}

function updateTrapLists(traps) {
    document.querySelectorAll(".trap-element").forEach((element) => {
        element.remove();
    });
    const elements = document.querySelectorAll(".trap-menu");
    elements.forEach((element) => {
        traps.forEach((trap) => {
            const link = document.createElement("a");
            link.textContent = trap.trap_name;
            link.href = "#";
            link.classList.add("trap-element");

            link.addEventListener("click", (e) => {
                e.preventDefault();
                sendTrapMessage(trap.trap_text, menuToClientId.get(element));
            });
///////////////////////////////
            let hoverText;

            link.addEventListener('mouseenter', () => {
              hoverText = document.createElement('div');
              hoverText.classList.add('hover-text');
              hoverText.textContent = trap.trap_text;
              document.body.appendChild(hoverText);
            });

            link.addEventListener('mousemove', (e) => {
              if (hoverText) {
                hoverText.style.left = (e.clientX + 15) + 'px';
                hoverText.style.top = (e.clientY + 15) + 'px';
              }
            });

            link.addEventListener('mouseleave', () => {
              if (hoverText) {
                document.body.removeChild(hoverText);
                hoverText = null;
              }
            });
/////////////////////////////////////////////////////////
            link.textContent = trap.trap_name;
            element.appendChild(link);
        });
    });
}

function hostUpdateMaxHealth(health, player_id) {
    updateMaxHealth(health, player_id);
    socket.emit('host_update_max_health', {health: health, player_id: player_id});
}

function updateMaxHealth(health, player_id) {
    const max_health_instances = document.querySelectorAll('.max-health-' + player_id);
    max_health_instances.forEach((max_health_instance) => {
        max_health_instance.value = health;
    });
}

function createTab(name, char_id) {
  const tabId = `client-${char_id}`;
  //Trying to get rid of this
  clientMap[char_id] = tabId;
  tabMap[tabId] = char_id;
  //Trying to get rid of this
  //charMap[client_id] = char_id;

  // Create tab button
  const tabButton = document.createElement('button');
  tabButton.className = 'tab';
  tabButton.innerText = name;
  tabButton.dataset.tabId = tabId;
  tabButton.id = `tab-btn-${char_id}`;
  tabButton.style.backgroundColor = "white";
  tabButton.onclick = (event) => showTabAndMark(event, char_id, tabId, tabButton.id);
  document.getElementById('tab-bar').appendChild(tabButton);

  // Create tab content
  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content';
  tabContent.id = tabId;
  tabContent.innerHTML = `
    <div class="div-body">
        <div id="image-area">
            <h2>Images</h2>
            <div id="images">
                <div id="drop-area-${char_id}" style="border: 2px dashed #ccc; padding: 20px; margin: 20px;">
                    Drop an image here
                </div>
            </div>
            <div id="img-list">
            </div>
        </div>
      <div id="right-side">
          <div id="player-stats">
      <h2>Player</h2>
      <div class="player-stat-row">
        <div class="player-stat-column" id="damage">
          <h3>Damage</h3>
          <input type="number" class="damage-input" id="damage-input-${char_id}" placeholder="Damage Amount"/>
        </div>
        <div class="player-stat-column" id="health">
          <h3 class="player-max-health-label">Max Health</h3>
          <input class="player-max-health max-health-${char_id}" type='number'></input>
          <h3>Health</h3>
          <p class="health-num player-health-${char_id}" id="health-num-${char_id}">0</p>
          <button onclick="updateHealth('${char_id}')">Update Health</button>
        </div>
        <div class="player-stat-column" id="heal">
          <h3>Heal</h3>
          <input type="number" class="heal-input" id="heal-input-${char_id}" placeholder="Heal Amount"/>
        </div>
      </div>

      <div class="player-stat-row">
        <div class="armor-class-div">
          <p>Armor Class: </p>
          <input type="number" class="ac-input" id="ac-input-${char_id}">
        </div>
      </div>

    </div>
          <div id="chat-area">

        <button id="menu-toggle-${char_id}">Traps</button>
        <div id="menu-${char_id}" class="hidden trap-menu">
        </div>

            <h2>Chat</h2>
            <div id="chat"></div>
            <div id="input-area">
              <input id="msg" placeholder="Message" autocomplete="off" />
              <button onclick="sendMessage(${char_id})">Send</button>
            </div>
          </div>
      </div>
    </div>
  `;
document.getElementById('tab-contents').appendChild(tabContent);

const m = document.getElementById(`menu-${char_id}`);
menuToClientId.set(m, char_id);

const dropArea = document.getElementById(`drop-area-${char_id}`);
const tab = document.getElementById(`client-${tabMap[tabId]}`);
tab.querySelector("#msg").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage(char_id);
    }
});
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = '#eef';
});

dropArea.addEventListener('dragleave', () => {
  dropArea.style.backgroundColor = '';
});

let toggleBtn = document.getElementById(`menu-toggle-${char_id}`);
let menu = document.getElementById(`menu-${char_id}`);

toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

const max_health_element = document.querySelector('.max-health-' + char_id);
max_health_element.addEventListener("change", function() {
    hostUpdateMaxHealth(max_health_element.value, char_id);
});

document.getElementById(`ac-input-${char_id}`).addEventListener("change", function(event) {
    changeArmorClass(this.value);
});


document.getElementById(`heal-input-${char_id}`).addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        updateHealth(char_id);
    }
});

document.getElementById(`damage-input-${char_id}`).addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        updateHealth(char_id);
    }
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = '';


  const file = e.dataTransfer.files[0];
if (file && file.type.startsWith('image/')) {
  const formData = new FormData();
  formData.append('image', file);

  fetch('/upload-image', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    const imageUrl = data.url;
    // Emit this URL to clients via socket
    affected_tabs.forEach((c) => {
        let t = document.getElementById(clientMap[c]);
        socket.emit('host_send_image_url', { url: imageUrl, char_id: char_id });
        add_image_to_host(imageUrl, t);
    });
  })
  .catch(err => console.error("Upload failed", err));
}

});

  // Auto-select first client
  if (++clientCount === 1) {
    tabButton.classList.add("affected-tab");
    affected_tabs = [char_id];
    showTab(tabId);
  }
}

socket.on('client_name_registered', ({name, char_id }) => {
    createTab(name, char_id);
});

socket.on('host_load_client_data', ({name, char_id}) => {
    createTab(name, char_id);
});

socket.on('load_image', data => {
    const imageUrl = data.url;
    const char_id = data.char_id;
    load_image(imageUrl, char_id);
});

socket.on('load_message', data => {
    loadMessage(data.message, data.char_id);
});

//I don't think this is used right now.
  socket.on('client_disconnected', ({ client_id }) => {
const tabId = `client-${client_id}`;

// Remove tab button
document.querySelectorAll('.tab').forEach(tab => {
  if (tab.dataset.tabId === tabId) {
    tab.remove();
  }
});

  // Remove tab content
const content = document.getElementById(tabId);
if (content) content.remove();

// If it was the active tab, clear or show the next one
const remainingTabs = document.querySelectorAll('.tab');
if (remainingTabs.length > 0) {
  showTab(remainingTabs[0].dataset.tabId);
} else {
  document.querySelectorAll('.tab-content').forEach(div => div.classList.remove('active'));
}});


socket.on('message_to_dm', ({char_id, message, name}) => {
    addNotification(char_id);
    appendMessage(name, char_id, message);
});

socket.on('client_update_health', ({result, char_id}) => {
    //const health = document.getElementById(`health-num-${char_id}`);
    //health.textContent = result.toString();
    setPlayerHealth(result, char_id);
});

socket.on('client_change_armor_class', ({char_id, value}) => {
    updateArmorClass(char_id, value);
});


socket.on('update_traps_list', data => {
    const traps_data = data.traps_data;
    const traps = traps_data.traps;
    updateTrapLists(traps);
});

socket.on('add_ip_text', data => {
    const ip = data.ip;
    const p = document.createElement('p');
    const div = document.getElementById("right");
    const txt = `Connect players on: ${ip}`;
    p.textContent = txt;
    div.appendChild(p);
});



