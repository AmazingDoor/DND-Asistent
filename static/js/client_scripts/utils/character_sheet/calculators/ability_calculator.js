import * as character_data_handler from "./../character_data_handler.js";
import {getProficiencyBonus} from "./../../../player_level_handler.js";
import {getRaceData} from "./../mappers/race_mapper.js";
import {getClassData} from "./../mappers/class_mapper.js";


export function calculateStrengthMod() {
    const itp = document.querySelector('#strength-input');
    const num = itp.value;
    return calculateModifier(itp);
}

export function calculateDexterityMod() {
    const itp = document.querySelector('#dexterity-input');
    const num = itp.value;
    return calculateModifier(itp);
}

export function calculateConstitutionMod() {
    const itp = document.querySelector('#constitution-input');
    const num = itp.value;
    return calculateModifier(itp);
}

export function calculateIntelligenceMod() {
    const itp = document.querySelector('#intelligence-input');
    const num = itp.value;
    return calculateModifier(itp);
}

export function calculateWisdomMod() {
    const itp = document.querySelector('#wisdom-input');
    const num = itp.value;
    return calculateModifier(itp);
}

export function calculateCharismaMod() {
    const itp = document.querySelector('#charisma-input');
    const num = itp.value;
    return calculateModifier(itp);
}

function calculateModifier(i) {
    const num = i.value;
    const new_num = Math.floor((parseInt(num) - 10) / 2);
    return new_num;
}

export function calculateAbilities() {
    const prof_bonus = getProficiencyBonus();
    const race_data = getRaceData();

    let abilities_dict = {};
    if (race_data !== null && race_data !== undefined) {
        abilities_dict = Object.assign({}, race_data.abilities);
    }

    const selected_abilities = document.querySelectorAll(".selectedability");
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

    const saving_throws = getClassData().saving_throws || [];
    saving_throws.forEach((saving_throw) => {
        switch (saving_throw) {
            case "Strength":
                str_bonus = prof_bonus;
                break;
            case "Dexterity":
                dex_bonus = prof_bonus;
                break;
            case "Constitution":
                con_bonus = prof_bonus;
                break;
            case "Intelligence":
                int_bonus = prof_bonus;
                break;
            case "Wisdom":
                wis_bonus = prof_bonus;
                break;
            case "Charisma":
                cha_bonus = prof_bonus;
        }
    });

    return [calculateModifier(str_input) + str_bonus + race_str_mod,
    calculateModifier(dex_input) + dex_bonus + race_dex_mod,
    calculateModifier(con_input) + con_bonus + race_con_mod,
    calculateModifier(int_input) + int_bonus + race_int_mod,
    calculateModifier(wis_input) + wis_bonus + race_wis_mod,
    calculateModifier(cha_input) + cha_bonus + race_cha_mod]

}


