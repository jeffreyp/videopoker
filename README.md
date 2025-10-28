# Video Poker

A web-based Jacks or Better video poker game with real-time probability calculations and optimal strategy guidance.

## Play Now

[Play the game online](https://jeffreyp.github.io/videopoker/)

Or run locally: clone the repo, `npm install`, then `npm start` and visit http://localhost:3000.

## Features

### Core Gameplay
- Classic Jacks or Better video poker rules
- Fixed 5-coin max bet for optimal play
- Full pay table: 9/6 (Full House pays 9:1, Flush pays 6:1)
- Royal Flush bonus: 4000 coins on max bet
- Smooth animations and responsive design
- Mobile-friendly interface

### Integrated Odds Calculator
The game features a unified pay table that displays:
- **Hand payouts** for each winning combination
- **Real-time probability** of achieving each hand after the draw
- **Expected Value (EV)** for each possible outcome
- **Total Expected Value** for your current hold decision

The probabilities update dynamically as you select which cards to hold, providing instant feedback on your strategic decisions.

#### How It Works
The probability calculator:
- Uses combinatorial mathematics to analyze all possible draw outcomes
- Calculates exact probabilities based on remaining deck composition
- Updates asynchronously to maintain smooth UI performance
- Debounces rapid clicks to prevent calculation lag
- Optimizes complex scenarios (e.g., 178K combinations when holding 1 card)

**Example**: Dealt two pair (J♥ J♠ 3♣ 3♦ 9♥)?
- Hold the four cards making two pair (discard kicker)
- See 91.49% probability of keeping two pair
- See 8.51% probability of improving to full house
- Total EV shows this is optimal play

## Game Rules

**Jacks or Better** pays on the following hands (5-coin bet):
- Royal Flush: 4000 coins (bonus payout)
- Straight Flush: 250 coins
- Four of a Kind: 125 coins
- Full House: 45 coins
- Flush: 30 coins
- Straight: 20 coins
- Three of a Kind: 15 coins
- Two Pair: 10 coins
- Jacks or Better: 5 coins

**Note**: Only pairs of Jacks, Queens, Kings, or Aces win. Lower pairs (2-10) do not pay.

### Gameplay
1. Click **DEAL** to receive 5 cards (costs 5 credits)
2. Click cards to **HOLD** the ones you want to keep
3. Click **DRAW** to replace non-held cards
4. Winning hands automatically pay out credits

## Development

### Installation
```bash
npm install
```

### Available Scripts

#### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Builds the app for production to the `build` folder.

#### `npm run deploy`
Deploys the production build to GitHub Pages.

### Project Structure
```
src/
├── components/          # React components
│   ├── PayTableContainer.js  # Unified pay table with integrated odds
│   ├── CardContainer.js      # Card display and hold interactions
│   ├── DealBtnContainer.js   # Deal/Draw button logic
│   └── ...
├── lib/                # Core game logic
│   ├── ProbabilityCalculator.js  # Async odds calculation engine
│   ├── Evaluator.js              # Hand evaluation
│   ├── pokersolver.js            # Poker hand solver library
│   └── PayTableData.js           # Payout tables
├── actions/            # Redux actions with async probability updates
├── reducers/           # State management
├── hooks/              # Custom React hooks (useGameActions)
└── styles/             # SASS stylesheets
```

### Performance Optimizations

The probability calculator handles complex scenarios efficiently:
- **Debouncing**: 150ms delay prevents lag from rapid card selection
- **Async calculation**: Uses `requestIdleCallback` to avoid blocking UI
- **Smart caching**: Optimizes repeated calculations
- **Mobile optimization**: Disables probability display on touch devices
- **Complexity handling**:
  - 0 cards held: No calculation (display placeholder)
  - 1 card held: 178K combinations (~100ms)
  - 2 cards held: 16K combinations (~20ms)
  - 3+ cards held: <2K combinations (<5ms)

### Testing

The project includes comprehensive tests for:
- Hand evaluation accuracy
- Probability calculations
- Expected value computations
- Game action flows

Run tests with:
```bash
npm test
```

### Technologies
- **React 19** - UI framework with Context API
- **Redux** - State management
- **SASS** - Styling with responsive breakpoints
- **pokersolver** - Hand evaluation library
- **Jest** - Testing framework

## Technical Highlights

### Probability Calculation
The odds calculator evaluates every possible draw outcome using combinatorial mathematics:
- Determines which cards need replacement
- Generates all possible card combinations from remaining deck
- Evaluates each potential hand using the pokersolver library
- Aggregates results into probability distributions
- Calculates expected value for strategic decision-making

### Architecture
- **Async Actions**: Probability calculations run off the main thread
- **Optimistic UI**: Card holds update instantly, odds follow asynchronously
- **Fixed Layout**: Table columns use fixed widths to prevent layout shifts
- **Responsive Design**: Adapts to desktop, tablet, and mobile screens

## Credits

Originally based on: https://github.com/keyeh/videopoker/tree/master

Enhanced with:
- Integrated real-time probability calculator
- Unified pay table with odds display
- Async calculation engine with debouncing
- Performance optimizations for complex scenarios
- Fixed-bet optimal play strategy
