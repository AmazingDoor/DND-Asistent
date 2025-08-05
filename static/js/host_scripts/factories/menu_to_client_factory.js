const menuToClientId = new Map();

export function setMenuToClient(m, char_id) {
    menuToClientId.set(m, char_id);
}

export function getMenuToClientMap() {
    return menuToClientId;
}