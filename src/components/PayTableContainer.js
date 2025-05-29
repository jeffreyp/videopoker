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
            let classes = "";
            if (handWinName === row[0].pokersolver) {
                if (roundEnded) {
                    classes = "blink white";
                } else {
                    classes = "white";
                }
            }
            return (
                <tr key={rowIndex}>
                    {row.map((c, index) => (
                        <td
                            key={index}
                            className={
                                index === 5 ? "active" : "" /* todo when we implement changing bets*/
                            }
                        >
                            <span className={classes}>{typeof c === "object" ? c.display : c}</span>
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