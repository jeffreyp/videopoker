import React, { useCallback, useMemo } from 'react';
import OnImagesLoaded from "react-on-images-loaded";
import { useGameActions } from '../hooks/useGameActions';

const ImagePreload = () => {
    const { cardImageLoaded } = useGameActions();
    const handleImageLoaded = useCallback(() => {
        cardImageLoaded();
    }, [cardImageLoaded]);

    const cardImages = useMemo(() => {
        const suits = ['c', 'd', 'h', 's'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        const images = [];
        
        suits.forEach(suit => {
            ranks.forEach(rank => {
                // Use the same conversion logic as Card component
                const cardName = rank + suit;
                const rankChar = cardName.charAt(0);
                const suitChar = cardName.charAt(1).toUpperCase();
                const fileName = rankChar === 'T' ? '10' + suitChar : rankChar.toUpperCase() + suitChar;
                
                images.push(
                    <img key={fileName} src={`${process.env.PUBLIC_URL || ''}/cards/${fileName}.svg`} alt="" />
                );
            });
        });
        
        images.push(<img key="BLUE_BACK" src={`${process.env.PUBLIC_URL || ''}/cards/BLUE_BACK.svg`} alt="" />);
        images.push(<img key="RED_BACK" src={`${process.env.PUBLIC_URL || ''}/cards/RED_BACK.svg`} alt="" />);
        return images;
    }, []);

    return (
        <div style={{ display: "none" }}>
            <OnImagesLoaded onLoaded={handleImageLoaded}>
                {cardImages}
            </OnImagesLoaded>
        </div>
    );
};

export default ImagePreload;