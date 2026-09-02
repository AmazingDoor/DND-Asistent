import { getSpellCastingAbilityScore, getCharacterAbilityModifiers} from "../../character_data_handler.js";
import { getSpellData, getClassName, isUsingSpellbook, getCurrentSpellSlots, setCurrentSpellSlots, setSpellSlotsUsed, resetUsedSpellSlots, incrementUsedSpellSlot, getSpellSlotsUsed } from "../../mappers/class_mapper.js";
import { saveClassData } from "../../../../save_handler.js";
import { getMagicSlots } from "../../../../../shared/spell_caster_slot_map.js";
import { getPlayerLevel } from "../../../../player_level_handler.js";
import { getPreparedSpellCount } from "../../../../../shared/spell_data_filterer.js";
import { bus, EVENTS, SAVE_EVENTS } from "../../../event_bus.js";
import { InventoryManager } from "../../inventory_items.js";


const concentrationSpellName = document.getElementById('concentration-spell-name');
const spellSlotDisplays = document.getElementById('spell-slot-displays');
const spellDisplayList = document.getElementById('combat-spell-display-list');
const resetSpellsButton = document.getElementById('reset-spell-slots-button');

let className = '';
let max_spell_level = 0;

const update_data_subscribe_events = [EVENTS.LEVEL_UPDATED, EVENTS.CLASS_CHANGED, 
    EVENTS.USE_SPELL_BOOK_CLICKED, EVENTS.SPELL_BOOK_SPELL_SELECTED, EVENTS.SPELL_PREPARED];
bus.subscribeToEvents(update_data_subscribe_events, updateData);


const update_current_spell_slots_subscriptions = [EVENTS.LEVEL_UPDATED, EVENTS.SPELL_CASTED, 
    EVENTS.LONG_REST, EVENTS.SHORT_REST];
bus.subscribeToEvents(update_current_spell_slots_subscriptions, updateCurrentSpellSlots);

resetSpellsButton.addEventListener("click", () => resetSpellsButtonPressed());

function resetSpellsButtonPressed() {
    const max_spell_slots = getMagicSlots(getClassName()).spell_slots[getPlayerLevel() - 1];
    setCurrentSpellSlots(max_spell_slots);
    resetUsedSpellSlots();
    bus.publish(SAVE_EVENTS.SAVE_CLASS);
    updateCurrentSpellSlots();

}

export function updateCurrentSpellSlots() {
    spellSlotDisplays.textContent = '';
    const current_spell_slot_count = getCurrentSpellSlots();
    const spell_level_count = current_spell_slot_count.length;

    for(let i = 0; i < spell_level_count; i++) {
        if(current_spell_slot_count[i] != null && current_spell_slot_count[i] != undefined) {
            const display_div = document.createElement('div');
            spellSlotDisplays.appendChild(display_div);
            const t = document.createElement('p');
            let spell_level = i + 1;
            let spell_level_text = '';
            switch (spell_level) {
                case 1: 
                    spell_level_text = spell_level + "st";
                    break;
                case 2:
                    spell_level_text = spell_level + "nd";
                    break;
                case 3:
                    spell_level_text = spell_level + "rd";
                    break;
                default:
                    spell_level_text = spell_level + "th";
                    break;
            }
            const spell_count = current_spell_slot_count[i];
            t.textContent = spell_level_text + ": " + spell_count + " ";
            display_div.appendChild(t);
        }
    }

}

export function updateData() {
    spellDisplayList.textContent = '';
    className = getClassName();
    let knownSpellCount = getPreparedSpellCount(className);
    let prepared_spell_count = 0;

    let spell_data_array;
    if (isUsingSpellbook()) {
        let int_modifier = getCharacterAbilityModifiers().int;

        spell_data_array = InventoryManager.instance.getPreparedSpellsFromBooks();
        prepared_spell_count = parseInt(getPlayerLevel()) + parseInt(int_modifier);
        if(prepared_spell_count < 1) {
            prepared_spell_count = 1;
        }
    } else {
        spell_data_array = getSpellData();
        prepared_spell_count = knownSpellCount;
    }

    for(let i = 0; i < prepared_spell_count; i++) {
        if(i < spell_data_array.length) {
            addSpell(spell_data_array[i]);
        } else {
            addEmpty(spellDisplayList);
        }
    }
    updateCurrentSpellSlots();
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
    const combatSpell = new CombatSpell(spell_data);
    combatSpell.addToParent(spellDisplayList);
}

class CombatSpell {
    constructor(spellData) {
        this.spell_data = spellData;
        this.spell_container = document.createElement('div');
        this.spell_container.classList.add("combat-spell-container");
        this.selected_spell_level = 0;
        
        const disable_cast_button_subscriptions = [EVENTS.SPELL_CASTED];
        bus.subscribeToEvents(disable_cast_button_subscriptions, () => this.disableCastButton());
        

        this.buildSpellDiv();
        this.disableCastButton();
    }

    buildSpellDiv() {
        this.spell_container.textContent = '';
        const top_container = document.createElement('div');
        top_container.classList.add('combat-spell-top-container');
        this.spell_container.appendChild(top_container);

        const spell_name = document.createElement('t3');
        spell_name.classList.add("combat-spell-name");
        spell_name.textContent = this.spell_data.name;
        top_container.appendChild(spell_name);

        if(this.spell_data.concentration) {
            const concentration_label = document.createElement('t3');
            concentration_label.textContent = " (uses concentration)";
            top_container.appendChild(concentration_label);
        }

        const cast_button_container = document.createElement('div');
        cast_button_container.classList.add("cast-button-container");
        top_container.appendChild(cast_button_container);

        this.cast_button = document.createElement('button');
        this.cast_button.textContent = "Cast";
        this.cast_button.addEventListener("click", () => {
            this.castButtonPressed();
        });
        top_container.appendChild(this.cast_button);

        const spell_level_div = document.createElement('div');
        spell_level_div.classList.add('combat-spell-level-div');
        this.spell_container.appendChild(spell_level_div);

        const spell_level_label = document.createElement('t3');
        spell_level_label.classList.add('spell-level-label');
        spell_level_label.textContent = "Level: ";
        spell_level_div.appendChild(spell_level_label);

        let player_level = getPlayerLevel() - 1;
        let max_spell_level_array = getMagicSlots(className);
        max_spell_level = max_spell_level_array.spell_slots[player_level].length;

        this.damage_num = document.createElement('t3');
        this.heal_num = document.createElement('t3');
        this.spell_level_buttons = [];

        let selected_level_button = false;
        for (let i = this.spell_data.level; i <= max_spell_level; i++) {
            let spell_level_button = document.createElement('button');
            spell_level_button.textContent = i;
            spell_level_button.classList.add("spell-level-button");
            spell_level_div.appendChild(spell_level_button);
            
            let spell_level_num = i - 1;
            if(!selected_level_button) {
                spell_level_button.classList.add("selected-button");
                spell_level_button.disabled = true;
                selected_level_button = true;
            }

            if("heal_at_slot_level" in this.spell_data) {
                spell_level_button.addEventListener("click", (event) => {
                    this.setSpellDieData(this.heal_num, getCorrectSpellHeal(this.spell_data, i));
                });
                this.setSpellDieNum(this.heal_num, getCorrectSpellHeal(this.spell_data, i));
            }

            if("damage" in this.spell_data) {
                spell_level_button.addEventListener("click", (event) => {
                    this.setSpellDieData(this.damage_num, getCorrectSpellDamage(this.spell_data, i));
                });
                this.setSpellDieNum(this.damage_num, getCorrectSpellDamage(this.spell_data, i));
            }

            spell_level_button.addEventListener("click", (event) => {
                this.spellLevelButtonPressed(spell_level_button, spell_level_num);
            });

            this.spell_level_buttons.push(spell_level_button);
        }

        const bottom_container = document.createElement('div');
        bottom_container.classList.add('combat-spell-bottom-container');
        this.spell_container.appendChild(bottom_container);

        const spell_info_container = document.createElement('div');
        spell_info_container.classList.add("combat-spell-info-container");
        bottom_container.appendChild(spell_info_container);

        const casting_time_label = document.createElement('t3');
        casting_time_label.textContent = "cast Time: ";
        spell_info_container.appendChild(casting_time_label);

        const casting_time = document.createElement('t3');
        casting_time.textContent = this.spell_data.casting_time;
        spell_info_container.appendChild(casting_time);

        if("damage" in this.spell_data) {
            const damage_label = document.createElement('t3');
            damage_label.textContent = "Damage: ";
            spell_info_container.appendChild(damage_label);
            spell_info_container.appendChild(this.damage_num);
        }

        if("heal_at_slot_level" in this.spell_data) {
            const heal_label = document.createElement('t3');
            heal_label.textContent = "Healing: ";
            spell_info_container.appendChild(heal_label);
            spell_info_container.appendChild(this.heal_num);
        }

        const extra_info_container = document.createElement('div');
        extra_info_container.classList.add('extra-spell-data');
        this.spell_container.appendChild(extra_info_container);

        const extra_info_expand_container = document.createElement('div');
        extra_info_expand_container.classList.add('expand-spell-info');
        extra_info_container.appendChild(extra_info_expand_container);

        this.extra_info_expand_text = document.createElement('t3');
        this.extra_info_expand_text.textContent = "⯆";
        extra_info_expand_container.appendChild(this.extra_info_expand_text);

        this.hidden_data_container = document.createElement('div');
        this.hidden_data_container.classList.add("hidden-spell-data-container", "hidden");
        extra_info_container.appendChild(this.hidden_data_container);

        extra_info_expand_container.addEventListener("click", (action) => {
            this.expandSpellContainer(); 
        });

        const spell_description_container = document.createElement('div');
        spell_description_container.classList.add('spell-description-container');
        this.hidden_data_container.appendChild(spell_description_container);

        const spell_description = document.createElement('p');
        const spell_descriptions = this.spell_data.desc;
        spell_descriptions.forEach((description) => {
            spell_description.textContent += description;
        });
        spell_description_container.appendChild(spell_description);

    }

    disableCastButton() {
        const current_spell_slots = getCurrentSpellSlots();
        if(current_spell_slots[this.selected_spell_level] <= 0) {
            this.cast_button.disabled = true;
        } else {
            this.cast_button.disabled = false;
        }
    }

    castButtonPressed() {
        let new_spell_slots = getCurrentSpellSlots();
        new_spell_slots[this.selected_spell_level] = new_spell_slots[this.selected_spell_level] - 1;
        incrementUsedSpellSlot(this.selected_spell_level);
        setCurrentSpellSlots(new_spell_slots);
        saveClassData();

        if(this.spell_data.concentration) {
            concentrationSpellName.textContent = this.spell_data.spell_name;
        }
        
        bus.publish(EVENTS.SPELL_CASTED);
    }

    expandSpellContainer() {
        if(this.hidden_data_container.classList.contains("hidden")) {
            this.extra_info_expand_text.textContent = "⯅";
            this.hidden_data_container.classList.remove("hidden");
        } else {
            this.extra_info_expand_text.textContent = "⯆";
            this.hidden_data_container.classList.add("hidden");
        }
    }

    spellLevelButtonPressed(selected_button, spell_level_num) {
        this.spell_level_buttons.forEach((button) => {
            if(button == selected_button) {
                button.classList.add("selected-button");
                button.disabled = true;
            } else {
                button.classList.remove("selected-button");
                button.disabled = false;
            }
        });
        this.selected_spell_level = spell_level_num;
        this.disableCastButton();
    }

    setSpellDieNum(dieNum, num) {
        dieNum.textContent = num;
    }

    setSpellDieData(dieNum, num) {
        this.setSpellDieNum(dieNum, num);
    }

    addToParent(parent) {
        parent.appendChild(this.spell_container);
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

function addCantrip(cantrip_data){

}

function addWeapon(weapon_data) {

}

function setConcentration(spell_name) {

}