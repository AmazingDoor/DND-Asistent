import { getSpellData } from "../../character_data_handler.js";

const concentrationSpellName = document.getElementById('concentration-spell-name');
const spellDisplayList = document.getElementById('combat-spell-display-list');

export function updateData() {
    spellDisplayList.textContent = '';
    let spell_data_array = getSpellData();
    spell_data_array.forEach((spell_data) => {
        addSpell(spell_data);
    });
}

function addSpell(spell_data) {
    console.log(spell_data);
    const spellContainer = document.createElement('div');
    spellContainer.classList.add("combat-spell-container");
    spellDisplayList.appendChild(spellContainer);
    
    const topContainer = document.createElement('div');
    topContainer.classList.add('combat-spell-top-container');
    spellContainer.appendChild(topContainer);

    const spellName = document.createElement('t3');
    spellName.textContent = spell_data.name;
    topContainer.appendChild(spellName);

    if(spell_data.concentration) {
        const concentrationLabel = document.createElement('t3');
        concentrationLabel.textContent = " (uses concentratoin)";
        topContainer.appendChild(concentrationLabel);
    }

    const spellLevelDiv = document.createElement('div');
    spellLevelDiv.classList.add("combat-spell-level-div");
    spellContainer.appendChild(spellLevelDiv);
    
    const spellLevelLabel = document.createElement('t3');
    spellLevelLabel.classList.add('spell-level-label');
    spellLevelLabel.textContent = "Level: ";
    spellLevelDiv.appendChild(spellLevelLabel);

    for(let i = spell_data.level; i < 5; i++) {
        let spellLevelButton = document.createElement('button');
        spellLevelButton.textContent = i;
        spellLevelButton.classList.add("spell-level-button");
        spellLevelDiv.appendChild(spellLevelButton);
    }

    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('combat-spell-bottom-container');
    spellContainer.appendChild(bottomContainer);

    const spellInfoContainer = document.createElement('div');
    spellInfoContainer.classList.add("combat-spell-info-container");
    bottomContainer.appendChild(spellInfoContainer);

    const castingTimeLabel = document.createElement('t3');
    castingTimeLabel.textContent = "Cast Time: ";
    spellInfoContainer.appendChild(castingTimeLabel);

    const castingTime = document.createElement('t3');
    castingTime.textContent = spell_data.casting_time;
    spellInfoContainer.appendChild(castingTime);
}

function addCantrip(cantrip_data){

}

function addWeapon(weapon_data) {

}

function setConcentration(spell_name) {

}