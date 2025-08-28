import {getAffectedTabs} from './factories/active_tabs_factory.js';
import {getMenuToClientMap} from './factories/menu_to_client_factory.js';
import {appendMessage} from './message_handler.js';

let socket = null;

export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", function () {
    addEventListeners();
});

function manageTraps() {
    window.location.href='/manage_traps';
}

function sendTrapMessage(text) {
    getAffectedTabs().forEach((char_id) => {
        socket.emit("message_to_client", {message: escapeHTML(text), char_id: char_id});
        appendMessage("You", char_id, escapeHTML(text));
    });
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
                sendTrapMessage(trap.trap_text, getMenuToClientMap().get(element));
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




function addEventListeners() {
    document.querySelector("#manage-traps-button").addEventListener('click', manageTraps);

    socket.on('update_traps_list', data => {
        const traps_data = data.traps_data;
        const traps = traps_data.traps;
        updateTrapLists(traps);
    });

}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}