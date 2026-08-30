import * as character_data_handler from "./../character_data_handler.js";
import {getProficiencyBonus} from "./../../../player_level_handler.js";
import {getRaceData, getRaceAbilities, getRace, getSavedRaceAbilities} from "./../mappers/race_mapper.js";
import {getClassData} from "./../mappers/class_mapper.js";


export function calculateStrengthMod() {
    const itp = document.querySelector('#strength-input');
    const num = itp.value;
    return calculateModifier(num);
}

export function calculateDexterityMod() {
    const itp = document.querySelector('#dexterity-input');
    const num = itp.value;
    return calculateModifier(num);
}

export function calculateConstitutionMod() {
    const itp = document.querySelector('#constitution-input');
    const num = itp.value;
    return calculateModifier(num);
}

export function calculateIntelligenceMod() {
    const itp = document.querySelector('#intelligence-input');
    const num = itp.value;
    return calculateModifier(num);
}

export function calculateWisdomMod() {
    const itp = document.querySelector('#wisdom-input');
    const num = itp.value;
    return calculateModifier(num);
}

export function calculateCharismaMod() {
    const itp = document.querySelector('#charisma-input');
    const num = itp.value;
    return calculateModifier(num);
}

function calculateModifier(i) {
    const new_num = Math.floor((parseInt(i) - 10) / 2);
    return new_num;
}

export function calculateAbilities() {
    const prof_bonus = getProficiencyBonus();
    const race_data = getRaceData(getRace());

    const default_abilities = getRaceAbilities();


    const selected_abilities_array = getSavedRaceAbilities();
    


    let all_abilities = Object.assign({}, ...default_abilities, ...selected_abilities_array);

    console.log(all_abilities);

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

    const class_data = getClassData();
    let saving_throws = [];

    if (class_data !== null && class_data !== undefined) {
        saving_throws = class_data.saving_throws;
    }
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


    const base_abilities = character_data_handler.getCharacterBaseAbilities();

    const finalCalculations = [
    calculateModifier(parseInt(base_abilities.str) + parseInt(race_str_mod)),
    calculateModifier(parseInt(base_abilities.dex) + parseInt(race_dex_mod)),
    calculateModifier(parseInt(base_abilities.con) + parseInt(race_con_mod)),
    calculateModifier(parseInt(base_abilities.int) + parseInt(race_int_mod)),
    calculateModifier(parseInt(base_abilities.wis) + parseInt(race_wis_mod)),
    calculateModifier(parseInt(base_abilities.cha) + parseInt(race_cha_mod))];

    const finalCalculationDict = {
        str: finalCalculations[0],
        dex: finalCalculations[1],
        con: finalCalculations[2],
        int: finalCalculations[3],
        wis: finalCalculations[4],
        cha: finalCalculations[5]
    };


    character_data_handler.setCharacterAbilityModifiers(finalCalculationDict);
    
    return finalCalculations;

}


