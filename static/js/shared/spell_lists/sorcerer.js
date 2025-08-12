export const sorcerer = {
    "cantrips": [
        {
            "higher_level": [],
            "name": "Acid Splash",
            "desc": [
                "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a dexterity saving throw or take 1d6 acid damage.",
                "This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "damage": {
                "damage_type": {
                    "index": "acid",
                    "name": "Acid",
                    "url": "/api/2014/damage-types/acid"
                },
                "damage_at_character_level": {
                    "1": "1d6",
                    "5": "2d6",
                    "11": "3d6",
                    "17": "4d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "none"
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Chill Touch",
            "desc": [
                "You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can't regain hit points until the start of your next turn. Until then, the hand clings to the target.",
                "If you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn.",
                "This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 round",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "attack_type": "ranged",
            "damage": {
                "damage_type": {
                    "index": "necrotic",
                    "name": "Necrotic",
                    "url": "/api/2014/damage-types/necrotic"
                },
                "damage_at_character_level": {
                    "1": "1d8",
                    "5": "2d8",
                    "11": "3d8",
                    "17": "4d8"
                }
            },
            "school": "Necromancy"
        },
        {
            "higher_level": [],
            "name": "Dancing Lights",
            "desc": [
                "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light sheds dim light in a 10-foot radius.",
                "As a bonus action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 20 feet of another light created by this spell, and a light winks out if it exceeds the spell's range."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of phosphorus or wychwood, or a glowworm.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 0,
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Fire Bolt",
            "desc": [
                "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.",
                "This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "attack_type": "ranged",
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_character_level": {
                    "1": "1d10",
                    "5": "2d10",
                    "11": "3d10",
                    "17": "4d10"
                }
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Light",
            "desc": [
                "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.",
                "If you target an object held or worn by a hostile creature, that creature must succeed on a dexterity saving throw to avoid the spell."
            ],
            "range": "Touch",
            "components": [
                "V",
                "M"
            ],
            "material": "A firefly or phosphorescent moss.",
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "none"
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Mage Hand",
            "desc": [
                "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.",
                "You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.",
                "The hand can't attack, activate magic items, or carry more than 10 pounds."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 minute",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Mending",
            "desc": [
                "This spell repairs a single break or tear in an object you touch, such as a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no longer than 1 foot in any dimension, you mend it, leaving no trace of the former damage.",
                "This spell can physically repair a magic item or construct, but the spell can't restore magic to such an object."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Two lodestones.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 minute",
            "level": 0,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Message",
            "desc": [
                "You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.",
                "You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn't have to follow a straight line and can travel freely around corners or through openings."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A short piece of copper wire.",
            "ritual": false,
            "duration": "1 round",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Minor Illusion",
            "desc": [
                "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.",
                "If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.",
                "If you create an image of an object--such as a chair, muddy footprints, or a small chest--it must be no larger than a 5-foot cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.",
                "If a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature."
            ],
            "range": "30 feet",
            "components": [
                "S",
                "M"
            ],
            "material": "A bit of fleece.",
            "ritual": false,
            "duration": "1 minute",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Poison Spray",
            "desc": [
                "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a constitution saving throw or take 1d12 poison damage.",
                "This spell's damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12)."
            ],
            "range": "10 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "damage": {
                "damage_type": {
                    "index": "poison",
                    "name": "Poison",
                    "url": "/api/2014/damage-types/poison"
                },
                "damage_at_character_level": {
                    "1": "1d12",
                    "5": "2d12",
                    "11": "3d12",
                    "17": "4d12"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "none"
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Prestidigitation",
            "desc": [
                "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within 'range':",
                "You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.",
                "You instantaneously light or snuff out a candle, a torch, or a small campfire.",
                "You instantaneously clean or soil an object no larger than 1 cubic foot.",
                "You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.",
                "You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.",
                "You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.",
                "If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action."
            ],
            "range": "10 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Ray of Frost",
            "desc": [
                "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.",
                "The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "attack_type": "ranged",
            "damage": {
                "damage_type": {
                    "index": "cold",
                    "name": "Cold",
                    "url": "/api/2014/damage-types/cold"
                },
                "damage_at_character_level": {
                    "1": "1d8",
                    "5": "2d8",
                    "11": "3d8",
                    "17": "4d8"
                }
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Shocking Grasp",
            "desc": [
                "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can't take reactions until the start of its next turn.",
                "The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 0,
            "attack_type": "melee",
            "damage": {
                "damage_type": {
                    "index": "lightning",
                    "name": "Lightning",
                    "url": "/api/2014/damage-types/lightning"
                },
                "damage_at_character_level": {
                    "1": "1d8",
                    "5": "2d8",
                    "11": "3d8",
                    "17": "4d8"
                }
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "True Strike",
            "desc": [
                "You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target's defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn't ended."
            ],
            "range": "30 feet",
            "components": [
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 round",
            "concentration": true,
            "casting_time": "1 action",
            "level": 0,
            "school": "Divination"
        }
    ],
    "spells": [
        {
            "name": "Burning Hands",
            "desc": [
                "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.",
                "The fire ignites any flammable objects in the area that aren't being worn or carried."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "1": "3d6",
                    "2": "4d6",
                    "3": "5d6",
                    "4": "6d6",
                    "5": "7d6",
                    "6": "8d6",
                    "7": "9d6",
                    "8": "10d6",
                    "9": "11d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "cone",
                "size": 15
            },
            "school": "Evocation"
        },
        {
            "name": "Charm Person",
            "desc": [
                "You attempt to charm a humanoid you can see within range. It must make a wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "school": "Enchantment"
        },
        {
            "name": "Color Spray",
            "desc": [
                "A dazzling array of flashing, colored light springs from your hand. Roll 6d10; the total is how many hit points of creatures this spell can effect. Creatures in a 15-foot cone originating from you are affected in ascending order of their current hit points (ignoring unconscious creatures and creatures that can't see).",
                "Starting with the creature that has the lowest current hit points, each creature affected by this spell is blinded until the spell ends. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d10 for each slot level above 1st."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of powder or sand that is colored red, yellow, and blue.",
            "ritual": false,
            "duration": "1 round",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "area_of_effect": {
                "type": "cone",
                "size": 15
            },
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Comprehend Languages",
            "desc": [
                "For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text.",
                "This spell doesn't decode secret messages in a text or a glyph, such as an arcane sigil, that isn't part of a written language."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of soot and salt.",
            "ritual": true,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": "Divination"
        },
        {
            "higher_level": [],
            "name": "Detect Magic",
            "desc": [
                "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.",
                "The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": true,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 1,
            "area_of_effect": {
                "type": "sphere",
                "size": 30
            },
            "school": "Divination"
        },
        {
            "higher_level": [],
            "name": "Disguise Self",
            "desc": [
                "You make yourself--including your clothing, armor, weapons, and other belongings on your person--look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can't change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you.",
                "The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel your head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.",
                "To discern that you are disguised, a creature can use its action to inspect your appearance and must succeed on an Intelligence (Investigation) check against your spell save DC."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Expeditious Retreat",
            "desc": [
                "This spell allows you to move at an incredible pace. When you cast this spell, and then as a bonus action on each of your turns until the spell ends, you can take the Dash action."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 bonus action",
            "level": 1,
            "school": "Transmutation"
        },
        {
            "name": "False Life",
            "desc": [
                "Bolstering yourself with a necromantic facsimile of life, you gain 1d4 + 4 temporary hit points for the duration."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, you gain 5 additional temporary hit points for each slot level above 1st."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A small amount of alcohol or distilled spirits.",
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "heal_at_slot_level": {
                "1": "1d4 + 4",
                "2": "1d4 + 9",
                "3": "1d4 + 14",
                "4": "1d4 + 19",
                "5": "1d4 + 24",
                "6": "1d4 + 29",
                "7": "1d4 + 34",
                "8": "1d4 + 39",
                "9": "1d4 + 44"
            },
            "school": "Necromancy"
        },
        {
            "higher_level": [],
            "name": "Feather Fall",
            "desc": [
                "Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage and can land on its feet, and the spell ends for that creature."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "M"
            ],
            "material": "A small feather or a piece of down.",
            "ritual": false,
            "duration": "1 minute",
            "concentration": false,
            "casting_time": "1 reaction",
            "level": 1,
            "school": "Transmutation"
        },
        {
            "name": "Fog Cloud",
            "desc": [
                "You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, the radius of the fog increases by 20 feet for each slot level above 1st."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 1,
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Jump",
            "desc": [
                "You touch a creature. The creature's jump distance is tripled until the spell ends."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A grasshopper's hind leg.",
            "ritual": false,
            "duration": "1 minute",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Mage Armor",
            "desc": [
                "You touch a willing creature who isn't wearing armor, and a protective magical force surrounds it until the spell ends. The target's base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A piece of cured leather.",
            "ritual": false,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": "Abjuration"
        },
        {
            "name": "Magic Missile",
            "desc": [
                "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot level above 1st."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "damage": {
                "damage_type": {
                    "index": "force",
                    "name": "Force",
                    "url": "/api/2014/damage-types/force"
                },
                "damage_at_slot_level": {
                    "1": "1d4 + 1",
                    "2": "1d4 + 1",
                    "3": "1d4 + 1",
                    "4": "1d4 + 1",
                    "5": "1d4 + 1",
                    "6": "1d4 + 1",
                    "7": "1d4 + 1",
                    "8": "1d4 + 1",
                    "9": "1d4 + 1"
                }
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Shield",
            "desc": [
                "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 round",
            "concentration": false,
            "casting_time": "1 reaction",
            "level": 1,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Silent Image",
            "desc": [
                "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.",
                "You can use your action to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking.",
                "Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of fleece.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 1,
            "area_of_effect": {
                "type": "cube",
                "size": 15
            },
            "school": "Illusion"
        },
        {
            "name": "Sleep",
            "desc": [
                "This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures).",
                "Starting with the creature that has the lowest current hit points, each creature affected by this spell falls unconscious until the spell ends, the sleeper takes damage, or someone uses an action to shake or slap the sleeper awake. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected.",
                "Undead and creatures immune to being charmed aren't affected by this spell."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d8 for each slot level above 1st."
            ],
            "range": "90 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of fine sand, rose petals, or a cricket.",
            "ritual": false,
            "duration": "1 minute",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "damage": {
                "damage_at_slot_level": {
                    "1": "5d8"
                }
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Enchantment"
        },
        {
            "name": "Thunderwave",
            "desc": [
                "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn't pushed.",
                "In addition, unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell's effect, and the spell emits a thunderous boom audible out to 300 feet."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "damage": {
                "damage_type": {
                    "index": "thunder",
                    "name": "Thunder",
                    "url": "/api/2014/damage-types/thunder"
                },
                "damage_at_slot_level": {
                    "1": "2d8",
                    "2": "3d8",
                    "3": "4d8",
                    "4": "5d8",
                    "5": "6d8",
                    "6": "7d8",
                    "7": "8d8",
                    "8": "9d8",
                    "9": "10d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "cube",
                "size": 15
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Alter Self",
            "desc": [
                "You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one.",
                "***Aquatic Adaptation.*** You adapt your body to an aquatic environment, sprouting gills and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed.",
                "***Change Appearance.*** You transform your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and distinguishing characteristics, if any. You can make yourself appear as a member of another race, though none of your statistics change. You also can't appear as a creature of a different size than you, and your basic shape stays the same; if you're bipedal, you can't use this spell to become quadrupedal, for instance. At any time for the duration of the spell, you can use your action to change your appearance in this way again.",
                "***Natural Weapons.*** You grow claws, fangs, spines, horns, or a different natural weapon of your choice. Your unarmed strikes deal 1d6 bludgeoning, piercing, or slashing damage, as appropriate to the natural weapon you chose, and you are proficient with your unarmed strikes. Finally, the natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Transmutation"
        },
        {
            "name": "Blindness/Deafness",
            "desc": [
                "You can blind or deafen a foe. Choose one creature that you can see within range to make a constitution saving throw. If it fails, the target is either blinded or deafened (your choice) for the duration. At the end of each of its turns, the target can make a constitution saving throw. On a success, the spell ends."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd."
            ],
            "range": "30 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "1 minute",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "none"
            },
            "school": "Necromancy"
        },
        {
            "higher_level": [],
            "name": "Blur",
            "desc": [
                "Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any creature has disadvantage on attack rolls against you. An attacker is immune to this effect if it doesn't rely on sight, as with blindsight, or can see through illusions, as with truesight."
            ],
            "range": "Self",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Darkness",
            "desc": [
                "Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can't see through this darkness, and nonmagical light can't illuminate it.",
                "If the point you choose is on an object you are holding or one that isn't being worn or carried, the darkness emanates from the object and moves with it. Completely covering the source of the darkness with an opaque object, such as a bowl or a helm, blocks the darkness.",
                "If any of this spell's area overlaps with an area of light created by a spell of 2nd level or lower, the spell that created the light is dispelled."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "M"
            ],
            "material": "Bat fur and a drop of pitch or piece of coal.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "area_of_effect": {
                "type": "sphere",
                "size": 15
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Darkvision",
            "desc": [
                "You touch a willing creature to grant it the ability to see in the dark. For the duration, that creature has darkvision out to a range of 60 feet."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Either a pinch of dried carrot or an agate.",
            "ritual": false,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Detect Thoughts",
            "desc": [
                "For the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you. If the creature you choose has an Intelligence of 3 or lower or doesn't speak any language, the creature is unaffected.",
                "You initially learn the surface thoughts of the creature - what is most on its mind in that moment. As an action, you can either shift your attention to another creature's thoughts or attempt to probe deeper into the same creature's mind. If you probe deeper, the target must make a Wisdom saving throw. If it fails, you gain insight into its reasoning (if any), its emotional state, and something that looms large in its mind (such as something it worries over, loves, or hates). If it succeeds, the spell ends. Either way, the target knows that you are probing into its mind, and unless you shift your attention to another creature's thoughts, the creature can use its action on its turn to make an Intelligence check contested by your Intelligence check; if it succeeds, the spell ends.",
                "Questions verbally directed at the target creature naturally shape the course of its thoughts, so this spell is particularly effective as part of an interrogation.",
                "You can also use this spell to detect the presence of thinking creatures you can't see. When you cast the spell or as your action during the duration, you can search for thoughts within 30 feet of you. The spell can penetrate barriers, but 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead blocks you. You can't detect a creature with an Intelligence of 3 or lower or one that doesn't speak any language.",
                "Once you detect the presence of a creature in this way, you can read its thoughts for the rest of the duration as described above, even if you can't see it, but it must still be within range."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A copper coin.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Divination"
        },
        {
            "name": "Enhance Ability",
            "desc": [
                "You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects; the target gains that effect until the spell ends.",
                "***Bear's Endurance.*** The target has advantage on constitution checks. It also gains 2d6 temporary hit points, which are lost when the spell ends.",
                "***Bull's Strength.*** The target has advantage on strength checks, and his or her carrying capacity doubles.",
                "***Cat's Grace.*** The target has advantage on dexterity checks. It also doesn't take damage from falling 20 feet or less if it isn't incapacitated.",
                "***Eagle's Splendor.*** The target has advantage on Charisma checks.",
                "***Fox's Cunning.*** The target has advantage on intelligence checks.",
                "***Owl's Wisdom.*** The target has advantage on wisdom checks."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Fur or a feather from a beast.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Enlarge/Reduce",
            "desc": [
                "You cause a creature or an object you can see within range to grow larger or smaller for the duration. Choose either a creature or an object that is neither worn nor carried. If the target is unwilling, it can make a Constitution saving throw. On a success, the spell has no effect.",
                "If the target is a creature, everything it is wearing and carrying changes size with it. Any item dropped by an affected creature returns to normal size at once.",
                "***Enlarge.*** The target's size doubles in all dimensions, and its weight is multiplied by eight. This growth increases its size by one category-from Medium to Large, for example. If there isn't enough room for the target to double its size, the creature or object attains the maximum possible size in the space available. Until the spell ends, the target also has advantage on Strength checks and Strength saving throws. The target's weapons also grow to match its new size. While these weapons are enlarged, the target's attacks with them deal 1d4 extra damage.",
                "***Reduce.*** The target's size is halved in all dimensions, and its weight is reduced to one-eighth of normal. This reduction decreases its size by one category-from Medium to Small, for example. Until the spell ends, the target also has disadvantage on Strength checks and Strength saving throws. The target's weapons also shrink to match its new size. While these weapons are reduced, the target's attacks with them deal 1d4 less damage (this can't reduce the damage below 1)."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch iron powder.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "none"
            },
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Gust of Wind",
            "desc": [
                "A line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the spell's duration. Each creature that starts its turn in the line must succeed on a strength saving throw or be pushed 15 feet away from you in a direction following the line.",
                "Any creature in the line must spend 2 feet of movement for every 1 foot it moves when moving closer to you.",
                "The gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them.",
                "As a bonus action on each of your turns before the spell ends, you can change the direction in which the line blasts from you."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A legume seed.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "dc": {
                "dc_type": {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/2014/ability-scores/str"
                },
                "dc_success": "none"
            },
            "area_of_effect": {
                "type": "line",
                "size": 60
            },
            "school": "Evocation"
        },
        {
            "name": "Hold Person",
            "desc": [
                "Choose a humanoid that you can see within range. The target must succeed on a wisdom saving throw or be paralyzed for the duration. At the end of each of its turns, the target can make another wisdom saving throw. On a success, the spell ends on the target."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional humanoid for each slot level above 2nd. The humanoids must be within 30 feet of each other when you target them."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A small, straight piece of iron.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "school": "Enchantment"
        },
        {
            "name": "Invisibility",
            "desc": [
                "A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell ends for a target that attacks or casts a spell."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "An eyelash encased in gum arabic.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Knock",
            "desc": [
                "Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access.",
                "A target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked.",
                "If you choose a target that is held shut with arcane lock, that spell is suppressed for 10 minutes, during which time the target can be opened and shut normally.",
                "When you cast the spell, a loud knock, audible from as far away as 300 feet, emanates from the target object."
            ],
            "range": "60 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Levitate",
            "desc": [
                "One creature or object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a target that weighs up to 500 pounds. An unwilling creature that succeeds on a constitution saving throw is unaffected.",
                "The target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can use your action to move the target, which must remain within the spell's range.",
                "When the spell ends, the target floats gently to the ground if it is still aloft."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Mirror Image",
            "desc": [
                "Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it's impossible to track which image is real. You can use your action to dismiss the illusory duplicates.",
                "Each time a creature targets you with an attack during the spell's duration, roll a d20 to determine whether the attack instead targets one of your duplicates.",
                "If you have three duplicates, you must roll a 6 or higher to change the attack's target to a duplicate. With two duplicates, you must roll an 8 or higher. With one duplicate, you must roll an 11 or higher.",
                "A duplicate's AC equals 10 + your Dexterity modifier. If an attack hits a duplicate, the duplicate is destroyed. A duplicate can be destroyed only by an attack that hits it. It ignores all other damage and effects. The spell ends when all three duplicates are destroyed.",
                "A creature is unaffected by this spell if it can't see, if it relies on senses other than sight, such as blindsight, or if it can perceive illusions as false, as with truesight."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 minute",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Misty Step",
            "desc": [
                "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see."
            ],
            "range": "Self",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 bonus action",
            "level": 2,
            "school": "Conjuration"
        },
        {
            "name": "Scorching Ray",
            "desc": [
                "You create three rays of fire and hurl them at targets within range. You can hurl them at one target or several.",
                "Make a ranged spell attack for each ray. On a hit, the target takes 2d6 fire damage."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 3rd level or higher, you create one additional ray for each slot level above 2nd."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "2": "2d6"
                }
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "See Invisibility",
            "desc": [
                "For the duration of the spell, you see invisible creatures and objects as if they were visible, and you can see through Ethereal. The ethereal objects and creatures appear ghostly translucent."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A dash of talc and a small amount of silver powder.",
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "school": "Divination"
        },
        {
            "name": "Shatter",
            "desc": [
                "A sudden loud ringing noise, painfully intense, erupts from a point of your choice within range. Each creature in a 10-foot-radius sphere centered on that point must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one. A creature made of inorganic material such as stone, crystal, or metal has disadvantage on this saving throw.",
                "A non-magical item that is not worn or carried also suffers damage if it is in the area of the spell."
            ],
            "higher_level": [
                "When you cast this spell using a 3 or higher level spell slot, the damage of the spell increases by 1d8 for each level of higher spell slot 2."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A burst of mica.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "damage": {
                "damage_type": {
                    "index": "thunder",
                    "name": "Thunder",
                    "url": "/api/2014/damage-types/thunder"
                },
                "damage_at_slot_level": {
                    "2": "3d8",
                    "3": "4d8",
                    "4": "5d8",
                    "5": "6d8",
                    "6": "7d8",
                    "7": "8d8",
                    "8": "9d8",
                    "9": "10d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 10
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Spider Climb",
            "desc": [
                "Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving its hands free. The target also gains a climbing speed equal to its walking speed."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A drop of bitumen and a spider.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Suggestion",
            "desc": [
                "You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you. Creatures that can't be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable. Asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act ends the spell.",
                "The target must make a wisdom saving throw. On a failed save, it pursues the course of action you described to the best of its ability. The suggested course of action can continue for the entire duration. If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do.",
                "You can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a knight give her warhorse to the first beggar she meets. If the condition isn't met before the spell expires, the activity isn't performed.",
                "If you or any of your companions damage the target, the spell ends."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "M"
            ],
            "material": "A snake's tongue and either a bit of honeycomb or a drop of sweet oil.",
            "ritual": false,
            "duration": "Up to 8 hours",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Web",
            "desc": [
                "You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration. The webs are difficult terrain and lightly obscure their area.",
                "If the webs aren't anchored between two solid masses (such as walls or trees) or layered across a floor, wall, or ceiling, the conjured web collapses on itself, and the spell ends at the start of your next turn. Webs layered over a flat surface have a depth of 5 feet.",
                "Each creature that starts its turn in the webs or that enters them during its turn must make a dexterity saving throw. On a failed save, the creature is restrained as long as it remains in the webs or until it breaks free.",
                "A creature restrained by the webs can use its action to make a Strength check against your spell save DC. If it succeeds, it is no longer restrained.",
                "The webs are flammable. Any 5-foot cube of webs exposed to fire burns away in 1 round, dealing 2d4 fire damage to any creature that starts its turn in the fire."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of spiderweb.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "area_of_effect": {
                "type": "cube",
                "size": 20
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Blink",
            "desc": [
                "Roll a d20 at the end of each of your turns for the duration of the spell. On a roll of 11 or higher, you vanish from your current plane of existence and appear in the Ethereal Plane (the spell fails and the casting is wasted if you were already on that plane). At the start of your next turn, and when the spell ends if you are on the Ethereal Plane, you return to an unoccupied space of your choice that you can see within 10 feet of the space you vanished from. If no unoccupied space is available within that range, you appear in the nearest unoccupied space (chosen at random if more than one space is equally near). You can dismiss this spell as an action.",
                "While on the Ethereal Plane, you can see and hear the plane you originated from, which is cast in shades of gray, and you can't see anything there more than 60 feet away. You can only affect and be affected by other creatures on the Ethereal Plane. Creatures that aren't there can't perceive you or interact with you, unless they have the ability to do so."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 minute",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Clairvoyance",
            "desc": [
                "You create an invisible sensor within range in a location familiar to you (a place you have visited or seen before) or in an obvious location that is unfamiliar to you (such as behind a door, around a corner, or in a grove of trees). The sensor remains in place for the duration, and it can't be attacked or otherwise interacted with.",
                "When you cast the spell, you choose seeing or hearing. You can use the chosen sense through the sensor as if you were in its space. As your action, you can switch between seeing and hearing.",
                "A creature that can see the sensor (such as a creature benefiting from see invisibility or truesight) sees a luminous, intangible orb about the size of your fist."
            ],
            "range": "1 mile",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A focus worth at least 100gp, either a jeweled horn for hearing or a glass eye for seeing.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "10 minutes",
            "level": 3,
            "school": "Divination"
        },
        {
            "name": "Counterspell",
            "desc": [
                "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used."
            ],
            "range": "60 feet",
            "components": [
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 reaction",
            "level": 3,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Daylight",
            "desc": [
                "A 60-foot-radius sphere of light spreads out from a point you choose within range. The sphere is bright light and sheds dim light for an additional 60 feet.",
                "If you chose a point on an object you are holding or one that isn't being worn or carried, the light shines from the object and moves with it. Completely covering the affected object with an opaque object, such as a bowl or a helm, blocks the light.",
                "If any of this spell's area overlaps with an area of darkness created by a spell of 3rd level or lower, the spell that created the darkness is dispelled."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "area_of_effect": {
                "type": "sphere",
                "size": 60
            },
            "school": "Evocation"
        },
        {
            "name": "Dispel Magic",
            "desc": [
                "Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a successful check, the spell ends."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 4th level or higher, you automatically end the effects of a spell on the target if the spell's level is equal to or less than the level of the spell slot you used."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Fear",
            "desc": [
                "You project a phantasmal image of a creature's worst fears. Each creature in a 30-foot cone must succeed on a wisdom saving throw or drop whatever it is holding and become frightened for the duration.",
                "While frightened by this spell, a creature must take the Dash action and move away from you by the safest available route on each of its turns, unless there is nowhere to move. If the creature ends its turn in a location where it doesn't have line of sight to you, the creature can make a wisdom saving throw. On a successful save, the spell ends for that creature."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A white feather or the heart of a hen.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none",
                "desc": "On fail, A creature drop whatever it is holding and become frightened for the duration."
            },
            "area_of_effect": {
                "type": "cone",
                "size": 30
            },
            "school": "Illusion"
        },
        {
            "name": "Fireball",
            "desc": [
                "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.",
                "The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A tiny ball of bat guano and sulfur.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "3": "8d6",
                    "4": "9d6",
                    "5": "10d6",
                    "6": "11d6",
                    "7": "12d6",
                    "8": "13d6",
                    "9": "14d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Evocation"
        },
        {
            "name": "Fly",
            "desc": [
                "You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A wing feather from any bird.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Gaseous Form",
            "desc": [
                "You transform a willing creature you touch, along with everything it's wearing and carrying, into a misty cloud for the duration. The spell ends if the creature drops to 0 hit points. An incorporeal creature isn't affected.",
                "While in this form, the target's only method of movement is a flying speed of 10 feet. The target can enter and occupy the space of another creature. The target has resistance to nonmagical damage, and it has advantage on Strength, Dexterity, and constitution saving throws. The target can pass through small holes, narrow openings, and even mere cracks, though it treats liquids as though they were solid surfaces. The target can't fall and remains hovering in the air even when stunned or otherwise incapacitated.",
                "While in the form of a misty cloud, the target can't talk or manipulate objects, and any objects it was carrying or holding can't be dropped, used, or otherwise interacted with. The target can't attack or cast spells."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of gauze and a wisp of smoke.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Haste",
            "desc": [
                "Choose a willing creature that you can see within range. Until the spell ends, the target's speed is doubled, it gains a +2 bonus to AC, it has advantage on dexterity saving throws, and it gains an additional action on each of its turns. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object action.",
                "When the spell ends, the target can't move or take actions until after its next turn, as a wave of lethargy sweeps over it."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A shaving of licorice root.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Hypnotic Pattern",
            "desc": [
                "You create a twisting pattern of colors that weaves through the air inside a 30-foot cube within range. The pattern appears for a moment and vanishes. Each creature in the area who sees the pattern must make a wisdom saving throw. On a failed save, the creature becomes charmed for the duration. While charmed by this spell, the creature is incapacitated and has a speed of 0.",
                "The spell ends for an affected creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor."
            ],
            "range": "120 feet",
            "components": [
                "S",
                "M"
            ],
            "material": "A glowing stick of incense or a crystal vial filled with phosphorescent material.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none",
                "desc": "On a failed save, the creature becomes charmed for the duration."
            },
            "school": "Illusion"
        },
        {
            "name": "Lightning Bolt",
            "desc": [
                "A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a dexterity saving throw. A creature takes 8d6 lightning damage on a failed save, or half as much damage on a successful one.",
                "The lightning ignites flammable objects in the area that aren't being worn or carried."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of fur and a rod of amber, crystal, or glass.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "damage": {
                "damage_type": {
                    "index": "lightning",
                    "name": "Lightning",
                    "url": "/api/2014/damage-types/lightning"
                },
                "damage_at_slot_level": {
                    "3": "8d6",
                    "4": "9d6",
                    "5": "10d6",
                    "6": "11d6",
                    "7": "12d6",
                    "8": "13d6",
                    "9": "14d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "line",
                "size": 100
            },
            "school": "Evocation"
        },
        {
            "name": "Major Image",
            "desc": [
                "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot cube. The image appears at a spot that you can see within range and lasts for the duration. It seems completely real, including sounds, smells, and temperature appropriate to the thing depicted. You can't create sufficient heat or cold to cause damage, a sound loud enough to deal thunder damage or deafen a creature, or a smell that might sicken a creature (like a troglodyte's stench).",
                "As long as you are within range of the illusion, you can use your action to cause the image to move to any other spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking. Similarly, you can cause the illusion to make different sounds at different times, even making it carry on a conversation, for example.",
                "Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and its other sensory qualities become faint to the creature."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 6th level or higher, the spell lasts until dispelled, without requiring your concentration."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of fleece.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Protection From Energy",
            "desc": [
                "For the duration, the willing creature you touch has resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Sleet Storm",
            "desc": [
                "Until the spell ends, freezing rain and sleet fall in a 20-foot-tall cylinder with a 40-foot radius centered on a point you choose within range. The area is heavily obscured, and exposed flames in the area are doused.",
                "The ground in the area is covered with slick ice, making it difficult terrain. When a creature enters the spell's area for the first time on a turn or starts its turn there, it must make a dexterity saving throw. On a failed save, it falls prone.",
                "If a creature is concentrating in the spell's area, the creature must make a successful constitution saving throw against your spell save DC or lose concentration."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of dust and a few drops of water.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "area_of_effect": {
                "type": "cylinder",
                "size": 40
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Slow",
            "desc": [
                "You alter time around up to six creatures of your choice in a 40-foot cube within range. Each target must succeed on a wisdom saving throw or be affected by this spell for the duration.",
                "An affected target's speed is halved, it takes a -2 penalty to AC and dexterity saving throws, and it can't use reactions. On its turn, it can use either an action or a bonus action, not both. Regardless of the creature's abilities or magic items, it can't make more than one melee or ranged attack during its turn.",
                "If the creature attempts to cast a spell with a casting time of 1 action, roll a d20. On an 11 or higher, the spell doesn't take effect until the creature's next turn, and the creature must use its action on that turn to complete the spell. If it can't, the spell is wasted.",
                "A creature affected by this spell makes another wisdom saving throw at the end of its turn. On a successful save, the effect ends for it."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A drop of molasses.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none",
                "desc": "On failed save, the creature is slowed."
            },
            "area_of_effect": {
                "type": "cube",
                "size": 40
            },
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Stinking Cloud",
            "desc": [
                "You create a 20-foot-radius sphere of yellow, nauseating gas centered on a point within range. The cloud spreads around corners, and its area is heavily obscured. The cloud lingers in the air for the duration.",
                "Each creature that is completely within the cloud at the start of its turn must make a constitution saving throw against poison. On a failed save, the creature spends its action that turn retching and reeling. Creatures that don't need to breathe or are immune to poison automatically succeed on this saving throw.",
                "A moderate wind (at least 10 miles per hour) disperses the cloud after 4 rounds. A strong wind (at least 20 miles per hour) disperses it after 1 round."
            ],
            "range": "90 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A rotten egg or several skunk cabbage leaves.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "none",
                "desc": "On a failed save, the creature spends its action that turn retching and reeling."
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Tongues",
            "desc": [
                "This spell grants the creature you touch the ability to understand any spoken language it hears. Moreover, when the target speaks, any creature that knows at least one language and can hear the target understands what it says."
            ],
            "range": "Touch",
            "components": [
                "V",
                "M"
            ],
            "material": "A small clay model of a ziggurat.",
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "school": "Divination"
        },
        {
            "higher_level": [],
            "name": "Water Breathing",
            "desc": [
                "This spell gives a maximum of ten willing creatures within range and you can see, the ability to breathe underwater until the end of its term. Affected creatures also retain their normal breathing pattern."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A short piece of reed or straw.",
            "ritual": true,
            "duration": "24 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Water Walk",
            "desc": [
                "This spell grants the ability to move across any liquid surface--such as water, acid, mud, snow, quicksand, or lava--as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures you can see within range gain this ability for the duration.",
                "If you target a creature submerged in a liquid, the spell carries the target to the surface of the liquid at a rate of 60 feet per round."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A piece of cork.",
            "ritual": true,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "school": "Transmutation"
        },
        {
            "name": "Banishment",
            "desc": [
                "You attempt to send one creature that you can see within range to another plane of existence. The target must succeed on a charisma saving throw or be banished.",
                "If the target is native to the plane of existence you're on, you banish the target to a harmless demiplane. While there, the target is incapacitated. The target remains there until the spell ends, at which point the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.",
                "If the target is native to a different plane of existence than the one you're on, the target is banished with a faint popping noise, returning to its home plane. If the spell ends before 1 minute has passed, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied. Otherwise, the target doesn't return."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "An item distasteful to the target.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "dc": {
                "dc_type": {
                    "index": "cha",
                    "name": "CHA",
                    "url": "/api/2014/ability-scores/cha"
                },
                "dc_success": "none"
            },
            "school": "Abjuration"
        },
        {
            "name": "Blight",
            "desc": [
                "Necromantic energy washes over a creature of your choice that you can see within range, draining moisture and vitality from it. The target must make a constitution saving throw. The target takes 8d8 necrotic damage on a failed save, or half as much damage on a successful one. The spell has no effect on undead or constructs.",
                "If you target a plant creature or a magical plant, it makes the saving throw with disadvantage, and the spell deals maximum damage to it.",
                "If you target a nonmagical plant that isn't a creature, such as a tree or shrub, it doesn't make a saving throw; it simply withers and dies."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 5th level of higher, the damage increases by 1d8 for each slot level above 4th."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 4,
            "damage": {
                "damage_type": {
                    "index": "necrotic",
                    "name": "Necrotic",
                    "url": "/api/2014/damage-types/necrotic"
                },
                "damage_at_slot_level": {
                    "4": "8d8",
                    "5": "9d8",
                    "6": "10d8",
                    "7": "11d8",
                    "8": "12d8",
                    "9": "13d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half"
            },
            "school": "Necromancy"
        },
        {
            "name": "Confusion",
            "desc": [
                "This spell assaults and twists creatures' minds, spawning delusions and provoking uncontrolled action. Each creature in a 10-foot-radius sphere centered on a point you choose within range must succeed on a Wisdom saving throw when you cast this spell or be affected by it.",
                "An affected target can't take reactions and must roll a d10 at the start of each of its turns to determine its behavior for that turn.",
                "| d10 | Behavior |",
                "|---|---|",
                "| 1 | The creature uses all its movement to move in a random direction. To determine the direction, roll a d8 and assign a direction to each die face. The creature doesn't take an action this turn. |",
                "| 2-6 | The creature doesn't move or take actions this turn. |",
                "| 7-8 | The creature uses its action to make a melee attack against a randomly determined creature within its reach. If there is no creature within its reach, the creature does nothing this turn. |",
                "| 9-10 | The creature can act and move normally. |",
                "At the end of each of its turns, an affected target can make a Wisdom saving throw. If it succeeds, this effect ends for that target."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 5th level or higher, the radius of the sphere increases by 5 feet for each slot level above 4th."
            ],
            "range": "90 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Three walnut shells.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 10
            },
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Dimension Door",
            "desc": [
                "You teleport yourself from your current location to any other spot within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as \"200 feet straight downward\" or \"upward to the northwest at a 45-degree angle, 300 feet.\"",
                "You can bring along objects as long as their weight doesn't exceed what you can carry. You can also bring one willing creature of your size or smaller who is carrying gear up to its carrying capacity. The creature must be within 5 feet of you when you cast this spell.",
                "If you would arrive in a place already occupied by an object or a creature, you and any creature traveling with you each take 4d6 force damage, and the spell fails to teleport you."
            ],
            "range": "500 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 4,
            "damage": {
                "damage_type": {
                    "index": "force",
                    "name": "Force",
                    "url": "/api/2014/damage-types/force"
                },
                "damage_at_slot_level": {
                    "4": "4d6"
                }
            },
            "school": "Conjuration"
        },
        {
            "name": "Dominate Beast",
            "desc": [
                "You attempt to beguile a creature that you can see within range. It must succeed on a wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.",
                "While the creature is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as \"Attack that creature,\" \"Run over there,\" or \"Fetch that object.\" If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.",
                "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well. Each time the target takes damage, it makes a new wisdom saving throw against the spell. If the saving throw succeeds, the spell ends."
            ],
            "higher_level": [
                "When you cast this spell with a 9th level spell slot, the duration is concentration, up to 8 hours."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Greater Invisibility",
            "desc": [
                "You or a creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "school": "Illusion"
        },
        {
            "name": "Ice Storm",
            "desc": [
                "A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a dexterity saving throw. A creature takes 2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half as much damage on a successful one.",
                "Hailstones turn the storm's area of effect into difficult terrain until the end of your next turn."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 5th level or higher, the bludgeoning damage increases by 1d8 for each slot level above 4th."
            ],
            "range": "300 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of dust and a few drops of water.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 4,
            "damage": {
                "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                },
                "damage_at_slot_level": {
                    "4": "2d8 + 4d6",
                    "5": "3d8 + 4d6",
                    "6": "4d8 + 4d6",
                    "7": "5d8 + 4d6",
                    "8": "6d8 + 4d6",
                    "9": "7d8 + 4d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "cylinder",
                "size": 20
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Polymorph",
            "desc": [
                "This spell transforms a creature that you can see within range into a new form. An unwilling creature must make a wisdom saving throw to avoid the effect. A shapechanger automatically succeeds on this saving throw.",
                "The transformation lasts for the duration, or until the target drops to 0 hit points or dies. The new form can be any beast whose challenge rating is equal to or less than the target's (or the target's level, if it doesn't have a challenge rating). The target's game statistics, including mental ability scores, are replaced by the statistics of the chosen beast. It retains its alignment and personality.",
                "The target assumes the hit points of its new form. When it reverts to its normal form, the creature returns to the number of hit points it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form. As long as the excess damage doesn't reduce the creature's normal form to 0 hit points, it isn't knocked unconscious.",
                "The creature is limited in the actions it can perform by the nature of its new form, and it can't speak, cast spells, or take any other action that requires hands or speech.",
                "The target's gear melds into the new form. The creature can't activate, use, wield, or otherwise benefit from any of its equipment."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A caterpillar cocoon.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Stoneskin",
            "desc": [
                "This spell turns the flesh of a willing creature you touch as hard as stone. Until the spell ends, the target has resistance to nonmagical bludgeoning, piercing, and slashing damage."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Diamond dust worth 100 gp, which the spell consumes.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "school": "Abjuration"
        },
        {
            "name": "Wall of Fire",
            "desc": [
                "You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall is opaque and lasts for the duration.",
                "When the wall appears, each creature within its area must make a Dexterity saving throw. On a failed save, a creature takes 5d8 fire damage, or half as much damage on a successful save.",
                "One side of the wall, selected by you when you cast this spell, deals 5d8 fire damage to each creature that ends its turn within 10 feet o f that side or inside the wall. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn there. The other side of the wall deals no damage.",
                "The other side of the wall deals no damage."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d8 for each slot level above 4th."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A small piece of phosphorus.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "4": "5d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "line",
                "size": 60
            },
            "school": "Evocation"
        },
        {
            "name": "Animate Objects",
            "desc": [
                "Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. Medium targets count as two objects, Large targets count as four objects, Huge targets count as eight objects. You can't animate any object larger than Huge. Each target animates and becomes a creature under your control until the spell ends or until reduced to 0 hit points.",
                "As a bonus action, you can mentally command any creature you made with this spell if the creature is within 500 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete.",
                "##### Animated Object Statistics",
                "| Size | HP | AC | Attack | Str | Dex |",
                "|---|---|---|---|---|---|",
                "| Tiny | 20 | 18 | +8 to hit, 1d4 + 4 damage | 4 | 18 |",
                "| Small | 25 | 16 | +6 to hit, 1d8 + 2 damage | 6 | 14 |",
                "| Medium | 40 | 13 | +5 to hit, 2d6 + 1 damage | 10 | 12 |",
                "| Large | 50 | 10 | +6 to hit, 2d10 + 2 damage | 14 | 10 |",
                "| Huge | 80 | 10 | +8 to hit, 2d12 + 4 damage | 18 | 6 |",
                "An animated object is a construct with AC, hit points, attacks, Strength, and Dexterity determined by its size. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its speed is 30 feet; if the object lacks legs or other appendages it can use for locomotion, it instead has a flying speed of 30 feet and can hover. If the object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its speed is 0. It has blindsight with a radius of 30 feet and is blind beyond that distance. When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form.",
                "If you command an object to attack, it can make a single melee attack against a creature within 5 feet of it. It makes a slam attack with an attack bonus and bludgeoning damage determined by its size. The GM might rule that a specific object inflicts slashing or piercing damage based on its form."
            ],
            "higher_level": [
                "If you cast this spell using a spell slot of 6th level or higher, you can animate two additional objects for each slot level above 5th."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 5,
            "school": "Transmutation"
        },
        {
            "name": "Cloudkill",
            "desc": [
                "You create a 20-foot-radius sphere of poisonous, yellow-green fog centered on a point you choose within range. The fog spreads around corners. It lasts for the duration or until strong wind disperses the fog, ending the spell. Its area is heavily obscured.",
                "When a creature enters the spell's area for the first time on a turn or starts its turn there, that creature must make a constitution saving throw. The creature takes 5d8 poison damage on a failed save, or half as much damage on a successful one. Creatures are affected even if they hold their breath or don't need to breathe.",
                "The fog moves 10 feet away from you at the start of each of your turns, rolling along the surface of the ground. The vapors, being heavier than air, sink to the lowest level of the land, even pouring down openings."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 5,
            "damage": {
                "damage_type": {
                    "index": "poison",
                    "name": "Poison",
                    "url": "/api/2014/damage-types/poison"
                },
                "damage_at_slot_level": {
                    "5": "5d8",
                    "6": "6d8",
                    "7": "7d8",
                    "8": "8d8",
                    "9": "9d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half",
                "desc": "Creatures are affected even if they hold their breath or don't need to breathe."
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Conjuration"
        },
        {
            "name": "Cone of Cold",
            "desc": [
                "A blast of cold air erupts from your hands. Each creature in a 60-foot cone must make a constitution saving throw. A creature takes 8d8 cold damage on a failed save, or half as much damage on a successful one.",
                "A creature killed by this spell becomes a frozen statue until it thaws."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A small crystal or glass cone.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 5,
            "damage": {
                "damage_type": {
                    "index": "cold",
                    "name": "Cold",
                    "url": "/api/2014/damage-types/cold"
                },
                "damage_at_slot_level": {
                    "5": "8d8",
                    "6": "9d8",
                    "7": "10d8",
                    "8": "11d8",
                    "9": "12d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half",
                "desc": "A creature killed by this spell becomes a frozen statue until it thaws."
            },
            "area_of_effect": {
                "type": "cone",
                "size": 60
            },
            "school": "Evocation"
        },
        {
            "name": "Creation",
            "desc": [
                "You pull wisps of shadow material from the Shadowfell to create a nonliving object of vegetable matter within range: soft goods, rope, wood, or something similar. You can also use this spell to create mineral objects such as stone, crystal, or metal. The object created must be no larger than a 5-foot cube, and the object must be of a form and material that you have seen before.",
                "The duration depends on the object's material. If the object is composed of multiple materials, use the shortest duration.",
                "| Material | Duration |",
                "|---|---|",
                "| Vegetable matter | 1 day |",
                "| Stone or crystal | 12 hours |",
                "| Precious metals | 1 hour |",
                "| Gems | 10 minutes |",
                "| Adamantine or mithral | 1 minute |",
                "Using any material created by this spell as another spell's material component causes that spell to fail."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 6th level or higher, the cube increases by 5 feet for each slot level above 5th."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A tiny piece of matter of the same type of the item you plan to create.",
            "ritual": false,
            "duration": "Special",
            "concentration": false,
            "casting_time": "1 minute",
            "level": 5,
            "area_of_effect": {
                "type": "cube",
                "size": 5
            },
            "school": "Illusion"
        },
        {
            "name": "Dominate Person",
            "desc": [
                "You attempt to beguile a humanoid that you can see within range. It must succeed on a wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.",
                "While the target is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as \"Attack that creature,\" \"Run over there,\" or \"Fetch that object.\" If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.",
                "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time you can also cause the creature to use a reaction, but this requires you to use your own reaction as well.",
                "Each time the target takes damage, it makes a new wisdom saving throw against the spell. If the saving throw succeeds, the spell ends."
            ],
            "higher_level": [
                "When you cast this spell using a 6th-level spell slot, the duration is concentration, up to 10 minutes. When you use a 7th-level spell slot, the duration is concentration, up to 1 hour. When you use a spell slot of 8th level or higher, the duration is concentration, up to 8 hours."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 5,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "other",
                "desc": "Each time the target takes damage, it makes a new wisdom saving throw against the spell. If the saving throw succeeds, the spell ends."
            },
            "school": "Enchantment"
        },
        {
            "name": "Hold Monster",
            "desc": [
                "Choose a creature you can see and reach. The target must make a saving throw of Wisdom or be paralyzed for the duration of the spell. This spell has no effect against the undead. At the end of each round, the target can make a new saving throw of Wisdom. If successful, the spell ends for the creature."
            ],
            "higher_level": [
                "When you cast this spell using a level 6 or higher location, you can target an additional creature for each level of location beyond the fifth. The creatures must be within 30 feet o f each other when you target them."
            ],
            "range": "90 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A small piece of iron.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 5,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "school": "Enchantment"
        },
        {
            "name": "Insect Plague",
            "desc": [
                "Swarming, biting locusts fill a 20-foot-radius sphere centered on a point you choose within range. The sphere spreads around corners. The sphere remains for the duration, and its area is lightly obscured. The sphere's area is difficult terrain.",
                "When the area appears, each creature in it must make a constitution saving throw. A creature takes 4d10 piercing damage on a failed save, or half as much damage on a successful one. A creature must also make this saving throw when it enters the spell's area for the first time on a turn or ends its turn there."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d10 for each slot level above 5th."
            ],
            "range": "300 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A few grains of sugar, some kernels of grain, and a smear of fat.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 5,
            "damage": {
                "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                },
                "damage_at_slot_level": {
                    "5": "4d10",
                    "6": "5d10",
                    "7": "6d10",
                    "8": "7d10",
                    "9": "8d10"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Seeming",
            "desc": [
                "This spell allows you to change the appearance of any number of creatures that you can see within range. You give each target you choose a new, illusory appearance. An unwilling target can make a charisma saving throw, and if it succeeds, it is unaffected by this spell.",
                "The spell disguises physical appearance as well as clothing, armor, weapons, and equipment. You can make each creature seem 1 foot shorter or taller and appear thin, fat, or in between. You can't change a target's body type, so you must choose a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you. The spell lasts for the duration, unless you use your action to dismiss it sooner.",
                "The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to a creature's outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel the creature's head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.",
                "A creature can use its action to inspect a target and make an Intelligence (Investigation) check against your spell save DC. If it succeeds, it becomes aware that the target is disguised."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 5,
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Telekinesis",
            "desc": [
                "You gain the ability to move or manipulate creatures or objects by thought. When you cast the spell, and as your action each round for the duration, you can exert your will on one creature or object that you can see within range, causing the appropriate effect below. You can affect the same target round after round, or choose a new one at any time. If you switch targets, the prior target is no longer affected by the spell.",
                "***Creature.*** You can try to move a Huge or smaller creature. Make an ability check with your spellcasting ability contested by the creature's Strength check. If you win the contest, you move the creature up to 30 feet in any direction, including upward but not beyond the range of this spell. Until the end of your next turn, the creature is restrained in your telekinetic grip. A creature lifted upward is suspended in mid-air.",
                "On subsequent rounds, you can use your action to attempt to maintain your telekinetic grip on the creature by repeating the contest.",
                "***Object.*** You can try to move an object that weighs up to 1,000 pounds. If the object isn't being worn or carried, you automatically move it up to 30 feet in any direction, but not beyond the range of this spell.",
                "If the object is worn or carried by a creature, you must make an ability check with your spellcasting ability contested by that creature's Strength check. If you succeed, you pull the object away from that creature and can move it up to 30 feet in any direction but not beyond the range of this spell.",
                "You can exert fine control on objects with your telekinetic grip, such as manipulating a simple tool, opening a door or a container, stowing or retrieving an item from an open container, or pouring the contents from a vial."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 5,
            "area_of_effect": {
                "type": "sphere",
                "size": 30
            },
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Teleportation Circle",
            "desc": [
                "As you cast the spell, you draw a 10-foot-diameter circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice whose sigil sequence you know and that is on the same plane of existence as you. A shimmering portal opens within the circle you drew and remains open until the end of your next turn. Any creature that enters the portal instantly appears within 5 feet of the destination circle or in the nearest unoccupied space if that space is occupied.",
                "Many major temples, guilds, and other important places have permanent teleportation circles inscribed somewhere within their confines. Each such circle includes a unique sigil sequence--a string of magical runes arranged in a particular pattern. When you first gain the ability to cast this spell, you learn the sigil sequences for two destinations on the Material Plane, determined by the GM. You can learn additional sigil sequences during your adventures. You can commit a new sigil sequence to memory after studying it for 1 minute.",
                "You can create a permanent teleportation circle by casting this spell in the same location every day for one year. You need not use the circle to teleport when you cast the spell in this way."
            ],
            "range": "10 feet",
            "components": [
                "V",
                "M"
            ],
            "material": "Rare chalks and inks infused with precious gems with 50 gp, which the spell consumes.",
            "ritual": false,
            "duration": "1 round",
            "concentration": false,
            "casting_time": "1 minute",
            "level": 5,
            "area_of_effect": {
                "type": "sphere",
                "size": 10
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Wall of Stone",
            "desc": [
                "A nonmagical wall of solid stone springs into existence at a point you choose within range. The wall is 6 inches thick and is composed of ten 10-foot-by-10-foot panels. Each panel must be contiguous with at least one other panel. Alternatively, you can create 10-foot-by-20-foot panels that are only 3 inches thick.",
                "If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (your choice). If a creature would be surrounded on all sides by the wall (or the wall and another solid surface), that creature can make a dexterity saving throw. On a success, it can use its reaction to move up to its speed so that it is no longer enclosed by the wall.",
                "The wall can have any shape you desire, though it can't occupy the same space as a creature or object. The wall doesn't need to be vertical or rest on any firm foundation. It must, however, merge with and be solidly supported by existing stone. Thus, you can use this spell to bridge a chasm or create a ramp.",
                "If you create a span greater than 20 feet in length, you must halve the size of each panel to create supports. You can crudely shape the wall to create crenellations, battlements, and so on.",
                "The wall is an object made of stone that can be damaged and thus breached. Each panel has AC 15 and 30 hit points per inch of thickness. Reducing a panel to 0 hit points destroys it and might cause connected panels to collapse at the GM's discretion.",
                "If you maintain your concentration on this spell for its whole duration, the wall becomes permanent and can't be dispelled. Otherwise, the wall disappears when the spell ends."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A small block of granite.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 5,
            "school": "Evocation"
        },
        {
            "name": "Chain Lightning",
            "desc": [
                "You create a bolt of lightning that arcs toward a target of your choice that you can see within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.",
                "A target must make a dexterity saving throw. The target takes 10d8 lightning damage on a failed save, or half as much damage on a successful one."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 7th level or higher, one additional bolt leaps from the first target to another target for each slot level above 6th."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of fur; a piece of amber, glass, or a crystal rod; and three silver pins.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 6,
            "damage": {
                "damage_type": {
                    "index": "lightning",
                    "name": "Lightning",
                    "url": "/api/2014/damage-types/lightning"
                },
                "damage_at_slot_level": {
                    "6": "10d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "school": "Evocation"
        },
        {
            "name": "Circle of Death",
            "desc": [
                "A sphere of negative energy ripples out in a 60-foot radius sphere from a point within range. Each creature in that area must make a constitution saving throw. A target takes 8d6 necrotic damage on a failed save, or half as much damage on a successful one."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 7th level or higher, the damage increases by 2d6 for each slot level above 6th."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "The powder of a crushed black pearl worth at least 500 gp.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 6,
            "damage": {
                "damage_type": {
                    "index": "necrotic",
                    "name": "Necrotic",
                    "url": "/api/2014/damage-types/necrotic"
                },
                "damage_at_slot_level": {
                    "6": "8d6",
                    "7": "10d6",
                    "8": "12d6",
                    "9": "14d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 60
            },
            "school": "Necromancy"
        },
        {
            "name": "Disintegrate",
            "desc": [
                "A thin green ray springs from your pointing finger to a target that you can see within range. The target can be a creature, an object, or a creation of magical force, such as the wall created by wall of force.",
                "A creature targeted by this spell must make a dexterity saving throw. On a failed save, the target takes 10d6 + 40 force damage. If this damage reduces the target to 0 hit points, it is disintegrated.",
                "A disintegrated creature and everything it is wearing and carrying, except magic items, are reduced to a pile of fine gray dust. The creature can be restored to life only by means of a true resurrection or a wish spell.",
                "This spell automatically disintegrates a Large or smaller nonmagical object or a creation of magical force. If the target is a Huge or larger object or creation of force, this spell disintegrates a 10-foot-cube portion of it. A magic item is unaffected by this spell."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 7th level or higher, the damage increases by 3d6 for each slot level above 6th."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A lodestone and a pinch of dust.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 6,
            "damage": {
                "damage_type": {
                    "index": "force",
                    "name": "Force",
                    "url": "/api/2014/damage-types/force"
                },
                "damage_at_slot_level": {
                    "6": "10d6 + 40"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "none"
            },
            "area_of_effect": {
                "type": "cube",
                "size": 10
            },
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Eyebite",
            "desc": [
                "For the spell's duration, your eyes become an inky void imbued with dread power. One creature of your choice within 60 feet of you that you can see must succeed on a wisdom saving throw or be affected by one of the following effects of your choice for the duration. On each of your turns until the spell ends, you can use your action to target another creature but can't target a creature again if it has succeeded on a saving throw against this casting of eyebite.",
                "***Asleep.*** The target falls unconscious. It wakes up if it takes any damage or if another creature uses its action to shake the sleeper awake.",
                "***Panicked.*** The target is frightened of you. On each of its turns, the frightened creature must take the Dash action and move away from you by the safest and shortest available route, unless there is nowhere to move. If the target moves to a place at least 60 feet away from you where it can no longer see you, this effect ends.",
                "***Sickened.*** The target has disadvantage on attack rolls and ability checks. At the end of each of its turns, it can make another wisdom saving throw. If it succeeds, the effect ends."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 6,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none",
                "desc": "On failure, the target can be affected by one of the following effects of your choice for the duration. [Asleep. The target falls unconscious. It wakes up if it takes any damage or if another creature uses its action to shake the sleeper awake.] [Panicked. The target is frightened of you. On each of its turns, the frightened creature must take the Dash action and move away from you by the safest and shortest available route, unless there is nowhere to move. If the target moves to a place at least 60 feet away from you where it can no longer see you, this effect ends.] [Sickened. The target has disadvantage on attack rolls and ability checks. At the end of each of its turns, it can make another wisdom saving throw. If it succeeds, the effect ends.]"
            },
            "school": "Necromancy"
        },
        {
            "name": "Globe of Invulnerability",
            "desc": [
                "An immobile, faintly shimmering barrier springs into existence in a 10-foot radius around you and remains for the duration.",
                "Any spell of 5th level or lower cast from outside the barrier can't affect creatures or objects within it, even if the spell is cast using a higher level spell slot. Such a spell can target creatures and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded from the areas affected by such spells."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 7th level or higher, the barrier blocks spells of one level higher for each slot level above 6th."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A glass or crystal bead that shatters when the spell ends.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 6,
            "area_of_effect": {
                "type": "sphere",
                "size": 10
            },
            "school": "Abjuration"
        },
        {
            "name": "Mass Suggestion",
            "desc": [
                "You suggest a course of activity (limited to a sentence or two) and magically influence up to twelve creatures of your choice that you can see within range and that can hear and understand you. Creatures that can't be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable. Asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act automatically negates the effect of the spell.",
                "Each target must make a wisdom saving throw. On a failed save, it pursues the course of action you described to the best of its ability. The suggested course of action can continue for the entire duration. If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do.",
                "You can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a group of soldiers give all their money to the first beggar they meet. If the condition isn't met before the spell ends, the activity isn't performed.",
                "If you or any of your companions damage a creature affected by this spell, the spell ends for that creature."
            ],
            "higher_level": [
                "When you cast this spell using a 7th-level spell slot, the duration is 10 days. When you use an 8th-level spell slot, the duration is 30 days. When you use a 9th-level spell slot, the duration is a year and a day."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "M"
            ],
            "material": "A snake's tongue and either a bit of honeycomb or a drop of sweet oil.",
            "ritual": false,
            "duration": "24 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 6,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Move Earth",
            "desc": [
                "Choose an area of terrain no larger than 40 feet on a side within range. You can reshape dirt, sand, or clay in the area in any manner you choose for the duration. You can raise or lower the area's elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can't exceed half the area's largest dimension. So, if you affect a 40-foot square, you can create a pillar up to 20 feet high, raise or lower the square's elevation by up to 20 feet, dig a trench up to 20 feet deep, and so on. It takes 10 minutes for these changes to complete.",
                "At the end of every 10 minutes you spend concentrating on the spell, you can choose a new area of terrain to affect.",
                "Because the terrain's transformation occurs slowly, creatures in the area can't usually be trapped or injured by the ground's movement.",
                "This spell can't manipulate natural stone or stone construction. Rocks and structures shift to accommodate the new terrain. If the way you shape the terrain would make a structure unstable, it might collapse.",
                "Similarly, this spell doesn't directly affect plant growth. The moved earth carries any plants along with it."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "An iron blade and a small bag containing a mixture of soils--clay, loam, and sand.",
            "ritual": false,
            "duration": "Up to 2 hours",
            "concentration": true,
            "casting_time": "1 action",
            "level": 6,
            "area_of_effect": {
                "type": "cone",
                "size": 40
            },
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Sunbeam",
            "desc": [
                "A beam of brilliant light flashes out from your hand in a 5-foot-wide, 60-foot-long line. Each creature in the line must make a constitution saving throw. On a failed save, a creature takes 6d8 radiant damage and is blinded until your next turn. On a successful save, it takes half as much damage and isn't blinded by this spell. Undead and oozes have disadvantage on this saving throw.",
                "You can create a new line of radiance as your action on any turn until the spell ends.",
                "For the duration, a mote of brilliant radiance shines in your hand. It sheds bright light in a 30-foot radius and dim light for an additional 30 feet. This light is sunlight."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A magnifying glass.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 6,
            "damage": {
                "damage_type": {
                    "index": "radiant",
                    "name": "Radiant",
                    "url": "/api/2014/damage-types/radiant"
                },
                "damage_at_slot_level": {
                    "6": "6d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half",
                "desc": "On a failed save, the creature is blinded until your next turn. On a successful save, it isn't blinded by this spell."
            },
            "area_of_effect": {
                "type": "line",
                "size": 60
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "True Seeing",
            "desc": [
                "This spell gives the willing creature you touch the ability to see things as they actually are. For the duration, the creature has truesight, notices secret doors hidden by magic, and can see into the Ethereal Plane, all out to a range of 120 feet."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "An ointment for the eyes that costs 25gp; is made from mushroom powder, saffron, and fat; and is consumed by the spell.",
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 6,
            "school": "Divination"
        },
        {
            "name": "Delayed Blast Fireball",
            "desc": [
                "A beam of yellow light flashes from your pointing finger, then condenses to linger at a chosen point within range as a glowing bead for the duration. When the spell ends, either because your concentration is broken or because you decide to end it, the bead blossoms with a low roar into an explosion of flame that spreads around corners. Each creature in a 20-foot-radius sphere centered on that point must make a dexterity saving throw. A creature takes fire damage equal to the total accumulated damage on a failed save, or half as much damage on a successful one.",
                "The spell's base damage is 12d6. If at the end of your turn the bead has not yet detonated, the damage increases by 1d6.",
                "If the glowing bead is touched before the interval has expired, the creature touching it must make a dexterity saving throw. On a failed save, the spell ends immediately, causing the bead to erupt in flame. On a successful save, the creature can throw the bead up to 40 feet. When it strikes a creature or a solid object, the spell ends, and the bead explodes.",
                "The fire damages objects in the area and ignites flammable objects that aren't being worn or carried."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 8th level or higher, the base damage increases by 1d6 for each slot level above 7th."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A tiny ball of bat guano and sulfur.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 7,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "7": "12d6",
                    "8": "13d6",
                    "9": "14d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Evocation"
        },
        {
            "name": "Etherealness",
            "desc": [
                "You step into the border regions of the Ethereal Plane, in the area where it overlaps with your current plane. You remain in the Border Ethereal for the duration or until you use your action to dismiss the spell. During this time, you can move in any direction. If you move up or down, every foot of movement costs an extra foot. You can see and hear the plane you originated from, but everything there looks gray, and you can't see anything more than 60 feet away.",
                "While on the Ethereal Plane, you can only affect and be affected by other creatures on that plane. Creatures that aren't on the Ethereal Plane can't perceive you and can't interact with you, unless a special ability or magic has given them the ability to do so.",
                "You ignore all objects and effects that aren't on the Ethereal Plane, allowing you to move through objects you perceive on the plane you originated from.",
                "When the spell ends, you immediately return to the plane you originated from in the spot you currently occupy. If you occupy the same spot as a solid object or creature when this happens, you are immediately shunted to the nearest unoccupied space that you can occupy and take force damage equal to twice the number of feet you are moved.",
                "This spell has no effect if you cast it while you are on the Ethereal Plane or a plane that doesn't border it, such as one of the Outer Planes."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 8th level or higher, you can target up to three willing creatures (including you) for each slot level above 7th. The creatures must be within 10 feet of you when you cast the spell."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 7,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Finger of Death",
            "desc": [
                "You send negative energy coursing through a creature that you can see within range, causing it searing pain. The target must make a constitution saving throw. It takes 7d8 + 30 necrotic damage on a failed save, or half as much damage on a successful one.",
                "A humanoid killed by this spell rises at the start of your next turn as a zombie that is permanently under your command, following your verbal orders to the best of its ability."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 7,
            "damage": {
                "damage_type": {
                    "index": "necrotic",
                    "name": "Necrotic",
                    "url": "/api/2014/damage-types/necrotic"
                },
                "damage_at_slot_level": {
                    "7": "7d8 + 30"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half"
            },
            "school": "Necromancy"
        },
        {
            "higher_level": [],
            "name": "Fire Storm",
            "desc": [
                "A storm made up of sheets of roaring flame appears in a location you choose within range. The area of the storm consists of up to ten 10-foot cubes, which you can arrange as you wish. Each cube must have at least one face adjacent to the face of another cube. Each creature in the area must make a dexterity saving throw. It takes 7d10 fire damage on a failed save, or half as much damage on a successful one.",
                "The fire damages objects in the area and ignites flammable objects that aren't being worn or carried. If you choose, plant life in the area is unaffected by this spell."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 7,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "7": "7d10"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "cube",
                "size": 100
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Plane Shift",
            "desc": [
                "You and up to eight willing creatures who link hands in a circle are transported to a different plane of existence. You can specify a target destination in general terms, such as the City of Brass on the Elemental Plane of Fire or the palace of Dispater on the second level of the Nine Hells, and you appear in or near that destination. If you are trying to reach the City of Brass, for example, you might arrive in its Street of Steel, before its Gate of Ashes, or looking at the city from across the Sea of Fire, at the GM's discretion.",
                "Alternatively, if you know the sigil sequence of a teleportation circle on another plane of existence, this spell can take you to that circle. If the teleportation circle is too small to hold all the creatures you transported, they appear in the closest unoccupied spaces next to the circle.",
                "You can use this spell to banish an unwilling creature to another plane. Choose a creature within your reach and make a melee spell attack against it. On a hit, the creature must make a charisma saving throw. If the creature fails this save, it is transported to a random location on the plane of existence you specify. A creature so transported must find its own way back to your current plane of existence."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A forked, metal rod worth at least 250 gp, attuned to a particular plane of existence.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 7,
            "attack_type": "melee",
            "dc": {
                "dc_type": {
                    "index": "cha",
                    "name": "CHA",
                    "url": "/api/2014/ability-scores/cha"
                },
                "dc_success": "none",
                "desc": "If the creature fails this save, it is transported to a random location on the plane of existence you specify. A creature so transported must find its own way back to your current plane of existence."
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Prismatic Spray",
            "desc": [
                "Eight multicolored rays of light flash from your hand. Each ray is a different color and has a different power and purpose. Each creature in a 60-foot cone must make a dexterity saving throw. For each target, roll a d8 to determine which color ray affects it.",
                "***1. Red.*** The target takes 10d6 fire damage on a failed save, or half as much damage on a successful one.",
                "***2. Orange.*** The target takes 10d6 acid damage on a failed save, or half as much damage on a successful one.",
                "***3. Yellow.*** The target takes 10d6 lightning damage on a failed save, or half as much damage on a successful one.",
                "***4. Green.*** The target takes 10d6 poison damage on a failed save, or half as much damage on a successful one.",
                "***5. Blue.*** The target takes 10d6 cold damage on a failed save, or half as much damage on a successful one.",
                "***6. Indigo.*** On a failed save, the target is restrained. It must then make a constitution saving throw at the end of each of its turns. If it successfully saves three times, the spell ends. If it fails its save three times, it permanently turns to stone and is subjected to the petrified condition. The successes and failures don't need to be consecutive; keep track of both until the target collects three of a kind.",
                "***7. Violet.*** On a failed save, the target is blinded. It must then make a wisdom saving throw at the start of your next turn. A successful save ends the blindness. If it fails that save, the creature is transported to another plane of existence of the GM's choosing and is no longer blinded. (Typically, a creature that is on a plane that isn't its home plane is banished home, while other creatures are usually cast into the Astral or Ethereal planes.)",
                "***8. Special.*** The target is struck by two rays. Roll twice more, rerolling any 8."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 7,
            "damage": {
                "damage_at_slot_level": {
                    "7": "10d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "other",
                "desc": "For each target, roll a d8 to determine which color ray affects it."
            },
            "area_of_effect": {
                "type": "cone",
                "size": 60
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Reverse Gravity",
            "desc": [
                "This spell reverses gravity in a 50-foot-radius, 100-foot high cylinder centered on a point within range. All creatures and objects that aren't somehow anchored to the ground in the area fall upward and reach the top of the area when you cast this spell. A creature can make a dexterity saving throw to grab onto a fixed object it can reach, thus avoiding the fall.",
                "If some solid object (such as a ceiling) is encountered in this fall, falling objects and creatures strike it just as they would during a normal downward fall. If an object or creature reaches the top of the area without striking anything, it remains there, oscillating slightly, for the duration.",
                "At the end of the duration, affected objects and creatures fall back down."
            ],
            "range": "100 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A lodestone and iron filings.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 7,
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "other",
                "desc": "A creature can make a dexterity saving throw to grab onto a fixed object it can reach, thus avoiding the fall."
            },
            "area_of_effect": {
                "type": "cylinder",
                "size": 50
            },
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Teleport",
            "desc": [
                "This spell instantly transports you and up to eight willing creatures of your choice that you can see within range, or a single object that you can see within range, to a destination you select. If you target an object, it must be able to fit entirely inside a 10-foot cube, and it can't be held or carried by an unwilling creature.",
                "The destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully. The GM rolls d100 and consults the table.",
                "| Familiarity | Mishap | Similar Area | Off Target | On Target |",
                "|---|---|---|---|---|",
                "| Permanent circle | -- | -- | -- | 01-100 |",
                "| Associated object | -- | -- | -- | 01-100 |",
                "| Very familiar | 01-05 | 06-13 | 14-24 | 25-100 |",
                "| Seen casually | 01-33 | 34-43 | 44-53 | 54-100 |",
                "| Viewed once | 01-43 | 44-53 | 54-73 | 74-100 |",
                "| Description | 01-43 | 44-53 | 54-73 | 74-100 |",
                "| False destination | 01-50 | 51-100 | -- | -- |",
                "***Familiarity.*** \"Permanent circle\" means a permanent teleportation circle whose sigil sequence you know.",
                "\"Associated object\" means that you possess an object taken from the desired destination within the last six months, such as a book from a wizard's library, bed linen from a royal suite, or a chunk of marble from a lich's secret tomb.",
                "\"Very familiar\" is a place you have been very often, a place you have carefully studied, or a place you can see when you cast the spell.",
                "\"Seen casually\" is someplace you have seen more than once but with which you aren't very familiar.",
                "\"Viewed once\" is a place you have seen once, possibly using magic.",
                "\"Description\" is a place whose location and appearance you know through someone else's description, perhaps from a map.",
                "\"False destination\" is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a familiar location that no longer exists.",
                "***On Target.*** You and your group (or the target object) appear where you want to.",
                "***Off Target.*** You and your group (or the target object) appear a random distance away from the destination in a random direction. Distance off target is 1d10 x 1d10 percent of the distance that was to be traveled. For example, if you tried to travel 120 miles, landed off target, and rolled a 5 and 3 on the two d10s, then you would be off target by 15 percent, or 18 miles. The GM determines the direction off target randomly by rolling a d8 and designating 1 as north, 2 as northeast, 3 as east, and so on around the points of the compass.  If you were teleporting to a coastal city and wound up 18 miles out at sea, you could be in trouble.",
                "***Similar Area.*** You and your group (or the target object) wind up in a different area that's visually or thematically similar to the target area. If you are heading for your home laboratory, for example, you might wind up in another wizard's laboratory or in an alchemical supply shop that has many of the same tools and implements as your laboratory. Generally, you appear in the closest similar place, but since the spell has no range limit, you could conceivably wind up anywhere on the plane.",
                "***Mishap.*** The spell's unpredictable magic results in a difficult journey. Each teleporting creature (or the target object) takes 3d10 force damage, and the GM rerolls on the table to see where you wind up (multiple mishaps can occur, dealing damage each time)."
            ],
            "range": "10 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 7,
            "area_of_effect": {
                "type": "cube",
                "size": 10
            },
            "school": "Conjuration"
        },
        {
            "name": "Dominate Monster",
            "desc": [
                "You attempt to beguile a creature that you can see within range. It must succeed on a wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.",
                "While the creature is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as \"Attack that creature,\" \"Run over there,\" or \"Fetch that object.\" If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.",
                "You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well.",
                "Each time the target takes damage, it makes a new wisdom saving throw against the spell. If the saving throw succeeds, the spell ends."
            ],
            "higher_level": [
                "When you cast this spell with a 9th-level spell slot, the duration is concentration, up to 8 hours."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 8,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none",
                "desc": "On failure, the creature is charmed by you for the duration."
            },
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Earthquake",
            "desc": [
                "You create a seismic disturbance at a point on the ground that you can see within range. For the duration, an intense tremor rips through the ground in a 100-foot-radius circle centered on that point and shakes creatures and structures in contact with the ground in that area.",
                "The ground in the area becomes difficult terrain. Each creature on the ground that is concentrating must make a constitution saving throw. On a failed save, the creature's concentration is broken.",
                "When you cast this spell and at the end of each turn you spend concentrating on it, each creature on the ground in the area must make a dexterity saving throw. On a failed save, the creature is knocked prone.",
                "This spell can have additional effects depending on the terrain in the area, as determined by the GM.",
                "Fissures. Fissures open throughout the spell's area at the start of your next turn after you cast the spell. A total of 1d6 such fissures open in locations chosen by the GM. Each is 1d10 x 10 feet deep, 10 feet wide, and extends from one edge of the spell's area to the opposite side. A creature standing on a spot where a fissure opens must succeed on a dexterity saving throw or fall in. A creature that successfully saves moves with the fissure's edge as it opens.",
                "A fissure that opens beneath a structure causes it to automatically collapse (see below).",
                "Structures. The tremor deals 50 bludgeoning damage to any structure in contact with the ground in the area when you cast the spell and at the start of each of your turns until the spell ends. If a structure drops to 0 hit points, it collapses and potentially damages nearby creatures. A creature within half the distance of a structure's height must make a dexterity saving throw. On a failed save, the creature takes 5d6 bludgeoning damage, is knocked prone, and is buried in the rubble, requiring a DC 20 Strength (Athletics) check as an action to escape. The GM can adjust the DC higher or lower, depending on the nature of the rubble. On a successful save, the creature takes half as much damage and doesn't fall prone or become buried."
            ],
            "range": "500 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of dirt, a piece of rock, and a lump of clay.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 8,
            "area_of_effect": {
                "type": "sphere",
                "size": 100
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Incendiary Cloud",
            "desc": [
                "A swirling cloud of smoke shot through with white-hot embers appears in a 20-foot-radius sphere centered on a point within range. The cloud spreads around corners and is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.",
                "When the cloud appears, each creature in it must make a dexterity saving throw. A creature takes 10d8 fire damage on a failed save, or half as much damage on a successful one. A creature must also make this saving throw when it enters the spell's area for the first time on a turn or ends its turn there.",
                "The cloud moves 10 feet directly away from you in a direction that you choose at the start of each of your turns."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 8,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "8": "10d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Power Word Stun",
            "desc": [
                "You speak a word of power that can overwhelm the mind of one creature you can see within range, leaving it dumbfounded. If the target has 150 hit points or fewer, it is stunned. Otherwise, the spell has no effect.",
                "The stunned target must make a constitution saving throw at the end of each of its turns. On a successful save, this stunning effect ends."
            ],
            "range": "60 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 8,
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Sunburst",
            "desc": [
                "Brilliant sunlight flashes in a 60-foot radius centered on a point you choose within range. Each creature in that light must make a constitution saving throw. On a failed save, a creature takes 12d6 radiant damage and is blinded for 1 minute. On a successful save, it takes half as much damage and isn't blinded by this spell. Undead and oozes have disadvantage on this saving throw.",
                "A creature blinded by this spell makes another constitution saving throw at the end of each of its turns. On a successful save, it is no longer blinded.",
                "This spell dispels any darkness in its area that was created by a spell."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Fire and a piece of sunstone.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 8,
            "damage": {
                "damage_type": {
                    "index": "radiant",
                    "name": "Radiant",
                    "url": "/api/2014/damage-types/radiant"
                },
                "damage_at_slot_level": {
                    "8": "12d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "dc_success": "half",
                "desc": "On failure, the creature is also blinded for 1 minute."
            },
            "area_of_effect": {
                "type": "cylinder",
                "size": 60
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Gate",
            "desc": [
                "You conjure a portal linking an unoccupied space you can see within range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter. You can orient the portal in any direction you choose. The portal lasts for the duration.",
                "The portal has a front and a back on each plane where it appears. Travel through the portal is possible only by moving through its front. Anything that does so is instantly transported to the other plane, appearing in the unoccupied space nearest to the portal.",
                "Deities and other planar rulers can prevent portals created by this spell from opening in their presence or anywhere within their domains.",
                "When you cast this spell, you can speak the name of a specific creature (a pseudonym, title, or nickname doesn't work). If that creature is on a plane other than the one you are on, the portal opens in the named creature's immediate vicinity and draws the creature through it to the nearest unoccupied space on your side of the portal. You gain no special power over the creature, and it is free to act as the GM deems appropriate. It might leave, attack you, or help you."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A diamond worth at least 5,000gp.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 9,
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Meteor Swarm",
            "desc": [
                "Blazing orbs of fire plummet to the ground at four different points you can see within range. Each creature in a 40-foot-radius sphere centered on each point you choose must make a dexterity saving throw. The sphere spreads around corners. A creature takes 20d6 fire damage and 20d6 bludgeoning damage on a failed save, or half as much damage on a successful one. A creature in the area of more than one fiery burst is affected only once.",
                "The spell damages objects in the area and ignites flammable objects that aren't being worn or carried."
            ],
            "range": "1 mile",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 9,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "9": "20d6 + 20d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "sphere",
                "size": 40
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Power Word Kill",
            "desc": [
                "You utter a word of power that can compel one creature you can see within range to die instantly. If the creature you choose has 100 hit points or fewer, it dies. Otherwise, the spell has no effect."
            ],
            "range": "60 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 9,
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Time Stop",
            "desc": [
                "You briefly stop the flow of time for everyone but yourself. No time passes for other creatures, while you take 1d4 + 1 turns in a row, during which you can use actions and move as normal.",
                "This spell ends if one of the actions you use during this period, or any effects that you create during this period, affects a creature other than you or an object being worn or carried by someone other than you. In addition, the spell ends if you move to a place more than 1,000 feet from the location where you cast it."
            ],
            "range": "Self",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 9,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Wish",
            "desc": [
                "Wish is the mightiest spell a mortal creature can cast. By simply speaking aloud, you can alter the very foundations of reality in accord with your desires.",
                "The basic use of this spell is to duplicate any other spell of 8th level or lower. You don't need to meet any requirements in that spell, including costly components. The spell simply takes effect.",
                "Alternatively, you can create one of the following effects of your choice:",
                "- You create one object of up to 25,000 gp in value that isn't a magic item. The object can be no more than 300 feet in any dimension, and it appears in an unoccupied space you can see on the ground.",
                "- You allow up to twenty creatures that you can see to regain all hit points, and you end all effects on them described in the greater restoration spell.",
                "- You grant up to ten creatures that you can see resistance to a damage type you choose.",
                "- You grant up to ten creatures you can see immunity to a single spell or other magical effect for 8 hours. For instance, you could make yourself and all your companions immune to a lich's life drain attack.",
                "- You undo a single recent event by forcing a reroll of any roll made within the last round (including your last turn). Reality reshapes itself to accommodate the new result. For example, a wish spell could undo an opponent's successful save, a foe's critical hit, or a friend's failed save. You can force the reroll to be made with advantage or disadvantage, and you can choose whether to use the reroll or the original roll.",
                "You might be able to achieve something beyond the scope of the above examples. State your wish to the GM as precisely as possible. The GM has great latitude in ruling what occurs in such an instance; the greater the wish, the greater the likelihood that something goes wrong. This spell might simply fail, the effect you desire might only be partly achieved, or you might suffer some unforeseen consequence as a result of how you worded the wish. For example, wishing that a villain were dead might propel you forward in time to a period when that villain is no longer alive, effectively removing you from the game. Similarly, wishing for a legendary magic item or artifact might instantly transport you to the presence of the item's current owner.",
                "The stress of casting this spell to produce any effect other than duplicating another spell weakens you. After enduring that stress, each time you cast a spell until you finish a long rest, you take 1d10 necrotic damage per level of that spell. This damage can't be reduced or prevented in any way. In addition, your Strength drops to 3, if it isn't 3 or lower already, for 2d4 days. For each of those days that you spend resting and doing nothing more than light activity, your remaining recovery time decreases by 2 days. Finally, there is a 33 percent chance that you are unable to cast wish ever again if you suffer this stress."
            ],
            "range": "Self",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 9,
            "school": "Conjuration"
        }
    ]
}