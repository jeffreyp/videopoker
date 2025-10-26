# Video Poker

A web-based Jacks or Better video poker game with real-time probability calculations.

## Play Now

[Play the game online](https://jeffreyp.github.io/videopoker/)

Or run locally: clone the repo, `npm install`, then `npm start` and visit http://localhost:3000.

## Features

### Core Gameplay
- Classic Jacks or Better video poker rules
- Variable bet amounts (1-5 coins)
- Full pay table: 9/6 (Full House pays 9:1, Flush pays 6:1)
- Royal Flush bonus with max bet (4000 coins on 5-coin bet)
- Smooth animations and responsive design
- Mobile-friendly interface

### Real-Time Odds Calculator (NEW)
During the hold/discard phase, the game displays:
- **Probability** of achieving each winning hand
- **Expected payout** for each possible outcome
- **Expected Value (EV)** to optimize your strategy
- **Total EV** for your current hold decision

The odds update instantly as you select/deselect cards to hold, helping you make optimal strategic decisions.

#### How It Works
The probability calculator:
- Analyzes all possible card combinations for your draw
- Evaluates each potential outcome using combinatorial mathematics
- Displays probabilities as percentages
- Calculates expected value based on your current bet amount

**Example**: Holding 4 cards to a flush?
- See exact probability of completing the flush
- Compare EV against other potential holds
- Make informed decisions based on mathematical advantage

## Game Rules

**Jacks or Better** pays on the following hands:
- Royal Flush: 250/500/750/1000/4000 (for bets 1-5)
- Straight Flush: 50/100/150/200/250
- Four of a Kind: 25/50/75/100/125
- Full House: 9/18/27/36/45
- Flush: 6/12/18/24/30
- Straight: 4/8/12/16/20
- Three of a Kind: 3/6/9/12/15
- Two Pair: 2/4/6/8/10
- Jacks or Better: 1/2/3/4/5

**Note**: Only pairs of Jacks, Queens, Kings, or Aces win. Lower pairs do not pay.

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
│   ├── OddsDisplay.js  # Real-time probability display
│   ├── PayTableContainer.js
│   ├── CardContainer.js
│   └── ...
├── lib/                # Core game logic
│   ├── ProbabilityCalculator.js  # Odds calculation engine
│   ├── Evaluator.js             # Hand evaluation
│   ├── pokersolver.js           # Poker hand solver
│   └── PayTableData.js          # Payout tables
├── reducers/           # State management
├── hooks/              # Custom React hooks
└── styles/             # SASS stylesheets
```

### Testing

The project includes comprehensive tests for:
- Hand evaluation accuracy
- Probability calculations
- Expected value computations

Run tests with:
```bash
npm test
```

### Technologies
- **React 19** - UI framework
- **Redux** - State management
- **SASS** - Styling
- **pokersolver** - Hand evaluation library
- **Jest** - Testing framework

## Credits

Originally based on: https://github.com/keyeh/videopoker/tree/master

Enhanced with real-time odds calculation and improved gameplay features.
