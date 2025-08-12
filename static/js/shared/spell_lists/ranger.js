export const ranger = {
    "cantrips": [],
    "spells": [
        {
            "higher_level": [],
            "name": "Alarm",
            "desc": [
                "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible.",
                "A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.",
                "An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A tiny bell and a piece of fine silver wire.",
            "ritual": true,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 minute",
            "level": 1,
            "area_of_effect": {
                "type": "cube",
                "size": 20
            },
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Animal Friendship",
            "desc": [
                "This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast's Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a wisdom saving throw or be charmed by you for the spell's duration. If you or one of your companions harms the target, the spells ends."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A morsel of food.",
            "ritual": false,
            "duration": "24 hours",
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
            "name": "Goodberry",
            "desc": [
                "Up to ten berries appear in your hand and are infused with magic for the duration. A creature can use its action to eat one berry. Eating a berry restores 1 hit point, and the berry provides enough nourishment to sustain a creature for a day.",
                "The berries lose their potency if they have not been consumed within 24 hours of the casting of this spell."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A sprig of mistletoe.",
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": "Transmutation"
        },
        {
            "name": "Hunter's Mark",
            "desc": [
                "You choose a creature you can see within range and mystically mark it as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with a weapon attack, and you have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it. If the target drops to 0 hit points before this spell ends, you can use a bonus action on a subsequent turn of yours to mark a new creature."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your concentration on the spell for up to 8 hours. When you use a spell slot of 5th level or higher, you can maintain your concentration on the spell for up to 24 hours."
            ],
            "range": "90 feet",
            "components": [
                "V"
            ],
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 bonus action",
            "level": 1,
            "school": "Divination"
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
            "name": "Longstrider",
            "desc": [
                "You touch a creature. The target's speed increases by 10 feet until the spell ends."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each spell slot above 1st."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of dirt.",
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": "Transmutation"
        },
        {
            "higher_level": [],
            "name": "Speak with Animals",
            "desc": [
                "You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence, but at a minimum, beasts can give you information about nearby locations and monsters, including whatever they can perceive or have perceived within the past day. You might be able to persuade a beast to perform a small favor for you, at the GM's discretion."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": true,
            "duration": "10 minutes",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": "Divination"
        },
        {
            "name": "Animal Messenger",
            "desc": [
                "By means of this spell, you use an animal to deliver a message. Choose a Tiny beast you can see within range, such as a squirrel, a blue jay, or a bat. You specify a location, which you must have visited, and a recipient who matches a general description, such as \"a man or woman dressed in the uniform of the town guard\" or \"a red-haired dwarf wearing a pointed hat.\" You also speak a message of up to twenty-five words. The target beast travels for the duration of the spell toward the specified location, covering about 50 miles per 24 hours for a flying messenger, or 25 miles for other animals.",
                "When the messenger arrives, it delivers your message to the creature that you described, replicating the sound of your voice. The messenger speaks only to a creature matching the description you gave. If the messenger doesn't reach its destination before the spell ends, the message is lost, and the beast makes its way back to where you cast this spell."
            ],
            "higher_level": [
                "If you cast this spell using a spell slot of 3nd level or higher, the duration of the spell increases by 48 hours for each slot level above 2nd."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A morsel of food.",
            "ritual": true,
            "duration": "24 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "school": "Enchantment"
        },
        {
            "higher_level": [],
            "name": "Barkskin",
            "desc": [
                "You touch a willing creature. Until the spell ends, the target's skin has a rough, bark-like appearance, and the target's AC can't be less than 16, regardless of what kind of armor it is wearing."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A handful of oak bark.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Transmutation"
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
            "name": "Find Traps",
            "desc": [
                "You sense the presence of any trap within range that is within line of sight. A trap, for the purpose of this spell, includes anything that would inflict a sudden or unexpected effect you consider harmful or undesirable, which was specifically intended as such by its creator. Thus, the spell would sense an area affected by the alarm spell, a glyph of warding, or a mechanical pit trap, but it would not reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole.",
                "This spell merely reveals that a trap is present. You don't learn the location of each trap, but you do learn the general nature of the danger posed by a trap you sense."
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
            "school": "Divination"
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
            "name": "Locate Animals or Plants",
            "desc": [
                "Describe or name a specific kind of beast or plant. Concentrating on the voice of nature in your surroundings, you learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A bit of fur from a bloodhound.",
            "ritual": true,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 2,
            "school": "Divination"
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
            "higher_level": [],
            "name": "Pass Without Trace",
            "desc": [
                "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can't be tracked except by magical means. A creature that receives this bonus leaves behind no tracks or other traces of its passage."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Ashes from a burned leaf of mistletoe and a sprig of spruce.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "school": "Abjuration"
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
            "name": "Silence",
            "desc": [
                "For the duration, no sound can be created within or pass through a 20-foot-radius sphere centered on a point you choose within range. Any creature or object entirely inside the sphere is immune to thunder damage, and creatures are deafened while entirely inside it.",
                "Casting a spell that includes a verbal component is impossible there."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": true,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "area_of_effect": {
                "type": "sphere",
                "size": 20
            },
            "school": "Illusion"
        },
        {
            "higher_level": [],
            "name": "Spike Growth",
            "desc": [
                "The ground in a 20-foot radius centered on a point within range twists and sprouts hard spikes and thorns. The area becomes difficult terrain for the duration. When a creature moves into or within the area, it takes 2d4 piercing damage for every 5 feet it travels.",
                "The transformation of the ground is camouflaged to look natural. Any creature that can't see the area at the time the spell is cast can make a Wisdom (Perception) check against your spell save DC to recognize the terrain as hazardous before entering it."
            ],
            "range": "150 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "Seven sharp thorns or seven small twigs, each sharpened to a point.",
            "ritual": false,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 2,
            "area_of_effect": {
                "type": "cylinder",
                "size": 20
            },
            "school": "Transmutation"
        },
        {
            "name": "Conjure Animals",
            "desc": [
                "You summon fey spirits that take the form of beasts and appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears:",
                "- One beast of challenge rating 2 or lower",
                "- Two beasts of challenge rating 1 or lower",
                "- Four beasts of challenge rating 1/2 or lower",
                "- Eight beasts of challenge rating 1/4 or lower",
                "- Each beast is also considered fey, and it disappears when it drops to 0 hit points or when the spell ends.",
                "The summoned creatures are friendly to you and your companions. Roll initiative for the summoned creatures as a group, which has its own turns. They obey any verbal commands that you issue to them (no action required by you). If you don't issue any commands to them, they defend themselves from hostile creatures, but otherwise take no actions.",
                "The GM has the creatures' statistics."
            ],
            "higher_level": [
                "When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear: twice as many with a 5th-level slot, three times as many with a 7th-level."
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
            "higher_level": [],
            "name": "Nondetection",
            "desc": [
                "For the duration, you hide a target that you touch from divination magic. The target can be a willing creature or a place or an object no larger than 10 feet in any dimension. The target can't be targeted by any divination magic or perceived through magical scrying sensors."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of diamond dust worth 25 gp sprinkled over the target, which the spell consumes.",
            "ritual": false,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "school": "Abjuration"
        },
        {
            "higher_level": [],
            "name": "Plant Growth",
            "desc": [
                "This spell channels vitality into plants within a specific area. There are two possible uses for the spell, granting either immediate or long-term benefits.",
                "If you cast this spell using 1 action, choose a point within range. All normal plants in a 100-foot radius centered on that point become thick and overgrown. A creature moving through the area must spend 4 feet of movement for every 1 foot it moves.",
                "You can exclude one or more areas of any size within the spell's area from being affected.",
                "If you cast this spell over 8 hours, you enrich the land. All plants in a half-mile radius centered on a point within range become enriched for 1 year. The plants yield twice the normal amount of food when harvested."
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
            "level": 3,
            "school": "Transmutation"
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
            "name": "Speak with Plants",
            "desc": [
                "You imbue plants within 30 feet of you with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plants about events in the spell's area within the past day, gaining information about creatures that have passed, weather, and other circumstances.",
                "You can also turn difficult terrain caused by plant growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration. Or you can turn ordinary terrain where plants are present into difficult terrain that lasts for the duration, causing vines and branches to hinder pursuers, for example.",
                "Plants might be able to perform other tasks on your behalf, at the GM's discretion. The spell doesn't enable plants to uproot themselves and move about, but they can freely move branches, tendrils, and stalks.",
                "If a plant creature is in the area, you can communicate with it as if you shared a common language, but you gain no magical ability to influence it.",
                "This spell can cause the plants created by the entangle spell to release a restrained creature."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "10 minutes",
            "concentration": false,
            "casting_time": "1 action",
            "level": 3,
            "area_of_effect": {
                "type": "sphere",
                "size": 30
            },
            "school": "Transmutation"
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
            "higher_level": [],
            "name": "Wind Wall",
            "desc": [
                "A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the ground. The wall lasts for the duration.",
                "When the wall appears, each creature within its area must make a strength saving throw. A creature takes 3d8 bludgeoning damage on a failed save, or half as much damage on a successful one.",
                "The strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can't pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and automatically miss. (Boulders hurled by giants or siege engines, and similar projectiles, are unaffected.) Creatures in gaseous form can't pass through it."
            ],
            "range": "120 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A tiny fan and a feather of exotic origin.",
            "ritual": false,
            "duration": "Up to 1 minute",
            "concentration": true,
            "casting_time": "1 action",
            "level": 3,
            "damage": {
                "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                },
                "damage_at_slot_level": {
                    "3": "3d8"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/2014/ability-scores/str"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "line",
                "size": 50
            },
            "school": "Evocation"
        },
        {
            "name": "Conjure Woodland Beings",
            "desc": [
                "You summon fey creatures that appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears:",
                "- One fey creature of challenge rating 2 or lower",
                "- Two fey creatures of challenge rating 1 or lower",
                "- Four fey creatures of challenge rating 1/2 or lower",
                "- Eight fey creatures of challenge rating 1/4 or lower",
                "A summoned creature disappears when it drops to 0 hit points or when the spell ends.",
                "The summoned creatures are friendly to you and your companions. Roll initiative for the summoned creatures as a group, which have their own turns. They obey any verbal commands that you issue to them (no action required by you). If you don't issue any commands to them, they defend themselves from hostile creatures, but otherwise take no actions.",
                "The GM has the creatures' statistics."
            ],
            "higher_level": [
                "When you cast this spell using certain higher-level spell slots, you choose one of the summoning options above, and more creatures appear: twice as many with a 6th-level slot and three times as many with an 8th-level slot."
            ],
            "range": "60 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "One holly berry per creature summoned.",
            "ritual": false,
            "duration": "Up to 1 hour",
            "concentration": true,
            "casting_time": "1 action",
            "level": 4,
            "school": "Conjuration"
        },
        {
            "higher_level": [],
            "name": "Freedom of Movement",
            "desc": [
                "You touch a willing creature. For the duration, the target's movement is unaffected by difficult terrain, and spells and other magical effects can neither reduce the target's speed nor cause the target to be paralyzed or restrained.",
                "The target can also spend 5 feet of movement to automatically escape from nonmagical restraints, such as manacles or a creature that has it grappled. Finally, being underwater imposes no penalties on the target's movement or attacks."
            ],
            "range": "Touch",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A leather strap, bound around the arm or a similar appendage.",
            "ritual": false,
            "duration": "1 hour",
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
            "higher_level": [],
            "name": "Commune With Nature",
            "desc": [
                "You briefly become one with nature and gain knowledge of the surrounding territory. In the outdoors, the spell gives you knowledge of the land within 3 miles of you. In caves and other natural underground settings, the radius is limited to 300 feet. The spell doesn't function where nature has been replaced by construction, such as in dungeons and towns.",
                "You instantly gain knowledge of up to three facts of your choice about any of the following subjects as they relate to the area:",
                "- terrain and bodies of water",
                "- prevalent plants, minerals, animals, or peoples",
                "- powerful celestials, fey, fiends, elementals, or undead",
                "- influence from other planes of existence",
                "- buildings",
                "For example, you could determine the location of powerful undead in the area, the location of major sources of safe drinking water, and the location of any nearby towns."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": true,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 minute",
            "level": 5,
            "school": "Divination"
        },
        {
            "higher_level": [],
            "name": "Tree Stride",
            "desc": [
                "You gain the ability to enter a tree and move from inside it to inside another tree of the same kind within 500 feet. Both trees must be living and at least the same size as you. You must use 5 feet of movement to enter a tree. You instantly know the location of all other trees of the same kind within 500 feet and, as part of the move used to enter the tree, can either pass into one of those trees or step out of the tree you're in. You appear in a spot of your choice within 5 feet of the destination tree, using another 5 feet of movement. If you have no movement left, you appear within 5 feet of the tree you entered.",
                "You can use this transportation ability once per round for the duration. You must end each turn outside a tree."
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
            "level": 5,
            "school": "Conjuration"
        }
    ]
}