export const full_caster = {
    spell_slots:[
    [2], //Level 1
    [3], //Level 2
    [4, 2], //Level 3
    [4, 3], //Level 4
    [4, 3, 2], //Level 5
    [4, 3, 3], //Level 6
    [4, 3, 3, 1], //Level 7
    [4, 3, 3, 2], //Level 8
    [4, 3, 3, 3, 1], //Level 9
    [4, 3, 3, 3, 2], //Level 10
    [4, 3, 3, 3, 2, 1], //Level 11
    [4, 3, 3, 3, 2, 1], //Level 12
    [4, 3, 3, 3, 2, 1, 1], //Level 13
    [4, 3, 3, 3, 2, 1, 1], //Level 14
    [4, 3, 3, 3, 2, 1, 1, 1], //Level 15
    [4, 3, 3, 3, 2, 1, 1, 1], //Level 16
    [4, 3, 3, 3, 2, 1, 1, 1, 1], //Level 17
    [4, 3, 3, 3, 3, 1, 1, 1, 1], //Level 18
    [4, 3, 3, 3, 3, 1, 1, 1, 1], //Level 19
    [4, 3, 3, 3, 3, 1, 1, 1, 1]] //Level 20
}

export const half_caster = {spell_slots: [
  [], // Level 1
  [2], // Level 2
  [3], // Level 3
  [3], // Level 4
  [4, 2,], // Level 5
  [4, 2,], // Level 6
  [4, 3,], // Level 7
  [4, 3,], // Level 8
  [4, 3, 2,], // Level 9
  [4, 3, 2,], // Level 10
  [4, 3, 3,], // Level 11
  [4, 3, 3,], // Level 12
  [4, 3, 3, 1], // Level 13
  [4, 3, 3, 1], // Level 14
  [4, 3, 3, 2], // Level 15
  [4, 3, 3, 2], // Level 16
  [4, 3, 3, 3, 1], // Level 17
  [4, 3, 3, 3, 1], // Level 18
  [4, 3, 3, 3, 2], // Level 19
  [4, 3, 3, 3, 2], // Level 20
]};

export const third_caster = {spell_slots: [
  [], // Level 1
  [], // Level 2
  [2], // Level 3
  [3], // Level 4
  [3], // Level 5
  [3], // Level 6
  [4, 2], // Level 7
  [4, 2], // Level 8
  [4, 2], // Level 9
  [4, 3], // Level 10
  [4, 3], // Level 11
  [4, 3], // Level 12
  [4, 3, 2], // Level 13
  [4, 3, 2], // Level 14
  [4, 3, 2], // Level 15
  [4, 3, 3], // Level 16
  [4, 3, 3], // Level 17
  [4, 3, 3], // Level 18
  [4, 3, 3, 1], // Level 19
  [4, 3, 3, 1], // Level 20
]};

export const warlock_pact_magic = {spell_slots: [
  [1], // Level 1
  [2], // Level 2
  [0, 2], // Level 3
  [0, 2], // Level 4
  [0, 0, 2], // Level 5
  [0, 0, 2], // Level 6
  [0, 0, 0, 2], // Level 7
  [0, 0, 0, 2], // Level 8
  [0, 0, 0, 0, 2], // Level 9
  [0, 0, 0, 0, 2], // Level 10
  [0, 0, 0, 0, 3], // Level 11
  [0, 0, 0, 0, 3], // Level 12
  [0, 0, 0, 0, 3], // Level 13
  [0, 0, 0, 0, 3], // Level 14
  [0, 0, 0, 0, 3], // Level 15
  [0, 0, 0, 0, 3], // Level 16
  [0, 0, 0, 0, 4], // Level 17
  [0, 0, 0, 0, 4], // Level 18
  [0, 0, 0, 0, 4], // Level 19
  [0, 0, 0, 0, 4], // Level 20
]};

export const no_spells = {spell_slots: []}

export function getMagicSlots(class_name) {
    const caster_types = {
    Bard: full_caster,
    Cleric: full_caster,
    Druid: full_caster,
    Sorcerer: full_caster,
    Wizard: full_caster,
    Paladin: half_caster,
    Ranger: half_caster,
    Warlock: warlock_pact_magic
    }

    if (class_name in caster_types) {
        return caster_types[class_name];
    } else {
        return [];
    }
}