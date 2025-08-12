export const paladin = {
    "cantrips": [],
    "spells": [
        {
            "name": "Bless",
            "desc": [
                "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A sprinkling of holy water.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 1,
            "school": "Enchantment"
        },
        {
            "name": "Command",
            "desc": [
                "You speak a one-word command to a creature you can see within range. The target must succeed on a wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn't understand your language, or if your command is directly harmful to it.",
                "Some typical commands and their effects follow. You might issue a command other than one described here. If you do so, the GM determines how the target behaves. If the target can't follow your command, the spell ends.",
                "***Approach.*** The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you.",
                "***Drop.*** The target drops whatever it is holding and then ends its turn.",
                "***Flee.*** The target spends its turn moving away from you by the fastest available means.",
                "***Grovel.*** The target falls prone and then ends its turn.",
                "***Halt.*** The target doesn't move and takes no actions. A flying creature stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them."
            ],
            "range": "60 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "1 round",
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
            "name": "Cure Wounds",
            "desc": [
                "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st."
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
            "level": 1,
            "heal_at_slot_level": {
                "1": "1d8 + MOD",
                "2": "2d8 + MOD",
                "3": "3d8 + MOD",
                "4": "4d8 + MOD",
                "5": "5d8 + MOD",
                "6": "6d8 + MOD",
                "7": "7d8 + MOD",
                "8": "8d8 + MOD",
                "9": "9d8 + MOD"
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Detect Evil and Good",
            "desc": [
                "For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet of you, as well as where the creature is located. Similarly, you know if there is a place or object within 30 feet of you that has been magically consecrated or desecrated.",
                "The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
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
            "name": "Detect Poison and Disease",
            "desc": [
                "For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you. You also identify the kind of poison, poisonous creature, or disease in each case.",
                "The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A yew leaf.",
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
            "name": "Divine Favor",
            "desc": [
                "Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 bonus action",
            "level": 1,
            "damage": {
                "damage_type": {
                    "index": "radiant",
                    "name": "Radiant",
                    "url": "/api/2014/damage-types/radiant"
                },
                "damage_at_slot_level": {
                    "1": "1d4"
                }
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Heroism",
            "desc": [
                "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns. When the spell ends, the target loses any remaining temporary hit points from this spell."
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
            "level": 1,
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Protection from Evil and Good",
            "desc": [
                "Until the spell ends, one willing creature you touch is protected against certain types of creatures: aberrations, celestials, elementals, fey, fiends, and undead.",
                "The protection grants several benefits. Creatures of those types have disadvantage on attack rolls against the target. The target also can't be charmed, frightened, or possessed by them. If the target is already charmed, frightened, or possessed by such a creature, the target has advantage on any new saving throw against the relevant effect."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Holy water or powdered silver and iron, which the spell consumes.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 1,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Purify Food and Drink",
            "desc": [
                "All nonmagical food and drink within a 5-foot radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease."
            ],
            "range": "10 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": true,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Shield of Faith",
            "desc": [
                "A shimmering field appears and surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A small parchment with a bit of holy text written on it.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 bonus action",
            "level": 1,
            "school": "Abjuration"
        },
        {
            "name": "Aid",
            "desc": [
                "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above 2nd."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A tiny strip of white cloth.",
            "ritual": false,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "heal_at_slot_level": {
                "2": "5",
                "3": "10",
                "4": "15",
                "5": "20",
                "6": "25",
                "7": "30",
                "8": "35",
                "9": "40"
            },
            "school": "Abjuration"
        },
        {
            "name": "Branding Smite",
            "desc": [
                "The next time you hit a creature with a weapon attack before this spell ends, the weapon gleams with astral radiance as you strike. The attack deals an extra 2d6 radiant damage to the target, which becomes visible if it's invisible, and the target sheds dim light in a 5-foot radius and can't become invisible until the spell ends."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 3rd level or higher, the extra damage increases by 1d6 for each slot level above 2nd."
            ],
            "range": "Self",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 bonus action",
            "level": 2,
            "damage": {
                "damage_type": {
                    "index": "radiant",
                    "name": "Radiant",
                    "url": "/api/2014/damage-types/radiant"
                },
                "damage_at_slot_level": {
                    "2": "2d6",
                    "3": "3d6",
                    "4": "4d6",
                    "5": "5d6",
                    "6": "6d6",
                    "7": "7d6",
                    "8": "8d6",
                    "9": "9d6"
                }
            },
            "school": "Evocation"
        },
        {
            "higher_level": [],
            "name": "Find Steed",
            "desc": [
                "You summon a spirit that assumes the form of an unusually intelligent, strong, and loyal steed, creating a long-lasting bond with it. Appearing in an unoccupied space within range, the steed takes on a form that you choose, such as a warhorse, a pony, a camel, an elk, or a mastiff. (Your GM might allow other animals to be summoned as steeds.) The steed has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of its normal type. Additionally, if your steed has an Intelligence of 5 or less, its Intelligence becomes 6, and it gains the ability to understand one language of your choice that you speak.",
                "Your steed serves you as a mount, both in combat and out, and you have an instinctive bond with it that allows you to fight as a seamless unit. While mounted on your steed, you can make any spell you cast that targets only you also target your steed.",
                "When the steed drops to 0 hit points, it disappears, leaving behind no physical form. You can also dismiss your steed at any time as an action, causing it to disappear. In either case, casting this spell again summons the same steed, restored to its hit point maximum.",
                "While your steed is within 1 mile of you, you can communicate with it telepathically.",
                "You can't have more than one steed bonded by this spell at a time. As an action, you can release the steed from its bond at any time, causing it to disappear."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "10 minutes",
            "level": 2,
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Lesser Restoration",
            "desc": [
                "You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned."
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
            "level": 2,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Locate Object",
            "desc": [
                "Describe or name an object that is familiar to you. You sense the direction to the object's location, as long as that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement.",
                "The spell can locate a specific object known to you, as long as you have seen it up close--within 30 feet--at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon.",
                "This spell can't locate an object if any thickness of lead, even a thin sheet, blocks a direct path between you and the object."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A forked twig.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Divination"
        },
        {
            "name": "Magic Weapon",
            "desc": [
                "You touch a nonmagical weapon. Until the spell ends, that weapon becomes a magic weapon with a +1 bonus to attack rolls and damage rolls."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 4th level or higher, the bonus increases to +2. When you use a spell slot of 6th level or higher, the bonus increases to +3."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 bonus action",
            "level": 2,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Protection from Poison",
            "desc": [
                "You touch a creature. If it is poisoned, you neutralize the poison. If more than one poison afflicts the target, you neutralize one poison that you know is present, or you neutralize one at random.",
                "For the duration, the target has advantage on saving throws against being poisoned, and it has resistance to poison damage."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Zone of Truth",
            "desc": [
                "You create a magical zone that guards against deception in a 15-foot-radius sphere centered on a point of your choice within range. Until the spell ends, a creature that enters the spell's area for the first time on a turn or starts its turn there must make a Charisma saving throw. On a failed save, a creature can't speak a deliberate lie while in the radius. You know whether each creature succeeds or fails on its saving throw.",
                "An affected creature is aware of the spell and can thus avoid answering questions to which it would normally respond with a lie. Such a creature can remain evasive in its answers as long as it remains within the boundaries of the truth."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "10 minutes",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "area_of_effect": {
                "type": "sphere",
                "size": 15
            },
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Create Food and Water",
            "desc": [
                "You create 45 pounds of food and 30 gallons of water on the ground or in containers within range, enough to sustain up to fifteen humanoids or five steeds for 24 hours. The food is bland but nourishing, and spoils if uneaten after 24 hours. The water is clean and doesn't go bad."
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
            "level": 3,
            "school": "Conjuration"
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
            "name": "Magic Circle",
            "desc": [
                "You create a 10-foot radius, 20-foot-tall cylinder of magical energy centered on a point on the ground that you can see within range. Glowing runes appear whenever the cylinder intersects with the floor or other surface.",
                "Choose one or more of the following types of creatures: celestials, elementals, fey, fiends, or undead. The circle affects a creature of the chosen type in the following ways:",
                "- The creature can't willingly enter the cylinder by nonmagical means. If the creature tries to use teleportation or interplanar travel to do so, it must first succeed on a charisma saving throw.",
                "- The creature has disadvantage on attack rolls against targets within the cylinder.",
                "- Targets within the cylinder can't be charmed, frightened, or possessed by the creature.",
                "When you cast this spell, you can elect to cause its magic to operate in the reverse direction, preventing a creature of the specified type from leaving the cylinder and protecting targets outside it."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 4th level or higher, the duration increases by 1 hour for each slot level above 3rd."
            ],
            "range": "10 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Holy water or powdered silver and iron worth at least 100 gp, which the spell consumes.",
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 minute",
            "level": 3,
            "area_of_effect": {
                "type": "cylinder",
                "size": 10
            },
            "dc": {
                "dc_type": {
                    "index": "cha",
                    "name": "CHA",
                    "url": "/api/2014/ability-scores/cha"
                },
                "dc_success": "other",
                "desc": "If the creature tries to use teleportation or interplanar travel to do so, it must first succeed on a Charisma saving throw."
            },
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Remove Curse",
            "desc": [
                "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner's attunement to the object so it can be removed or discarded."
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
            "level": 3,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Revivify",
            "desc": [
                "You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can't return to life a creature that has died of old age, nor can it restore any missing body parts."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Diamonds worth 300gp, which the spell consumes.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "school": "Conjuration"
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
            "higher_level": [],
            "name": "Death Ward",
            "desc": [
                "You touch a creature and grant it a measure of protection from death.",
                "The first time the target would drop to 0 hit points as a result of taking damage, the target instead drops to 1 hit point, and the spell ends.",
                "If the spell is still in effect when the target is subjected to an effect that would kill it instantaneously without dealing damage, that effect is instead negated against the target, and the spell ends."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 4,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Locate Creature",
            "desc": [
                "Describe or name a creature that is familiar to you. You sense the direction to the creature's location, as long as that creature is within 1,000 feet of you. If the creature is moving, you know the direction of its movement.",
                "The spell can locate a specific creature known to you, or the nearest creature of a specific kind (such as a human or a unicorn), so long as you have seen such a creature up close--within 30 feet--at least once. If the creature you described or named is in a different form, such as being under the effects of a polymorph spell, this spell doesn't locate the creature.",
                "This spell can't locate a creature if running water at least 10 feet wide blocks a direct path between you and the creature."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of fur from a bloodhound.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "school": "Divination"
        },
        {
            "higher_level": [],
            "name": "Dispel Evil and Good",
            "desc": [
                "Shimmering energy surrounds and protects you from fey, undead, and creatures originating from beyond the Material Plane. For the duration, celestials, elementals, fey, fiends, and undead have disadvantage on attack rolls against you.",
                "You can end the spell early by using either of the following special functions.",
                "***Break Enchantment.*** As your action, you touch a creature you can reach that is charmed, frightened, or possessed by a celestial, an elemental, a fey, a fiend, or an undead. The creature you touch is no longer charmed, frightened, or possessed by such creatures.",
                "***Dismissal.*** As your action, make a melee spell attack against a celestial, an elemental, a fey, a fiend, or an undead you can reach. On a hit, you attempt to drive the creature back to its home plane. The creature must succeed on a charisma saving throw or be sent back to its home plane (if it isn't there already). If they aren't on their home plane, undead are sent to the Shadowfell, and fey are sent to the Feywild."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Holy water or powdered silver and iron.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 5,
            "dc": {
                "dc_type": {
                    "index": "cha",
                    "name": "CHA",
                    "url": "/api/2014/ability-scores/cha"
                },
                "dc_success": "other",
                "desc": "The creature must succeed on a charisma saving throw or be sent back to its home plane (if it isn't there already)"
            },
            "school": "Abjuration"
        },
        {
            "name": "Geas",
            "desc": [
                "You place a magical command on a creature that you can see within range, forcing it to carry out some service or refrain from some action or course of activity as you decide. If the creature can understand you, it must succeed on a wisdom saving throw or become charmed by you for the duration. While the creature is charmed by you, it takes 5d10 psychic damage each time it acts in a manner directly counter to your instructions, but no more than once each day. A creature that can't understand you is unaffected by the spell.",
                "You can issue any command you choose, short of an activity that would result in certain death. Should you issue a suicidal command, the spell ends.",
                "You can end the spell early by using an action to dismiss it. A remove curse, greater restoration, or wish spell also ends it."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 7th or 8th level, the duration is 1 year. When you cast this spell using a spell slot of 9th level, the spell lasts until it is ended by one of the spells mentioned above."
            ],
            "range": "60 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "30 days",
            "concentration": false,
            "casting_time": "1 minute",
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
            "higher_level": [],
            "name": "Raise Dead",
            "desc": [
                "You return a dead creature you touch to life, provided that it has been dead no longer than 10 days. If the creature's soul is both willing and at liberty to rejoin the body, the creature returns to life with 1 hit point.",
                "This spell also neutralizes any poisons and cures nonmagical diseases that affected the creature at the time it died. This spell doesn't, however, remove magical diseases, curses, or similar effects; if these aren't first removed prior to casting the spell, they take effect when the creature returns to life. The spell can't return an undead creature to life.",
                "This spell closes all mortal wounds, but it doesn't restore missing body parts. If the creature is lacking body parts or organs integral for its survival--its head, for instance--the spell automatically fails.",
                "Coming back from the dead is an ordeal. The target takes a -4 penalty to all attack rolls, saving throws, and ability checks. Every time the target finishes a long rest, the penalty is reduced by 1 until it disappears."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A diamond worth at least 500gp, which the spell consumes.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 hour",
            "level": 5,
            "school": "Necromancy"
        }
    ]
}