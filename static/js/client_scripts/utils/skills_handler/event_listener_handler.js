import {addEventListeners as addAbilityHandlerEventListeners} from './../../ability_handler.js';
import {addEventListeners as addClassStatsEventListeners} from './../../class_stats_handler.js';
import {addEventListeners as addRaceEventListeners} from './../race/race_dropdown_handler.js';
export function addEventListeners(updateSkills, updateModifiers) {
    addAbilityHandlerEventListeners();
    addClassStatsEventListeners(updateSkills);
    addRaceEventListeners(updateSkills, updateModifiers);
}