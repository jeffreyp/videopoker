import React from "react";

const IMG_BASE = `${process.env.PUBLIC_URL || ''}/cards/`;

console.log('IMG_BASE:', IMG_BASE);
console.log('process.env.PUBLIC_URL:', process.env.PUBLIC_URL);

let getCardUrl = (cardName) => {
    // Convert card format from "Ad", "Td", etc. to "AD.svg", "10D.svg", etc.
    const rank = cardName.charAt(0);
    const suit = cardName.charAt(1).toUpperCase();
    
    // Convert T to 10 for the filename
    const fileName = rank === 'T' ? '10' + suit : rank.toUpperCase() + suit;
    
    return `${IMG_BASE}${fileName}.svg`;
};

const Card = (props) => {
    console.log('Card props:', props);
    const backUrl = IMG_BASE + "RED_BACK.svg";
    console.log('Card back URL:', backUrl);
    
    if (props.card && props.revealed) {
        const cardUrl = getCardUrl(props.card);
        console.log('Card URL:', cardUrl);
        return (
            <img
                className="card"
                src={cardUrl}
                alt="Playing card"
            />
        );
    } else {
        console.log('Showing card back');
        return <img className="card" src={backUrl} alt="Card back" />;
    }
};

export default React.memo(Card);