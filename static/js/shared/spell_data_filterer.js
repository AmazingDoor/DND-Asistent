import {bard} from './../shared/spell_lists/bard.js';
import {cleric} from './../shared/spell_lists/cleric.js';
import {druid} from './../shared/spell_lists/druid.js';
import {paladin} from './../shared/spell_lists/paladin.js';
import {ranger} from './../shared/spell_lists/ranger.js';
import {sorcerer} from './../shared/spell_lists/sorcerer.js';
import {warlock} from './../shared/spell_lists/warlock.js';
import {wizard} from './../shared/spell_lists/wizard.js';
import {getPlayerLevel} from './../client_scripts/player_level_handler.js';
import * as player_data_handler from './../client_scripts/utils/character_sheet/character_data_handler.js';
import {calculateCharismaMod, calculateIntelligenceMod, calculateWisdomMod} from './../client_scripts/utils/character_sheet/calculators/ability_calculator.js';

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

export function getSpellCastingAbilityModifier(class_name) {
    switch (class_name) {
        case "Bard":
        case "Paladin":
        case "Warlock":
            return "Charisma";
            break;
        case "Cleric":
        case "Druid":
        case "Ranger":
            return "Wisdom";
            break;
        case "Wizard":
            return "Intelligence";
            break;
    }
}

export function getPreparedSpellCount(class_name) {
    const player_level = parseInt(getPlayerLevel());
    const abilities = player_data_handler.getCharacterAbilities();
    switch(class_name) {
        case "Cleric":
        case "Druid":
            return player_level + parseInt(calculateWisdomMod());
            break;
        case "Wizard":
            return player_level + parseInt(calculateIntelligenceMod());
            break;
        case "Paladin":
            return Math.floor(player_level / 2) + calculateCharismaMod();
            break;
        case "Bard":
            return spells_known.Bard[player_level - 1];
            break;
        case "Warlock":
            return spells_known.Warlock[player_level - 1];
        case "Ranger":
            return spells_known.Ranger[player_level - 1];
        case "Sorcerer":
            return spells_known.Sorcerer[player_level - 1];
        default:
        return 0;
    }
}

export function getPreparedCantripCount(class_name) {
    const player_level = getPlayerLevel();
    const abilities = player_data_handler.getCharacterAbilities();
    switch(class_name) {
        case "Cleric":
            return cantrips_known.Cleric[player_level - 1];
        case "Druid":
            return cantrips_known.Druid[player_level - 1];
        case "Wizard":
            return cantrips_known.Wizard[player_level - 1];
        case "Paladin":
            return cantrips_known.Paladin[player_level - 1];
        case "Bard":
            return cantrips_known.Bard[player_level - 1];
        case "Warlock":
            return cantrips_known.Warlock[player_level - 1];
        case "Ranger":
            return cantrips_known.Ranger[player_level - 1];
        case "Sorcerer":
            return cantrips_known.Sorcerer[player_level - 1];
        default:
        return 0;
    }
}

const spells_known = {
    Bard: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
    Warlock: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
    Ranger: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
    Sorcerer: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20, 20]
}

const cantrips_known = {
    Cleric: [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
    Druid: [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
    Wizard: [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
    Paladin: [],
    Bard: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    Warlock: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    Ranger: [],
    Sorcerer: [4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
}