import {setSocket as setAbilityHandlerSocket} from './../ability_handler.js'
import {setSocket as setClassStatsHandlerSocket} from './../class_stats_handler.js';
import {setSocket as setSkillsHandlerSocket} from './../skills_handler.js';
import {setSocket as setClassSkillHandlerSocket} from './../class_skill_handler.js';
import {setSocket as setClassSpellSectionHandlerSocket} from './../class_spell_section_handler.js';
import {setSocket as setRaceDropdownHandlerSocket} from './../utils/race/race_dropdown_handler.js';
import {setSocket as setRaceSkillDropdownHandlerSocket} from './../utils/race/race_skill_dropdown_handler.js';
import {setSocket as setRaceAbilityDropdownHandlerSocket} from './../utils/race/race_ability_dropdown_handler.js';

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
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized yet!");
  return socket;
}