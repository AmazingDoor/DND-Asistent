import { CLASS_NAMES, CLASSES } from "../shared/data_enums.js";
import { ClassPage } from "./class_page.js";

export class ClassTab {
    constructor() {
        this.class_page_container = document.querySelector("#class-pages");
        this.build();
        this.createClassPage();
    }

    build() {
        this.main_div = document.createElement('div');

        this.class_name = document.createElement('p');
        this.class_name.textContent = CLASS_NAMES[CLASSES.OPTION];
        this.main_div.appendChild(this.class_name);
    }

    createClassPage() {
        document.querySelector("#selected-class-tab-bar").appendChild(this.main_div);
        this.class_page = new ClassPage((name) => {this.setTabName(name);});
    }

    getClassPage() {
        return this.class_page;
    }

    setTabName(name) {
        this.class_name.textContent = name;
    }
}