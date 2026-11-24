import { CloseableOverlay } from "./closable_overlay.js";

export class OptionSelect {
    //option_array is [{id: "id", value: "value"}]
    //usage:
    //option_array = option_id_array.map((option_id) => ({id: option_id, value: OPTION_NAMES[option_id]}));
    constructor(option_array, callback, default_text="Select") {
        this.option_array = option_array;
        this.buildDropdown();
        this.options_visible = false;
        this.callback = callback;

        this.setLabelText(default_text);
    }

    setOptions(options) {
        this.option_array = options;
    }

    addTo(parent_element) {
        parent_element.appendChild(this.main_div);
    }

    buildDropdown() {
        this.main_div = document.createElement('div');

        const label_container = document.createElement('div');
        this.main_div.appendChild(label_container);

        this.option_label = document.createElement('p');

        this.option_label.addEventListener("click", () => {this.onClick()})
        label_container.appendChild(this.option_label);        
    }

    setLabelText(text) {
        this.option_label.textContent = text;
    }

    optionSelected(selected_option) {
        this.selected_option = selected_option;
        this.setLabelText(selected_option.getOptionValue());
        this.option_overlay.closeOverlay();
        this.callback(selected_option);
    }

    onClick() {
        if(!this.options_visible) {
            this.createOptionContainer();
        }
        this.options_visible = !this.options_visible;
    }

    createOptionContainer() {
        this.option_overlay = new CloseableOverlay(() => {
            this.option_overlay = null;
            this.options_visible = false;
        });

        let overlay_body = this.option_overlay.getBody();

        let i = 0;
        this.option_array.forEach((option) => {
            let o = new Option(option, overlay_body, (selected_option) => {this.optionSelected(selected_option)}, i);
            i++;
        });
    }
}

class Option {
    constructor(option, parent_element, run_when_selected, option_index) {
        this.option_id = option["id"];
        this.option_value = option["value"];
        this.option_index = option_index;
        this.parent_element = parent_element;
        this.runWhenSelected = run_when_selected;
        this.buildOption();
    }

    buildOption() {
        this.option_div = document.createElement('div');
        this.option_div.addEventListener("click", () => {
            this.runWhenSelected(this);
        });
        this.parent_element.appendChild(this.option_div);

        const option_text = document.createElement('p');
        option_text.textContent = this.option_value;
        this.option_div.appendChild(option_text);
    }

    getOptionValue() {
        return this.option_value;
    }

    getOptionID() {
        return this.option_id;
    }

    getOptionIndex() {
        return this.option_index;
    }
}