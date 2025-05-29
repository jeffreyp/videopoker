import { evaluateHand } from './Evaluator';

describe('Evaluator', () => {
    test('evaluates royal flush correctly', () => {
        const royalFlush = ['AS', 'KS', 'QS', 'JS', 'TS'];
        const result = evaluateHand(royalFlush);
        expect(result.name).toBe('Royal Flush');
        expect(result.win).toBe(4000); // 5-coin bet
    });

    test('evaluates straight flush correctly', () => {
        const straightFlush = ['9H', '8H', '7H', '6H', '5H'];
        const result = evaluateHand(straightFlush);
        expect(result.name).toBe('Straight Flush');
        expect(result.win).toBe(250); // 5-coin bet
    });

    test('evaluates four of a kind correctly', () => {
        const fourOfAKind = ['AH', 'AS', 'AC', 'AD', '5H'];
        const result = evaluateHand(fourOfAKind);
        expect(result.name).toBe('Four of a Kind');
        expect(result.win).toBe(125); // 5-coin bet
    });

    test('evaluates full house correctly', () => {
        const fullHouse = ['AH', 'AS', 'AC', '5D', '5H'];
        const result = evaluateHand(fullHouse);
        expect(result.name).toBe('Full House');
        expect(result.win).toBe(45); // 5-coin bet
    });

    test('evaluates flush correctly', () => {
        const flush = ['AH', 'KH', 'QH', 'JH', '9H'];
        const result = evaluateHand(flush);
        expect(result.name).toBe('Flush');
        expect(result.win).toBe(30); // 5-coin bet
    });

    test('evaluates straight correctly', () => {
        const straight = ['AH', 'KS', 'QD', 'JC', 'TH'];
        const result = evaluateHand(straight);
        expect(result.name).toBe('Straight');
        expect(result.win).toBe(20); // 5-coin bet
    });

    test('evaluates three of a kind correctly', () => {
        const threeOfAKind = ['AH', 'AS', 'AC', '5D', '7H'];
        const result = evaluateHand(threeOfAKind);
        expect(result.name).toBe('Three of a Kind');
        expect(result.win).toBe(15); // 5-coin bet
    });

    test('evaluates two pair correctly', () => {
        const twoPair = ['AH', 'AS', '5C', '5D', '7H'];
        const result = evaluateHand(twoPair);
        expect(result.name).toBe('Two Pair');
        expect(result.win).toBe(10); // 5-coin bet
    });

    test('evaluates jacks or better correctly', () => {
        const jacksOrBetter = ['JH', 'JS', '5C', '7D', '9H'];
        const result = evaluateHand(jacksOrBetter);
        expect(result.name).toBe('Jacks or Better');
        expect(result.win).toBe(5); // 5-coin bet
    });

    test('evaluates no win correctly', () => {
        const noWin = ['2H', '4S', '6C', '8D', 'TH'];
        const result = evaluateHand(noWin);
        expect(result.name).toBe('');
        expect(result.win).toBe(0);
    });
});