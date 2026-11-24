import { CLASS_NAMES, CLASSES } from "../shared/data_enums.js";
import { ClassPage } from "./class_page.js";
import { bus, EVENTS } from "./utils/event_bus.js";

export class ClassTab {
    constructor(classes_handler) {
        this.class_page_container = document.querySelector("#class-pages");
        this.classes_handler = classes_handler;
        this.build();
        this.createClassPage();
        const update_selected_subscriptions = [EVENTS.CLASS_TAB_CHANGED];
        bus.subscribeToEvents(update_selected_subscriptions, (active_tab) => {this.onSetActive(active_tab);});
        
        this.main_div.addEventListener('click', () => {this.setActive()});
    }

    build() {
        this.main_div = document.createElement('div');
        this.main_div.classList.add('tab');

        this.class_name = document.createElement('p');
        this.class_name.textContent = CLASS_NAMES[CLASSES.OPTION];
        this.main_div.appendChild(this.class_name);
    }

    setActive() {
        bus.publish(EVENTS.CLASS_TAB_CHANGED, this);
    }

    onSetActive(active_tab) {
        if(this == active_tab) {
            this.main_div.classList.add('selected');
            this.class_page.setPageVisible(true);
        } else {
            this.main_div.classList.remove('selected');
            this.class_page.setPageVisible(false);
        }
    }

    createClassPage() {
        document.querySelector("#selected-class-tab-bar").appendChild(this.main_div);
        this.class_page = new ClassPage(this.classes_handler, (name) => {this.setTabName(name);});
    }

    getClassPage() {
        return this.class_page;
    }

    setTabName(name) {
        this.class_name.textContent = name;
    }
}