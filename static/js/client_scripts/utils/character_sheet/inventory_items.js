import { items, items as ITEMS } from "../../../shared/inventory/items.js";
import { getClassSpells, getMaxSpellLevel, getSpellData } from "../../../shared/spell_data_filterer.js";
import { getClassData, getClassName } from "./mappers/class_mapper.js";
import { emitAndWait, emitSignal, getSocket } from "../socket_emitter.js";
import { weapons, weapons as WEAPONS } from "../../../shared/inventory/weapons.js";
import { getAllArmors } from "../../../shared/inventory/armor.js";
import { options as CLASS_LOADOUT_OPTIONS } from "../../../shared/inventory/class_loadout_options.js";
import { saveInventory } from "../../save_handler.js";
import { OTHER_ITEM_TYPES,  INVENTORY_ITEM_TYPES, ITEM_SOURCES, SPELL_BOOK_TYPES, ITEM_CLASSES} from "../../../shared/inventory/item_metadata.js";
import { SpellOption, SpellOptionOverlay } from "../spell_overlay_classes.js";
import { getMaxPreparedSpells, removeItem, setPreparedSpellCount } from "./character_data_handler.js";
import { mounts as MOUNTS } from "../../../shared/inventory/mounts.js";
import { bus, EVENTS, INITIAL_EVENTS } from "../event_bus.js";

let char_id = sessionStorage.getItem("charId");
let socket;

const inventory_container = document.querySelector('#inventory-tab-contents');


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
        return ITEMS[reference] || getAllArmors()[reference] || WEAPONS[reference] || MOUNTS[reference];
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

export function createItem({item_type, reference='', from='default', count=1, contents=[], linked_inventory=null, equipped=false} = {}) {
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
            item = new InventoryItem(reference, from, count, equipped);
            break;
        case INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM:
            item = new InventoryContainerItem(reference, from, count, contents);
            break;
        case INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM:
            item = new InventorySpellBook(from, count, contents, linked_inventory);
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
        this.items_inventory = new InventoryContainer("Inventory", ITEM_CLASSES.ITEM);
        this.weapons_inventory = new InventoryContainer("Weapons", ITEM_CLASSES.WEAPON);
        this.armor_inventory = new InventoryContainer("Armor", ITEM_CLASSES.ARMOR);
        this.mounts_inventory = new InventoryContainer("Mounts", ITEM_CLASSES.MOUNT);

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
            let equipped = item_data.equipped || false;

            let item = createItem({item_type: item_type, reference: reference, count: count, from: from, linked_inventory: this.weapons_inventory, equipped: equipped});
            this.addToWeapons(item);
        });

        this.character_inventory.armor.forEach((item_data) => {
            let reference = item_data.reference || item_data.options_ref;
            let count = item_data.count;
            let from = item_data.from;
            let item_type = item_data.item_type || item_data.type;
            let equipped = item_data.equipped || false;


            let item = createItem({item_type: item_type, reference: reference, count: count, from: from, linked_inventory: this.armor_inventory, equipped: equipped})
            this.addToArmors(item);
        });

        this.character_inventory.mount.forEach((item_data) => {
            let reference = item_data.reference || item_data.options_ref;
            let count = item_data.count;
            let from = item_data.from;
            let item_type = item_data.item_type || item_data.type;

            let item = createItem({item_type: item_type, reference: reference, count: count, from: from, linked_inventory: this.mounts_inventory})
            this.addToMounts(item);
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
        let mounts = this.mounts_inventory.getSaveData();
        return {inv: inv, weapon: weapons, armor: armor, mount: mounts};
    }

    getPreparedSpellCount() {
        let prepared_spell_count = 0;
        this.items_inventory.items.forEach((item) => {
            if(item.item_type === INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM) {
                const count = item.getPreparedSpellCount();
                prepared_spell_count += count;
            }

            if(item.item_type === INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM) {
                const count = item.getPreparedSpellCount();
                prepared_spell_count += count;
            }
        });

        return prepared_spell_count;
    }

    getPreparedSpellsFromBooks() {
        let spells = [];
        this.items_inventory.items.forEach((item) => {
            if(item.item_type === INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM) {
                const new_spells = item.getPreparedSpells();
                spells.push(...new_spells);
            }

            if(item.item_type === INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM) {
                const new_spells = item.getPreparedSpells();
                spells.push(...new_spells);
            }
        });

        let filtered_spells = [];
        spells.forEach((spell) => {
            if(!filtered_spells.includes(spell)) {
                filtered_spells.push(spell);
            }
        });

        return filtered_spells;
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
    constructor(inventory_title, inventory_item_class=ITEM_CLASSES.ITEM) {
        this.items = [];
        this.title = inventory_title;
        this.inventory_item_class = inventory_item_class


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
        this.add_button.addEventListener('click', () => {
            AddItemOverlay.create(this.inventory_item_class, this);
        });
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

                    i = new InventoryContainerItem(reference, from, count, inv);
                    this.addItem(i);
                    break;
                case INVENTORY_ITEM_TYPES.INVENTORY_ITEM: 
                    reference = item.reference;
                    from = item.from;
                    count = item.count;
                    const equipped = item.equipped || false;

                    i = new InventoryItem(reference, from, count, equipped);
                    this.addItem(i);
                    break;
                case INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM:
                    reference = "spell_book_item";
                    from = item.from;
                    count = item.count;
                    inv = item.spells;

                    i = new InventorySpellBook(from, count, inv);
                    this.addItem(i);
                    break;
                default:
                    break;
            }
        });

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
        this.main_div.classList.add('container-item-inventory-container-main');

        const body = document.createElement('div');
        body.classList.add('container-item-inventory');
        this.main_div.appendChild(body);

        const add_button_container = document.createElement('div');
        body.appendChild(add_button_container);

        const add_item_button = document.createElement('button');
        add_item_button.textContent = "+";
        add_item_button.addEventListener("click", () => {
            this.createAddItemOverlay();
        });
        add_button_container.appendChild(add_item_button);

        this.item_list = document.createElement('div');
        this.item_list.classList.add('inventory-item-list');
        body.appendChild(this.item_list);
    }

    createAddItemOverlay() {
        AddItemOverlay.create(this.inventory_item_class, this);
    }

    setVisible(visible) {
        if(visible) {
            this.main_div.classList.remove('hidden');
        } else {
            this.main_div.classList.add('hidden');
        }
    }

    setInventory(inventory) {
        this.inventory = inventory;
    }
}

class InventoryAddable {
    //makes things easily addable to an inventory
    constructor() {
        this.inventory = null;
        this.item_div = document.createElement('div');
        this.item_div.classList.add('inventory-addable-main');

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
    constructor(reference, from='default', count=1, equipped=false) {
        super()
        this.reference = reference;
        this.from = from;
        this.count = count;
        this.item_type = INVENTORY_ITEM_TYPES.INVENTORY_ITEM;
        this.equipped = equipped
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

        if(this.item_data.item_class === ITEM_CLASSES.ARMOR || 
            this.item_data.item_class === ITEM_CLASSES.WEAPON) {
                const equipped_container = document.createElement('div');
                this.item_div.appendChild(equipped_container);

                const equipped_label = document.createElement('p');
                equipped_label.textContent = "equipped: ";
                equipped_container.appendChild(equipped_label);
                
                this.equipped_checkbox = document.createElement('input');
                this.equipped_checkbox.type = "checkbox";
                if(this.equipped) {
                    this.equipped_checkbox.checked = true;
                }

                this.equipped_checkbox.addEventListener("input", async () => {
                    this.equipped = !this.equipped;
                    await saveInventory();
                });

                equipped_container.appendChild(this.equipped_checkbox);
            }



        this.remove_button = document.createElement('button');
        this.remove_button.classList.add('inventory-item-remove-button');
        this.remove_button.textContent = "X";
        this.remove_button.addEventListener('click', async() => {await this.removeAndSave()});
        this.item_div.appendChild(this.remove_button);


    }

    getItemDict() {
        //return data to be saved for the item
        return {reference: this.reference, from: this.from,
            count: this.count, item_type: this.item_type, equipped: this.equipped
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
        this.inventory_visible = false;


        this.buildItem();
        this.loadItems(this.inv);
    }

    buildItem() {
        const top_div = document.createElement('div');
        top_div.classList.add('inventory-addable-top');
        this.item_div.appendChild(top_div);

        const name_container = document.createElement('div');
        name_container.classList.add('inventory-container-item-name-div');
        top_div.appendChild(name_container);

        this.name_text = document.createElement('div');
        this.name_text.classList.add('inventory-containdr-item-name');
        this.name_text.textContent = ITEMS[this.reference].name;
        name_container.appendChild(this.name_text);

        const remove_button_container = document.createElement('div');
        top_div.appendChild(remove_button_container);

        const remove_button = document.createElement('button');
        remove_button.textContent = "X";
        remove_button.addEventListener('click', () => {
            this.removeAndSave();
        });
        remove_button_container.appendChild(remove_button);

        const arrow_container = document.createElement('div');
        arrow_container.classList.add('inventory-container-item-arrow-container');
        arrow_container.addEventListener("click", () => {
            this.toggleInventoryVisible();
        });
        this.item_div.appendChild(arrow_container);

        this.arrow_text = document.createElement('p');
        this.arrow_text.classList.add('inventory-container-item-arrow');
        this.arrow_text.textContent = "▼";
        arrow_container.appendChild(this.arrow_text);

        this.item_inventory = new ContainerItemInventory(ITEMS[this.reference].name);
        this.item_inventory.setVisible(false);
        this.item_inventory.addTo(this.item_div);

        
    }

    getPreparedSpells() {
        let spells = [];
        this.item_inventory.items.forEach((item) => {
            if(item.item_type === INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM ) {
                let books_spells = item.getPreparedSpells();
                spells.push(...books_spells);
            }

            if(item.item_type === INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM) {
                let book_spells = item.getPreparedSpells();
                spells.push(...book_spells);
            }
        });
        return spells;
    }

    getPreparedSpellCount() {
        let spell_count = 0;
        this.item_inventory.items.forEach((item) => {
            if(item.item_type === INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM) {
                const count = item.getPreparedSpells();
                spell_count += count;
            }

            if(item.item_type === INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM) {
                const count = item.getPreparedSpellCount();
                spell_count += count;
            }
        });
        return spell_count;
    }

    toggleInventoryVisible() {
        if(this.inventory_visible) {
            this.item_inventory.setVisible(false);
            this.arrow_text.textContent = "▼";
            this.inventory_visible = false;
        } else {
            this.item_inventory.setVisible(true);
            this.arrow_text.textContent = "▲";
            this.inventory_visible = true;
        }
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
        const update_spell_count_subscriptions = [EVENTS.SPELL_PREPARED, EVENTS.LEVEL_UPDATED, INITIAL_EVENTS.UPDATE_PREPARED_SPELL_COUNT];
        bus.subscribeToEvents(update_spell_count_subscriptions, () => {this.updateMaxSpellCount()});


        this.item_div.classList.add('inventory-spellbook-main');
        this.from = from;
        this.count = count;
        this.spells = [];
        this.spells_visible = false;
        this.item_type = INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM;

        this.buildItem();
        this.populateSpells(spells);
    }

    buildItem() {
        const top_div = document.createElement('div');
        top_div.classList.add('inventory-addable-top');
        this.item_div.appendChild(top_div);

        const title_div = document.createElement('div');
        top_div.appendChild(title_div);

        const remove_button_container = document.createElement('div');
        top_div.appendChild(remove_button_container);

        const remove_button = document.createElement('button');
        remove_button.textContent = "X";
        remove_button.addEventListener('click', () => {
            removeItem(this);
        });
        remove_button_container.appendChild(remove_button);

        const spell_count_div = document.createElement('div');
        top_div.appendChild(spell_count_div);

        const spell_count_label = document.createElement('p');
        spell_count_label.textContent = "Prepared: ";
        spell_count_div.appendChild(spell_count_label);

        this.spell_count_num = document.createElement('p');
        spell_count_div.appendChild(this.spell_count_num);

        this.title_text = document.createElement('div');
        this.title_text.classList.add('inventory-spellbook-title');
        this.title_text.textContent = "Spellbook";
        title_div.appendChild(this.title_text);

        let arrow_container = document.createElement('div');
        arrow_container.classList.add('spellbook-arrow-container');
        arrow_container.addEventListener("click", () => {
            this.toggleSpellsVisible();
        });
        this.item_div.appendChild(arrow_container);

        this.arrow_text = document.createElement("p");
        this.arrow_text.textContent = "▼";
        arrow_container.appendChild(this.arrow_text);

        this.hidable_container = document.createElement('div');
        this.hidable_container.classList.add('hidden');
        this.item_div.appendChild(this.hidable_container);

        let add_button_container = document.createElement('div');
        this.hidable_container.appendChild(add_button_container);

        let add_button = document.createElement('button');
        add_button.textContent = "+";
        add_button.addEventListener("click", () => {
            this.spell_option_overlay = SpellOptionOverlay.create((spell_name) => {this.addSpell(spell_name)});
        });
        add_button_container.appendChild(add_button);

        this.spell_array = document.createElement('div');
        this.spell_array.classList.add('spellbook-spell-array');
        this.hidable_container.appendChild(this.spell_array);
    }

    getPreparedSpellCount() {
        let count = 0;
        this.spells.forEach((spell) => {
            if(spell.item_type === SPELL_BOOK_TYPES.SPELL) {
                if(spell.prepared) {
                    count += 1;
                }
            }
        });

        return count;
    }

    getPreparedSpells() {
        let prepared_spells = [];
        this.spells.forEach((spell) => {
            if(spell.item_type === SPELL_BOOK_TYPES.SPELL) {
                if(spell.prepared) {
                    prepared_spells.push(getSpellData("Wizard", spell.spell_name));
                }
            }
        });

        return prepared_spells;
    }

    updateMaxSpellCount() {
        this.spell_count_num.textContent = InventoryManager.instance.getPreparedSpellCount() + "/" + getMaxPreparedSpells();
    }

    async addSpell(spell_name) {
        const new_spell = new BookSpell(this, spell_name);
        this.addSpellBookItem(new_spell);
        await saveInventory();
        SpellOptionOverlay.instance.removeOverlay();
    }

    toggleSpellsVisible() {
        if(this.spells_visible) {
            this.hidable_container.classList.add('hidden');
            this.arrow_text.textContent = "▼";
            this.spells_visible = false;
        } else {
            this.hidable_container.classList.remove('hidden');
            this.arrow_text.textContent = "▲";
            this.spells_visible = true;
        }
    }

    populateSpells(spells) {
        spells.forEach((spell) => {
            const spell_name = spell.spell_name || null;
            const prepared = spell.prepared || false;
            if(spell.item_type === SPELL_BOOK_TYPES.SPELL_OPTION) {
                const spell_option = new BookSpellOption(this);
                this.addSpellBookItem(spell_option);
            } else {
                const new_spell = new BookSpell(this, spell.spell_name, prepared);
                this.addSpellBookItem(new_spell);
            }
        });
        this.refreshSpellList();
    }

    setSize(spell_num) {
        for(let i = 0; i < spell_num; i++) {
            const spell_option = new BookSpellOption(this);
            this.addSpellBookItem(spell_option);
        }
        this.refreshSpellList();
    }

    refreshSpellList() {
        this.spell_array.textContent = '';
        this.spells.forEach((spell) => {
            spell.addTo(this.spell_array);
        });
    }



    addSpellBookItem(spellbook_item) {
        this.spells.push(spellbook_item);
        this.refreshSpellList();
    }


    removeSpellBookItem(spellbook_item) {
        const index = this.spells.indexOf(spellbook_item);

        if(index !== -1) {
            this.spells.splice(index, 1);
            this.refreshSpellList();

        }
    }


    getItemDict() {
        //return data to be saved for the spell book
        let spell_data_list = [];
        this.spells.forEach((item) => {
            let dict = item.getSpellDict();
            spell_data_list.push(dict);
        });

        return {item_type: INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM,
            from: this.from, count: this.count, spells: spell_data_list
        };
    }

    

    async removeSpellAndSave(spellbook_item) {
        this.removeSpellBookItem(spellbook_item);
        await saveInventory();
        this.refreshSpellList();
    }
}

class SpellBookAddable {
    //make it easy to add something to a spell book inventory
    constructor(spell_book) {
        this.spell_book = spell_book;
        this.main_div = document.createElement('div');
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }

    removeAndSave() {
        this.main_div.remove();
        this.spell_book?.removeSpellAndSave(this);
    }
}

export class BookSpell extends SpellBookAddable {
    //spell in a spell book
    constructor(spell_book, spell_name, prepared) {
        super(spell_book);

        const disable_checkboxes_subscriptions = [EVENTS.MAX_PREPARED_SPELLS_HIT];
        bus.subscribeToEvents(disable_checkboxes_subscriptions, () => {this.disableCheckboxes()});

        const enable_checkboxes_subscriptions = [EVENTS.ENABLE_PREPARED_SPELL_CHECKBOXES];
        bus.subscribeToEvents(enable_checkboxes_subscriptions, () => {this.enableCheckboxes()});

        const initial_disable_subscirptions = [INITIAL_EVENTS.DISABLE_PREPARED_SPELL_CHECKBOXES];
        bus.subscribeToEvents(initial_disable_subscirptions, () => {this.initialDisableCheckboxes()});

        this.item_type = SPELL_BOOK_TYPES.SPELL;
        this.spell_name = spell_name;
        this.prepared = prepared;
        this.buildItem();
    }

    buildItem() {
        this.spell_name_text = document.createElement('p');
        this.spell_name_text.classList.add('spell-name-text');
        this.spell_name_text.textContent = this.spell_name;
        this.main_div.appendChild(this.spell_name_text);

        this.prepare_checkbox = document.createElement('input');
        this.prepare_checkbox.type = 'checkbox';
        this.prepare_checkbox.addEventListener('change', () => {this.togglePrepared()});
        if(this.prepared) {
            this.prepare_checkbox.checked = true;
        }
        this.main_div.appendChild(this.prepare_checkbox);
    }

    disableCheckboxes() {
        if(!this.prepared) {
            this.prepare_checkbox.disabled = true;
        }
    }

    enableCheckboxes() {
        this.prepare_checkbox.disabled = false;
    }

    initialDisableCheckboxes() {
        if(InventoryManager.instance.getPreparedSpellCount() >= getMaxPreparedSpells()) {
            this.disableCheckboxes();
        }
    }

    async togglePrepared() {
        this.prepared = !this.prepared;

        if(InventoryManager.instance.getPreparedSpellCount() >= getMaxPreparedSpells()) {
            bus.publish(EVENTS.MAX_PREPARED_SPELLS_HIT);
        } else {
            bus.publish(EVENTS.ENABLE_PREPARED_SPELL_CHECKBOXES);
        }
        await saveInventory();
        bus.publish(EVENTS.SPELL_PREPARED);

    }

    getSpellDict() {
        return {item_type: this.item_type, spell_name: this.spell_name,
            prepared: this.prepared
        };
    }
}

export class BookSpellOption extends SpellBookAddable {
    //Spell Option Button in a spell book
    constructor(spell_book) {
        super(spell_book);
        this.item_type = SPELL_BOOK_TYPES.SPELL_OPTION;
        this.buildItem();
    }

    buildItem() {
        this.option_button = document.createElement('button');
        this.option_button.textContent = "Select";
        this.option_button.classList.add('spell-option-button');
        this.option_button.addEventListener("click", () => {
            this.spell_option_overlay = SpellOptionOverlay.create((spell_name) => {this.selectSpell(spell_name)});
        });
        this.main_div.appendChild(this.option_button);
    }

    selectSpell(spell_name) {
        const new_spell = new BookSpell(this.spell_book, spell_name);
        this.spell_book.addSpellBookItem(new_spell);
        this.spell_option_overlay.removeOverlay();
        this.removeAndSave();
    }

    getSpellDict() {
        return {item_type: this.item_type};
    }
}

class AddItemOverlay {
    static instance = null;
    constructor(item_class, inventory) {
        this.item_class = item_class;
        this.linked_inventory = inventory;

        this.buildOverlay();
        this.render();
    }

    static create(item_class, inventory) {
        AddItemOverlay.instance = new AddItemOverlay(item_class, inventory);
    }
    
    remove() {
        this.main_div.remove();
        AddItemOverlay.instance = null;
    }

    buildOverlay() {
        this.main_div = document.createElement('div');
        this.main_div.classList.add('add-item-overlay', 'fullscreen-overlay', 'overlay-index-4');

        this.close_overlay_container = document.createElement('div');
        this.main_div.appendChild(this.close_overlay_container);

        this.close_button = document.createElement('button');
        this.close_button.textContent = "X";
        this.close_button.addEventListener('click', () => {
            this.remove();
        }); 
        this.close_overlay_container.appendChild(this.close_button);

        this.option_list = document.createElement('div');
        this.option_list.classList.add('add-item-overlay-list');
        this.main_div.appendChild(this.option_list);

        let item_options = null;
        switch(this.item_class) {
            case ITEM_CLASSES.ITEM:
                item_options = ITEMS;
                break;
            case ITEM_CLASSES.WEAPON:
                item_options = WEAPONS;
                break;
            case ITEM_CLASSES.ARMOR:
                item_options = getAllArmors();
                break;
            case ITEM_CLASSES.MOUNT:
                item_options = MOUNTS;
                break;
        }
        for (const [key, item] of Object.entries(item_options)) {
            const item_option = new AddItemOption(item, this.linked_inventory, this.item_class);
            item_option.addTo(this.option_list);
        }
    }

    render() {
        document.body.appendChild(this.main_div);
    }
}

class AddItemOption {
    constructor(item_data, inventory, item_class) {
        this.item_data = item_data;
        this.inventory = inventory;
        console.log(this.item_data);
        
        this.build(item_class);
    }

    build(item_class) {
        this.main_div = document.createElement('div');
        this.main_div.classList.add('add-item-option-main');
        this.main_div.addEventListener('click', () => {
            this.selectItem();
        });

        const name_container = document.createElement('div');
        name_container.classList.add('add-item-option-name-container');
        this.main_div.appendChild(name_container);
        
        const name_text = document.createElement('h3');
        name_text.textContent = this.item_data.name;
        name_container.appendChild(name_text);

        switch(item_class) {
            case ITEM_CLASSES.ITEM:
                this.buildItem();
                break;
            case ITEM_CLASSES.WEAPON:
                this.buildWeapon();
                break;
            case ITEM_CLASSES.ARMOR:
                this.buildArmor();
                break;
            case ITEM_CLASSES.MOUNT:
                this.buildMount();
                break;
        }
    }

    async selectItem() {
        const item_inv = this.item_data.contents || this.item_data.inv || this.item_data.spells || undefined;
        const item_type = getItemType(this.item_data);
        let item = createItem({item_type: item_type, reference: this.item_data.index, 
            from: ITEM_SOURCES.DEFAULT, count: 1, contents: item_inv, linked_inventory: this.inventory
        });
        
        this.inventory.addItem(item);
        await saveInventory();
        AddItemOverlay.instance.remove();
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }
    buildItem() {

    }
    
    buildWeapon() {

    }

    buildArmor() {
        const stat_container = document.createElement('div');
        stat_container.classList.add('add-item-option-stat-container');
        this.main_div.appendChild(stat_container);

        const armor_class_container = document.createElement('div');
        stat_container.appendChild(armor_class_container);

        const armor_class_label = document.createElement('p');
        armor_class_label.textContent = "AC Mod: ";
        armor_class_container.appendChild(armor_class_label);

        const armor_class_num = document.createElement('p');
        armor_class_num.textContent = this.item_data.ac_mod;
        armor_class_container.appendChild(armor_class_num);

        const strength_container = document.createElement('div');
        stat_container.appendChild(strength_container);

        const strength_label = document.createElement('p');
        strength_label.textContent = "Strength: ";
        strength_container.appendChild(strength_label);

        const strength_num = document.createElement('p');
        strength_num.textContent = this.item_data.strength;
        strength_container.appendChild(strength_num);

        const weight_container = document.createElement('div');
        stat_container.appendChild(weight_container);

        const weight_label = document.createElement('p');
        weight_label.textContent = "Weight: ";
        weight_container.appendChild(weight_label);

        const weight_num = document.createElement('p');
        weight_num.textContent = this.item_data.weight;
        weight_container.appendChild(weight_num);

        const cost_container = document.createElement('div');
        stat_container.appendChild(cost_container);

        const cost_label = document.createElement('p');
        cost_label.textContent = "Cost: ";
        cost_container.appendChild(cost_label);

        const cost_num = document.createElement('p');
        const cost_dict = this.item_data.cost;
        cost_num.textContent = cost_dict.amount + cost_dict.unit;
        cost_container.appendChild(cost_num);

        if(this.item_data.stealth_disadvantage) {
            const disadvantage_container = document.createElement('div');
            disadvantage_container.classList.add('add-armor-option-disadvantage-container')
            this.main_div.appendChild(disadvantage_container);

            const disadvantage_text = document.createElement('p');
            disadvantage_text.textContent = "Stealth Disadvantage";

            disadvantage_container.appendChild(disadvantage_text);
        }
        

        const stat_labels = [armor_class_label, strength_label, weight_label,
            cost_label
        ];
        stat_labels.forEach((label) => {
            label.classList.add('add-item-option-stat-label');
        });
    }

    buildMount() {
        const description_container = document.createElement('div');
        this.main_div.appendChild(description_container);

        const description = document.createElement('p');
        this.item_data.desc.forEach((d) => {
            description.textContent += " " + d;
        });
        description_container.appendChild(description);

        const stat_container = document.createElement('div');
        stat_container.classList.add('add-item-option-stat-container');
        this.main_div.appendChild(stat_container);

        if(this.item_data.capacity !== undefined) {
            const capacity_container = document.createElement('div');
            stat_container.appendChild(capacity_container);

            const capacity_label = document.createElement('p');
            capacity_label.classList.add('add-item-option-stat-label');
            capacity_label.textContent = "Capacity: ";
            capacity_container.appendChild(capacity_label)

            const capacity_number = document.createElement('p');
            capacity_number.textContent = this.item_data.capacity;
            capacity_container.appendChild(capacity_number);
        }

        const cost_container = document.createElement('div');
        stat_container.appendChild(cost_container);

        const cost_label = document.createElement('p');
        cost_label.classList.add('add-item-option-stat-label');
        cost_label.textContent = "Cost: ";
        cost_container.appendChild(cost_label);

        const cost_num = document.createElement('p');
        cost_num.textContent = this.item_data.cost.quantity + " " + this.item_data.cost.unit;
        cost_container.appendChild(cost_num);

        const speed_container = document.createElement('div');
        stat_container.appendChild(speed_container);

        const speed_label = document.createElement('p');
        speed_label.classList.add('add-item-option-stat-label')
        speed_label.textContent = "Speed: ";
        speed_container.appendChild(speed_label);

        const speed_num = document.createElement('p');    
        speed_num.textContent = this.item_data.speed.quantity + " " + this.item_data.speed.unit;
        speed_container.appendChild(speed_num);
    }
    
}