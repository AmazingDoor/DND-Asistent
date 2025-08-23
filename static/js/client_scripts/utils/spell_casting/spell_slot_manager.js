let spell_slots = [];

export function setSpellSlots(slots) {
    spell_slots = slots;
}

export function decrementSpellSlot(slot) {
    spell_slots[slot] = spell_slots[slot] - 1;
}

export function getSpellSlots() {
    return spell_slots;
}