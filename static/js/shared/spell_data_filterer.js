import {bard} from './../shared/spell_lists/bard.js';
import {cleric} from './../shared/spell_lists/cleric.js';
import {druid} from './../shared/spell_lists/druid.js';
import {paladin} from './../shared/spell_lists/paladin.js';
import {ranger} from './../shared/spell_lists/ranger.js';
import {sorcerer} from './../shared/spell_lists/sorcerer.js';
import {warlock} from './../shared/spell_lists/warlock.js';
import {wizard} from './../shared/spell_lists/wizard.js';

export function getSpellData(class_name, spell_name) {
    const [cantrips, spells] = getClassSpells(class_name);
    if (cantrips === undefined || spells === undefined) {return null;}
    cantrips.forEach((cantrip) => {
            const name = cantrip.name;
            if (name === spell_name) {
                return cantrip;
            }
    });

    spells.forEach((spell) => {
            const name = spell.name;
            if (name === spell_name) {
                return spell;
            }
    });

    return null;
}

export function getClassSpells(class_name) {
    switch(class_name) {
        case "Artificer":
            return[artificer.cantrips, artificer.spells]
        case "Bard":
            return[bard.cantrips, bard.spells]
        case "Cleric":
            return[cleric.cantrips, cleric.spells]
        case "Druid":
            return[druid.cantrips, druid.spells]
        case "Paladin":
            return[paladin.cantrips, paladin.spells]
        case "Ranger":
            return[ranger.cantrips, ranger.spells]
        case "Sorcerer":
            return[sorcerer.cantrips, sorcerer.spells]
        case "Warlock":
            return[warlock.cantrips, warlock.spells]
        case "Wizard":
            return[wizard.cantrips, wizard.spells]
        default:
            return [undefined, undefined];
    }
}