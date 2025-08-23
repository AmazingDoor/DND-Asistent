import {decrementSpellSlot} from './spell_slot_manager.js';

export function castSpell(spell_level) {
    decrementSpellSlot(spell_level);
}