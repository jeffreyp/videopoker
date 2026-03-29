/**
 * Web Worker for probability calculations.
 * Runs on a separate thread so the main UI never blocks.
 */
import { Hand } from '../lib/pokersolver';
import CardList from '../lib/CardList';

/**
 * Classifies a 5-card poker hand into a Jacks-or-Better video poker category.
 */
function classifyHand(hand) {
  const solved = Hand.solve(hand);
  const name = solved.name;

  if (name === 'Straight Flush') {
    return solved.descr === 'Royal Flush' ? 'Royal Flush' : 'Straight Flush';
  }
  if (name === 'Four of a Kind') return 'Four of a Kind';
  if (name === 'Full House') return 'Full House';
  if (name === 'Flush') return 'Flush';
  if (name === 'Straight') return 'Straight';
  if (name === 'Three of a Kind') return 'Three of a Kind';
  if (name === 'Two Pair') return 'Two Pair';
  if (name === 'Pair') {
    const d = solved.descr;
    if (d === "Pair, J's" || d === "Pair, Q's" || d === "Pair, K's" || d === "Pair, A's") {
      return 'Jacks or Better';
    }
  }
  return 'No Win';
}

/**
 * Iterate all k-combinations of array, calling callback with a reused combo array.
 * Avoids allocating a new array per combination.
 */
function iterateCombinations(array, k, callback) {
  const combo = new Array(k);
  function recurse(start, depth) {
    if (depth === k) { callback(combo); return; }
    const limit = array.length - (k - depth);
    for (let i = start; i <= limit; i++) {
      combo[depth] = array[i];
      recurse(i + 1, depth + 1);
    }
  }
  recurse(0, 0);
}

function initializeCounts() {
  return {
    'Royal Flush': 0, 'Straight Flush': 0, 'Four of a Kind': 0,
    'Full House': 0, 'Flush': 0, 'Straight': 0, 'Three of a Kind': 0,
    'Two Pair': 0, 'Jacks or Better': 0, 'No Win': 0
  };
}

function calculateProbabilities(currentHand, holdArray) {
  const usedCards = new Set(currentHand);
  const remainingDeck = CardList.filter(card => !usedCards.has(card));

  const positionsToReplace = [];
  for (let i = 0; i < 5; i++) {
    if (!holdArray[i]) positionsToReplace.push(i);
  }

  const numCardsToReplace = positionsToReplace.length;

  if (numCardsToReplace === 0) {
    const counts = initializeCounts();
    counts[classifyHand(currentHand)] = 1;
    const probs = {};
    for (const k in counts) probs[k] = counts[k];
    return probs;
  }

  const handCounts = initializeCounts();
  let totalCombinations = 0;
  // Reuse this array across iterations to avoid allocations
  const newHand = [...currentHand];

  iterateCombinations(remainingDeck, numCardsToReplace, (combo) => {
    for (let i = 0; i < numCardsToReplace; i++) {
      newHand[positionsToReplace[i]] = combo[i];
    }
    handCounts[classifyHand(newHand)]++;
    totalCombinations++;
  });

  const probabilities = {};
  for (const handType in handCounts) {
    probabilities[handType] = handCounts[handType] / totalCombinations;
  }
  return probabilities;
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = function(e) {
  const { hand, hold } = e.data;
  const probabilities = calculateProbabilities(hand, hold);
  // eslint-disable-next-line no-restricted-globals
  self.postMessage(probabilities);
};
