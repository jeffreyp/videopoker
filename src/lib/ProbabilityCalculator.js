/**
 * ProbabilityCalculator
 *
 * Calculates the probability of achieving each possible poker hand based on
 * the current hand and which cards are held.
 *
 * Algorithm:
 * 1. Determine which cards need to be replaced (non-held cards)
 * 2. Generate all possible combinations of replacement cards from remaining deck
 * 3. Evaluate each resulting hand to determine its type
 * 4. Count occurrences of each hand type
 * 5. Calculate probabilities as (count / total combinations)
 *
 * Complexity:
 * - Holding 5 cards: O(1) - no combinations to evaluate
 * - Holding 4 cards: O(47) - 47 possible replacement cards
 * - Holding 3 cards: O(C(47,2)) = O(1,081) combinations
 * - Holding 2 cards: O(C(47,3)) = O(16,215) combinations
 * - Holding 1 card: O(C(47,4)) = O(178,365) combinations
 * - Holding 0 cards: O(C(47,5)) = O(1,533,939) combinations (very slow!)
 *
 * Where C(n,k) is the binomial coefficient "n choose k"
 *
 * @module ProbabilityCalculator
 */

import { Hand } from './pokersolver';
import CardList from './CardList';

/**
 * Generates all combinations of k elements from an array.
 * Uses recursive backtracking to build combinations.
 *
 * @param {Array} array - Source array to choose elements from
 * @param {number} k - Number of elements to choose
 * @returns {Array<Array>} Array of all possible k-element combinations
 *
 * @example
 * getCombinations(['A', 'B', 'C'], 2)
 * // returns [['A', 'B'], ['A', 'C'], ['B', 'C']]
 */
function getCombinations(array, k) {
  if (k === 0) return [[]];
  if (k === 1) return array.map(item => [item]);
  if (k === array.length) return [array];

  const result = [];

  function combine(start, combo) {
    if (combo.length === k) {
      result.push([...combo]);
      return;
    }

    for (let i = start; i <= array.length - (k - combo.length); i++) {
      combo.push(array[i]);
      combine(i + 1, combo);
      combo.pop();
    }
  }

  combine(0, []);
  return result;
}

/**
 * Classifies a poker hand into a winning category for Jacks or Better video poker.
 *
 * Uses the pokersolver library to identify the hand type, then maps it to
 * video poker payout categories. Note that low pairs (2-10) do not win.
 *
 * @param {Array<string>} hand - Array of 5 card strings (e.g., ["As", "Kd", "Qh", "Jc", "Ts"])
 * @returns {string} Hand category name (e.g., "Royal Flush", "Jacks or Better", "No Win")
 *
 * @example
 * classifyHand(['As', 'Ks', 'Qs', 'Js', 'Ts']) // "Royal Flush"
 * classifyHand(['Jh', 'Js', '2c', '7d', '9h']) // "Jacks or Better"
 * classifyHand(['2h', '5c', '8d', '9s', 'Kh']) // "No Win"
 */
function classifyHand(hand) {
  const solved = Hand.solve(hand);
  const name = solved.name;
  const descr = solved.descr;

  // Check for Royal Flush
  if (name === 'Straight Flush' && descr === 'Royal Flush') {
    return 'Royal Flush';
  }

  // Check for Straight Flush
  if (name === 'Straight Flush') {
    return 'Straight Flush';
  }

  // Check for Four of a Kind
  if (name === 'Four of a Kind') {
    return 'Four of a Kind';
  }

  // Check for Full House
  if (name === 'Full House') {
    return 'Full House';
  }

  // Check for Flush
  if (name === 'Flush') {
    return 'Flush';
  }

  // Check for Straight
  if (name === 'Straight') {
    return 'Straight';
  }

  // Check for Three of a Kind
  if (name === 'Three of a Kind') {
    return 'Three of a Kind';
  }

  // Check for Two Pair
  if (name === 'Two Pair') {
    return 'Two Pair';
  }

  // Check for Jacks or Better (Pair)
  if (name === 'Pair') {
    // Check descr to see if it's Jacks or Better
    if (descr === "Pair, J's" ||
        descr === "Pair, Q's" ||
        descr === "Pair, K's" ||
        descr === "Pair, A's") {
      return 'Jacks or Better';
    }
  }

  // No win
  return 'No Win';
}

/**
 * Calculates probability of each hand type given current hand and holds.
 *
 * This is the main function of the probability calculator. It works by:
 * 1. Identifying which cards will be replaced (not held)
 * 2. Generating all possible replacement combinations from the remaining deck
 * 3. Evaluating each possible final hand
 * 4. Counting occurrences of each hand type
 * 5. Converting counts to probabilities
 *
 * Performance Note:
 * - The function is fast when holding 3+ cards (≤1,081 combinations)
 * - Moderately fast when holding 2 cards (16,215 combinations)
 * - Slow when holding 0-1 cards (178K-1.5M combinations)
 *
 * @param {Array<string>} currentHand - Array of 5 card strings (e.g., ["As", "Kd", "Qh", "Jc", "Ts"])
 * @param {Array<boolean>} holdArray - Array of 5 booleans indicating which cards are held
 * @returns {Object} Object with hand types as keys and probabilities (0-1) as values
 *
 * @example
 * // Holding 4 to a flush
 * calculateProbabilities(['Ah', 'Kh', 'Qh', 'Jh', '2c'], [true, true, true, true, false])
 * // Returns: { 'Royal Flush': 0.021, 'Flush': 0.170, ... }
 *
 * @example
 * // Holding a pair of Jacks
 * calculateProbabilities(['Jh', 'Js', '2c', '7d', '9h'], [true, true, false, false, false])
 * // Returns: { 'Jacks or Better': 0.xxx, 'Two Pair': 0.xxx, ... }
 */
export function calculateProbabilities(currentHand, holdArray) {
  // Get cards that are already used (in current hand)
  const usedCards = new Set(currentHand);

  // Get remaining deck (all cards not in current hand)
  const remainingDeck = CardList.filter(card => !usedCards.has(card));

  // Determine which positions need new cards
  const positionsToReplace = [];
  for (let i = 0; i < 5; i++) {
    if (!holdArray[i]) {
      positionsToReplace.push(i);
    }
  }

  const numCardsToReplace = positionsToReplace.length;

  // If all cards are held, just evaluate current hand
  if (numCardsToReplace === 0) {
    const handType = classifyHand(currentHand);
    const probs = initializeProbabilities();
    probs[handType] = 1.0;
    return probs;
  }

  // Get all combinations of replacement cards
  const replacementCombinations = getCombinations(remainingDeck, numCardsToReplace);

  // Count outcomes for each hand type
  const handCounts = initializeProbabilities();

  // Evaluate each possible outcome
  for (const replacementCards of replacementCombinations) {
    // Build the new hand
    const newHand = [...currentHand];
    for (let i = 0; i < numCardsToReplace; i++) {
      newHand[positionsToReplace[i]] = replacementCards[i];
    }

    // Classify the hand
    const handType = classifyHand(newHand);
    handCounts[handType]++;
  }

  // Convert counts to probabilities
  const totalCombinations = replacementCombinations.length;
  const probabilities = {};

  for (const handType in handCounts) {
    probabilities[handType] = handCounts[handType] / totalCombinations;
  }

  return probabilities;
}

/**
 * Initialize probability object with all hand types set to 0.
 *
 * Creates an object with all 10 possible outcomes in Jacks or Better video poker.
 *
 * @returns {Object} Object with all hand types initialized to 0
 * @private
 */
function initializeProbabilities() {
  return {
    'Royal Flush': 0,
    'Straight Flush': 0,
    'Four of a Kind': 0,
    'Full House': 0,
    'Flush': 0,
    'Straight': 0,
    'Three of a Kind': 0,
    'Two Pair': 0,
    'Jacks or Better': 0,
    'No Win': 0
  };
}

/**
 * Formats a probability (0-1) as a human-readable percentage string.
 *
 * Special handling:
 * - 0 → "0.00%"
 * - 1 → "100.00%"
 * - < 0.0001 → "<0.01%"
 * - Other values → Formatted to 2 decimal places
 *
 * @param {number} probability - Probability value between 0 and 1
 * @returns {string} Formatted percentage string
 *
 * @example
 * formatProbability(0.5) // "50.00%"
 * formatProbability(0.1234) // "12.34%"
 * formatProbability(0.00001) // "<0.01%"
 */
export function formatProbability(probability) {
  if (probability === 0) return '0.00%';
  if (probability === 1) return '100.00%';

  const percent = probability * 100;
  if (percent < 0.01) {
    return '<0.01%';
  }
  return percent.toFixed(2) + '%';
}

export default {
  calculateProbabilities,
  formatProbability
};
