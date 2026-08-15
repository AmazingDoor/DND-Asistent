import * as character_data_handler from "../../character_data_handler.js";

let socket = null;
let char_id = '';


export function SetSocket(io) {
    socket = io;
    char_id = sessionStorage.getItem('charId');
}

