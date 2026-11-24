import { saveBasicData } from "./save_handler.js";
import { bus, EVENTS } from "./utils/event_bus.js";
import { emitSignal, getSocket } from "./utils/socket_emitter.js";

export class BasicDataHandler {
    constructor(socket) {
        this.socket = socket;
        this.speed = 0;
        this.initiative_modifier = 0;
        this.health = 0;
        this.max_health = 0;
        this.armor_class = 0;
        
        this.connectSocketFunctions();
        this.addEventListeners();
        this.setBusSubscriptions();

    }

    setBusSubscriptions() {
        const set_health_text_subscriptions = [EVENTS.HEALTH_UPDATED, EVENTS.LONG_REST, 
        EVENTS.SHORT_REST];

        bus.subscribeToEvents(set_health_text_subscriptions, () => {this.setHealthText()});
    }

    build() {
        const speed_input = document.getElementById('speed-input');
        speed_input.value = this.speed;
        speed_input.addEventListener('change', async () => {
            this.speed = speed_input.value;
            await saveBasicData(this.getSaveData());
        });

        const initiative_modifier_input = document.getElementById('initiative-modifier-input');
        initiative_modifier_input.value = this.initiative_modifier;
        initiative_modifier_input.addEventListener('change', 
        async () => {
            this.initiative_modifier = initiative_modifier_input.value;
            await saveBasicData(this.getSaveData());
        });

        //Player level is going to be turned into class level
        const ipt = document.querySelector('#player-level-input');
        ipt.addEventListener('change',
        function() {
            setPlayerLevel(ipt.value);
            handleSpellSlotOnLevelUp();
            bus.publish(EVENTS.LEVEL_UPDATED);
        });

        const max_health_input = document.querySelector(".max-health");
        max_health_input.addEventListener('change', () => {
            this.clientUpdateMaxHealth(max_health_input.value);
        });
    }

    async updateHealth() {
        const heal_input = document.getElementById("heal-input");
        const damage_input = document.getElementById("damage-input");
        const heal_val = parseFloat(heal_input.value) || 0;
        const damage_val = parseFloat(damage_input.value) || 0;
        const health = document.getElementById("health-num");
        const health_val = parseFloat(health.textContent) || 0;
        let result = health_val - damage_val + heal_val;

        this.setCharacterHealth(result);
        await saveBasicData(this.getSaveData());
        heal_input.value = '';
        damage_input.value = '';
        bus.publish(EVENTS.HEALTH_UPDATED);
    }

    setCharacterHealth(health) {
        this.health = health;
    }

    setMaxHealth(max_health) {
        this.max_health = max_health;
    }

    setHealthText() {
        const health = document.getElementById("health-num");
        health.textContent = this.health;
    }

    async clientUpdateMaxHealth(max_health) {
        this.max_health = max_health;
        await saveBasicData(this.getSaveData());
        this.socket.emit('client_update_max_health', {max_health: this.max_health, char_id: char_id});
    }
    
    updateMaxHealth(max_health) {
        const max_health_input = document.querySelector(".max-health");
        max_health_input.value = max_health;
        this.max_health = max_health;
    }

    getSaveData() {
        let save_data = {speed: this.speed,
            initiative_modifier: this.initiative_modifier,
            health: this.health,
            max_health: this.max_health,
            armor_class: this.armor_class
        };

        return save_data;
    }

    async loadSaveData() {
        emitSignal('require_basic_data', {char_id: char_id});
        return new Promise((resolve) => {
            getSocket().once('sent_basic_data', save_data => {
                this.speed = save_data.speed;
                this.initiative_modifier = save_data.initiative_modifier;
                this.health = save_data.health;
                this.max_health = save_data.max_health;
                this.armor_class = save_data.armor_class;
            
                this.build();
                resolve(save_data);
            });
        });
    }

    connectSocketFunctions() {
        this.socket.on('host_update_health', ({result, client_id}) => {
            const health = document.getElementById("health-num");
            this.setCharacterHealth(result);
            health.textContent = result.toString();
        });

        this.socket.on('host_change_armor_class', ({value}) => {
            const ac_value = document.getElementById('ac-input');
            ac_value.value = value;
        });

        this.socket.on('host_update_max_health', data => {
            const max_health = data.max_health;
            this.setMaxHealth(max_health);
            this.updateMaxHealth(max_health);
        });
    }

    addEventListeners() {
        document.getElementById("heal-input").addEventListener("change", (event) => {
            this.updateHealth();
        });

        document.getElementById("damage-input").addEventListener("change", (event) => {
            this.updateHealth();
        });

        document.getElementById('ac-input').addEventListener('change', async (event) => {
            const value = document.getElementById('ac-input').value;
            this.armor_class = value;
            await saveBasicData(this.getSaveData());
            this.socket.emit('client_change_armor_class', {value: value, char_id: char_id});
        });
    }
    
}