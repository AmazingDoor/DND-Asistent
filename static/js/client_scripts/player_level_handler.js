let player_level = 0;
let socket = null;

export function setSocket(io) {
    socket = io;
}

document.addEventListener("DOMContentLoaded", function() {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');


    socket.on('load_player_level', data => {
        const lvl = data.get('player_level');
        setPlayerLevelAndUpdate(lvl);
    });
});

export function getPlayerLevel() {
    return player_level;
}

export function setPlayerLevel(level) {
    player_level = level;
    socket.emit('client_change_player_level', {player_level: level, char_id: char_id});
}

export function setPlayerLevelAndUpdate(level) {
    setPlayerLevel(level);
    document.querySelector('#player-level-input').value = level;

}

export function getProficiencyBonus() {
    if (isInRange(player_level, 1, 4)) {
        return 2;
    } else if (isInRange(player_level, 5, 8)) {
        return 3;
    } else if (isInRange(player_level, 9, 12)) {
        return 4;
    } else if (isInRange(player_level, 13, 16)) {
        return 5;
    } else if (isInRange(player_level, 17, 20)) {
        return 6;
    } else {return 0;}
}

function isInRange(num, min, max) {
    if(num >= min && num <= max) {
        return true;
    }
}