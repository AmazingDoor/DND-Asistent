import { items as ITEMS } from "../../../shared/inventory/items.js";

export class InventoryContainer {
    constructor(inventory_title) {
        this.items = [];

        this.main_div = document.createElement('div');
        this.main_div.classList.add('inventory-container-main');

        this.inventory_title = document.createElement('h3');
        this.inventory_title.classList.add('inventory-title');
        this.inventory_title.textContent = inventory_title;
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

    refresh() {
        this.item_list.textContent = '';
        this.items.forEach((item) => {
            item.addTo(this.item_list);
        });
    }

    addItem(inventory_item) {
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

class InventoryAddable {
    constructor(inventory) {
        this.inventory = inventory;
        this.item_div = document.createElement('div');

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
    constructor(inventory, reference, from='deafult', count=1) {
        super(inventory)
        this.reference = reference;
        this.from = from;
        this.count = count;

        this.name_text = document.createElement('p');
        this.name_text.classList.add('inventory-item-name');
        this.name_text.textContent = ITEMS[this.reference].name;
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
            count: this.count
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
    constructor() {
        super()
    }

    getItemDict() {

    }
}

export class InventorySpellBook extends InventoryAddable {
    constructor() {
        super()
    }

    getItemDict() {

    }
}