import { setPlayerLevel, updatePlayerLevelDisplay } from "./player_level_handler.js";
import { setArmorClass, setInitiativeModifier, setMaxHealth, setPlayerHealth, setSpeed } from "./utils/character_sheet/character_data_handler.js";
import { emitSignal, getSocket } from "./utils/socket_emitter.js";

let char_id = sessionStorage.getItem("charId");

export async function initializeBasicData() {

    //Doesn't need to be saved because its data loaded directly from the server
    emitSignal('require_basic_data', {char_id: char_id});
    return new Promise((resolve) => {
        getSocket().once('sent_basic_data', data => {
            let ac = data['ac']
            let health = data['health']
            let imgs = data['imgs']
            let init_mod = data['init_mod']
            let max_health = data['max_health']
            let name = data['name']
            let player_level = data['player_level']
            let speed = data['speed']
            let states_text = data['states_text']

            setArmorClass(ac);
            
            setPlayerHealth(health);

            setInitiativeModifier(init_mod);

            setMaxHealth(max_health);

            setPlayerLevel(player_level);
            updatePlayerLevelDisplay();

            setSpeed(speed);

            resolve(data);
        });
    });
}