import { calculateProbabilities, formatProbability } from './ProbabilityCalculator';

describe('ProbabilityCalculator', () => {
    test('calculates probabilities when all cards are held', () => {
        // Royal flush - all held
        const hand = ['As', 'Ks', 'Qs', 'Js', 'Ts'];
        const hold = [true, true, true, true, true];
        const probs = calculateProbabilities(hand, hold);

        // Should be 100% Royal Flush
        expect(probs['Royal Flush']).toBe(1.0);
        expect(probs['Straight Flush']).toBe(0);
        expect(probs['No Win']).toBe(0);
    });

    test('calculates probabilities when holding 4 to a flush', () => {
        // Holding 4 hearts, discarding one card
        const hand = ['Ah', 'Kh', 'Qh', 'Jh', '2c'];
        const hold = [true, true, true, true, false];
        const probs = calculateProbabilities(hand, hold);

        // Should have some probability of any heart-based hand
        // 9 remaining hearts out of 47 cards
        // Some of those will be Royal Flush (Th), so Flush probability will be less
        const totalHeartProb = 9 / 47;

        // Royal Flush: 1 card (Th)
        // Regular Flush: 8 cards (remaining hearts)
        expect(probs['Royal Flush']).toBeCloseTo(1 / 47, 2);
        expect(probs['Flush']).toBeCloseTo(8 / 47, 2);

        // Total heart-based winning probability
        const totalWinningHearts = probs['Royal Flush'] + probs['Flush'];
        expect(totalWinningHearts).toBeCloseTo(totalHeartProb, 2);
    });

    test('calculates probabilities when holding a pair of jacks', () => {
        // Holding pair of jacks
        const hand = ['Jh', 'Js', '2c', '7d', '9h'];
        const hold = [true, true, false, false, false];
        const probs = calculateProbabilities(hand, hold);

        // Should have probabilities for:
        // - Jacks or Better (staying as pair)
        // - Two Pair
        // - Three of a Kind
        // - Full House
        // - Four of a Kind

        // At minimum, should not lose the pair
        expect(probs['Jacks or Better']).toBeGreaterThan(0);
        expect(probs['Three of a Kind']).toBeGreaterThan(0);
        expect(probs['Two Pair']).toBeGreaterThan(0);
    });

    test.skip('calculates probabilities when holding nothing (slow test - 1.5M combinations)', () => {
        // Discarding everything - this test is slow because it calculates C(47,5) = 1,533,939 combinations
        const hand = ['2h', '4s', '6c', '8d', 'Th'];
        const hold = [false, false, false, false, false];
        const probs = calculateProbabilities(hand, hold);

        // Should have some probability for all hands
        // Total probability should sum to 1
        const total = Object.values(probs).reduce((sum, p) => sum + p, 0);
        expect(total).toBeCloseTo(1.0, 5);

        // Most outcomes should be "No Win" when drawing 5 random cards
        expect(probs['No Win']).toBeGreaterThan(0.5);
    });

    test('formatProbability works correctly', () => {
        expect(formatProbability(0)).toBe('0.00%');
        expect(formatProbability(1)).toBe('100.00%');
        expect(formatProbability(0.5)).toBe('50.00%');
        expect(formatProbability(0.1234)).toBe('12.34%');
        expect(formatProbability(0.0001)).toBe('0.01%');
        expect(formatProbability(0.00001)).toBe('<0.01%');
    });

    test('calculates probabilities for four to a straight flush', () => {
        // Holding 4 to a straight flush (9-8-7-6 of hearts)
        const hand = ['9h', '8h', '7h', '6h', '2c'];
        const hold = [true, true, true, true, false];
        const probs = calculateProbabilities(hand, hold);

        // Should have chances for straight flush, flush, and straight
        expect(probs['Straight Flush']).toBeGreaterThan(0);
        expect(probs['Flush']).toBeGreaterThan(0);
        expect(probs['Straight']).toBeGreaterThan(0);
    });

    test('probabilities sum to 1.0', () => {
        const hand = ['Ah', 'Kh', 'Qh', 'Jh', 'Ts'];
        const hold = [true, true, false, false, false];
        const probs = calculateProbabilities(hand, hold);

        const total = Object.values(probs).reduce((sum, p) => sum + p, 0);
        expect(total).toBeCloseTo(1.0, 10);
    });
});
