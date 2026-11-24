import { ABILITIES } from "../shared/data_enums.js";

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
    }

    calculateModifier(i) {
        const new_num = Math.floor((parseInt(i) - 10) / 2);
        return new_num;
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
}