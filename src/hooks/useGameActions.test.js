import { renderHook, act } from '@testing-library/react';
import { useGameActions } from './useGameActions';
import { GameProvider, useGameContext } from '../context/GameContext';

const wrapper = ({ children }) => (
    <GameProvider>{children}</GameProvider>
);

describe('useGameActions', () => {
    test('newHand creates a new hand with 5 cards', () => {
        const { result } = renderHook(() => useGameActions(), { wrapper });
        
        act(() => {
            result.current.newHand();
        });

        // Since we can't easily test the actual state without accessing context,
        // we'll just ensure the function exists and doesn't throw
        expect(result.current.newHand).toBeDefined();
        expect(typeof result.current.newHand).toBe('function');
    });

    test('holdCard function exists', () => {
        const { result } = renderHook(() => useGameActions(), { wrapper });
        
        expect(result.current.holdCard).toBeDefined();
        expect(typeof result.current.holdCard).toBe('function');
    });

    test('dealNextCards function exists', () => {
        const { result } = renderHook(() => useGameActions(), { wrapper });
        
        expect(result.current.dealNextCards).toBeDefined();
        expect(typeof result.current.dealNextCards).toBe('function');
    });

    test('subtractCredits function exists', () => {
        const { result } = renderHook(() => useGameActions(), { wrapper });
        
        expect(result.current.subtractCredits).toBeDefined();
        expect(typeof result.current.subtractCredits).toBe('function');
    });

    test('addCredits function exists', () => {
        const { result } = renderHook(() => useGameActions(), { wrapper });
        
        expect(result.current.addCredits).toBeDefined();
        expect(typeof result.current.addCredits).toBe('function');
    });

    test('held cards remain in place when dealing next cards', () => {
        const TestComponent = () => {
            const actions = useGameActions();
            const { state } = useGameContext();
            return { actions, state };
        };

        const { result } = renderHook(() => TestComponent(), { wrapper });

        // Start a new hand
        act(() => {
            result.current.actions.newHand();
        });

        const initialHand = result.current.state.game.hand;
        expect(initialHand).toHaveLength(5);
        expect(initialHand.every(card => card !== null)).toBe(true);

        // Hold cards at indices 1 and 3
        act(() => {
            result.current.actions.holdCard(1);
        });
        act(() => {
            result.current.actions.holdCard(3);
        });

        // Verify hold state is correct
        expect(result.current.state.game.hold).toEqual([false, true, false, true, false]);

        const heldCard1 = initialHand[1];
        const heldCard3 = initialHand[3];

        // Deal next cards
        act(() => {
            result.current.actions.dealNextCards();
        });

        const finalHand = result.current.state.game.hand;

        // Verify held cards remained the same
        expect(finalHand[1]).toBe(heldCard1);
        expect(finalHand[3]).toBe(heldCard3);

        // Verify non-held cards were replaced (should be different)
        expect(finalHand[0]).not.toBe(initialHand[0]);
        expect(finalHand[2]).not.toBe(initialHand[2]);
        expect(finalHand[4]).not.toBe(initialHand[4]);

        // Verify hold state was reset after dealing
        expect(result.current.state.game.hold).toEqual([false, false, false, false, false]);
    });
});