import { ABILITIES } from "../shared/data_enums.js";
import { saveAbilities as sendSaveAbilities } from "./save_handler.js";
import { emitSignal } from "./utils/socket_emitter.js";

export class AbilityHandler {
    constructor(socket, classes_handler) {
        this.socket = socket;
        this.classes_handler = classes_handler;

        this.str = 0;
        this.dex = 0;
        this.con = 0;
        this.int = 0;
        this.wis = 0;
        this.cha = 0;

        this.str_input = document.querySelector("#strength-input");
        this.dex_input = document.querySelector("#dexterity-input");
        this.con_input = document.querySelector("#constitution-input");
        this.int_input = document.querySelector("#intelligence-input");
        this.wis_input = document.querySelector("#wisdom-input");
        this.cha_input = document.querySelector("#charisma-input");
        this.addInputEventListeners();
        this.setModifiers();
    }

    addInputEventListeners() {
        this.str_input.addEventListener("change", () => {this.strChanged();});
        this.dex_input.addEventListener("change", () => {this.dexChanged();});
        this.con_input.addEventListener("change", () => {this.conChanged();});
        this.int_input.addEventListener("change", () => {this.intChanged();});
        this.wis_input.addEventListener("change", () => {this.wisChanged();});
        this.cha_input.addEventListener("change", () => {this.chaChanged();});
    }

    async strChanged() {
        this.str = parseInt(this.str_input.value);
        this.setStrMod();
        await this.saveAbilities();
    }

    async dexChanged() {
        this.dex = parseInt(this.dex_input.value);
        this.setDexMod();
        await this.saveAbilities();
    }

    async conChanged() {
        this.con = parseInt(this.con_input.value);
        this.setConMod();
        await this.saveAbilities();
    }

    async intChanged() {
        this.int = parseInt(this.int_input.value);
        this.setIntMod();
        await this.saveAbilities();
    }

    async wisChanged() {
        this.wis = parseInt(this.wis_input.value);
        this.setWisMod();
        await this.saveAbilities();
    }

    async chaChanged() {
        this.cha = parseInt(this.cha_input.value);
        this.setChaMod();
        await this.saveAbilities();
    }

    setModifiers() {
        this.setStrMod();
        this.setDexMod();
        this.setConMod();
        this.setIntMod();
        this.setWisMod();
        this.setChaMod();
    }

    setStrMod() {
        document.querySelector('#strength-mod').textContent = this.getSignedModifier(this.str);
    }

    setDexMod() {
        document.querySelector('#dexterity-mod').textContent = this.getSignedModifier(this.dex);
    }

    setConMod() {
        document.querySelector('#constitution-mod').textContent = this.getSignedModifier(this.con);
    }

    setIntMod() {
        document.querySelector('#intelligence-mod').textContent = this.getSignedModifier(this.int);
    }

    setWisMod() {
        document.querySelector('#wisdom-mod').textContent = this.getSignedModifier(this.wis);
    }

    setChaMod() {
        document.querySelector('#charisma-mod').textContent = this.getSignedModifier(this.cha);
    }

    calculateModifier(value) {
        const new_num = Math.floor((parseInt(value) - 10) / 2);
        return new_num;
    }

    getSignedModifier(value) {
        let num = this.calculateModifier(value);
        if(num > 0) {
            num = "(+" + num + ")";
        } else {
            num = "(" + num + ")";
        }

        return num;
    }

    getCharacterAbilities() {
        return {str: this.str, dex: this.dex, con: this.con,
            int: this.int, wis: this.wis, cha: this.cha
        };
    }

    getCharacterAbilityModifiers() {
        const prof_bonus = this.classes_handler.getProficiencyBonus();

        let all_abilities = [];

        let race_str_mod = 0;
        let race_dex_mod = 0;
        let race_con_mod = 0;
        let race_int_mod = 0;
        let race_wis_mod = 0;
        let race_cha_mod = 0;

        let str_bonus = 0;
        let dex_bonus = 0;
        let con_bonus = 0;
        let int_bonus = 0;
        let wis_bonus = 0;
        let cha_bonus = 0;

        for(const ability in all_abilities) {
            switch(ability.toString()) {
                case ABILITIES.STR:
                    race_str_mod = all_abilities[ability];
                    break;
                case ABILITIES.DEX:
                    race_dex_mod = all_abilities[ability];
                    break;
                case ABILITIES.CON:
                    race_con_mod = all_abilities[ability];
                    break;
                case ABILITIES.INT:
                    race_int_mod = all_abilities[ability];
                    break;
                case ABILITIES.WIS:
                    race_WIS_mod = all_abilities[ability];
                    break;
                case ABILITIES.CHA:
                    race_cha_mod = all_abilities[ability];
                    break;
            }
        }

        const saving_throws = this.classes_handler.getSavingThrows();
        saving_throws.forEach((saving_throw) => {
            switch (saving_throw) {
                case ABILITIES.STR:
                    str_bonus = prof_bonus;
                    break;
                case ABILITIES.DEX:
                    dex_bonus = prof_bonus;
                    break;
                case ABILITIES.CON:
                    con_bonus = prof_bonus;
                    break;
                case ABILITIES.INT:
                    int_bonus = prof_bonus;
                    break;
                case ABILITIES.WIS:
                    wis_bonus = prof_bonus;
                    break;
                case ABILITIES.CHA:
                    cha_bonus = prof_bonus;
            }
        });

        const finalCalculations = [
        this.calculateModifier(parseInt(this.str) + parseInt(race_str_mod)),
        this.calculateModifier(parseInt(this.dex) + parseInt(race_dex_mod)),
        this.calculateModifier(parseInt(this.con) + parseInt(race_con_mod)),
        this.calculateModifier(parseInt(this.int) + parseInt(race_int_mod)),
        this.calculateModifier(parseInt(this.wis) + parseInt(race_wis_mod)),
        this.calculateModifier(parseInt(this.cha) + parseInt(race_cha_mod))];

        const finalCalculationDict = {
            str: finalCalculations[0],
            dex: finalCalculations[1],
            con: finalCalculations[2],
            int: finalCalculations[3],
            wis: finalCalculations[4],
            cha: finalCalculations[5]
        };

        console.log(finalCalculationDict);
    }

    async saveAbilities() {
        await sendSaveAbilities(this.getSaveData());
    }

    getSaveData() {
        const dict = {str: this.str, dex: this.dex, con: this.con, 
            int: this.int, wis: this.wis, cha: this.cha
        }

        return dict;
    }

    loadSaveData() {
        emitSignal('require_character_abilities', {char_id: char_id});
        return new Promise(resolve => {
            this.socket.once('sent_character_abilities', save_data => {
                console.log(save_data);
                this.str = save_data.str;
                this.dex = save_data.dex;
                this.con = save_data.con;
                this.int = save_data.int;
                this.wis = save_data.wis;
                this.cha = save_data.cha;

                this.str_input.value = this.str;
                this.dex_input.value = this.dex;
                this.con_input.value = this.con;
                this.int_input.value = this.int;
                this.wis_input.value = this.wis;
                this.cha_input.value = this.cha;
                this.setModifiers();
            
                resolve(save_data);
            });
        });

        this.str = save_data.str;
        this.dex = save_data.dex;
        this.con = save_data.con;
        this.int = save_data.int;
        this.wis = save_data.wis;
        this.cha = save_data.cha;
    }
}