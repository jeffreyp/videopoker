# Odds Calculator Implementation

This document describes the technical implementation of the real-time probability calculator for the video poker game.

## Overview

The odds calculator computes the probability of achieving each possible winning hand based on the current hand and which cards the player chooses to hold. It updates in real-time as the player selects/deselects cards during the hold phase.

## Architecture

### Components

1. **ProbabilityCalculator.js** - Core calculation engine
2. **OddsDisplay.js** - React component for displaying odds
3. **gameReducer.js** - State management integration
4. **App.scss** - Styling for odds table

### Data Flow

```
User clicks card → HOLD_CARD action
    ↓
gameReducer updates hold array
    ↓
calculateProbabilities(hand, hold)
    ↓
probabilities stored in state
    ↓
OddsDisplay renders updated table
```

## Algorithm

### Combinatorial Analysis

The calculator uses exhaustive enumeration to compute exact probabilities:

1. **Identify replacements**: Determine which card positions need new cards (non-held cards)
2. **Generate combinations**: Create all possible combinations of replacement cards from the remaining deck
3. **Evaluate outcomes**: For each combination, build the final hand and classify it
4. **Count results**: Tally how many times each hand type occurs
5. **Calculate probabilities**: Divide counts by total combinations

### Complexity Analysis

Given a 52-card deck with 5 cards already dealt (47 remaining):

| Cards Held | Cards Drawn | Combinations | Time Complexity | Performance |
|------------|-------------|--------------|-----------------|-------------|
| 5 | 0 | 1 | O(1) | Instant |
| 4 | 1 | 47 | O(47) | <1ms |
| 3 | 2 | 1,081 | O(C(47,2)) | ~10ms |
| 2 | 3 | 16,215 | O(C(47,3)) | ~100ms |
| 1 | 4 | 178,365 | O(C(47,4)) | ~1s |
| 0 | 5 | 1,533,939 | O(C(47,5)) | ~10s+ |

Where C(n,k) is the binomial coefficient "n choose k" = n! / (k! × (n-k)!)

**Note**: The 0-held case is intentionally not calculated in the UI to avoid performance issues.

### Optimization Opportunities

Future optimizations could include:

1. **Memoization**: Cache results for identical hold patterns
2. **Lookup tables**: Pre-compute probabilities for common scenarios
3. **Monte Carlo**: Use sampling instead of exhaustive enumeration for 0-1 held cards
4. **Web Workers**: Move calculations to background thread to avoid UI blocking

## Hand Classification

The `classifyHand()` function maps poker hands to video poker payout categories:

```javascript
Royal Flush       → "Royal Flush"
Straight Flush    → "Straight Flush"
Four of a Kind    → "Four of a Kind"
Full House        → "Full House"
Flush             → "Flush"
Straight          → "Straight"
Three of a Kind   → "Three of a Kind"
Two Pair          → "Two Pair"
Pair (J,Q,K,A)    → "Jacks or Better"
Pair (2-10)       → "No Win"
High Card         → "No Win"
```

**Important**: Unlike traditional poker, low pairs (2-10) do not pay in Jacks or Better.

## Expected Value Calculation

For each hand type, the odds display shows:

```
EV = Probability × Payout
```

Where payout depends on the bet amount (1-5 coins).

**Total Expected Value**:
```
Total EV = Σ(Probability[hand] × Payout[hand, bet])
```

This helps players make optimal strategic decisions by comparing different hold patterns.

## State Management

### Game State Structure

```javascript
{
  game: {
    hand: ['As', 'Kd', 'Qh', 'Jc', 'Ts'],
    hold: [false, false, false, false, false],
    probabilities: {
      'Royal Flush': 0.0213,
      'Flush': 0.1702,
      'Straight': 0.1702,
      'No Win': 0.6383,
      // ... other hands
    },
    // ... other fields
  }
}
```

### When Probabilities Are Calculated

- **NEW_HAND**: Initial deal → Calculate with all cards unheld
- **HOLD_CARD**: Toggle hold → Recalculate with new hold pattern
- **DEAL_NEXT_CARDS**: Draw completes → Clear probabilities (set to null)

### Why Probabilities Are Cleared After Draw

After the draw, the hand is final and there are no more decisions to make. Showing probabilities at this point would be meaningless and potentially confusing.

## UI Integration

### Display Conditions

The odds table only displays when:
- `roundEnded === false` (during hold phase)
- `probabilities !== null` (calculations complete)

This ensures the odds are only shown when they're relevant to the player's decision-making.

### Styling

The odds table uses the same visual style as the pay table for consistency:
- Same border colors and widths
- Same background colors
- Same font sizes
- Responsive design for mobile devices

## Testing

### Test Coverage

The `ProbabilityCalculator.test.js` file includes tests for:

1. **All cards held**: Verifies 100% probability for current hand
2. **Four to a flush**: Tests single-card draw scenarios
3. **Pair of Jacks**: Validates multi-card draw with pair
4. **Four to a straight flush**: Complex scenario with multiple winning possibilities
5. **Probability sum**: Ensures all probabilities sum to 1.0
6. **Formatting**: Tests percentage string formatting

### Performance Tests

The "holding nothing" test (5-card draw) is skipped by default because it takes ~1.5 seconds to compute 1.5M combinations. This test can be enabled for validation but is excluded from normal test runs.

## Example Calculations

### Example 1: Four to a Royal Flush

Hand: `['Ah', 'Kh', 'Qh', 'Jh', '2c']`
Hold: `[true, true, true, true, false]`

**Remaining deck**: 47 cards
**Possible draws**: 47 combinations

- `Th` → Royal Flush (1/47 = 2.13%)
- 8 other hearts → Flush (8/47 = 17.02%)
- 38 non-hearts → No Win (38/47 = 80.85%)

**Expected Value** (bet = 5):
- Royal Flush: 0.0213 × 4000 = 85.2
- Flush: 0.1702 × 30 = 5.1
- Total EV: **90.3 coins**

### Example 2: Low Pair (No Win)

Hand: `['2h', '2s', '5c', '7d', '9h']`
Hold: `[true, true, false, false, false]`

This will calculate probabilities for:
- Three of a Kind (2 remaining 2s out of 47 cards)
- Full House (pair + trips)
- Four of a Kind (both remaining 2s)
- No Win (most outcomes)

But since it's a low pair, none of these outcomes pay except trips/full house/quads, so the EV will be relatively low.

## Future Enhancements

Potential improvements to the odds calculator:

1. **Strategy hints**: Highlight the optimal hold based on highest EV
2. **Comparison mode**: Show EV for different hold patterns side-by-side
3. **Historical tracking**: Track player decisions vs optimal strategy
4. **Configurable pay tables**: Support different video poker variants (Bonus Poker, Deuces Wild, etc.)
5. **Educational mode**: Explain why certain holds are better than others

## References

- [Video Poker Strategy](https://wizardofodds.com/games/video-poker/strategy/)
- [Combinatorics in Poker](https://en.wikipedia.org/wiki/Poker_probability)
- [Expected Value in Gambling](https://en.wikipedia.org/wiki/Expected_value)
