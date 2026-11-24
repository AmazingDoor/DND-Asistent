import { initializeClient } from './client_scripts/client_initializer.js';
import {setFactorySocket} from './client_scripts/factories/socket_factory.js';
import './client_scripts/character_sheet_tab_handler.js';
import './client_scripts/overlay_tab_handler.js';
import './client_scripts/utils/dropdown_handler.js';
import './client_scripts/player_display_tab_handler.js';
import './client_scripts/utils/character_sheet/page_builders/inventory_builder.js';
import './client_scripts/utils/character_sheet/page_builders/ability_builder.js';
import {setPlayerLevel} from './client_scripts/player_level_handler.js';
import { bus, EVENTS } from './client_scripts/utils/event_bus.js';
import { handleSpellSlotOnLevelUp } from './client_scripts/utils/character_sheet/mappers/class_mapper.js';
import { getInitiativeModifier, getPlayerHealth, getSpeed, setInitiativeModifier, setMaxHealth, setPlayerHealth, setSpeed } from './client_scripts/utils/character_sheet/character_data_handler.js';
import { saveInitiativeMod, savePlayerHealth, saveSpeed } from './client_scripts/save_handler.js';
import { ClassesHandler } from './client_scripts/classes_handler.js';
import { BasicDataHandler } from './client_scripts/basic_data_handler.js';
import { escapeHTML } from './shared/utils/text_helper.js';
import { AbilityHandler } from './client_scripts/ability_handler.js';
import { RaceHandler } from './client_scripts/race_handler.js';

const socket = io({
    transports: ["websocket"]
});

const classes_handler = new ClassesHandler(socket);
const ability_handler = new AbilityHandler(socket, classes_handler);
const basic_data_handler = new BasicDataHandler(socket);
const race_handler = new RaceHandler(socket);

let char_name = null;
let char_id = null;



document.addEventListener("DOMContentLoaded", async () => {
    char_name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');

    registerCharacter();

    await setFactorySocket(socket);
    await basic_data_handler.loadSaveData();
    //await initializeClient();

    //classes_handler.createClassTab();
    await classes_handler.loadSaveData();
    await ability_handler.loadSaveData();
    await race_handler.loadSaveData();
    ability_handler.getCharacterAbilityModifiers();
    

});


function registerCharacter() {
    //register the client with the server
    socket.emit('register_name', { char_name, char_id });
}

function sendMessage() {
    const msg = escapeHTML(document.getElementById("msg").value);
    if (!msg) return;
    socket.emit('message_to_dm', { message: msg, char_id: char_id, char_name: char_name });
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
    socket.emit('player_input_init', {char_id: char_id, combat_id: combat_id, init: initiative, char_name: char_name});
    hide_initiative_overlay();
}


socket.on('load_message', data => {
    loadMessage(data.message);
});

socket.on('private_message', data => {
  appendMessage(data.from, data.message);
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

});


socket.on('initialize_combat', ({combat_id}) => {
    show_initiative_overlay(combat_id);
});

document.addEventListener("DOMContentLoaded", function () {
      document.querySelector("#submit-init-button").addEventListener("click", function() {submit_init();});
      document.querySelector("#hide-init-overlay-button").addEventListener("click", function() {hide_initiative_overlay();});

    document.getElementById("msg").addEventListener("change", function(event) {
        sendMessage();
      });
  });


