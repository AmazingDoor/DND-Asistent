import { getSpellCastingAbilityScore, getSpellData, getClassName } from "../../character_data_handler.js";
import { getMagicSlots } from "../../../../../shared/spell_caster_slot_map.js";
import { getPlayerLevel } from "../../../../player_level_handler.js";
import { getPreparedSpellCount } from "../../../../../shared/spell_data_filterer.js";

const concentrationSpellName = document.getElementById('concentration-spell-name');
const spellDisplayList = document.getElementById('combat-spell-display-list');
let className = '';
let maxSpellLevel = 0;

export function updateData() {
    spellDisplayList.textContent = '';

    className = getClassName();
    let knownSpellCount = getPreparedSpellCount(className);
    let spell_data_array = getSpellData();

    for(let i = 0; i < knownSpellCount; i++) {
        if(i < spell_data_array.length) {
            addSpell(spell_data_array[i]);
        } else {
            addEmpty(spellDisplayList);
        }
    }
}

function addEmpty(container) {
    const emtpyContainer = document.createElement('div');
    emtpyContainer.classList.add("combat-empty-container");

    const emptyText = document.createElement('t2');
    emptyText.textContent = "Unselected";
    emtpyContainer.appendChild(emptyText);

    container.appendChild(emtpyContainer);
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
    spellName.classList.add('combat-spell-name');
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

    let player_level = getPlayerLevel() - 1;
    let selectedButton = false;
    let max_spell_level_array = getMagicSlots(className);
    maxSpellLevel = max_spell_level_array.spell_slots[player_level].length;
    
    const damageNum = document.createElement('t3');
    const healNum = document.createElement('t3');


    for(let i = spell_data.level; i <= maxSpellLevel; i++) {
        let spellLevelButton = document.createElement('button');
        spellLevelButton.textContent = i;
        spellLevelButton.classList.add("spell-level-button");
        spellLevelDiv.appendChild(spellLevelButton);
        if(!selectedButton) {
            spellLevelButton.classList.add("selectedButton");
            spellLevelButton.disabled = true;
            selectedButton = true;
            if("heal_at_slot_level" in spell_data) {
                setSpellDieNum(healNum, getCorrectSpellHeal(spell_data, i));
                spellLevelButton.addEventListener("click", (event) => {
                spellButtonPressed(spellContainer, spellLevelButton, healNum, getCorrectSpellDamage(spell_data, i));
                });
            }
            if("damage" in spell_data) {
                setSpellDieNum(damageNum, getCorrectSpellDamage(spell_data, i));
                spellLevelButton.addEventListener("click", (event) => {
                spellButtonPressed(spellContainer, spellLevelButton, damageNum, getCorrectSpellDamage(spell_data, i));
                });
            }
        }

        if("heal_at_slot_level" in spell_data) {
            spellLevelButton.addEventListener("click", (event) => {
            spellButtonPressed(spellContainer, spellLevelButton, healNum, getCorrectSpellHeal(spell_data, i));
            });
        }
        if("damage" in spell_data) {
            spellLevelButton.addEventListener("click", (event) => {
            spellButtonPressed(spellContainer, spellLevelButton, damageNum, getCorrectSpellDamage(spell_data, i));
            });
        }

        spellLevelButton.addEventListener("click", (event) => {
            updateSelectedButton(spellContainer, spellLevelButton);
        });
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

    if("damage" in spell_data) {
        const damageLabel = document.createElement('t3');
        damageLabel.textContent = "Damage: ";
        spellInfoContainer.appendChild(damageLabel);
        spellInfoContainer.appendChild(damageNum);
    }

    if("heal_at_slot_level" in spell_data) {
        const healLabel = document.createElement('t3');
        healLabel.textContent = "Healing: ";
        spellInfoContainer.appendChild(healLabel);
        spellInfoContainer.appendChild(healNum);
    }

    const extraInfoContainer = document.createElement('div');
    extraInfoContainer.classList.add('extra-spell-data');
    spellContainer.appendChild(extraInfoContainer);

    const extraInfoExpandContainer = document.createElement('div');
    extraInfoExpandContainer.classList.add('expand-spell-info');
    extraInfoContainer.appendChild(extraInfoExpandContainer);

    const extraInfoExpandText = document.createElement('t3');
    extraInfoExpandText.textContent = "⯆";
    extraInfoExpandContainer.appendChild(extraInfoExpandText);

    const hiddenDataContainer = document.createElement('div');
    hiddenDataContainer.classList.add("hidden-spell-data-container", "hidden");
    extraInfoContainer.appendChild(hiddenDataContainer);

    extraInfoExpandContainer.addEventListener("click", (action) => {
       expandSpellContainer(extraInfoExpandText, hiddenDataContainer); 
    });

    const spellDescriptionContainer = document.createElement('div');
    spellDescriptionContainer.classList.add('spell-description-container');
    hiddenDataContainer.appendChild(spellDescriptionContainer);

    const spellDescription = document.createElement('p');
    const spellDescriptions = spell_data.desc;
    spellDescriptions.forEach((description) => {
        spellDescription.textContent += description;
    });
    spellDescriptionContainer.appendChild(spellDescription);
}

function expandSpellContainer(arrow, expandableContainer) {
    if(expandableContainer.classList.contains("hidden")) {
        arrow.textContent = "⯅";
        expandableContainer.classList.remove("hidden");
    } else {
        arrow.textContent = "⯆";
        expandableContainer.classList.add("hidden");
    }
}

function getCorrectSpellDamage(spell_data, level) {
    if ("damage" in spell_data) {
        let damage_info = spell_data.damage;
        if ("damage_at_character_level" in damage_info) {
            for (let i = level; i > 0; i--) {
                if(damage_info.damage_at_character_level[i] !== undefined) {
                    return damage_info.damage_at_character_level[i];
                }
            }
        } else if ("damage_at_slot_level" in damage_info) {
            for (let i = level; i > 0; i--) {
                if(damage_info.damage_at_slot_level[i] !== undefined) {
                    return damage_info.damage_at_slot_level[i];
                }
            }
        }
    }
    return '';
}

function getCorrectSpellHeal(spell_data, level) {
    if("heal_at_slot_level" in spell_data) {
        let heal_data = spell_data.heal_at_slot_level;
        for(let i = level; i > 0; i--) {
            if(heal_data[i] !== undefined) {
                return heal_data[i].replace("MOD", getSpellCastingAbilityScore());

            }
        }
    }
}

function setSpellDieNum(dieNum, num) {
    dieNum.textContent = num;
}


function spellButtonPressed(spellContainer, pressedButton, dieNum, num) {
    setSpellDieNum(dieNum, num);
}

function updateSelectedButton(spellContainer, pressedButton) {
    const buttons = spellContainer.querySelectorAll(".spell-level-button");
    buttons.forEach((button) => {
        button.classList.remove("selectedButton");
        button.disabled = false;
    });

    pressedButton.classList.add('selectedButton');
    pressedButton.disabled = true;
}

function addCantrip(cantrip_data){

}

function addWeapon(weapon_data) {

}

function setConcentration(spell_name) {

}