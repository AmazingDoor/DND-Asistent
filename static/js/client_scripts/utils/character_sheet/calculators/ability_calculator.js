
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