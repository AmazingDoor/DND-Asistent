import { Initialize as InitializePlayerLevelHandler } from "./player_level_handler.js";
import { Initialize as InitializeRaceMapper } from "./utils/character_sheet/mappers/race_mapper.js";
import { Initialize as InitializeRaceDropdownHandler} from "./utils/character_sheet/dropdown_handlers/race_dropdown_handler.js";
import { Initialize as InitializeAbilityBuilder } from "./utils/character_sheet/page_builders/ability_builder.js";
import { Initialize as InitializeClassMapper} from "./utils/character_sheet/mappers/class_mapper.js";
import { buildCharacterClass } from "./utils/character_sheet/page_builders/class_builder.js";
export async function initializeClient() {
    await InitializePlayerLevelHandler();
    await InitializeRaceMapper();
    await InitializeClassMapper();
    await InitializeAbilityBuilder();
    InitializeRaceDropdownHandler();
    buildCharacterClass();
    
}