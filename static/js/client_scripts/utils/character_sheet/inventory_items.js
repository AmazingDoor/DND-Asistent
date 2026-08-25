import { items as ITEMS } from "../../../shared/inventory/items.js";
import { getClassSpells, getMaxSpellLevel } from "../../../shared/spell_data_filterer.js";
import { getClassData, getClassName } from "./mappers/class_mapper.js";
import { emitAndWait, emitSignal, getSocket } from "../socket_emitter.js";
import { weapons as WEAPONS } from "../../../shared/inventory/weapons.js";
import { getAllArmors } from "../../../shared/inventory/armor.js";
import { options as CLASS_LOADOUT_OPTIONS } from "../../../shared/inventory/class_loadout_options.js";
import { saveInventory } from "../../save_handler.js";
import { OTHER_ITEM_TYPES,  INVENTORY_ITEM_TYPES, ITEM_SOURCES, SPELL_BOOK_TYPES} from "../../../shared/inventory/item_metadata.js";

let char_id = sessionStorage.getItem("charId");
let socket;

const inventory_container = document.querySelector('.inventory-container');


const ARMORS = getAllArmors();

export function initializeInventoryClasses() {
    socket = getSocket();
}

function getKey(d, d2) {
    //get the key from data in an array
    for (let key in d) {
        if (d[key] === d2) {
            return key;
        }
    }
}

function getItemReference(data) {
    //get item reference from item data in any of the arrays
    return getKey(WEAPONS, data) || 
    getKey(getAllArmors(), data) || 
    getKey(ITEMS, data) || null;
}

function getItemData(reference) {
    //get item data from a reference from any of the arrays
    try {
        return ITEMS[reference] || getAllArmors()[reference] || WEAPONS[reference];
    } catch {
        return null;
    }
}

function getItemType(item_data) {
    //return an INVENTORY_ITEM_TYPE based on item data
    try {
        const contents = item_data.contents || [];
        const options = item_data.item_options || [];
        const index = item_data.index || null;

        if(contents.length > 0) {
            return INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM;
        }

        if(index == "spellbook") {
            return INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM;
        }

        if(options.length > 0) {
            return INVENTORY_ITEM_TYPES.INVENTORY_OPTION;
        }

        return INVENTORY_ITEM_TYPES.INVENTORY_ITEM;
    } catch {
        return null;
    }


}

export function createItem({item_type, reference='', from='default', count=1, contents=[], linked_inventory=null} = {}) {
    /*
    create an item based on data given
        -item_type is INVENTORY_ITEM_TYPE
        -reference is the item reference or a class_loadout_option reference
        -from is the origin of the item (class, background, race, default)
        -count is number of that item
        -contents can be items in the container_item's inventory or spells in a spell book
        -linked_inventory is the InventoryContainer that an item is in
    */

    let item;
    switch(item_type) {
        case INVENTORY_ITEM_TYPES.INVENTORY_ITEM:
            item = new InventoryItem(reference, from, count);
            break;
        case INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM:
            item = new InventoryContainerItem(reference, from, count, contents);
            break;
        case INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM:
            item = new InventorySpellBook(from, count, contents);
            break;
        case INVENTORY_ITEM_TYPES.INVENTORY_OPTION:
            item = new InventoryOption(from, reference, linked_inventory);
    }
    return item;
}

export class InventoryManager {
    //Used to interact with the 4 inventories
    static instance = null;

    constructor(inventory) {
        this.character_inventory = inventory;
        this.items_inventory = new InventoryContainer("Inventory");
        this.weapons_inventory = new InventoryContainer("Weapons");
        this.armor_inventory = new InventoryContainer("Armor");
        this.mounts_inventory = new InventoryContainer("Mounts");

        this.items_inventory.addTo(inventory_container);
        this.weapons_inventory.addTo(inventory_container);
        this.armor_inventory.addTo(inventory_container);
        this.mounts_inventory.addTo(inventory_container);

        InventoryManager.instance = this;

        this.populateInventories();
    }

    static async Initialize() {
        let i = await this.getSavedInventory();
        return new InventoryManager(i);
    }

    static async getSavedInventory() {
        emitSignal("require_inventory", {char_id: char_id});
        return new Promise((resolve => {
            socket.once('initialize_inventory_data', data => {
                const inv = data.inventory.inventory;
                resolve(inv);
            });
        }));
    }

    clearInventories(item_source=ITEM_SOURCES.DEFAULT) {
        this.items_inventory.clearItems(item_source);
        this.armor_inventory.clearItems(item_source);
        this.weapons_inventory.clearItems(item_source);
        this.mounts_inventory.clearItems(item_source);
    }

    refreshInventories() {
        this.items_inventory.refresh();
        this.armor_inventory.refresh();
        this.weapons_inventory.refresh();
        this.mounts_inventory.refresh();
    }

    populateInventories() {
        //Add items from the saved inventory
        this.character_inventory.inv.forEach((item_data) => {
            let reference = item_data.reference || item_data.options_ref;
            let count = item_data.count;
            let from = item_data.from;
            let item_type = item_data.item_type || item_data.type;
            let contents = item_data.spells || item_data.inv || null;

            let item = createItem({item_type: item_type, reference: reference, from: from, count: count, contents: contents, linked_inventory: this.items_inventory});
            this.addToItems(item);
        });

        this.character_inventory.weapon.forEach((item_data) => {
            let reference = item_data.reference || item_data.options_ref;
            let count = item_data.count;
            let from = item_data.from;
            let item_type = item_data.item_type || item_data.type;

            let item = createItem({item_type: item_type, reference: reference, count: count, from: from, linked_inventory: this.weapons_inventory_inventory});
            this.addToWeapons(item);
        });

        this.character_inventory = [];

    }

    addToItems(item) {
        this.items_inventory.addItem(item);
    }

    addToWeapons(item) {
        this.weapons_inventory.addItem(item);
    }

    addToArmors(item) {
        this.armor_inventory.addItem(item);
    }

    addToMounts(item) {
        this.mounts_inventory.addItem(item);
    }

    getSaveData() {
        //Get data to be saved from the 4 inventories
        let inv = this.items_inventory.getSaveData();
        let weapons = this.weapons_inventory.getSaveData();
        let armor = this.armor_inventory.getSaveData();
        let mounts = this.armor_inventory.getSaveData();
        return {inv: inv, weapon: weapons, armor: armor, mount: mounts};
    }

    setDefaultClassData() {
        //set default data from the class chosen
        const class_data = getClassData();

        const weapon_options = class_data.weapons.options;
        const armor_options = class_data.armor.options;
        const item_options = class_data.inventory.options;

        const starting_weapons = class_data.weapons.starting;
        const starting_armor = class_data.armor.starting;
        const starting_items = class_data.inventory.starting;
    
        const from = ITEM_SOURCES.CLASS;

        starting_weapons.forEach((weapon) => {
            const count = weapon.count;
            const w = weapon.weapon;

            const reference = getKey(WEAPONS, w);

            const i = new InventoryItem(reference, from, count);
            this.addToWeapons(i);
        });
        
        starting_armor.forEach((armor) => {
            const count = armor.count;
            const a = armor.armor;

            const reference = getKey(ARMORS, a);

            const i = new InventoryItem(reference, from, count);
            this.addToArmors(i);
        });

        starting_items.forEach((item) => {
            const count = item.count;
            const item_data = item.item;
            const contents = item_data.contents;
            const reference = getKey(ITEMS, item_data);
            let item_type = getItemType(item_data);
            
            let i = createItem({item_type: item_type, reference: reference, from: from, count: count, contents: contents});
            this.addToItems(i);
        });

        item_options.forEach((item_option_reference) => {
            let i = new InventoryOption(ITEM_SOURCES.CLASS, item_option_reference, this.items_inventory);
            this.addToItems(i);
        })

        weapon_options.forEach((weapon_option_reference) => {
            let i = new InventoryOption(ITEM_SOURCES.CLASS, weapon_option_reference, this.weapons_inventory)
            this.addToWeapons(i);
        });
    }
}



export class InventoryContainer {
    //Contains items and display them
    constructor(inventory_title) {
        this.items = [];
        this.title = inventory_title;

        this.buildInventory();
    }

    buildInventory() {
        this.main_div = document.createElement('div');
        this.main_div.classList.add('inventory-container-main');

        this.inventory_title = document.createElement('h3');
        this.inventory_title.classList.add('inventory-title');
        this.inventory_title.textContent = this.title;
        this.main_div.appendChild(this.inventory_title);

        const body = document.createElement('div');
        body.classList.add('inventory-body');
        this.main_div.appendChild(body);

        this.item_list = document.createElement('div');
        this.item_list.classList.add('inventory-item-list');
        body.appendChild(this.item_list);

        const button_container = document.createElement('div');
        button_container.classList.add('inventory-button-container');
        body.appendChild(button_container);

        this.add_button = document.createElement('button');
        this.add_button.classList.add('inventory-add-item-button');
        this.add_button.textContent = "+";
        button_container.appendChild(this.add_button);
    }

    loadItems(data) {
        //Load items from data provided
        let inv_array = data;
        if(inv_array === undefined) {
            inv_array = [];
        }
        inv_array.forEach((item) => {
            let item_type = item.item_type;

            if(item_type === undefined) {
                if(Object.hasOwn(item, "inv")) {
                    item_type = INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM;
                } else {
                    item_type = INVENTORY_ITEM_TYPES.INVENTORY_ITEM;
                }
            }


            let reference = null;
            let from = null;
            let count = null;
            let inv = null;
            let i = null;
            switch(item_type) {
                case INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM:
                    reference = item.reference;
                    from = item.from;
                    count = item.count;
                    inv = item.inv;

                    i = new InventoryContainer(reference, from, count, inv);
                    this.addItem(i);
                    break;
                case INVENTORY_ITEM_TYPES.INVENTORY_ITEM: 
                    reference = item.reference;
                    from = item.from;
                    count = item.count;

                    i = new InventoryItem(reference, from, count);
                    this.addItem(i);
                    break;
                case INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM:
                    break;
                default:
                    break;
            }
        });

        console.warn("not fully implemented yet");
    }

    clearItems(item_source) {
        if(item_source === ITEM_SOURCES.DEFAULT) {
            this.items = [];
        } else {
            this.items = this.items.filter(item => item.from !== item_source);  
        }
        this.refresh();
    }

    refresh() {
        this.item_list.textContent = '';
        this.items.forEach((item) => {
            item.addTo(this.item_list);
        });
    }

    addItem(inventory_item) {
        inventory_item.setInventory(this);
        this.items.push(inventory_item);
        this.refresh();
    }

    removeItem(inventory_item) {
        const index = this.items.indexOf(inventory_item);

        if(index !== -1) {
            this.items.splice(index, 1);
            this.refresh();

        }
    }

    async removeItemAndSave(item) {
        this.removeItem(item);
        await saveInventory();
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }

    getSaveData() {
        //get data to be saved from items
        let item_array = [];
        this.items.forEach((item) => {
            item_array.push(item.getItemDict());
        });
        return item_array;
    }
}

class ContainerItemInventory extends InventoryContainer {
    //Inventory for items that contain other items
    constructor(inventory_title) {
        super(inventory_title)
    }

    buildInventory() {
        this.main_div = document.createElement('div');
        this.main_div.classList.add('inventory-container-main');

        this.inventory_title = document.createElement('h3');
        this.inventory_title.classList.add('inventory-title');
        this.inventory_title.textContent = this.title;
        this.main_div.appendChild(this.inventory_title);

        const body = document.createElement('div');
        body.classList.add('inventory-body');
        this.main_div.appendChild(body);

        this.item_list = document.createElement('div');
        this.item_list.classList.add('inventory-item-list');
        body.appendChild(this.item_list);

        const button_container = document.createElement('div');
        button_container.classList.add('inventory-button-container');
        body.appendChild(button_container);

        this.add_button = document.createElement('button');
        this.add_button.classList.add('inventory-add-item-button');
        this.add_button.textContent = "+";
        button_container.appendChild(this.add_button);
    }
}

class InventoryAddable {
    //makes things easily addable to an inventory
    constructor() {
        this.inventory = null;
        this.item_div = document.createElement('div');

    }

    setInventory(inventory) {
        this.inventory = inventory;
    }

    addTo(parent_element) {
        parent_element.appendChild(this.item_div);
    }

    removeAndSave() {
        this.item_div.remove();
        this.inventory?.removeItemAndSave(this);
    }


}

export class InventoryItem extends InventoryAddable {
    //A basic item in an inventory
    constructor(reference, from='default', count=1) {
        super()
        this.reference = reference;
        this.from = from;
        this.count = count;
        this.item_type = INVENTORY_ITEM_TYPES.INVENTORY_ITEM;
        this.item_data = getItemData(reference);
        
        this.buildItem();
    }

    buildItem() {
        this.name_text = document.createElement('p');
        this.name_text.classList.add('inventory-item-name');
        this.name_text.textContent = this.item_data.name;
        this.item_div.appendChild(this.name_text);

        this.count_input = document.createElement('input');
        this.count_input.type = 'number';
        this.count_input.classList.add('inventory-item-count');
        this.count_input.value = this.count;
        this.count_input.addEventListener("change", async() => {
            this.count = this.count_input.value;
            await saveInventory();
        });
        this.item_div.appendChild(this.count_input);

        this.remove_button = document.createElement('button');
        this.remove_button.classList.add('inventory-item-remove-button');
        this.remove_button.textContent = "X";
        this.remove_button.addEventListener('click', async() => {await this.removeAndSave()});
        this.item_div.appendChild(this.remove_button);
    }

    getItemDict() {
        //return data to be saved for the item
        return {reference: this.reference, from: this.from,
            count: this.count, item_type: this.item_type
        };
    }

    setName(name) {
        this.name_text.textContent = name;
    }

    setCount(count) {
        this.count_input.value = count;
    }
}

export class InventoryContainerItem extends InventoryAddable {
    //item that can contain other items
    constructor(reference, from=ITEM_SOURCES.DEFAULT, count=1, inv=[]) {
        super()
        this.reference = reference;
        this.from = from;
        this.count = count;
        this.inv = inv;
        this.item_type = INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM;

        this.buildItem();
        this.loadItems(this.inv);
    }

    buildItem() {
        const name_container = document.createElement('div');
        name_container.classList.add('inventory-container-item-name-div');
        this.item_div.appendChild(name_container);

        this.name_text = document.createElement('div');
        this.name_text.classList.add('inventory-containdr-item-name');
        this.name_text.textContent = ITEMS[this.reference].name;
        name_container.appendChild(this.name_text);

        this.item_inventory = new ContainerItemInventory(ITEMS[this.reference].name);
        this.item_inventory.addTo(this.item_div);

        
    }

    loadItems(data) {
        //load items into the container_item's inventory
        this.item_inventory.loadItems(data);
    }

    addItem(item) {
        this.item_inventory.addItem(item);
    }

    getItemDict() {
        //return data to be saved from container_item and contained items
        let inv = this.item_inventory.getSaveData();
        return {reference: this.reference, from: this.from,
            count: this.count, item_type: this.item_type,
            inv: inv
        };
    }
}

class InventoryOption extends InventoryAddable {
    //A button that allows the player to pick specified items
    constructor(from, options_ref, inventory) {
        super();
        this.inventory = inventory;
        this.from = from;
        this.options_ref = options_ref;
        this.item_options = CLASS_LOADOUT_OPTIONS[this.options_ref];
        this.buildItem();
    }

    buildItem() {
        this.selectButton = document.createElement('button');
        this.selectButton.classList.add('inventory-item-option');
        this.selectButton.textContent = this.options_ref;
        this.selectButton.addEventListener("click", () => {this.createItemSelectOverlay();});
        this.item_div.appendChild(this.selectButton);
    }

    createItemSelectOverlay() {
        //create and display a list of items the player can pick from
        this.item_selection_overlay = document.createElement('div');
        this.item_selection_overlay.classList.add('item-select-overlay');
        this.item_selection_overlay.classList.add('fullscreen-overlay');
        this.item_selection_overlay.classList.add('overlay-index-4');

        let close_button_container = document.createElement('div');
        close_button_container.classList.add('item-select-overlay-close-container');
        this.item_selection_overlay.appendChild(close_button_container);

        let close_button = document.createElement('button');
        close_button.classList.add('item-select-overlay-close');
        close_button.textContent = "X";
        close_button.addEventListener("click", () => {this.removeItemSelectOverlay()});
        close_button_container.appendChild(close_button);

        let main_container = document.createElement('div');
        main_container.classList.add('item-select-overlay-main');
        this.item_selection_overlay.appendChild(main_container);
        this.item_div.appendChild(this.item_selection_overlay);

        //create items and add them to the list
        this.item_options.forEach((item_option) => {
            let item_option_object = new ItemOption(this, item_option, this.from);
            item_option_object.addTo(main_container);
        });

    }

    getItemDict() {
        //return data to be saved
        return {item_type: INVENTORY_ITEM_TYPES.INVENTORY_OPTION, from: this.from, 
            options_ref: this.options_ref
        };
    }

    selectItem(item_data, reference, count, ammo, other, inv) {
        //runs when an item from the option list is selected
        const item_type = getItemType(item_data);
        const i = createItem({item_type: item_type, reference: reference, from: this.from, count: count,  contents: inv});
        this.inventory.addItem(i);

        //add ammo if the weapon comes with it
        if(ammo > 0) {
            const ammo_reference = item_data.ammo_type;
            const ammo_data = getItemData(ammo_reference);
            const ammo_count = ammo;
            const ammo_item_type = INVENTORY_ITEM_TYPES.INVENTORY_ITEM;
            const ammo_linked_inventory = InventoryManager.instance.items_inventory;
            const ammo_i = createItem({item_type: ammo_item_type, reference: ammo_reference, from: this.from, count: ammo_count});
            ammo_linked_inventory.addItem(ammo_i);

        }

        //add other items / item options to inventory if there are any
        other.forEach((o) => { 
            const other_reference = o.options || o.item || o.weapon || o.armor;
            const other_item_data = getItemData(other_reference);
            const other_count = o.count;
            const other_inv = other_item_data?.contents || null;
            let other_item_type;
            let inventory;
            switch (o.type) {
                case OTHER_ITEM_TYPES.armor:
                    inventory = InventoryManager.instance.armor_inventory;
                    other_item_type = INVENTORY_ITEM_TYPES.INVENTORY_ITEM
                    break;
                case OTHER_ITEM_TYPES.armor_choice:
                    inventory = InventoryManager.instance.armor_inventory;
                    other_item_type = INVENTORY_ITEM_TYPES.INVENTORY_OPTION;
                    break;
                case OTHER_ITEM_TYPES.container_item:
                    inventory = InventoryManager.instance.items_inventory;
                    other_item_type = INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM
                    break;
                case OTHER_ITEM_TYPES.item:
                    inventory = InventoryManager.instance.items_inventory;
                    other_item_type = INVENTORY_ITEM_TYPES.INVENTORY_ITEM;
                    break;
                case OTHER_ITEM_TYPES.item_choice:
                    inventory = InventoryManager.instance.items_inventory;
                    other_item_type = INVENTORY_ITEM_TYPES.INVENTORY_OPTION;
                    break;
                case OTHER_ITEM_TYPES.weapon:
                    inventory = InventoryManager.instance.weapons_inventory;
                    other_item_type = INVENTORY_ITEM_TYPES.INVENTORY_ITEM;
                    break;
                case OTHER_ITEM_TYPES.weapon_choice:
                    inventory = InventoryManager.instance.weapons_inventory;
                    other_item_type = INVENTORY_ITEM_TYPES.INVENTORY_OPTION;
                    break;
            }
            const other_i = createItem({item_type: other_item_type, reference: other_reference, from: this.from, count: other_count,  contents: other_inv, linked_inventory: inventory});
            inventory.addItem(other_i);
        });

        this.removeItemSelectOverlay();
        this.inventory.removeItemAndSave(this);
    }

    removeItemSelectOverlay() {
        //remove the option list overlay
        this.item_selection_overlay.remove();
        this.item_selection_overlay = null;
    }
}

class ItemOption {
    //item in the item option overlay
    constructor(item_option, items) {
        this.linked_option = item_option;
        this.option_dict = items;
        this.item_reference = items.item || items.weapon || items.armor || null;
        this.count = items.count || 1;
        this.ammo = items.ammo || 0;
        this.other = items.other || [];
        this.item_data = getItemData(this.item_reference);
        this.inv = this.item_data.contents || [];
        this.buildItemOption();
    }

    buildItemOption() {
        this.main_div = document.createElement('div');
        this.main_div.classList.add('item-select-option');

        this.main_div.addEventListener('click', () => {this.linked_option.selectItem(this.item_data, this.item_reference, this.count, this.ammo, this.other, this.inv)});

        let item_row = document.createElement('div');
        item_row.classList.add('item-option-row');

        let item_name = document.createElement('p');
        item_name.textContent = this.item_data.name;
        item_row.appendChild(item_name);

        let count = document.createElement('p');
        count.textContent = this.count;
        item_row.appendChild(count);

        this.main_div.appendChild(item_row);

        //display data for other items / options that come with the option
        this.other.forEach((o) => {
            let item_row = document.createElement('div');
            item_row.classList.add('item-option-row');
            this.main_div.appendChild(item_row);

            const options_ref = o.options || null;
            const item_ref = o.item || null;
            let label;

            if(options_ref === null) {
                const name = getItemData(item_ref).name;
                label = name;
            } else {
                label = o.label;
            }


            let other_name = document.createElement('p');
            other_name.textContent = label;
            item_row.appendChild(other_name);


        });
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }
}

export class InventorySpellBook extends InventoryAddable {
    //spell book in the inventory
    static spell_option_overlay = null;
    constructor(from=ITEM_SOURCES.DEFAULT, count=1, spells=[]) {
        super();
        this.from = from;
        this.count = count;
        this.spells = spells;

        this.buildItem();
    }

    buildItem() {
        const title_div = document.createElement('div');
        this.item_div.appendChild(title_div);

        this.title_text = document.createElement('div');
        this.title_text.classList.add('inventory-spellbook-title');
        this.title_text.textContent = "Spellbook";
        title_div.appendChild(this.title_text);

        this.spell_array = document.createElement('div');
        this.spell_array.classList.add('spellbook-spell-array');
        this.item_div.appendChild(this.spell_array);
        this.setSize(4);
    }

    populateSpells(spells) {
        spells.forEach((spell) => {
            //create spell and add it to this.spells
        });
    }

    setSize(spell_num) {
        for(let i = 0; i < spell_num; i++) {
            let data = {};
            data.item_type = SPELL_BOOK_TYPES.SPELL_OPTION;
            this.spells.push(data);
        }
        this.refreshSpellList();
    }

    refreshSpellList() {
        this.spell_array.textContent = '';
        this.spells.forEach((spell) => {
            if(spell.item_type === SPELL_BOOK_TYPES.SPELL_OPTION) {
                const spell_option = new BookSpellOption();
                spell_option.addTo(this.spell_array);
            } else {
                const spell = new BookSpell();
                spell.addTo(this.spell_array);
            }
        });
    }

    addSpell(spell_data) {
        this.spells.push(spell_data);
        this.refreshSpellList();
    }


    getItemDict() {
        //return data to be saved for the spell book
        return {item_type: INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM,
            from: this.from, count: this.count, spells: this.spells
        };
    }

    static createSpellOptionOverlay() {
        InventorySpellBook.spell_option_overlay = document.createElement('div');
        InventorySpellBook.spell_option_overlay.classList.add('fullscreen-overlay');
        InventorySpellBook.spell_option_overlay.classList.add('overlay-index-4');
        InventorySpellBook.spell_option_overlay.classList.add('spell-selection-overlay');
        document.body.appendChild(InventorySpellBook.spell_option_overlay);

        let close_button_container = document.createElement('div');
        close_button_container.classList.add('spell-select-overlay-close-container');
        InventorySpellBook.spell_option_overlay.appendChild(close_button_container);

        let close_button = document.createElement('button');
        close_button.classList.add('spell-select-overlay-close');
        close_button.textContent = "X";
        close_button.addEventListener("click", () => {InventorySpellBook.removeSpellOptionOverlay()});
        close_button_container.appendChild(close_button);

        let main_container = document.createElement('div');
        main_container.classList.add('spell-select-overlay-main');
        InventorySpellBook.spell_option_overlay.appendChild(main_container);

        const wizard_spells = getClassSpells("Wizard")[1];
        const max_spell_level = getMaxSpellLevel();
        wizard_spells.forEach((spell) => {
            if(spell.level != 0 && spell.level <= max_spell_level) {
                console.log(spell);
                const spell_option = new SpellOption(spell);
                spell_option.addTo(main_container);
            }
        });
    }

    static removeSpellOptionOverlay() {
        InventorySpellBook.spell_option_overlay.remove();
        InventorySpellBook.spell_option_overlay = null;
    }
}

class SpellBookAddable {
    //make it easy to add something to a spell book inventory
    constructor() {
        this.main_div = document.createElement('div');
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }
}

export class BookSpell extends SpellBookAddable {
    //spell in a spell book
    constructor(spell_reference) {
        super();
        this.spell_reference = spell_reference;
        this.buildItem();
    }

    buildItem() {
        this.spell_name_text = document.createElement('p');
        this.spell_name_text.classList('spell-name-text');
        this.spell_name_text.textContent = getClassSpells(getClassName())[this.spell_reference];
    }
}

export class BookSpellOption extends SpellBookAddable {
    //Spell Option Button in a spell book
    constructor() {
        super();
        this.buildItem();
    }

    buildItem() {
        this.option_button = document.createElement('button');
        this.option_button.textContent = "Select";
        this.option_button.classList.add('spell-option-button');
        this.option_button.addEventListener("click", () => {
            InventorySpellBook.createSpellOptionOverlay();
        });
        this.main_div.appendChild(this.option_button);
    }

    selectSpell() {

    }
}

export class SpellOption {
    //Spell options in the spell option overlay
    constructor(spell_data) {
        this.spell_data = spell_data;
        this.buildItem();
    }

    buildItem() {
        this.main_div = document.createElement('div');
        this.main_div.classList.add('spell-option-main');

        this.main_div.addEventListener("click", () => {
            console.warn("not implemented");
        });

        const name_container = document.createElement('div');
        name_container.classList.add('spell-option-name-container');
        this.main_div.appendChild(name_container);
        
        const spell_name = document.createElement('h3');
        spell_name.textContent = this.spell_data.name;
        if(this.spell_data.concentration) {
            spell_name.textContent += " (Uses Concentration)";
        }
        name_container.appendChild(spell_name);

        const top_container = document.createElement('div');
        top_container.classList.add('spell-option-top-container');
        this.main_div.appendChild(top_container);

        const name_level_container = document.createElement('div');
        top_container.appendChild(name_level_container)

        const level_container = document.createElement('div');
        level_container.classList.add('spell-option-stat-container');
        top_container.appendChild(level_container);

        const level_label = document.createElement('p');
        level_label.textContent = "Level: ";
        level_label.classList.add('spell-option-stat-label');
        level_container.appendChild(level_label);

        const level_num = document.createElement('p');
        level_num.textContent = this.spell_data.level;
        level_container.appendChild(level_num);

        const casting_time_container = document.createElement('div');
        casting_time_container.classList.add('spell-option-stat-container');
        top_container.appendChild(casting_time_container);

        const casting_time_label = document.createElement('p');
        casting_time_label.textContent = "Casting Time: ";
        casting_time_label.classList.add('spell-option-stat-label');
        casting_time_container.appendChild(casting_time_label);

        const casting_time_num = document.createElement('p');
        casting_time_num.textContent = this.spell_data.casting_time;
        casting_time_container.appendChild(casting_time_num);

        const range_container = document.createElement('div');
        range_container.classList.add('spell-option-stat-container');
        top_container.appendChild(range_container);

        const range_label = document.createElement('p');
        range_label.classList.add('spell-option-stat-label');
        range_label.textContent = "Range: ";
        range_container.appendChild(range_label);

        const range_num = document.createElement('p');
        range_num.textContent = this.spell_data.range;
        range_container.appendChild(range_num);

        const components_container = document.createElement('div');
        components_container.classList.add('spell-option-stat-container');
        top_container.appendChild(components_container);

        const components_label = document.createElement('p');
        components_label.classList.add('spell-option-stat-label');
        components_label.textContent = 'Components: ';
        components_container.appendChild(components_label);
        
        const components_text = document.createElement('p');
        if(this.spell_data.components.length > 0) {
            for(let i = 0; i < this.spell_data.components.length; i++) {
                components_text.textContent += this.spell_data.components[i];
                if(i < this.spell_data.components.length - 1) {
                    components_text.textContent += ", ";
                }
            }
        } else {
            components_text.textContent = "None";
        }
        components_container.appendChild(components_text);

        const school_container = document.createElement('div');
        school_container.classList.add('spell-option-stat-container');
        top_container.appendChild(school_container);

        const school_label = document.createElement('p');
        school_label.classList.add('spell-option-stat-label');
        school_label.textContent = "School: ";
        school_container.appendChild(school_label);

        const school_text = document.createElement('p');
        school_text.textContent = this.spell_data.school;
        school_container.appendChild(school_text);

        const duration_container = document.createElement('div');
        duration_container.classList.add('spell-option-stat-container');
        top_container.appendChild(duration_container);

        const duration_label = document.createElement('p');
        duration_label.classList.add('spell-option-stat-label');
        duration_label.textContent = "Duration: ";
        duration_container.appendChild(duration_label);

        const duration_num = document.createElement('p');
        duration_num.textContent = this.spell_data.duration;
        duration_container.appendChild(duration_num);
        
        if(this.spell_data.higher_level.length > 0) {
            const higher_level_container = document.createElement('div');
            this.main_div.appendChild(higher_level_container);

            const higher_level_top = document.createElement('div');
            higher_level_container.appendChild(higher_level_top);

            const higher_level_label = document.createElement('p');
            higher_level_label.classList.add('spell-option-stat-label');
            higher_level_label.textContent = "Higher Level: ";
            higher_level_top.appendChild(higher_level_label);

            const higher_level_bottom = document.createElement('div');
            higher_level_bottom.classList.add('spell-option-higher-level-text');
            higher_level_container.appendChild(higher_level_bottom);

            const higher_level_text = document.createElement('p');
            this.spell_data.higher_level.forEach((txt) => {
                higher_level_text.textContent += "-" + txt + "\n";
            });
            higher_level_bottom.appendChild(higher_level_text);
        }

        const description_container = document.createElement('div');
        description_container.classList.add('spell-option-description-container');
        this.main_div.appendChild(description_container);

        const description = document.createElement('p');
        description_container.appendChild(description);

        const descriptions = this.spell_data.desc;
        descriptions.forEach((d) => {
            description.textContent += " " + d;
        });
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }
}