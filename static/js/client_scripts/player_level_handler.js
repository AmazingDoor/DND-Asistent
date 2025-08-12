let player_level = 1;

export function getPlayerLevel() {
    return player_level;
}

export function setPlayerLevel(level) {
    player_level = level;
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