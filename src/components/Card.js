import React, { useMemo } from "react";

const IMG_BASE = `${process.env.PUBLIC_URL || ''}/cards/`;

const getCardUrl = (cardName) => {
    const rank = cardName.charAt(0);
    const suit = cardName.charAt(1).toUpperCase();
    const fileName = rank === 'T' ? '10' + suit : rank.toUpperCase() + suit;
    return `${IMG_BASE}${fileName}.svg`;
};

const Card = ({ card, revealed, id }) => {
    const backUrl = useMemo(() => IMG_BASE + "RED_BACK.svg", []);
    
    const cardContent = useMemo(() => {
        if (card && revealed) {
            const cardUrl = getCardUrl(card);
            return (
                <img
                    className="card"
                    src={cardUrl}
                    alt={`Playing card ${card}`}
                    loading="lazy"
                />
            );
        }
        return (
            <img 
                className="card" 
                src={backUrl} 
                alt="Card back"
                loading="lazy"
            />
        );
    }, [card, revealed, backUrl]);

    return cardContent;
};

export default React.memo(Card);