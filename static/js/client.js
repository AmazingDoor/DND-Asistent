import {setFactorySocket} from './client_scripts/factories/socket_factory.js';
const socket = io();
setFactorySocket(socket);

import {loadPlayerAbilities, addEventListeners, calculateAbilityModifiers} from './client_scripts/ability_handler.js';

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');

    const max_health_input = document.querySelector(".max-health");
    max_health_input.addEventListener('change', function() {
        clientUpdateMaxHealth(max_health_input.value);
    });
    selectCharacter();
    addEventListeners();
});

function selectCharacter() {
    socket.emit('register_name', { name, char_id });
}

function sendMessage() {
  const msg = document.getElementById("msg").value;
  if (!msg) return;
  socket.emit('message_to_dm', { message: msg, char_id: char_id, char_name: name });
  appendMessage("You", msg);
  document.getElementById("msg").value = '';
}

function loadMessage(message) {
    const chat = document.getElementById("chat");
    const line = document.createElement("p");
    const index = message.indexOf(":");
    let from = message.slice(0, index);
    if (from !== "DM") {
        from = "You"
    }
    const msg = message.slice(index + 1);
    line.innerHTML = `<strong>${from}:</strong> ${msg}`;
    chat.appendChild(line);
    chat.scrollTop = chat.scrollHeight;

}

function appendMessage(from, message) {
  const chat = document.getElementById("chat");
  const line = document.createElement("p");
  line.innerHTML = `<strong>${from}:</strong> ${message}`;
  chat.appendChild(line);
  chat.scrollTop = chat.scrollHeight;
}

function updateHealth() {
    const heal_val = parseFloat(document.getElementById("heal-input").value) || 0;
    const damage_val = parseFloat(document.getElementById("damage-input").value || 0);
    const health = document.getElementById("health-num");
    const health_val = parseFloat(health.textContent) || 0;
    let result = health_val - damage_val + heal_val;
    const max_health = document.querySelector('.max-health').value;

    if (result > max_health) {
        result = max_health;
    }

    health.textContent = result.toString();
    document.getElementById("heal-input").value = '';
    document.getElementById("damage-input").value = '';
    socket.emit("client_update_health", {result: result, char_id: char_id});
}

function toggleImages() {
    const img_area = document.getElementById("image-area");
    const chat_area = document.getElementById("chat-area");
    const player_stats = document.getElementById("player-stats");

    img_area.classList.toggle("mobile-hidden");
    if (img_area.classList.contains("mobile-hidden")) {
        player_stats.classList.remove("mobile-hidden");
    } else {
        player_stats.classList.add("mobile-hidden");
    }

    if (!chat_area.classList.contains("mobile-hidden")) {
        chat_area.classList.add("mobile-hidden");
    }

    document.getElementById("toggle-imgs").style.backgroundColor = "lightgray";


}

function toggleChat() {
    const chat_area = document.getElementById("chat-area");
    chat_area.classList.toggle("mobile-hidden");
    const img_area = document.getElementById("image-area");
    const player_stats = document.getElementById("player-stats");

    if (chat_area.classList.contains("mobile-hidden")) {
        player_stats.classList.remove("mobile-hidden");
    } else {
        player_stats.classList.add("mobile-hidden");
    }

    if (!img_area.classList.contains("mobile-hidden")) {
        img_area.classList.add("mobile-hidden");
    }

    document.getElementById("toggle-chat").style.backgroundColor = "lightgray";



}

function show_initiative_overlay(combat_id) {
    const overlay = document.querySelector(".initiative-input-container");
    overlay.style.display = 'flex';
    overlay.querySelector("#combat-id").textContent = combat_id;
}

function hide_initiative_overlay() {
    const overlay = document.querySelector(".initiative-input-container");
    overlay.style.display = 'none';
    overlay.querySelector("#init-number").value = 0;
    overlay.querySelector("#combat-id").textContent = '';

}

function submit_init() {
    const overlay = document.querySelector(".initiative-input-container");
    const combat_id = overlay.querySelector("#combat-id").textContent;
    const initiative = overlay.querySelector("#init-number").value;
    socket.emit('player_input_init', {char_id: char_id, combat_id: combat_id, init: initiative, char_name: name});
    hide_initiative_overlay();
}

function clientUpdateMaxHealth() {
    const max_health_input = document.querySelector(".max-health");
    socket.emit('client_update_max_health', {max_health: max_health_input.value, char_id: char_id});
}

function updateMaxHealth(max_health) {
    const max_health_input = document.querySelector(".max-health");
    max_health_input.value = max_health;
}

socket.on('host_update_max_health', data => {
    const max_health = data.max_health;
    updateMaxHealth(max_health);
});

socket.on('load_message', data => {
    loadMessage(data.message);
});

socket.on('private_message', data => {
  appendMessage(data.from, data.message);
  const text_area = document.getElementById("chat-area");
  if (text_area.classList.contains("mobile-hidden")) {
    document.getElementById("toggle-chat").style.backgroundColor = "red";
  }

});



socket.on('send_image', data => {
  let n = data.n;
  if (n == null) {
    n = true;
  }

  const imageBox = document.createElement("div");
  imageBox.classList.add("image-box");

  const img = document.createElement("img");
  img.src = data.url;
  img.alt = "Shared by DM";

  imageBox.appendChild(img);
  document.getElementById("images").appendChild(imageBox);
  const img_area = document.getElementById("image-area");

  if (n) {
      if (img_area.classList.contains("mobile-hidden")) {
        document.getElementById("toggle-imgs").style.backgroundColor = "red";
      }
  }

});


socket.on('host_update_health', ({result, client_id}) => {
    const health = document.getElementById("health-num");
    health.textContent = result.toString();
});

socket.on('host_change_armor_class', ({value}) => {
    const ac_value = document.getElementById('ac-input');
    ac_value.value = value;
});

socket.on('initialize_combat', ({combat_id}) => {
    show_initiative_overlay(combat_id);
});

document.addEventListener("DOMContentLoaded", function () {
      document.querySelector("#toggle-imgs").addEventListener("click", function() {toggleImages()});
      document.querySelector("#toggle-chat").addEventListener("click", function() {toggleChat()});
      document.querySelector("#submit-init-button").addEventListener("click", function() {submit_init();});
      document.querySelector("#hide-init-overlay-button").addEventListener("click", function() {hide_initiative_overlay();});

      document.getElementById("heal-input").addEventListener("change", function(event) {
        updateHealth();
      });

    document.getElementById("damage-input").addEventListener("change", function(event) {
        updateHealth();
      });

    document.getElementById("msg").addEventListener("change", function(event) {
        sendMessage();
      });

    document.getElementById('ac-input').addEventListener('change', function(event) {
        const value = document.getElementById('ac-input').value;
        socket.emit('client_change_armor_class', {value: value, char_id: char_id});
    });
  });


