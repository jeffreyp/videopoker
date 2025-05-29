import React from "react";

const IMG_BASE = `${process.env.PUBLIC_URL || ''}/cards/`;

let getCardUrl = (cardName) => {
    // Convert card format from "Ad", "Td", etc. to "AD.svg", "10D.svg", etc.
    const rank = cardName.charAt(0);
    const suit = cardName.charAt(1).toUpperCase();
    
    // Convert T to 10 for the filename
    const fileName = rank === 'T' ? '10' + suit : rank.toUpperCase() + suit;
    
    return `${IMG_BASE}${fileName}.svg`;
};

const Card = (props) => {
    if (props.card && props.revealed) {
        return (
            <img
                className="card"
                src={getCardUrl(props.card)}
                alt="Playing card"
            />
        );
    } else {
        return <img className="card" src={IMG_BASE + "RED_BACK.svg"} alt="Card back" />;
    }
};

export default React.memo(Card);