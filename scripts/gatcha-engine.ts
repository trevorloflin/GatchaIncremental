import BinarySearchTree from "./binary-search-tree";

export default class Gatcha {
    private static CardTypes = {'Character': 1,'Weapon': 1,'Equipment': 1,'Spell': 1,'Skill': 1};
    private static CharacterFirstNames = {'John': 1, 'Paul': 1, 'George': 1, 'Ringo': 1, 'Matthew': 1, 'Mark': 1, 'Luke': 1};
    private static CharacterLastNames = {'Smith': 1,'Brown': 1,'Einstein': 1,'Ramanujan': 1};

    private static CardMaterials: CardFieldOptions = {
        "Cardboard":    null, 
        "Copper Foil":  0.05, 
        "Silver Foil":  0.01, 
        "Gold Foil":    0.002, 
        "Diamond Dust": 0.0005, 
        "Rainbow Coat": 0.0001, 
    };

    public static GenerateCard() : Card {
        return {
            Name: `${Gatcha.Select(Gatcha.CharacterFirstNames)} ${Gatcha.Select(Gatcha.CharacterLastNames)}`,
            Type: Gatcha.Select(Gatcha.CardTypes),
            Rank: Math.floor(Math.random() * 4) + 1,
            Material: Gatcha.Select(Gatcha.CardMaterials),
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