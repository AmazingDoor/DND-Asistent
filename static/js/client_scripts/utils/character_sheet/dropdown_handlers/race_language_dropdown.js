document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

let socket = null;

export function setSocket(io) {
    socket = io;
}

export function addEventListeners(head) {
    const options = [...head.querySelector('.language-options').children];
    options.forEach((option) => {
        option.addEventListener("click", function() {clickEvent(head, option);});
    });
}


function clickEvent(head, option) {
    const txt = head.querySelector('.selected-language');
    txt.textContent = option.textContent;
    const all_txts = head.parentElement.querySelectorAll('.selected-language');
    let final_txts = [];
    all_txts.forEach((txt) => {final_txts.push(txt.textContent);});
    socket.emit('save_race_languages', {race_languages: final_txts, char_id: char_id})
}