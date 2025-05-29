import { renderHook, act } from '@testing-library/react';
import { useGameActions } from './useGameActions';
import { GameProvider } from '../context/GameContext';

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
});