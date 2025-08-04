let socket = null;
export function setSocket(io) {
    socket = io;
}

export function loadPlayerAbilities() {

}

export function addEventListeners() {
const str_input = document.querySelector('#strength-input');
const dex_input = document.querySelector('#dexterity-input');
const con_input = document.querySelector('#constitution-input');
const int_input = document.querySelector('#intelligence-input');
const wis_input = document.querySelector('#wisdom-input');
const cha_input = document.querySelector('#charisma-input');

str_input.addEventListener('change', function() {calculateStrengthMod()});
dex_input.addEventListener('change', function() {calculateDexterityMod()});
con_input.addEventListener('change', function() {calculateConstitutionMod()});
int_input.addEventListener('change', function() {calculateIntelligenceMod()});
wis_input.addEventListener('change', function() {calculateWisdomMod()});
cha_input.addEventListener('change', function() {calculateCharismaMod()});


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