import { ABILITIES } from "../shared/data_enums.js";
import { saveAbilities as sendSaveAbilities } from "./save_handler.js";
import { bus, EVENTS } from "./utils/event_bus.js";
import { emitSignal } from "./utils/socket_emitter.js";

export class AbilityHandler {
    constructor(socket, classes_handler, race_handler) {
        this.socket = socket;
        this.classes_handler = classes_handler;
        this.race_handler = race_handler;

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
        bus.publish(EVENTS.ABILITY_CHANGED);
    }

    async dexChanged() {
        this.dex = parseInt(this.dex_input.value);
        this.setDexMod();
        await this.saveAbilities();
        bus.publish(EVENTS.ABILITY_CHANGED);

    }

    async conChanged() {
        this.con = parseInt(this.con_input.value);
        this.setConMod();
        await this.saveAbilities();
        bus.publish(EVENTS.ABILITY_CHANGED);
    }

    async intChanged() {
        this.int = parseInt(this.int_input.value);
        this.setIntMod();
        await this.saveAbilities();
        bus.publish(EVENTS.ABILITY_CHANGED);
    }

    async wisChanged() {
        this.wis = parseInt(this.wis_input.value);
        this.setWisMod();
        await this.saveAbilities();
        bus.publish(EVENTS.ABILITY_CHANGED);
    }

    async chaChanged() {
        this.cha = parseInt(this.cha_input.value);
        this.setChaMod();
        await this.saveAbilities();
        bus.publish(EVENTS.ABILITY_CHANGED);
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

    getAbilityModifiers() {
        return {
            [ABILITIES.STR]: this.calculateModifier(this.str),
            [ABILITIES.DEX]: this.calculateModifier(this.dex),
            [ABILITIES.CON]: this.calculateModifier(this.con),
            [ABILITIES.INT]: this.calculateModifier(this.int),
            [ABILITIES.WIS]: this.calculateModifier(this.wis),
            [ABILITIES.CHA]: this.calculateModifier(this.cha)
        }
    }

    getCharacterSavingThrowModifiers() {
        const prof_bonus = this.classes_handler.getProficiencyBonus();

        const race_ability_bonuses = this.race_handler.abilities;

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

        race_ability_bonuses.forEach((bonus) => {
            //Set the bonuses from race
            const ability_id = bonus.id;
            const ability_bonus = bonus.value;
            switch(ability_id) {
                case ABILITIES.STR:
                    race_str_mod = ability_bonus;
                    break;
                case ABILITIES.DEX:
                    race_dex_mod = ability_bonus;
                    break;
                case ABILITIES.CON:
                    race_con_mod = ability_bonus;
                    break;
                case ABILITIES.INT:
                    race_int_mod = ability_bonus;
                    break;
                case ABILITIES.WIS:
                    race_wis_mod = ability_bonus;
                    break;
                case ABILITIES.CHA:
                    race_cha_mod = ability_bonus;
                    break;
            }
        });

        const saving_throws = this.classes_handler.getSavingThrows();
        saving_throws.forEach((saving_throw) => {
            //set saving throw bonus based on level from class
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

        console.log(race_str_mod);
        //Ability modifier + ability bonuses from race + saving throw class bonus based on character level
        const finalCalculations = [
        this.calculateModifier(parseInt(this.str)) + parseInt(race_str_mod) + parseInt(str_bonus),
        this.calculateModifier(parseInt(this.dex)) + parseInt(race_dex_mod) + parseInt(dex_bonus),
        this.calculateModifier(parseInt(this.con)) + parseInt(race_con_mod) + parseInt(con_bonus),
        this.calculateModifier(parseInt(this.int)) + parseInt(race_int_mod) + parseInt(int_bonus),
        this.calculateModifier(parseInt(this.wis)) + parseInt(race_wis_mod) + parseInt(wis_bonus),
        this.calculateModifier(parseInt(this.cha)) + parseInt(race_cha_mod) + parseInt(cha_bonus)];

        const finalCalculationDict = {
            [ABILITIES.STR]: finalCalculations[0],
            [ABILITIES.DEX]: finalCalculations[1],
            [ABILITIES.CON]: finalCalculations[2],
            [ABILITIES.INT]: finalCalculations[3],
            [ABILITIES.WIS]: finalCalculations[4],
            [ABILITIES.CHA]: finalCalculations[5]
        };

        return finalCalculationDict;
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
    }
}