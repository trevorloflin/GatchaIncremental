import * as React from 'react';
import CardDOM from './card';
import Gatcha from './gatcha-engine';

export default function App() {
    const [cards, setCards] = React.useState([] as Card[]);
    const [currentCard, setCurrentCard] = React.useState(null as Card);

    const getACard = () => {
        const card = Gatcha.GenerateCard();

        setCurrentCard(card);
        setCards([...cards, card]);
    }

    const selectCard = (card: Card) => {
        setCurrentCard(card);
    }

    const cardsList = cards.map(c => <li className={c === currentCard ? 'selected' : ''} onClick={() => selectCard(c)}>{c.Name}</li>)

    return (
        <React.Fragment>
            <div id="left-panel">
                <h3>Your Cards</h3>
                <ul id="cards-list">
                    {cardsList}
                </ul>
            </div>
            <div id="main-panel">
                <div id="main-actions">
                    <button onClick={getACard}>Get a card</button>
                </div>
                <div id="current-card">
                    {currentCard == null ? null :
                        <CardDOM Card={currentCard}></CardDOM>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}