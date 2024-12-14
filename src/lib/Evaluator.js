import { Hand } from "./pokersolver";
import PayTableData from "./PayTableData";

const evaluatePay = (name) => {
    for (let row of PayTableData) {
        if (row[0].pokersolver === name) {
            return row[5]; // bet 5
        }
    }
    return NaN; // this should never happen
};

export const evaluateHand = (hand) => {
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
                return { name: "Royal Flush", pay: evaluatePay("Royal Flush") };
            }
            return { name: solved.name, pay: evaluatePay(solved.name) };
        case "Pair":
            if (solved.descr === "Pair, J's" ||
                solved.descr === "Pair, Q's" ||
                solved.descr === "Pair, K's" ||
                solved.descr === "Pair, A's") {
                return { name: "Jacks or Better", pay: evaluatePay("Jacks or Better") };
            }
        default:
            return { name: "", win: 0 };
    }
}