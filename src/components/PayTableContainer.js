import React, { useMemo } from "react";
import PayTableData from "../lib/PayTableData";
import { useGameContext } from '../context/GameContext';

const PayTableContainer = () => {
    const { state } = useGameContext();
    const { handWinName, roundEnded } = { 
        handWinName: state.game.handWin.name, 
        roundEnded: state.game.roundEnded 
    };
    const tableRows = useMemo(() => {
        return PayTableData.map((row, rowIndex) => {
            let textClasses = "";
            let rowClasses = "";
            if (handWinName === row[0].pokersolver) {
                textClasses = "white";
                rowClasses = "highlighted-row";
            }
            return (
                <tr key={rowIndex} className={rowClasses}>
                    {row.map((c, index) => (
                        <td
                            key={index}
                            className={
                                index === 5 ? "active" : "" /* todo when we implement changing bets*/
                            }
                        >
                            <span className={textClasses}>{typeof c === "object" ? c.display : c}</span>
                        </td>
                    ))}
                </tr>
            );
        });
    }, [handWinName, roundEnded]);

    return (
        <article className="payTableContainer padded">
            <table className="payTable">
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </article>
    );
};

export default React.memo(PayTableContainer);