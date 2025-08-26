import {ammo_types} from './ammo.js';
export const weapons = {
    club: {
        cost: "1 sp",
        damage: "1 d4",
        damage_type: "Bludgeoning",
        weight: 2,
        properties: ["Light"],
        ammo_type: null
    },
    dagger: {
        cost: "2 gp",
        damage: "1 d4",
        damage_type: "Piercing",
        weight: 1,
        properties: ["Finesse", "Light", "Thrown", "Range 20/60"],
        ammo_type: null
    },
    greateclub: {
        cost: "2 sp",
        damage: "1 d8",
        damage_type: "Bludgeoning",
        weight: 10,
        properties: ["Two-Handed"],
        ammo_type: null
    },
    handaxe: {
        cost: "5 gp",
        damage: "1 d6",
        damage_type: "Slashing",
        weight: 2,
        properties: ["Light", "Thrown", "Range 20/60"],
        ammo_type: null
    },
    javelin: {
        cost: "5 sp",
        damage: "1 d6",
        damage_type: "Piercing",
        weight: 2,
        properties: ["Thown", "Range 30/120"],
        ammo_type: null
    },
    light_hammer: {
        cost: "2 gp",
        damage: "1 d4",
        damage_type: "Bludgeoning",
        weight: 2,
        properties: ["Light", "Thrown", "Range 20/60"],
        ammo_type: null
    },
    mace: {
        cost: "5 gp",
        damage: "1 d6",
        damage_type: "Bludgeoning",
        weight: 4,
        properties: [],
        ammo_type: null
    },
    quarterstaff: {
        cost: "2 sp",
        damage: "1 d6",
        damage_type: "Bludgeoning",
        weight: 4,
        properties: ["Versatile (1 d8)"],
        ammo_type: null
    },
    sickle: {
        cost: "1 gp",
        damage: "1 d4",
        damage_type: "Slashing",
        weight: 2,
        properties: ["Light"],
        ammo_type: null
    },
    spear: {
        cost: "1 gp",
        damage: "1 d6",
        damage_type: "Piercing",
        weight: 3,
        properties: ["Thrown", "Range 20/60", "Versatile (1 d8)"],
        ammo_type: null
    },
    light_crossbow: {
        cost: "25 gp",
        damage: "1 d8",
        damage_type: "Piercing",
        weight: 5,
        properties: ["Ammunition", "Range 80/320", "Loading", "Two-Handed"],
        ammo_type: ammo_types.bolt
    },
    dart: {
        cost: "5 cp",
        damage: "1 d4",
        damage_type: "Piercing",
        weight: 1/4,
        properties: ["Finesse", "Thrown", "Range 20/60"],
        ammo_type: null
    },
    shortbow: {
        cost: "25 gp",
        damage: "1 d6",
        damage_type: "Piercing",
        weight: 2,
        properties: ["Ammunition", "Range 80/230", "Two-Handed"],
        ammo_type: ammo_types.arrow
    },
    sling: {
        cost: "1 sp",
        damage: "1 d4",
        damage_type: "Bludgeoning",
        weight: 0,
        properties: ["Ammunition", "Range 30/120"],
        ammo_type: ammo_types.sling_ammo
    },
    battleaxe: {
        cost: "10 gp",
        damage: "1 d8",
        damage_type: "Slashing",
        weight: 4,
        properties: ["Versatile (1 d10)"],
        ammo_type: null
    },
    flail: {
        cost: "10 gp",
        damage: "1 d8",
        damage_type: "Bludgeoning",
        weight: 2,
        properties: [],
        ammo_type: null
    },
    glaive: {
        cost: "20 gp",
        damage: "1 d10",
        damage_type: "Slashing",
        weight: 6,
        properties: ["Heavy", "Reach", "Two-Handed"],
        ammo_type: null
    },
    greataxe: {
        cost: "30 gp",
        damage: "1 d12",
        damage_type: "Slashing",
        weight: 7,
        properties: ["Heavy", "Two-Handed"],
        ammo_type: null
    },
    greatsword: {
        cost: "50 gp",
        damage: "2 d6",
        damage_type: "Slashing",
        weight: 6,
        properties: ["Heavy", "Two-Handed"],
        ammo_type: null
    },
    halberd: {
        cost: "20 gp",
        damage: "1 d10",
        damage_type: "Slashing",
        weight: 6,
        properties: ["Heavy", "Reach", "Two-Handed"],
        ammo_type: null
    },
    lance: {
        cost: "10 gp",
        damage: "1 d12",
        damage_type: "Piercing",
        weight: 6,
        properties: ["Reach", "Special"],
        ammo_type: null
    },
    longsword: {
        cost: "15 gp",
        damage: "1 d8",
        damage_type: "Slashing",
        weight: 3,
        properties: ["Versatile (1 d10)"],
        ammo_type: null
    },
    maul: {
        cost: "10 gp",
        damage: "2 d6",
        damage_type: "Bludgeoning",
        weight: 10,
        properties: ["Heavy", "Two-Handed"],
        ammo_type: null
    },
    morningstar: {
        cost: "15 gp",
        damage: "1 d8",
        damage_type: "Piercing",
        weight: 4,
        properties: [],
        ammo_type: null
    },
    pike: {
        cost: "5 gp",
        damage: "1 d10",
        damage_type: "Piercing",
        weight: 18,
        properties: ["Heavy", "Reach", "Two-Handed"],
        ammo_type: null
    },
    rapier: {
        cost: "25 gp",
        damage: "1 d8",
        damage_type: "Piercing",
        weight: 2,
        properties: ["Finesse"],
        ammo_type: null
    },
    scimitar: {
        cost: "25 gp",
        damage: "1 d6",
        damage_type: "Slashing",
        weight: 3,
        properties: ["Finesse", "Light"],
        ammo_type: null
    },
    shortsword: {
        cost: "10 gp",
        damage: "1 d6",
        damage_type: "Piercing",
        weight: 2,
        properties: ["Finesse", "Light"],
        ammo_type: null
    },
    trident: {
        cost: "5 gp",
        damage: "1 d6",
        damage_type: "Piercing",
        weight: 4,
        properties: ["Thrown", "Range 20/60", "Versatile (1 d8)"],
        ammo_type: null
    },
    war_pick: {
        cost: "5 gp",
        damage: "1 d8",
        damage_type: "Piercing",
        weight: 2,
        properties: [],
        ammo_type: null
    },
    warhammer: {
        cost: "15 gp",
        damage: "1 d8",
        damage_type: "Bludgeoning",
        weight: 2,
        properties: ["Versatile (1 d10)"],
        ammo_type: null
    },
    whip: {
        cost: "2 gp",
        damage: "1 d4",
        damage_type: "Slashing",
        weight: 3,
        properties: ["Finesse", "Reach"],
        ammo_type: null
    },
    blowgun: {
        cost: "10 gp",
        damage: "1",
        damage_type: "Piercing",
        weight: 1,
        properties: ["Ammunition", "Range 25/100", "Loading"],
        ammo_type: ammo_types.blowgun_needle
    },
    hand_crossbow: {
        cost: "75 gp",
        damage: "1 d6",
        damage_type: "Piercing",
        weight: 3,
        properties: ["Ammunition", "Range 30/120", "Light", "Loading"],
        ammo_type: ammo_types.bolt
    },
    heavy_crossbow: {
        cost: "50 gp",
        damage: "1 d10",
        damage_type: "Piercing",
        weight: 18,
        properties: ["Ammunition", "Range 100/400", "Heavy", "Loading", "Two-Handed"],
        ammo_type: ammo_types.bolt
    },
    longbow: {
        cost: "50 gp",
        damage: "1 d8",
        damage_type: "Piercing",
        weight: 2,
        properties: ["Ammunition", "Range 150/600", "Heavy", "Two-Handed"],
        ammo_type: ammo_types.arrow
    },
    net: {
        cost: "1 gp",
        damage: "None",
        damage_type: "None",
        weight: 3,
        properties: ["Special", "Thrown", "Range 5/15"],
        ammo_type: null
    }
};

export const martial_weapons = [
    weapons.battleaxe,
    weapons.flail,
    weapons.glaive,
    weapons.greataxe,
    weapons.greatsword,
    weapons.halberd,
    weapons.lance,
    weapons.longsword,
    weapons.maul,
    weapons.morningstar,
    weapons.pike,
    weapons.rapier,
    weapons.scimitar,
    weapons.shortsword,
    weapons.trident,
    weapons.war_pick,
    weapons.warhammer,
    weapons.whip,
    weapons.blowgun,
    weapons.hand_crossbow,
    weapons.heavy_crossbow,
    weapons.longbow,
    weapons.net
];



export const simple_weapons = [
    weapons.club,
    weapons.dagger,
    weapons.greateclub,
    weapons.handaxe,
    weapons.javelin,
    weapons.light_hammer,
    weapons.mace,
    weapons.quarterstaff,
    weapons.sickle,
    weapons.spear,
    weapons.light_crossbow,
    weapons.dart,
    weapons.sling
];

export const ammunition_weapons = [
    weapons.light_crossbow,
    weapons.shortbow,
    weapons.sling,
    weapons.blowgun,
    weapons.hand_crossbow,
    weapons.heavy_crossbow,
    weapons.longbow
];

export const two_handed_weapons = [
    weapons.greateclub,
    weapons.glaive,
    weapons.greataxe,
    weapons.greatsword,
    weapons.halberd,
    weapons.lance,
    weapons.maul,
    weapons.pike,
    weapons.net,
    weapons.longbow,
    weapons.heavy_crossbow
];

export const versatile_weapons = [
    weapons.quarterstaff,
    weapons.battleaxe,
    weapons.spear,
    weapons.longsword,
    weapons.warhammer,
    weapons.trident
];

export const thrown_weapons = [
    weapons.handaxe,
    weapons.javelin,
    weapons.light_hammer,
    weapons.spear,
    weapons.trident,
    weapons.net,
    weapons.dagger,
    weapons.dart
];

export const reach_weapons = [
    weapons.glaive,
    weapons.halberd,
    weapons.pike,
    weapons.whip
];

export const light_weapons = [
    weapons.club,
    weapons.dagger,
    weapons.sickle,
    weapons.handaxe,
    weapons.light_hammer,
    weapons.scimitar,
    weapons.shortsword
];

export const heavy_weapons = [
    weapons.glaive,
    weapons.greataxe,
    weapons.greatsword,
    weapons.maul,
    weapons.pike,
    weapons.heavy_crossbow,
    weapons.longbow
];

export const finesse_weapons = [
    weapons.dagger,
    weapons.rapier,
    weapons.scimitar,
    weapons.shortsword,
    weapons.whip,
    weapons.dart
];

export function getMeleeWeapons(l) {
    return l.filter(weapon => !ammunition_weapons.includes(weapon) && !thrown_weapons.includes(weapon));
}
