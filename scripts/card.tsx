import * as React from 'react';

export class CardDOMProps {
    Card: Card;
}

export default function CardDOM(props: CardDOMProps) {

    const stars = '*'.repeat(props.Card.Rank);

    return (
        <div className='card'>
            <div className='card-name'>{props.Card.Name}</div>
            <div className='card-picture'></div>
            <span className='card-type'>{props.Card.Type}</span>
            <span className='card-rank'>Rank: {stars}</span>
            <span className='card-material'>Material: {props.Card.Material}</span>
        </div>
    );
}