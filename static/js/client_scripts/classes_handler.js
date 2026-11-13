import { ClassTab } from "./class_tab.js";

export class ClassesHandler {
    constructor() {
        this.character_classes = {};        
    }

    addClass(class_id, class_object) {
        this.character_classes[class_id] = class_object;
    }

    removeClass(class_id) {
        delete this.character_classes[class_id];
    }

    getSaveData() {
        let save_dict = {};
        Object.entries(this.character_classes).forEach(([class_id, class_object]) => {
            save_dict[class_id] = class_object.getSaveData();
        });

        return save_dict;
    }

    getClassIDs() {
        return Object.keys(this.character_classes);
    }

    createClassTab() {
        const new_tab = new ClassTab();
        const class_id = new_tab.getClassPage().getClassID();
        if(class_id in this.character_classes) {
            console.warn(class_id + " already exists in class handler. Returning null.");
            class_id = null;
            return null;
        }
        this.addClass(new_tab.getClassPage());
        return new_tab;
    }
}