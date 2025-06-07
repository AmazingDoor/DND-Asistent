const socket = io();

window.onload = function() {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
    selectCharacter();
}
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
    const result = health_val - damage_val + heal_val;
    health.textContent = result.toString();
    document.getElementById("heal-input").value = '';
    document.getElementById("damage-input").value = '';
    socket.emit("client_update_health", {result: result, char_id: char_id})
}

socket.on('load_message', data => {
    loadMessage(data.message);
});

socket.on('private_message', data => {
  appendMessage(data.from, data.message);
});



socket.on('send_image', data => {
  const imageBox = document.createElement("div");
  imageBox.classList.add("image-box");

  const img = document.createElement("img");
  img.src = data.url;
  img.alt = "Shared by DM";

  imageBox.appendChild(img);
  document.getElementById("images").appendChild(imageBox);
});


socket.on('host_update_health', ({result, client_id}) => {
    const health = document.getElementById("health-num");
    health.textContent = result.toString();
});

socket.on('host_change_armor_class', ({value}) => {
    const ac_value = document.getElementById('ac-input');
    console.log(value);
    ac_value.value = value;
});

document.addEventListener("DOMContentLoaded", function () {
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
