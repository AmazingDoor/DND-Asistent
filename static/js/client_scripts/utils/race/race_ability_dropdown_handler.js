document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});

let socket = null;

export function setSocket(io) {
    socket = io;
}

export function addEventListeners(head, updateModifiers) {
    const options = [...head.querySelector('.ability-options').children];
    options.forEach((option) => {
        option.addEventListener("click", function() {clickListener(head, option, updateModifiers);});
    });
}

function clickListener(head, option, updateModifiers) {
    head.querySelector('p').textContent = option.textContent;
    updateModifiers();
    const selected_abilities = head.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll('.selected-ability');
    let abilities = {};
    selected_abilities.forEach((ability) => {
        const row = ability.parentElement.parentElement.parentElement;
        const table_datas = row.querySelectorAll('td');
        const mod_num = parseInt(table_datas[1].textContent.replace("+", ""));
        abilities[ability.textContent] = mod_num;
    });
    socket.emit('save_race_abilities', {race_abilities: abilities, char_id: char_id});
}