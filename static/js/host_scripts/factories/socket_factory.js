import {setSocket as setMessageHandlerSocket} from './../message_handler.js';
import {setSocket as setMessageImageSocket} from './../image_handler.js';
import {setSocket as setTrapHandlerSocket} from './../trap_handler.js';
import {setSocket as setCombatSocket} from './../../combat.js';
import {setSocket as setCombatBuilderSocket} from './../combat/combat_builder.js';
import {setSocket as setSaveCombatGlobalSocket} from './../combat/save_combat_global_handler.js';
import {setSocket as setCombatInitializerSocket} from './../combat/combat_initializer.js';
import {setSocket as setCurrentCombatSocket} from './../combat/current_combat.js';
import {setSocket as setCombatSaverSocket} from './../combat/combat_saver.js';
import {setSocket as setHealthHandlerSocket} from './../combat/health_handler.js';
import {setSocket as setHealthSectionBuilderSocket} from './../combat/health_section_builder.js';
export let socket = null;

export function setFactorySocket(io) {
    socket = io;
    setMessageHandlerSocket(io);
    setMessageImageSocket(io);
    setTrapHandlerSocket(io);
    setCombatSocket(io);
    setCombatBuilderSocket(io);
    setSaveCombatGlobalSocket(io);
    setCombatInitializerSocket(io);
    setCurrentCombatSocket(io);
    setCombatSaverSocket(io);
    setHealthHandlerSocket(io);
    setHealthSectionBuilderSocket(io);
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized yet!");
  return socket;
}