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
    calculateAbilityModifiers();


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

export function addEventListeners() {
    const [str_input, dex_input, con_input, int_input, wis_input, cha_input] = getInputs();

    str_input.addEventListener('change', function() {calculateStrengthMod(); saveAbilities()});
    dex_input.addEventListener('change', function() {calculateDexterityMod(); saveAbilities()});
    con_input.addEventListener('change', function() {calculateConstitutionMod(); saveAbilities()});
    int_input.addEventListener('change', function() {calculateIntelligenceMod(); saveAbilities()});
    wis_input.addEventListener('change', function() {calculateWisdomMod(); saveAbilities()});
    cha_input.addEventListener('change', function() {calculateCharismaMod(); saveAbilities()});


}

export function calculateAbilityModifiers() {
    calculateStrengthMod();
    calculateDexterityMod();
    calculateConstitutionMod();
    calculateIntelligenceMod();
    calculateWisdomMod();
    calculateCharismaMod();
}

function calculateStrengthMod() {
    const i = document.querySelector('#strength-input');
    const num = document.querySelector('#strength-modifier');
    const new_num = calculateModifier(i);
    setModText(num, new_num);

}

function calculateDexterityMod() {
    const i = document.querySelector('#dexterity-input');
    const num = document.querySelector('#dexterity-modifier');
    const new_num = calculateModifier(i);
    setModText(num, new_num);


}

function calculateConstitutionMod() {
    const i = document.querySelector('#constitution-input');
    const num = document.querySelector('#constitution-modifier');
    const new_num = calculateModifier(i);
    setModText(num, new_num);


}

function calculateIntelligenceMod() {
    const i = document.querySelector('#intelligence-input');
    const num = document.querySelector('#intelligence-modifier');
    const new_num = calculateModifier(i);
    setModText(num, new_num);

}

function calculateWisdomMod() {
    const i = document.querySelector('#wisdom-input');
    const num = document.querySelector('#wisdom-modifier');
    const new_num = calculateModifier(i);
    setModText(num, new_num);


}

function calculateCharismaMod() {
    const i = document.querySelector('#charisma-input');
    const num = document.querySelector('#charisma-modifier');
    const new_num = calculateModifier(i);
    setModText(num, new_num);

}

function setModText(mod, num) {
    mod.textContent = "(" + num.toString() + ")";
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

