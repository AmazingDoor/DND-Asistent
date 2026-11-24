import { PROFICIENCIES } from "../shared/class_proficiencies.js";
import { CLASSES, SKILLS } from "../shared/data_enums.js";
import { ClassTab } from "./class_tab.js";
import { saveClassData } from "./save_handler.js";
import { emitSignal, getSocket } from "./utils/socket_emitter.js";

export class ClassesHandler {
    constructor(socket) {
        this.socket = socket;
        this.character_classes = [];
        document.getElementById('add-class-button').addEventListener('click', () => {this.addClassPressed()});        
    }

    addClassPressed() {
        let option_available = false;
        this.character_classes.forEach((tab) => {
            const class_id = tab.getClassPage().getClassID();
            if(class_id == CLASSES.OPTION) {
                option_available = true;
            }
        });

        if(!option_available) {
            this.createClassTab();
        }
    }

    addClass(class_tab) {
        this.character_classes.push(class_tab);
    }

    removeClass(class_tab) {
        this.character_classes.filter(o => o != class_tab);
    }

    async loadSaveData() {
        emitSignal('require_class_data', {char_id: char_id});
        return new Promise((resolve) => {
            getSocket().once('sent_class_data', save_data => {
                save_data.forEach((class_data) => {
                    const new_class_tab = this.createClassTab();
                    const new_class_page = new_class_tab.getClassPage();
                    new_class_page.loadSaveData(class_data);
                });

                if(this.character_classes.length > 0) {
                    this.character_classes[0].setActive();
                }
                resolve(save_data);
            });
        });
    }

    async saveClasses() {
        this.getFilteredSkills();
        await saveClassData(this.getSaveData());
    }

    getSaveData() {
        let save_dict = {classes: []};
        this.character_classes.forEach((class_tab) => {
            const save_data = class_tab.getClassPage().getSaveData();
            save_dict.classes.push(save_data);
        });

        return save_dict;
    }

    getClassIDs() {
        return Object.keys(this.character_classes);
    }

    createClassTab() {
        const new_tab = new ClassTab(this);
        this.addClass(new_tab);
        new_tab.setActive();
        return new_tab;
    }

    getFilteredSkills() {
        let all_skills = [];
        this.character_classes.forEach((class_tab) => {
            const class_page = class_tab.getClassPage();
            all_skills.push(...class_page.chosen_skills);
            all_skills.push(...class_page.default_skills);
        });

        const unique = [...new Set(all_skills)].filter((skill) => skill != SKILLS.OPTION);
        return unique;
    }

    getCharacterLevel() {
        let level = 0;
        this.character_classes.forEach((class_tab) => {
            const class_page = class_tab.getClassPage();
            level += class_page.class_level;
        });

        return level;
    }

    getSavingThrows() {
        this.character_classes.forEach((class_tab) => {
            const class_page = class_tab.getClassPage();
            if(class_page.main_page) {
                const class_data = PROFICIENCIES[class_page.getClassID()];
                return class_data.saving_throws;
            }
        });
        return [];
    }

    isInRange(num, min, max) {
        if(num >= min && num <= max) {
            return true;
        }
    }
    
    getProficiencyBonus() {
        const character_level = this.getCharacterLevel();
        if (this.isInRange(character_level, 1, 4)) {
            return 2;
        } else if (this.isInRange(character_level, 5, 8)) {
            return 3;
        } else if (this.isInRange(character_level, 9, 12)) {
            return 4;
        } else if (this.isInRange(character_level, 13, 16)) {
            return 5;
        } else if (this.isInRange(character_level, 17, 20)) {
            return 6;
        } else {return 0;}
    }
}