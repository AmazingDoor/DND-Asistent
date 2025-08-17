import * as ability_calculator from './../calculators/ability_calculator.js';
import {setCharacterAbilities} from './../character_data_handler.js';

document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');

});

let socket = null;
export function setSocket(io) {
    socket = io;
    socket.on('build_character_abilities', data => {
        buildCharacterAbilities(data);
    });
}

export function buildCharacterAbilities(data) {
    const abilities = data.abilities;
    setCharacterAbilities(abilities);
    addEventListeners();


    const str_num = abilities.str_num;
    const dex_num = abilities.dex_num;
    const con_num = abilities.con_num;
    const int_num = abilities.int_num;
    const wis_num = abilities.wis_num;
    const cha_num = abilities.cha_num;

    const [str_input, dex_input, con_input, int_input, wis_input, cha_input] = getInputs();

    str_input.value = str_num;
    dex_input.value = dex_num;
    con_input.value = con_num;
    int_input.value = int_num;
    wis_input.value = wis_num;
    cha_input.value = cha_num;
    setModTexts();
}

function addEventListeners() {
    const [str_input, dex_input, con_input, int_input, wis_input, cha_input] = getInputs();

    str_input.addEventListener('change', function() {const mod_num = ability_calculator.calculateStrengthMod(); const mod = document.querySelector('#strength-mod'); setModText(mod, mod_num); saveAbilities();});
    dex_input.addEventListener('change', function() {const mod_num = ability_calculator.calculateDexterityMod(); const mod = document.querySelector('#dexterity-mod'); setModText(mod, mod_num); saveAbilities();});
    con_input.addEventListener('change', function() {const mod_num = ability_calculator.calculateConstitutionMod(); const mod = document.querySelector('#constitution-mod'); setModText(mod, mod_num); saveAbilities();});
    int_input.addEventListener('change', function() {const mod_num = ability_calculator.calculateIntelligenceMod(); const mod = document.querySelector('#intelligence-mod'); setModText(mod, mod_num); saveAbilities();});
    wis_input.addEventListener('change', function() {const mod_num = ability_calculator.calculateWisdomMod(); const mod = document.querySelector('#wisdom-mod'); setModText(mod, mod_num); saveAbilities();});
    cha_input.addEventListener('change', function() {const mod_num = ability_calculator.calculateCharismaMod(); const mod = document.querySelector('#charisma-mod'); setModText(mod, mod_num); saveAbilities();});
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

function setModTexts() {
    const str_mod = document.querySelector('#strength-mod');
    const dex_mod = document.querySelector('#dexterity-mod');
    const con_mod = document.querySelector('#constitution-mod');
    const int_mod = document.querySelector('#intelligence-mod');
    const wis_mod = document.querySelector('#wisdom-mod');
    const cha_mod = document.querySelector('#charisma-mod');

    setModText(str_mod, ability_calculator.calculateStrengthMod());
    setModText(dex_mod, ability_calculator.calculateDexterityMod());
    setModText(con_mod, ability_calculator.calculateConstitutionMod());
    setModText(int_mod, ability_calculator.calculateIntelligenceMod());
    setModText(wis_mod, ability_calculator.calculateWisdomMod());
    setModText(cha_mod, ability_calculator.calculateCharismaMod());


}

function setModText(mod, num) {
    console.log(mod);
    let sign = "";
    if (num >= 0) {
        sign = "+";
    }
    mod.textContent = "(" + sign + num.toString() + ")";
}

function saveAbilities() {
    const [str_input, dex_input, con_input, int_input, wis_input, cha_input] = getInputs();
    const abilities = {str_num: str_input.value, dex_num: dex_input.value, con_num: con_input.value, int_num: int_input.value, wis_num: wis_input.value, cha_num: cha_input.value};
    const data = {char_id: char_id, abilities: abilities};
    socket.emit('save_abilities', data);
}