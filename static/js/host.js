const socket = io({ query: { role: "host" } });
const clientMap = {};
let clientCount = 0;
let affected_tabs = [];
const tabMap = {};
const charMap = {};
const clientToTab = {};
const menuToClientId = new Map();

window.onload = function() {
    socket.emit('host_page_load');
}


function sendMessage(active_client) {
    const msg = document.getElementById(`client-${active_client}`).querySelector('#msg').value;
    affected_tabs.forEach((client_id) => {
        const tab = document.getElementById(`client-${client_id}`);
        if (!msg) return;
        socket.emit("message_to_client", {message: msg, client_id, char_id: charMap[client_id]});
        appendMessage("You", client_id, msg);
        tab.querySelector('#msg').value = '';
    });

}

function addNotification(client_id, tab_id) {
    const b = document.getElementById(`tab-btn-${client_id}`);
    const active_button = document.querySelector('.tab.active');
    if(active_button) {
        if (active_button.id == `tab-btn-${client_id}`) {
            return;
        }
    }
    if (b.style.backgroundColor === "white") {
        b.style.backgroundColor = "red"
    }

}

function removeNotification(client_id) {
    const b = document.getElementById(`tab-btn-${client_id}`);
    if (b.style.backgroundColor === "red") {
        b.style.backgroundColor = "white"
    }

}

function load_image(imageUrl, client_id) {
    const tab = document.getElementById(`client-${client_id}`);
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

function showTabAndMark(event, client_id, tab_id, button_id) {
    let change_tab = true;
    if(event.shiftKey) {
        let active_tab = document.querySelector(".tab.active");
        if (active_tab.id !== button_id) {
            if(affected_tabs.includes(client_id)) {
                let index = affected_tabs.indexOf(client_id);
                if (index !== -1) {
                    affected_tabs.splice(index, 1);
                    document.getElementById(button_id).classList.remove("affected-tab");
                    change_tab = false;
                }
            } else {
                affected_tabs.push(client_id);
                document.getElementById(button_id).classList.add("affected-tab");
            }
        }
    } else {
        remove_class_tabs = document.querySelectorAll(".affected-tab");
        remove_class_tabs.forEach((tab) => {
            tab.classList.remove('affected-tab');
        });
        document.getElementById(button_id).classList.add("affected-tab");
        affected_tabs = [client_id];
    }

    removeNotification(client_id);
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

function appendMessage(from, client_id, message) {
    const tab = document.getElementById(`client-${client_id}`);
    const chat = tab.querySelector('#chat');

    const line = document.createElement("p");
    line.innerHTML = `<strong>${from}:</strong> ${message}`;
    chat.appendChild(line);
    chat.scrollTop = chat.scrollHeight;
}


function changeArmorClass(value) {
    affected_tabs.forEach((client_id) => {
        updateArmorClass(client_id, value);
        socket.emit("host_change_armor_class", {client_id: client_id, value: value, char_id: charMap[client_id]})
    });
}

function updateHealth(c) {
    const heal_val = parseFloat(document.getElementById(`heal-input-${c}`).value) || 0;
    const damage_val = parseFloat(document.getElementById(`damage-input-${c}`).value || 0);
    affected_tabs.forEach((client_id) => {
        const health = document.getElementById(`health-num-${client_id}`);
        const health_val = parseFloat(health.textContent) || 0;
        const result = health_val - damage_val + heal_val;
        health.textContent = result.toString();
        document.getElementById(`heal-input-${client_id}`).value = '';
        document.getElementById(`damage-input-${client_id}`).value = '';
        socket.emit("host_update_health", {result: result, client_id: client_id, char_id: charMap[client_id]});
    });
}

function loadMessage(message, client_id) {
    const tab = document.getElementById(`client-${client_id}`);
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
    affected_tabs.forEach((client_id) => {
        socket.emit("message_to_client", {message: text, client_id, char_id: charMap[client_id]});
        appendMessage("You", client_id, text);
    });
}

function updateArmorClass(client_id, value) {
    const ac_input = document.getElementById(`ac-input-${client_id}`);
    ac_input.value = value;
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


socket.on('client_name_registered', ({ client_id, name, char_id }) => {
  const tabId = `client-${client_id}`;
  clientMap[client_id] = tabId;
  tabMap[tabId] = client_id;
  charMap[client_id] = char_id;

  // Create tab button
  const tabButton = document.createElement('button');
  tabButton.className = 'tab';
  tabButton.innerText = name;
  tabButton.dataset.tabId = tabId;
  tabButton.id = `tab-btn-${client_id}`;
  tabButton.style.backgroundColor = "white";
  tabButton.onclick = (event) => showTabAndMark(event, client_id, tabId, tabButton.id);
  document.getElementById('tab-bar').appendChild(tabButton);

  // Create tab content
  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content';
  tabContent.id = tabId;
  tabContent.innerHTML = `
  <h2 id="tab-title-${client_id}">${name}</h2>
  <p><strong>Socket ID:</strong> <code>${client_id}</code></p>
    <div class="div-body">
        <div id="image-area">
            <h2>Images</h2>
            <div id="images">
                <div id="drop-area-${client_id}" style="border: 2px dashed #ccc; padding: 20px; margin: 20px;">
                Drop an image here
            </div>
            <div id="img-list">
            </div>
        </div>
      </div>
      <div id="right-side">
          <div id="player-stats">
      <h2>Player</h2>
      <div class="player-stat-row">
        <div class="player-stat-column" id="damage">
          <h3>Damage</h3>
          <input type="number" class="damage-input" id="damage-input-${client_id}" placeholder="Damage Amount"/>
        </div>
        <div class="player-stat-column" id="health">
          <h3>Health</h3>
          <p class="health-num" id="health-num-${client_id}">0</p>
          <button onclick="updateHealth('${client_id}')">Update Health</button>
        </div>
        <div class="player-stat-column" id="heal">
          <h3>Heal</h3>
          <input type="number" class="heal-input" id="heal-input-${client_id}" placeholder="Heal Amount"/>
        </div>
      </div>

      <div class="player-stat-row">
        <div class="armor-class-div">
          <p>Armor Class: </p>
          <input type="number" class="ac-input" id="ac-input-${client_id}">
        </div>
      </div>

    </div>
          <div id="chat-area">

        <button id="menu-toggle-${client_id}">Traps</button>
        <div id="menu-${client_id}" class="hidden trap-menu">
        </div>

            <h2>Chat</h2>
            <div id="chat"></div>
            <div id="input-area">
              <input id="msg" placeholder="Message" autocomplete="off" />
              <button onclick="sendMessage(${client_id})">Send</button>
            </div>
          </div>
      </div>
    </div>
  `;
document.getElementById('tab-contents').appendChild(tabContent);

const m = document.getElementById(`menu-${client_id}`);
menuToClientId.set(m, client_id);

const dropArea = document.getElementById(`drop-area-${client_id}`);
const tab = document.getElementById(`client-${tabMap[tabId]}`);
tab.querySelector("#msg").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage(client_id);
    }
});
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = '#eef';
});

dropArea.addEventListener('dragleave', () => {
  dropArea.style.backgroundColor = '';
});

let toggleBtn = document.getElementById(`menu-toggle-${client_id}`);
let menu = document.getElementById(`menu-${client_id}`);

toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});


document.getElementById(`ac-input-${client_id}`).addEventListener("change", function(event) {
    changeArmorClass(this.value);
});


document.getElementById(`heal-input-${client_id}`).addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        updateHealth(client_id);
    }
});

document.getElementById(`damage-input-${client_id}`).addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        updateHealth(client_id);
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
    console.log(`client-${tabMap[tabId]}`);
    affected_tabs.forEach((c) => {
        let t = document.getElementById(clientMap[c]);
        socket.emit('host_send_image_url', { url: imageUrl, target_id: c, char_id: charMap[c] });
        add_image_to_host(imageUrl, t);
    });
  })
  .catch(err => console.error("Upload failed", err));
}

});

  // Auto-select first client
  if (++clientCount === 1) {
    tabButton.classList.add("affected-tab");
    affected_tabs = [client_id];
    showTab(tabId);
  }
});

socket.on('load_image', data => {
    const imageUrl = data.url;
    const client_id = data.client_id;
    load_image(imageUrl, client_id);
});

socket.on('load_message', data => {
    loadMessage(data.message, data.client_id);
});

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


socket.on('message_to_dm', ({client_id, message, name}) => {
    addNotification(client_id);
    appendMessage(name, client_id, message);
});

socket.on('client_update_health', ({result, client_id}) => {
    const health = document.getElementById(`health-num-${client_id}`);
    health.textContent = result.toString();
});

socket.on('client_change_armor_class', ({client_id, value}) => {
    updateArmorClass(client_id, value);
});


socket.on('update_traps_list', data => {
    const traps_data = data.traps_data;
    const traps = traps_data.traps;
    updateTrapLists(traps);
});



