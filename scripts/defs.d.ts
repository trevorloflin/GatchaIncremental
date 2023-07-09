
declare class Card {
    Name: string;
    Type: string;
    Rank: number;
    Picture: string;
    Description: string;
    Action: string;
    Edition: number;
    Material: string;
    Condition: string;
    Rarity: number;
    Power: number;
    Value: number;
    Stats: CardStat[];
}

declare class CardStat {
    Name: string;
    Value: number;
}

type CardFieldOptions = Record<string, number | { weight: number, _probability?: number, _alias?: string }>;

/* declare class CardFieldOption {
    Name: string;
    Probability: number;
} */

declare enum CardTypes {

}

declare const enum CardCondition {
    Mint = "Mint",
    NearMint = "Near Mint",
    Excellent = "Excellent",
    VeryGood = "Very Good",
    Good = "Good",
    Fair = "Fair",
    Poor = "Poor"
}