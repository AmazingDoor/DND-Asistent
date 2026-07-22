import { Initialize as InitializePlayerLevelHandler } from "./player_level_handler.js";
import { Initialize as InitializeRaceMapper } from "./utils/character_sheet/mappers/race_mapper.js";
import { Initialize as InitializeRaceDropdownHandler} from "./utils/character_sheet/dropdown_handlers/race_dropdown_handler.js";


export async function initializeClient() {
    await InitializePlayerLevelHandler();
    await InitializeRaceMapper();
    InitializeRaceDropdownHandler();
}