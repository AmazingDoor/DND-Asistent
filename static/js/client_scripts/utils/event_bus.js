class EventBus {
    constructor() {
        this.listeners = new Map();
    }

    subscribe(event, callback) {
        if(!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        this.listeners.get(event).add(callback);

        return () => this.listeners.get(event)?.delete(callback);

    }

    subscribeToEvents(event_array, callback) {
        event_array.forEach((event) => {
            this.subscribe(event, callback);
        });
    }

    publish(event) {
        this.listeners.get(event)?.forEach(fn => fn());
    }
}

export const bus = new EventBus();

export const EVENTS = {
    ABILITY_CHANGED: "ability_changed",
    CLASS_CHANGED: "class_changed",
    RACE_CHANGED: "race_changed",
    BACKGROUND_CHANGED: "background_changed",
    CLASS_SKILL_SELECTED: "class_skill_selected",
    USE_SPELL_BOOK_CLICKED: "use_spell_book_clicked",
    RACE_SKILL_SELECTED: "race_skill_selected",
    RACE_ABILITY_SELECTED: "race_ability_selected",
    RACE_LANGUAGE_SELECTED: "race_language_selected",
    LEVEL_UPDATED: "level_updated",
    INVENTORY_ITEM_SELECTED: "inventory_item_selected",
    WEAPON_SELECTED: "weapon_selected",
    ARMOR_SELECTED: "armor_selected",
    SPELL_SELECTED: "spell_selected",
    SPELL_BOOK_SPELL_SELECTED: "spell_book_spell_selected",
    SPELL_PREPARED: "spell_prepared",
    SPELL_CASTED: "spell_casted"

};

export const SAVE_EVENTS = {
    SAVE_CLASS : "save_class",
    SAVE_RACE: "save_race",
    SAVE_BACKGROUND: "save_background",
    SAVE_INVENTORY: "save_inventory"
}