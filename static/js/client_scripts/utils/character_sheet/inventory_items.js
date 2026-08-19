import { items as ITEMS } from "../../../shared/inventory/items.js";
import { getClassSpells } from "../../../shared/spell_data_filterer.js";
import { getClassData, getClassName } from "./mappers/class_mapper.js";
import { emitAndWait, emitSignal, getSocket } from "../socket_emitter.js";
import { weapons as WEAPONS } from "../../../shared/inventory/weapons.js";
import { getAllArmors } from "../../../shared/inventory/armor.js";


let char_id = sessionStorage.getItem("charId");
let socket;

const inventory_container = document.querySelector('.inventory-container');


const ARMORS = getAllArmors();

export function initializeInventoryClasses() {
    socket = getSocket();
}

function getKey(d, d2) {
    for (let key in d) {
        if (d[key] === d2) {
            return key;
        }
    }
}

function getItemData(reference) {
    return ITEMS[reference] || getAllArmors()[reference] || WEAPONS[reference];
}

export function createItem(item_type, reference='', from='default', count=1, contents=[]) {
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
    }
    return item;
}

export class InventoryManager {
    constructor(inventory) {
        this.character_inventory = inventory;
        this.items_inventory = new InventoryContainer("Inventory");
        this.weapons_inventory = new InventoryContainer("Weapons");
        this.armor_inventory = new InventoryContainer("Armor");
        this.mounts_inventory = new InventoryContainer("Mounts");

        this.items_inventory.addTo(inventory_container);

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
        this.character_inventory.inv.forEach((item_data) => {
            let reference = item_data.reference;
            let count = item_data.count;
            let from = item_data.from;
            let item_type = item_data.item_type || item_data.type;
            let contents = item_data.spells || item_data.inv || null;

            let item = createItem(item_type, reference=reference, from=from, count=count, contents=contents);
            this.addToItems(item);
        });
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
        let inv = this.items_inventory.getSaveData();
        let weapons = this.weapons_inventory.getSaveData();
        let armor = this.armor_inventory.getSaveData();
        let mounts = this.armor_inventory.getSaveData();
        return {inv: inv, weapon: weapons, armor: armor, mount: mounts};
    }

    setDefaultClassData() {
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
            let item_type = INVENTORY_ITEM_TYPES.INVENTORY_ITEM;
            if(item_data.contents.length > 0) {
                item_type = INVENTORY_ITEM_TYPES.INVENTORY_CONTAINER_ITEM;
            }

            
            let i = createItem(item_type, reference, from, count, contents);
            this.addToItems(i);
        });

    }
}



export class InventoryContainer {
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
            this.items.forEach((item) => {
                if(item.from == item_source) {
                    this.removeItem(item);
                }
            });
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

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }

    getSaveData() {
        let item_array = [];
        this.items.forEach((item) => {
            item_array.push(item.getItemDict());
        });
        return item_array;
    }
}

class ContainerItemInventory extends InventoryContainer {
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

    remove() {
        this.item_div.remove();
        this.inventory?.removeItem(this);
    }


}

export class InventoryItem extends InventoryAddable {
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
        this.item_div.appendChild(this.count_input);

        this.remove_button = document.createElement('button');
        this.remove_button.classList.add('inventory-item-remove-button');
        this.remove_button.textContent = "X";
        this.remove_button.addEventListener('click', () => {this.remove()});
        this.item_div.appendChild(this.remove_button);
    }

    getItemDict() {
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
        this.item_inventory.loadItems(data);
    }

    addItem(item) {
        this.item_inventory.addItem(item);
    }

    getItemDict() {
        let inv = this.item_inventory.getSaveData();
        return {reference: this.reference, from: this.from,
            count: this.count, item_type: this.item_type,
            inv: inv
        };
    }
}

export class InventorySpellBook extends InventoryAddable {
    constructor(from=ITEM_SOURCES.DEFAULT, count=1, spells=[]) {
        super()
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
        title_div.appendChild(title_text);

        this.spell_array = document.createElement('div');
        this.spell_array.classList.add('spellbook-spell-array');
        this.item_div.appendChild(spell_array);
    }

    refreshSpellList() {
        this.spell_array.textContent = '';
        this.spells.forEach((spell) => {
            let s = new BookSpell(spell);
            s.addTo(this.spell_array);
        });
    }

    addSpell(spell_data) {
        this.spells.push(spell_data);
        this.refreshSpellList();
    }


    getItemDict() {
        return {item_type: INVENTORY_ITEM_TYPES.SPELL_BOOK_ITEM,
            from: this.from, count: this.count, spells: this.spells
        };
    }
}

class SpellBookAddable {
    constructor() {
        this.main_div = document.createElement('div');
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }
}

export class BookSpell extends SpellBookAddable {
    constructor(spell_reference) {
        this.spell_reference = spell_reference;
    }

    buildItem() {
        this.spell_name_text = document.createElement('p');
        this.spell_name_text.classList('spell-name-text');
        this.spell_name_text.textContent = getClassSpells(getClassName())[this.spell_reference];
    }
}

const INVENTORY_ITEM_TYPES = {
    INVENTORY_ITEM: "inventory_item",
    INVENTORY_CONTAINER_ITEM: "inventory_container_item",
    SPELL_BOOK_ITEM: "spell_book_item"

};

export const ITEM_SOURCES = {
    CLASS: "class",
    RACE: "race",
    BACKGROUND: "background",
    DEFAULT: "default"
};