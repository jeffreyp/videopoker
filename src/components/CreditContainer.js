import React, { useState, useCallback, useMemo } from 'react';
import CountUp from "react-countup";
import { useGameContext } from '../context/GameContext';

const CreditContainer = () => {
    const { state } = useGameContext();
    const credits = state.credit.amount;
    const [currentAmount, setCurrentAmount] = useState(credits);

    const updateCurrentAmount = useCallback((amount) => {
        setCurrentAmount(amount);
    }, []);

    const getAnimationDuration = useMemo(() => {
        if (currentAmount < credits) {
            let delta = credits - currentAmount;
            if (delta <= 20) {
                return 0.65;
            }
            if (delta <= 250) {
                return 1.2;
            }
            return 5; // full house
        } else {
            return 0.000001;
        }
    }, [currentAmount, credits]);

    return (
        <CountUp
            start={currentAmount || 0}
            end={credits}
            duration={getAnimationDuration}
            delay={0}
            useEasing={false}
            onEnd={() => updateCurrentAmount(credits)}
            prefix="CREDIT "
        >
            {({ countUpRef }) => (
                <div className="creditContainer">
                    <span ref={countUpRef} />
                </div>
            )}
        </CountUp>
    );
};

export default CreditContainer;
