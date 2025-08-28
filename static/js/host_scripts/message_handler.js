let socket = null;

export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", function () {
    addEventListeners();
});

function addEventListeners() {
    socket.on('load_message', data => {
        loadMessage(data.message, data.char_id);
    });

    socket.on('message_to_dm', ({char_id, message, name}) => {
        addNotification(char_id);
        appendMessage(name, char_id, message);
    });
}

export function sendMessage(active_client, affected_tabs) {
    const msg = escapeHTML(document.getElementById(`client-${active_client}`).querySelector('#msg').value);
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

export function removeNotification(char_id) {
    const b = document.getElementById(`tab-btn-${char_id}`);
    if (b.style.backgroundColor === "red") {
        b.style.backgroundColor = "white"
    }

}

export function appendMessage(from, char_id, message) {
    const tab = document.getElementById(`client-${char_id}`);
    const chat = tab.querySelector('#chat');

    const line = document.createElement("p");
    line.innerHTML = `<strong>${from}:</strong> ${message}`;
    chat.appendChild(line);
    chat.scrollTop = chat.scrollHeight;
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

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}