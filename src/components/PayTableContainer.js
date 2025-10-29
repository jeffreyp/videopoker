import React, { useMemo } from "react";
import PayTableData from "../lib/PayTableData";
import { useGameContext } from '../context/GameContext';
import { formatProbability } from '../lib/ProbabilityCalculator';

const PayTableContainer = () => {
    const { state } = useGameContext();
    const { handWinName, probabilities, isCalculatingProbabilities } = {
        handWinName: state.game.handWin.name,
        probabilities: state.game.probabilities,
        isCalculatingProbabilities: state.game.isCalculatingProbabilities
    };

    const tableRows = useMemo(() => {
        return PayTableData.map((row, rowIndex) => {
            let textClasses = "";
            let rowClasses = "";
            if (handWinName === row[0].pokersolver) {
                textClasses = "white";
                rowClasses = "highlighted-row";
            }

            const handType = row[0].pokersolver;
            const payout = row[5];

            // Get probability and expected value if available
            let probability = null;
            let expectedValue = null;

            if (probabilities) {
                probability = probabilities[handType] || 0;
                expectedValue = probability * payout;
            }

            return (
                <tr key={rowIndex} className={rowClasses}>
                    <td>
                        <span className={textClasses}>{row[0].display}</span>
                    </td>
                    <td className="active">
                        <span className={textClasses}>{payout}</span>
                    </td>
                    <td className="probability-col">
                        <span className={textClasses}>
                            {probability !== null ? formatProbability(probability) : '—'}
                        </span>
                    </td>
                    <td className="ev-col">
                        <span className={textClasses}>
                            {expectedValue !== null ? expectedValue.toFixed(2) : '—'}
                        </span>
                    </td>
                </tr>
            );
        });
    }, [handWinName, probabilities]);

    // Calculate total expected value
    const totalExpectedValue = useMemo(() => {
        if (!probabilities) return '—';

        let total = 0;
        PayTableData.forEach((row) => {
            const handType = row[0].pokersolver;
            const probability = probabilities[handType] || 0;
            const payout = row[5];
            total += probability * payout;
        });

        return total.toFixed(2);
    }, [probabilities]);

    return (
        <article className="payTableContainer padded">
            {isCalculatingProbabilities && (
                <div className="calculating-indicator">
                    <div className="calculating-spinner"></div>
                    <span>Calculating...</span>
                </div>
            )}
            <table className="payTable">
                <thead>
                    <tr>
                        <th>Hand</th>
                        <th>Payout</th>
                        <th>Probability</th>
                        <th>EV</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
                <tfoot>
                    <tr className="total-row">
                        <td colSpan="3">Total Expected Value:</td>
                        <td>{totalExpectedValue}</td>
                    </tr>
                </tfoot>
            </table>
        </article>
    );
};

export default React.memo(PayTableContainer);