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

  console.log(n)
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
