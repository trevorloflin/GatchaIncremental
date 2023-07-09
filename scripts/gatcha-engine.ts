import BinarySearchTree from "./binary-search-tree";

export default class Gatcha {
    private static CharacterFirstNames = { 'John': 1, 'Paul': 1, 'George': 1, 'Ringo': 1, 'Matthew': 1, 'Mark': 1, 'Luke': 1 };
    private static CharacterLastNames = { 'Smith': 1,'Brown': 1,'Einstein': 1,'Ramanujan': 1 };

    private static WeaponTypes = { 'Sword': 1, 'Spear': 1, 'Bow': 1, 'Mace': 1 };

    private static EquipmentTypes = { 'Breastplate': 1, 'Greaves': 1, 'Vambraces': 1, 'Helmet': 1, 'Boots': 1 }

    private static Spells = { 'Fireball': 1, 'Lightning Strike': 1, 'Wind Shield': 1 }

    private static Skills = { 'Flash Step': 1, 'Falcon Punch': 1 }

    private static Creatures = { 'Warg': 1, 'Wyvern': 1, 'Goblin': 1, 'Unicorn': 1 }

    private static CardTypes = {
        'Character': 1,
        'Weapon': 1,
        'Equipment': 1,
        'Spell': 1,
        'Skill': 1,
        'Creature': 2,
    };

    // TODO: maybe C, R, SR, SSR, UR? Or *, **, ***, ****, #?
    private static CardRanks: CardFieldOptions = {
        '1': null,
        '2': 0.15,
        '3': 0.03,
        '4': 0.005,
        '5': 0.001,
        '6': 0.0001
    }
    
    private static CardMaterials: CardFieldOptions = {
        "Cardboard":    null, 
        "Copper Foil":  0.05, 
        "Silver Foil":  0.01, 
        "Gold Foil":    0.002, 
        "Diamond Dust": 0.0005, 
        "Rainbow Coat": 0.0001, 
    };

    private static ExistingCards = [];

    public static GetCard() : Card {
        
        var cardNum = Math.floor(Math.random() * this.ExistingCards.length + 1);

        const card = cardNum === this.ExistingCards.length ? this.GenerateCard() : this.ExistingCards[cardNum];

        if (cardNum === this.ExistingCards.length) {
            this.ExistingCards.push(card);
        }

        // TODO: populate card-specific properties
        card.Material = Gatcha.Select(Gatcha.CardMaterials);

        return card;
    }

    public static GenerateCard() : Card {
        const newCard = {
            Name: '',
            Type: Gatcha.Select(Gatcha.CardTypes),
            Rank: Number(Gatcha.Select(Gatcha.CardRanks)),
            Material: '',
            Picture: '',
            Description: '',
            Action: '',
            Edition: 1,
            Condition: 'Mint',
            Rarity: 1,
            Power: 1,
            Value: 1,
            Stats: [],
        };
        
        switch (newCard.Type) {
            case "Character":
                newCard.Name = `${Gatcha.Select(Gatcha.CharacterFirstNames)} ${Gatcha.Select(Gatcha.CharacterLastNames)}`;
                break;
            case "Weapon":
                newCard.Name = Gatcha.Select(Gatcha.WeaponTypes);
                break;
            case "Equipment":
                newCard.Name = Gatcha.Select(Gatcha.EquipmentTypes);
                break;
            case "Spell":
                newCard.Name = Gatcha.Select(Gatcha.Spells);
                break;
            case "Skill":
                newCard.Name = Gatcha.Select(Gatcha.Skills);
                break;
            case "Creature":
                newCard.Name = Gatcha.Select(Gatcha.Creatures);
                break;
        }

        return newCard;
    }

    private static Select(options: CardFieldOptions) {
        var randomNum = Math.floor(Math.random() * Object.keys(options).length);
        var randomKey = Object.keys(options)[randomNum];

        var selectedOption = options[randomKey];
        if (selectedOption == null || typeof selectedOption === 'number') {
            this.GenerateOptionsTable(options);
            selectedOption = options[randomKey];
        }
        if (typeof selectedOption === 'number')
            throw 'Options table not fully generated!';

        var selectedName = selectedOption._probability > Math.random() 
            ? randomKey 
            : selectedOption._alias;

        return selectedName;
    }

    // this uses the "alias" method
    private static GenerateOptionsTable(options: CardFieldOptions) {
        const keys = Object.keys(options);
        const count = keys.length;
        const firstOption = keys[0];
        let sum = (Object.values(options) as number[]).reduce((acc, n) => acc + (n ?? 0));

        if (options[firstOption] == null) {
            options[firstOption] = 1 - sum;
            sum = 1;
        } 

        const tree = new BinarySearchTree<{ name: string, value: number}>(i => i.value);

        for (const key of keys) {
            tree.add({ name: key, value: (options[key] as number) / sum * count });
        }

        for (let i = 0; i < count - 1; i++) {
            const lowest = tree.getLowest();
            tree.remove(lowest);
            const highest = tree.getHighest();
            tree.remove(highest);

            options[lowest.name] = { 
                weight: options[lowest.name] as number, 
                _probability: lowest.value, 
                _alias: highest.name 
            };

            tree.add({ name: highest.name, value: highest.value - (1 - lowest.value)});
        }

        var lastItem = tree.getFulcrum();
        options[lastItem.name] = { weight: options[lastItem.name] as number, _probability: 1, _alias: null };

        console.log('Generated options table:');
        console.log(options);
    }

/*     private static Select(list: any[]) {
        return list[Math.floor(Math.random() * list.length)];
    }
 */}