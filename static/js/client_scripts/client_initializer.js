import { Initialize as InitializePlayerLevelHandler } from "./player_level_handler.js";
import { Initialize as InitializeRaceMapper } from "./utils/character_sheet/mappers/race_mapper.js";
import { Initialize as InitializeRaceDropdownHandler} from "./utils/character_sheet/dropdown_handlers/race_dropdown_handler.js";
import { Initialize as InitializeAbilityBuilder } from "./utils/character_sheet/page_builders/ability_builder.js";
import { Initialize as InitializeClassMapper} from "./utils/character_sheet/mappers/class_mapper.js";
import { Initialize as InitializeInventoryBuilder } from "./utils/character_sheet/page_builders/inventory_builder.js";
import { buildCharacterClass } from "./utils/character_sheet/page_builders/class_builder.js";
import { buildInventory } from "./utils/character_sheet/page_builders/inventory_builder.js";
import { updateData as updateCombatSpellData } from "./utils/character_sheet/page_builders/sub_builders/combat_builder.js";
import { Initialize as InitializeInventoryHandler } from "./utils/inventory_handler.js";
import { InitializeButtonHandler } from "./rest_button_handler.js";
import { initializeBasicData } from "./basic_data_initializer.js";

export async function initializeClient() {
    await initializeBasicData();
    //await InitializePlayerLevelHandler();
    await InitializeRaceMapper();
    await InitializeClassMapper();
    await InitializeAbilityBuilder();
    await InitializeInventoryHandler();
    await InitializeInventoryBuilder();
    InitializeRaceDropdownHandler();
    buildCharacterClass();
    buildInventory();
    updateCombatSpellData();
    InitializeButtonHandler();
}