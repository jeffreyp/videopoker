# Claude Context: Video Poker Project

## Project Overview
A web-based Jacks or Better video poker game built with React 19 and Redux. The key feature is an **integrated real-time probability calculator** that shows optimal strategy guidance as you select cards to hold.

**Live site**: https://jeffreyp.github.io/videopoker/
**Tech stack**: React 19, Redux, SASS, Jest, pokersolver library

## Quick Start
```bash
npm install
npm start          # Dev server at localhost:3000
npm test           # Run tests
npm run build      # Production build
npm run deploy     # Deploy to GitHub Pages
```

## Architecture Overview

### State Management
- **Redux store** with three main reducers:
  - `gameReducer` - Hand state, holds, probabilities, round status
  - `creditReducer` - Player credits and betting
  - `uiReducer` - Card reveal animations, image loading
- **Context API** via `GameContext.js` wraps Redux for easier access
- **Custom hook** `useGameActions.js` provides game action creators

### Key Files

#### Core Game Logic
- `src/lib/Evaluator.js` - Evaluates poker hands and calculates winnings
- `src/lib/ProbabilityCalculator.js` - Combinatorial probability engine
- `src/lib/pokersolver.js` - Third-party poker hand solver
- `src/lib/PayTableData.js` - Payout tables for Jacks or Better (9/6)
- `src/lib/CardList.js` - Standard 52-card deck definitions

#### State Management
- `src/reducers/gameReducer.js` - Game state: hands, holds, probabilities
- `src/hooks/useGameActions.js` - Action creators with async probability calculations
- `src/actions/index.js` - Redux action type constants
- `src/context/GameContext.js` - React Context wrapper for Redux store

#### Components
- `src/components/PayTableContainer.js` - **CRITICAL**: Unified pay table with integrated probability/EV display
- `src/components/DealBtnContainer.js` - Deal/Draw button logic
- `src/components/CardContainer.js` - Card display and hold interactions
- `src/components/CardHold.js` - Hold indicator overlay
- `src/App.js` - Main app component

## Key Concepts

### Probability Calculator Feature
The standout feature - shows real-time odds as you select cards:

1. **When it calculates**: After holding at least one card (0 holds = too expensive, 1.5M combinations)
2. **How it works**:
   - Generates all possible draw outcomes from remaining deck
   - Evaluates each outcome using pokersolver
   - Aggregates into probability distribution
   - Calculates expected value (EV) for each hand type
3. **Performance optimizations**:
   - 150ms debounce on card hold clicks
   - Async calculation via `requestIdleCallback`
   - Probabilities update separately from hold state (optimistic UI)
   - Complexity: 1 hold = 178K combos (~100ms), 2 holds = 16K (~20ms), 3+ holds = <2K (<5ms)

### Game Flow
1. **Round start** (`roundEnded: true`):
   - Click DEAL → `newHand()` → Deals 5 cards, deducts bet
   - `probabilities: null` (no calculation on initial deal)

2. **Card selection** (`roundEnded: false`):
   - Click cards → `holdCard(index)` → Toggles hold state
   - After 150ms debounce → Calculates probabilities asynchronously
   - Updates UI with probability/EV for each hand type

3. **Draw phase**:
   - Click DRAW → `dealNextCards()` → Replaces non-held cards
   - Evaluates final hand, adds winnings
   - **Probabilities persist** to allow strategy review
   - `roundEnded: true`

4. **Next hand**:
   - Click DEAL → Clears probabilities, starts new round

### Recent Changes (Last 5 Commits)
1. **Current**: Persist probability display until next deal (allows post-draw strategy review)
2. Re-enable odds calculation on mobile and tablet devices
3. Fix performance issues and unify pay table with odds display
4. Disable odds calculator on mobile/tablet devices for performance
5. Add real-time probability calculator for optimal video poker strategy

## Common Tasks

### Modifying Game Logic
- **Change hand evaluation**: Edit `src/lib/Evaluator.js`
- **Adjust pay table**: Edit `src/lib/PayTableData.js`
- **Modify probability calculations**: Edit `src/lib/ProbabilityCalculator.js`

### Modifying Game Flow
- **Change when probabilities calculate**: Edit `src/hooks/useGameActions.js` (`holdCard` function)
- **Change game state transitions**: Edit `src/reducers/gameReducer.js`
- **Modify bet amounts**: Edit `initialGameState.betAmount` in `gameReducer.js`

### UI Changes
- **Pay table display**: Edit `src/components/PayTableContainer.js`
- **Card visuals**: Edit `src/components/Card.js` and `CardHold.js`
- **Button behavior**: Edit `src/components/DealBtnContainer.js`
- **Styles**: SASS files in `src/styles/`

## Important Gotchas

### Probability Calculation Timing
- **Don't calculate on initial deal** (0 holds = 1.5M combinations, too slow)
- Calculations happen in `holdCard()` via debounced async action
- Results arrive via separate `UPDATE_PROBABILITIES` action
- The hold state updates immediately (optimistic UI), probabilities follow

### State Clearing
- `probabilities` cleared on `NEW_HAND` (not on `DEAL_NEXT_CARDS` anymore)
- This allows reviewing strategy after the draw
- Old behavior cleared immediately, making post-draw review impossible

### Redux + Context
- Don't use Redux hooks directly, use `useGameContext()` instead
- Actions are dispatched through the context, not Redux's `useDispatch()`
- Game actions should use `useGameActions()` hook, not raw action creators

### Async Actions
- `holdCard()` updates hold state immediately
- Probability calculation happens 150ms later (debounced)
- Results dispatched via `UPDATE_PROBABILITIES` action
- Never block the main thread - use `requestIdleCallback`

## Testing Strategy
- Unit tests for probability calculations: `src/lib/ProbabilityCalculator.test.js`
- Hand evaluation tests: `src/lib/Evaluator.test.js`
- Component tests: `*.test.js` files alongside components
- Run with `npm test`

## Performance Considerations
- **Critical path**: Card hold click → optimistic UI update → debounced calculation
- **Bottleneck**: Probability calculation for 1 held card (178K combinations)
- **Solution**: Debounce + requestIdleCallback + async dispatch
- **Mobile**: All calculations now work on mobile (recent fix)

## Deployment
- Hosted on GitHub Pages at `jeffreypratt.org/videopoker`
- Deploy with `npm run deploy` (builds and pushes to gh-pages branch)
- `homepage` in package.json must match GitHub Pages URL

## Future Enhancement Ideas
- Multi-hand video poker variants
- Adjustable pay tables (8/5, 7/5 Jacks or Better)
- Strategy advisor (highlight optimal hold decisions)
- Statistics tracking (RTP, hands played, biggest wins)
- Progressive jackpot mode
- Sound effects and better animations

## Questions to Ask the Developer
When starting work, consider asking:
- Are there any specific game variants to support?
- Should the probability calculator be optional/toggleable?
- Performance targets for mobile devices?
- Analytics or tracking requirements?
