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
import { InitializeCharacterDataHandler } from "./utils/character_sheet/character_data_handler.js";
import { initializeInventoryClasses } from "./utils/character_sheet/inventory_items.js";
import { saveInventory } from "./save_handler.js";
import { bus, INITIAL_EVENTS } from "./utils/event_bus.js";

export async function initializeClient() {
    await initializeInventoryClasses();
    await InitializeCharacterDataHandler();
    await initializeBasicData();
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
    EmitUpdateSignals();
}

const initial_events = [INITIAL_EVENTS.UPDATE_PREPARED_SPELL_COUNT, 
    INITIAL_EVENTS.DISABLE_PREPARED_SPELL_CHECKBOXES,
    INITIAL_EVENTS.UPDATE_CANTRIP_DISPLAY
];

function EmitUpdateSignals() {
    initial_events.forEach((event) => {
        bus.publish(event);
    });
}