import React, { useMemo } from "react";
import { useGameContext } from '../context/GameContext';
import { formatProbability } from '../lib/ProbabilityCalculator';
import PayTableData from "../lib/PayTableData";

const OddsDisplay = () => {
    const { state } = useGameContext();
    const { probabilities, roundEnded, betAmount } = {
        probabilities: state.game.probabilities,
        roundEnded: state.game.roundEnded,
        betAmount: state.game.betAmount
    };

    const oddsRows = useMemo(() => {
        if (!probabilities) return [];
        // Get hand types in the same order as PayTableData
        const handTypes = PayTableData.map(row => row[0].pokersolver);

        return handTypes.map((handType, index) => {
            const probability = probabilities[handType] || 0;
            const payout = PayTableData[index][betAmount];
            const expectedValue = probability * payout;

            // Only show rows with non-zero probability or payout hands
            if (probability === 0) {
                return null;
            }

            return (
                <tr key={handType}>
                    <td className="odds-hand-name">{PayTableData[index][0].display}</td>
                    <td className="odds-probability">{formatProbability(probability)}</td>
                    <td className="odds-payout">{payout}</td>
                    <td className="odds-ev">{expectedValue.toFixed(2)}</td>
                </tr>
            );
        }).filter(row => row !== null);
    }, [probabilities, betAmount]);

    // Calculate overall expected value
    const totalExpectedValue = useMemo(() => {
        if (!probabilities) return 0;

        let total = 0;
        PayTableData.forEach((row, index) => {
            const handType = row[0].pokersolver;
            const probability = probabilities[handType] || 0;
            const payout = row[betAmount];
            total += probability * payout;
        });

        return total;
    }, [probabilities, betAmount]);

    // Only show odds during the hold/discard phase (after deal, before draw)
    if (roundEnded || !probabilities) {
        return null;
    }

    return (
        <article className="oddsDisplayContainer padded">
            <h3 className="odds-title">Draw Odds (Bet: {betAmount})</h3>
            <table className="oddsTable">
                <thead>
                    <tr>
                        <th>Hand</th>
                        <th>Probability</th>
                        <th>Payout</th>
                        <th>EV</th>
                    </tr>
                </thead>
                <tbody>
                    {oddsRows}
                </tbody>
                <tfoot>
                    <tr className="odds-total">
                        <td colSpan="3">Total Expected Value:</td>
                        <td>{totalExpectedValue.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </article>
    );
};

export default React.memo(OddsDisplay);
