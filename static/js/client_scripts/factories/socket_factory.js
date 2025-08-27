import {setSocket as setClassSpellSectionBuilderSocket} from './../utils/character_sheet/page_builders/sub_builders/class_spell_section_builder.js';
import {setSocket as setRaceDropdownHandlerSocket} from './../utils/character_sheet/dropdown_handlers/race_dropdown_handler.js';
import {setSocket as setRaceSkillDropdownHandlerSocket} from './../utils/character_sheet/dropdown_handlers/race_skill_dropdown_handler.js';
import {setSocket as setRaceAbilityDropdownHandlerSocket} from './../utils/character_sheet/dropdown_handlers/race_ability_dropdown_handler.js';
import {setSocket as setRaceLanguageDropdownSocket} from './../utils/character_sheet/dropdown_handlers/race_language_dropdown.js';

import {setSocket as setClassMapperSocket} from './../utils/character_sheet/mappers/class_mapper.js';
import {setSocket as setAbilityMapperSocket} from './../utils/character_sheet/mappers/ability_mapper.js';
import {setSocket as setRaceMapperSocket} from './../utils/character_sheet/mappers/race_mapper.js';
import {setSocket as setClassBuilderSocket} from './../utils/character_sheet/page_builders/class_builder.js';
import {setSocket as setAbilityBuilderSocket} from './../utils/character_sheet/page_builders/ability_builder.js';
import {setSocket as setDisplayStatUpdaterSocket} from "./../utils/display_stat_updater.js";
import {setSocket as setPlayerLevelHandlerSocket} from './../player_level_handler.js';
import {setSocket as setInventoryBuilderSocket} from './../utils/character_sheet/page_builders/inventory_builder.js';
export let socket = null;

export function setFactorySocket(io) {
    socket = io;
    setClassSpellSectionBuilderSocket(io);
    setRaceDropdownHandlerSocket(io);
    setRaceSkillDropdownHandlerSocket(io);
    setRaceAbilityDropdownHandlerSocket(io);
    setRaceLanguageDropdownSocket(io);
    setClassMapperSocket(io);
    setAbilityMapperSocket(io);
    setRaceMapperSocket(io);
    setClassBuilderSocket(io);
    setAbilityBuilderSocket(io);
    setDisplayStatUpdaterSocket(io);
    setPlayerLevelHandlerSocket(io);
    setInventoryBuilderSocket(io);
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized yet!");
  return socket;
}