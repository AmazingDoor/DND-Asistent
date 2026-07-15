export const light_armor = {
    padded: {
        name: "Padded",
        cost: {
            amount: 5,
            unit: "gp"
        },
        ac_mod: 11,
        strength: 0,
        stealth_disadvantage: true,
        weight: 8
    },
    leather: {
        name: "Leather",
        cost: {
            amount: 10,
            unit: "gp"
        },
        ac_mod: 11,
        strength: 0,
        stealth_disadvantage: false,
        weight: 10
    },
    studded_leather: {
        name: "Studded Leather",
        cost: {
            amount: 45,
            unit: "gp"
        },
        ac_mod: 12,
        strength: 0,
        stealth_disadvantage: false,
        weight: 13
    }
};

export const medium_armor = {
    hide: {
        name: "Hide",
        cost: {
            amount: 10,
            unit: "gp"
        },
        ac_mod: 12,
        strength: 0,
        stealth_disadvantage: false,
        weight: 12
    },
    chain_shirt: {
        name: "Chain Shirt",
        cost: {
            amount: 50,
            unit: "gp"
        },
        ac_mod: 13,
        strength: 0,
        stealth_disadvantage: false,
        weight: 20
    },
    scale_mail: {
        name: "Scale Mail",
        cost: {
            amount: 50,
            unit: "gp"
        },
        ac_mod: 14,
        strength: 0,
        stealth_disadvantage: true,
        weight: 45
    },
    breastplate: {
        name: "Breastplate",
        cost: {
            amount: 400,
            unit: "gp"
        },
        ac_mod: 14,
        strength: 0,
        stealth_disadvantage: false,
        weight: 20
    },
    half_plate: {
        name: "Half Plate",
        cost: {
            amount: 750,
            unit: "gp"
        },
        ac_mod: 15,
        strength: 0,
        stealth_disadvantage: true,
        weight: 40
    }
};

export const heavy_armor = {
    ring_mail: {
        name: "Ring Mail",
        cost: {
            amount: 30,
            unit: "gp"
        },
        ac_mod: 14,
        strength: 0,
        stealth_disadvantage: true,
        weight: 40
    },
    chain_mail: {
        name: "Chain Mail",
        cost: {
            amount: 75,
            unit: "gp"
        },
        ac_mod: 16,
        strength: 13,
        stealth_disadvantage: true,
        weight: 55
    },
    splint: {
        name: "Splint",
        cost: {
            amount: 200,
            unit: "gp"
        },
        ac_mod: 17,
        strength: 15,
        stealth_disadvantage: true,
        weight: 60
    },
    plate: {
        name: "Plate",
        cost: {
            amount: 1500,
            unit: "gp"
        },
        ac_mod: 18,
        strength: 15,
        stealth_disadvantage: true,
        weight: 65
    }
};


export function getAllArmors() {
    return Object.assign({}, light_armor, medium_armor, heavy_armor);
}