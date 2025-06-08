import { Hand } from "./pokersolver";
import PayTableData from "./PayTableData";

const evaluatePay = (name, betAmount) => {
    for (let row of PayTableData) {
        if (row[0].pokersolver === name) {
            return row[betAmount]; // bet amount (1-5)
        }
    }
    return 0;
};

export const evaluateHand = (hand, betAmount = 5) => {
    // Handle null or invalid hands
    if (!hand || hand.some(card => card === null || card === undefined)) {
        return { name: "", win: 0 };
    }
    
    let solved = Hand.solve(hand);
    switch (solved.name) {
        case "Two Pair":
        case "Three of a Kind":
        case "Full House":
        case "Four of a Kind":
        case "Straight":
        case "Flush":    
        case "Straight Flush":
            if (solved.descr === "Royal Flush") {
                return { name: "Royal Flush", win: evaluatePay("Royal Flush", betAmount) };
            }
            return { name: solved.name, win: evaluatePay(solved.name, betAmount) };
        case "Pair":
            if (solved.descr === "Pair, J's" ||
                solved.descr === "Pair, Q's" ||
                solved.descr === "Pair, K's" ||
                solved.descr === "Pair, A's") {
                return { name: "Jacks or Better", win: evaluatePay("Jacks or Better", betAmount) };
            }
        default:
            return { name: "", win: 0 };
    }
}
