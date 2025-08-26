import {setFactorySocket} from './host_scripts/factories/socket_factory.js';
import {setAffectedTabs, getAffectedTabs, spliceAffectedTabs, addAffectedTab} from './host_scripts/factories/active_tabs_factory.js';
import {setMenuToClient} from './host_scripts/factories/menu_to_client_factory.js';

import {sendMessage, removeNotification, appendMessage} from './host_scripts/message_handler.js';
import {add_image_to_host} from './host_scripts/image_handler.js';
import {combatUpdatePlayerHealth, setPlayerHealth} from './host_scripts/combat/health_handler.js';
import {updatePlayerAC, manageCombat} from './combat.js';
import {updateMaxHealth, hostUpdateMaxHealth} from './host_scripts/combat/health_section_builder.js';
const socket = io({ query: { role: "host" } });
setFactorySocket(socket);

const clientMap = {};
let clientCount = 0;
const tabMap = {};
const clientToTab = {};

document.addEventListener("DOMContentLoaded", function () {
    socket.emit('host_page_load');
    document.querySelector("#manageCombatButton").addEventListener("click", function() {manageCombat()});
    document.querySelector("#close-combat-overlay-button").addEventListener("click", function() {manageCombat()});
});

function showTabAndMark(event, char_id, tab_id, button_id) {
    let change_tab = true;
    if(event.shiftKey) {
        let active_tab = document.querySelector(".tab.active");
        if (active_tab.id !== button_id) {
            if(getAffectedTabs().includes(char_id)) {
                let index = getAffectedTabs.indexOf(char_id);
                if (index !== -1) {
                    spliceAffectedTabs(index);
                    document.getElementById(button_id).classList.remove("affected-tab");
                    change_tab = false;
                }
            } else {
                addAffectedTab(char_id);
                document.getElementById(button_id).classList.add("affected-tab");
            }
        }
    } else {
        let remove_class_tabs = document.querySelectorAll(".affected-tab");
        remove_class_tabs.forEach((tab) => {
            tab.classList.remove('affected-tab');
        });
        document.getElementById(button_id).classList.add("affected-tab");
        const tabs = [char_id];
        setAffectedTabs(tabs);
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

function changeArmorClass(value) {
    getAffectedTabs().forEach((char_id) => {
        updateArmorClass(char_id, value);
        socket.emit("host_change_armor_class", {value: value, char_id: char_id})
    });
}

function updateHealth(c) {
    const heal_input = document.getElementById(`heal-input-${c}`);
    const damage_input = document.getElementById(`damage-input-${c}`);
    const heal_val = parseFloat(heal_input.value) || 0;
    const damage_val = parseFloat(damage_input.value || 0);
    getAffectedTabs().forEach((char_id) => {
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

function updateArmorClass(char_id, value) {
    const ac_input = document.getElementById(`ac-input-${char_id}`);
    ac_input.value = value;
    updatePlayerAC(char_id, value);

}

function createTab(name, char_id) {
  const tabId = `client-${char_id}`;
  //Trying to get rid of this
  clientMap[char_id] = tabId;
  tabMap[tabId] = char_id;

  // Create tab button
  const tabButton = document.createElement('button');
  tabButton.className = 'tab';
  tabButton.innerText = name;
  tabButton.dataset.tabId = tabId;
  tabButton.id = `tab-btn-${char_id}`;
  tabButton.style.backgroundColor = "white";
  tabButton.onclick = (event) => showTabAndMark(event, char_id, tabId, tabButton.id);
  document.getElementById('tab-bar').appendChild(tabButton);

  const returned_tabs = getAffectedTabs();

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
              <button onclick="sendMessage(${char_id}, ${returned_tabs})">Send</button>
            </div>
          </div>
      </div>
    </div>
  `;
document.getElementById('tab-contents').appendChild(tabContent);

const m = document.getElementById(`menu-${char_id}`);
setMenuToClient(m, char_id);

const dropArea = document.getElementById(`drop-area-${char_id}`);
const tab = document.getElementById(`client-${tabMap[tabId]}`);
tab.querySelector("#msg").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage(char_id, getAffectedTabs());
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
    getAffectedTabs().forEach((c) => {
        let t = document.getElementById(clientMap[c]);
        let id = clientMap[c].replace("client-", "");
        socket.emit('host_send_image_url', { url: imageUrl, char_id: id });
        add_image_to_host(imageUrl, t);
    });
  })
  .catch(err => console.error("Upload failed", err));
}

});

  // Auto-select first client
  if (++clientCount === 1) {
    tabButton.classList.add("affected-tab");
    const t = [char_id];
    setAffectedTabs(t);
    showTab(tabId);
  }
}

socket.on('client_name_registered', ({name, char_id }) => {
    createTab(name, char_id);
});

socket.on('host_load_client_data', ({name, char_id}) => {
    createTab(name, char_id);
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

socket.on('client_update_health', ({result, char_id}) => {
    //const health = document.getElementById(`health-num-${char_id}`);
    //health.textContent = result.toString();
    setPlayerHealth(result, char_id);
});

socket.on('client_change_armor_class', ({char_id, value}) => {
    updateArmorClass(char_id, value);
});


socket.on('add_ip_text', data => {
    const ip = data.ip;
    const p = document.createElement('p');
    const div = document.getElementById("right");
    const txt = `Connect players on: ${ip}`;
    p.textContent = txt;
    div.appendChild(p);
});

socket.on('client_update_max_health', data => {
    const max_health = data.max_health;
    const char_id = data.char_id;
    updateMaxHealth(max_health, char_id);
});





