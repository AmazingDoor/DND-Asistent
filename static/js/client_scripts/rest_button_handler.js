import { getMagicSlots } from "../shared/spell_caster_slot_map.js";
import { getMaxHeath, getPlayerHealth, setPlayerHealth } from "./utils/character_sheet/character_data_handler.js";
import { getMaxSpellSlots, setCurrentSpellSlots } from "./utils/character_sheet/mappers/class_mapper.js";
import { saveAll } from "./save_handler.js";
import { bus, EVENTS } from "./utils/event_bus.js";
const long_rest_button = document.getElementById("long-rest-button");
const short_rest_button = document.getElementById("short-rest-button");

export function InitializeButtonHandler() {
    long_rest_button.addEventListener("click", function() {longRest()});
    short_rest_button.addEventListener("click", function() {shortRest()});
}

async function longRest() {
    if(parseInt(getPlayerHealth()) < parseInt(getMaxHeath())) {
        setPlayerHealth(getMaxHeath());
    }
    setCurrentSpellSlots(getMaxSpellSlots());
    await saveAll();
    bus.publish(EVENTS.LONG_REST);
}

function shortRest() {
    
    bus.publish(EVENTS.SHORT_REST);
}