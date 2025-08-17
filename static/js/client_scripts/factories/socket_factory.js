import {setSocket as setAbilityHandlerSocket} from './../ability_handler.js'
import {setSocket as setClassStatsHandlerSocket} from './../class_stats_handler.js';
import {setSocket as setSkillsHandlerSocket} from './../skills_handler.js';
import {setSocket as setClassSkillHandlerSocket} from './../class_skill_handler.js';
import {setSocket as setClassSpellSectionHandlerSocket} from './../class_spell_section_handler.js';
import {setSocket as setRaceDropdownHandlerSocket} from './../utils/race/race_dropdown_handler.js';
import {setSocket as setRaceSkillDropdownHandlerSocket} from './../utils/race/race_skill_dropdown_handler.js';
import {setSocket as setRaceAbilityDropdownHandlerSocket} from './../utils/race/race_ability_dropdown_handler.js';
import {setSocket as setRaceLanguageDropdownSocket} from './../utils/race/race_language_dropdown.js';
import {setSocket as setClassMapperSocket} from './../utils/character_sheet/mappers/class_mapper.js';
import {setSocket as setAbilityMapperSocket} from './../utils/character_sheet/mappers/ability_mapper.js';
import {setSocket as setRaceMapperSocket} from './../utils/character_sheet/mappers/race_mapper.js';
import {setSocket as setClassBuilderSocket} from './../utils/character_sheet/page_builders/class_builder.js';

export let socket = null;

export function setFactorySocket(io) {
    socket = io;
    setAbilityHandlerSocket(io);
    setClassStatsHandlerSocket(io);
    setSkillsHandlerSocket(io);
    setClassSkillHandlerSocket(io);
    setClassSpellSectionHandlerSocket(io);
    setRaceDropdownHandlerSocket(io);
    setRaceSkillDropdownHandlerSocket(io);
    setRaceAbilityDropdownHandlerSocket(io);
    setRaceLanguageDropdownSocket(io);
    setClassMapperSocket(io);
    setAbilityMapperSocket(io);
    setRaceMapperSocket(io);
    setClassBuilderSocket(io);
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized yet!");
  return socket;
}