import {setSocket as setAbilityHandlerSocket} from './../ability_handler.js'
import {setSocket as setClassStatsHandlerSocket} from './../class_stats_handler.js';
import {setSocket as setSkillsHandlerSocket} from './../skills_handler.js';
import {setSocket as setClassSkillHandlerSocket} from './../class_skill_handler.js';
import {setSocket as setClassSpellSectionHandlerSocket} from './../class_spell_section_handler.js';
export let socket = null;

export function setFactorySocket(io) {
    socket = io;
    setAbilityHandlerSocket(io);
    setClassStatsHandlerSocket(io);
    setSkillsHandlerSocket(io);
    setClassSkillHandlerSocket(io);
    setClassSpellSectionHandlerSocket(io);
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized yet!");
  return socket;
}