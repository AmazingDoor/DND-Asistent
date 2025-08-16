import {getSavingThrows} from './class_stats_handler.js';
import {getProfs} from './utils/class_stats_handler/profs_mapper.js';
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


export function loadPlayerAbilities(data) {
    const abilities = data.abilities;
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

export function getInputs () {
    const str_input = document.querySelector('#strength-input');
    const dex_input = document.querySelector('#dexterity-input');
    const con_input = document.querySelector('#constitution-input');
    const int_input = document.querySelector('#intelligence-input');
    const wis_input = document.querySelector('#wisdom-input');
    const cha_input = document.querySelector('#charisma-input');
    return[str_input, dex_input, con_input, int_input, wis_input, cha_input]
}

export function addEventListeners() {
    const [str_input, dex_input, con_input, int_input, wis_input, cha_input] = getInputs();

    str_input.addEventListener('change', function() {calculateStrengthMod(); saveAbilities(); updateModifiers();});
    dex_input.addEventListener('change', function() {calculateDexterityMod(); saveAbilities(); updateModifiers();});
    con_input.addEventListener('change', function() {calculateConstitutionMod(); saveAbilities(); updateModifiers();});
    int_input.addEventListener('change', function() {calculateIntelligenceMod(); saveAbilities(); updateModifiers();});
    wis_input.addEventListener('change', function() {calculateWisdomMod(); saveAbilities(); updateModifiers();});
    cha_input.addEventListener('change', function() {calculateCharismaMod(); saveAbilities(); updateModifiers();});
}

export function calculateAbilityModifiers() {
    calculateStrengthMod();
    calculateDexterityMod();
    calculateConstitutionMod();
    calculateIntelligenceMod();
    calculateWisdomMod();
    calculateCharismaMod();
    updateModifiers();

}

function calculateStrengthMod() {

    const itp = document.querySelector('#strength-input');
    const inputs = document.querySelectorAll('.strength-modifier');
    const num = itp.value;
    document.querySelector(".strength-num").textContent = num.toString();

    inputs.forEach((i) => {
        const new_num = calculateModifier(itp);
        setModText(i, new_num);
    });

}

function calculateDexterityMod() {
    const itp = document.querySelector('#dexterity-input');
    const inputs = document.querySelectorAll('.dexterity-modifier');
    const num = itp.value;
    document.querySelector(".dexterity-num").textContent = num.toString();

    inputs.forEach((i) => {
        const new_num = calculateModifier(itp);
        setModText(i, new_num);
    });
}

function calculateConstitutionMod() {
    const itp = document.querySelector('#constitution-input');
    const inputs = document.querySelectorAll('.constitution-modifier');
    const num = itp.value;
    document.querySelector(".constitution-num").textContent = num.toString();

    inputs.forEach((i) => {
        const new_num = calculateModifier(itp);
        setModText(i, new_num);
    });
}

function calculateIntelligenceMod() {
    const itp = document.querySelector('#intelligence-input');
    const inputs = document.querySelectorAll('.intelligence-modifier');
    const num = itp.value;
    document.querySelector(".intelligence-num").textContent = num.toString();

    inputs.forEach((i) => {
        const new_num = calculateModifier(itp);
        setModText(i, new_num);
    });
}

function calculateWisdomMod() {
    const itp = document.querySelector('#wisdom-input');
    const inputs = document.querySelectorAll('.wisdom-modifier');
    const num = itp.value;
    document.querySelector(".wisdom-num").textContent = num.toString();

    inputs.forEach((i) => {
        const new_num = calculateModifier(itp);
        setModText(i, new_num);
    });
}

function calculateCharismaMod() {
    const itp = document.querySelector('#charisma-input');
    const inputs = document.querySelectorAll('.charisma-modifier');
    const num = itp.value;
    document.querySelector(".charisma-num").textContent = num.toString();

    inputs.forEach((i) => {
        const new_num = calculateModifier(itp);
        setModText(i, new_num);
    });
}

function setModText(mod, num) {
    let sign = "";
    if (num >= 0) {
        sign = "+";
    }
    mod.textContent = "(" + sign + num.toString() + ")";
}

function calculateModifier(i) {
    const num = i.value;
    const new_num = Math.floor((parseInt(num) - 10) / 2);
    return new_num;
}

function saveAbilities() {
    const [str_input, dex_input, con_input, int_input, wis_input, cha_input] = getInputs();
    const abilities = {str_num: str_input.value, dex_num: dex_input.value, con_num: con_input.value, int_num: int_input.value, wis_num: wis_input.value, cha_num: cha_input.value};
    const data = {char_id: char_id, abilities: abilities};
    socket.emit('save_abilities', data);
}

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
        console.log('b');
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


    console.log(all_abilities);

    for (const ability in all_abilities) {
        console.log(ability);
        console.log(ability.toString());
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
                console.log('a');
            case "Charisma":
                console.log('c');
                race_cha_mod = all_abilities[ability];
                break;
        }
    }

    console.log(race_str_mod);


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

