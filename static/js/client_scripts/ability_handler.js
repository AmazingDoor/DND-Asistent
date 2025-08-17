import {getSavingThrows} from './class_stats_handler.js';
import {getProficiencyBonus} from './player_level_handler.js';
import {getRaceData} from './utils/race/race_mapper.js';
let socket = null;
export function setSocket(io) {
    socket = io;
    socket.on('load_abilities', data => {
        loadPlayerAbilities(data);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    name = sessionStorage.getItem('charName');
    char_id = sessionStorage.getItem('charId');
});


/*export function calculateAbilityModifiers() {
    calculateStrengthMod();
    calculateDexterityMod();
    calculateConstitutionMod();
    calculateIntelligenceMod();
    calculateWisdomMod();
    calculateCharismaMod();
    updateModifiers();

}*/


export function updateModifiers() {
    const num = getProficiencyBonus();
    const race_data = getRaceData();
    let abilities_dict = {};
    if (race_data !== null && race_data !== undefined) {
        abilities_dict = Object.assign({}, race_data.abilities);
    }

    const selected_abilities = document.querySelectorAll(".selected-ability");
    let all_abilities = abilities_dict;


    selected_abilities.forEach((ability) => {
        const row = ability.parentElement.parentElement.parentElement;
        const table_datas = row.querySelectorAll("td");
        const modifier = parseInt(table_datas[1].textContent.replace("+", ""));
        all_abilities[ability.textContent] = modifier;
    });

    let race_str_mod = 0;
    let race_dex_mod = 0;
    let race_con_mod = 0;
    let race_int_mod = 0;
    let race_wis_mod = 0;
    let race_cha_mod = 0;

    let str_bonus = 0;
    let dex_bonus = 0;
    let con_bonus = 0;
    let int_bonus = 0;
    let wis_bonus = 0;
    let cha_bonus = 0;



    for (const ability in all_abilities) {
        switch(ability.toString()) {
            case "str":
            case "Strength":
                race_str_mod = all_abilities[ability];
                break;
            case "dex":
            case "Dexterity":
                race_dex_mod = all_abilities[ability];
                break;
            case "con":
            case "Constitution":
                race_con_mod = all_abilities[ability];
                break;
            case "int":
            case "Intelligence":
                race_int_mod = all_abilities[ability];
                break;
            case "wis":
            case "Wisdom":
                race_wis_mod = all_abilities[ability];
                break;
            case "cha":
            case "Charisma":
                race_cha_mod = all_abilities[ability];
                break;
        }
    }



    const str_input = document.querySelector("#strength-input");
    const dex_input = document.querySelector("#dexterity-input");
    const con_input = document.querySelector("#constitution-input");
    const int_input = document.querySelector("#intelligence-input");
    const wis_input = document.querySelector("#wisdom-input");
    const cha_input = document.querySelector("#charisma-input");

    const str_mod = document.querySelector(".strength-modifier-usable");
    const dex_mod = document.querySelector(".dexterity-modifier-usable");
    const con_mod = document.querySelector(".constitution-modifier-usable");
    const int_mod = document.querySelector(".intelligence-modifier-usable");
    const wis_mod = document.querySelector(".wisdom-modifier-usable");
    const cha_mod = document.querySelector(".charisma-modifier-usable");
    const saving_throws = getProfs().saving_throws || [];
    saving_throws.forEach((saving_throw) => {
        switch (saving_throw) {
            case "Strength":
                str_bonus = num;
                break;
            case "Dexterity":
                dex_bonus = num;
                break;
            case "Constitution":
                con_bonus = num;
                break;
            case "Intelligence":
                int_bonus = num;
                break;
            case "Wisdom":
                wis_bonus = num;
                break;
            case "Charisma":
                cha_bonus = num;
        }
    });

    setModText(str_mod, calculateModifier(str_input) + str_bonus + race_str_mod);
    setModText(dex_mod, calculateModifier(dex_input) + dex_bonus + race_dex_mod);
    setModText(con_mod, calculateModifier(con_input) + con_bonus + race_con_mod);
    setModText(int_mod, calculateModifier(int_input) + int_bonus + race_int_mod);
    setModText(wis_mod, calculateModifier(wis_input) + wis_bonus + race_wis_mod);
    setModText(cha_mod, calculateModifier(cha_input) + cha_bonus + race_cha_mod);
}

