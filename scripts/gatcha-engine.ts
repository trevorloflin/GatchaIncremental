
export default class Gatcha {
    private static CardTypes = ['Character','Weapon','Equipment','Spell','Skill'];
    private static CharacterFirstNames = ['John', 'Paul', 'George', 'Ringo', 'Matthew', 'Mark', 'Luke'];
    private static CharacterLastNames = ['Smith','Brown','Einstein','Ramanujan'];

    public static GenerateCard() : Card {
        return {
            Name: `${Gatcha.Select(Gatcha.CharacterFirstNames)} ${Gatcha.Select(Gatcha.CharacterLastNames)}`,
            Type: Gatcha.Select(Gatcha.CardTypes),
            Rank: Math.floor(Math.random() * 4) + 1
        };
    }

    private static Select(list: any[]) {
        return list[Math.floor(Math.random() * list.length)];
    }
}