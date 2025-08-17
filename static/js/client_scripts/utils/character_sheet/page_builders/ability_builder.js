import * as ability_calculator from './../calculators/ability_calculator.js';
import setCharacterAbilities from './../character_data_handler.js';


export function buildCharacterAbilities(data) {
    const abilities = data.abilities;
    setCharacterAbilities(abilities);


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
    const str_mod = document.querySelectorAll('#strength-mod');
    const dex_mod = document.querySelectorAll('#dexterity-mod');
    const con_mod = document.querySelectorAll('#constitution-mod');
    const int_mod = document.querySelectorAll('#intelligence-mod');
    const wis_mod = document.querySelectorAll('#wisdom-mod');
    const cha_mod = document.querySelectorAll('#charisma-mod');

    setModText(str_mod, ability_calculator.calculateStrengthMod());
    setModText(dex_mod, ability_calculator.calculateDexterityMod());
    setModText(con_mod, ability_calculator.calculateConstitutionMod());
    setModText(int_mod, ability_calculator.calculateIntelligenceMod());
    setModText(wis_mod, ability_calculator.calculateWisdomMod());
    setModText(cha_mod, ability_calculator.calculateCharismaMod());


}

function setModText(mod, num) {
    let sign = "";
    if (num >= 0) {
        sign = "+";
    }
    mod.textContent = "(" + sign + num.toString() + ")";
}