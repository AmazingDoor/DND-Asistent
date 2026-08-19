import { getPlayerHealth } from "./utils/character_sheet/character_data_handler.js";
import { getClassName, getClassPreparedCantrips, getClassPreparedSpells, getClassSkills, getCurrentSpellSlots, getSpellSlotsUsed} from "./utils/character_sheet/mappers/class_mapper.js";
import { getRaceAbilities, getRaceLanguages, getRaceName, getRaceSkills } from "./utils/character_sheet/mappers/race_mapper.js";
import { emitAndWait } from "./utils/socket_emitter.js";
import * as character_data_handler from "./utils/character_sheet/character_data_handler.js";

const char_id = sessionStorage.getItem('charId');
const name = sessionStorage.getItem('charName');

export async function saveAll() {
    await saveClassData();
    await savePlayerSkills();
    await saveRaceAbilities();
    await saveRace();
    await saveRaceLanguages();
    await saveRaceSkills();
    await saveInventory();
    await saveAbilities();
    await saveSpells();
    await savePlayerHealth();
}

export async function saveSpeed() {
    let data = {speed: character_data_handler.getSpeed(), char_id: char_id};
    await emitAndWait('save_speed', data);
    console.log('speed saved');
}

export async function saveInitiativeMod() {
    let data = {init_mod: character_data_handler.getInitiativeModifier(), char_id: char_id};
    await emitAndWait('save_init_mod', data);
}

export async function saveClassData() {
    let class_data = {class_name: getClassName(), skills: getClassSkills(),
        current_spell_slots: getCurrentSpellSlots(), used_spell_slots: getSpellSlotsUsed(), char_id: char_id};
    await emitAndWait('save_player_class', class_data);
}

export async function savePlayerSkills() {
    let data = {skills: getClassSkills(), char_id: char_id};
    await emitAndWait('save_player_skills', data);
}

export async function saveRaceAbilities() {
 let data = {race_abilities: getRaceAbilities(), char_id: char_id};
 await emitAndWait('save_race_abilities', data);
}

export async function saveRace() {
    let data = {race_name: getRaceName(), char_id: char_id};
    await emitAndWait('save_race', data);
}

export async function saveRaceLanguages() {
    let data = {race_languages: getRaceLanguages(), char_id: char_id};
    await emitAndWait('save_race_languages', data);
}

export async function saveRaceSkills() {
    let data = {race_skills: getRaceSkills(), char_id: char_id};
    await emitAndWait('save_race_skills', data);
}


export async function saveInventory() {
    let data = {char_id: char_id, inventory: character_data_handler.getInventoryHandler().getSaveData()};
    console.log(data);
    await emitAndWait('save_inventory', data);
}

export async function saveAbilities() {
    const [str_input, dex_input, con_input, int_input, wis_input, cha_input] = getInputs();
    const abilities = {str_num: str_input.value, dex_num: dex_input.value, con_num: con_input.value, int_num: int_input.value, wis_num: wis_input.value, cha_num: cha_input.value};
    const data = {char_id: char_id, abilities: abilities};
    
    await emitAndWait('save_abilities', data);
}

export async function saveSpells() {
    let data = {spells: getClassPreparedSpells(), cantrips: getClassPreparedCantrips(), char_id: char_id};
    await emitAndWait('save_spells', data);
}

export async function savePlayerHealth() {
    let data = {result: getPlayerHealth(), char_id: char_id};
    await emitAndWait("client_update_health", data);
}


function getInputs () {
    const str_input = document.querySelector('#strength-input');
    const dex_input = document.querySelector('#dexterity-input');
    const con_input = document.querySelector('#constitution-input');
    const int_input = document.querySelector('#intelligence-input');
    const wis_input = document.querySelector('#wisdom-input');
    const cha_input = document.querySelector('#charisma-input');
    return[str_input, dex_input, con_input, int_input, wis_input, cha_input]
}