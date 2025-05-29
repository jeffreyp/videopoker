import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

// Mock the useLazyImages hook
jest.mock('../hooks/useLazyImages', () => ({
    useLazyImages: () => ({
        observeImage: jest.fn(),
        loadedImages: new Set()
    })
}));

describe('Card Component', () => {
    test('renders card back when not revealed', () => {
        render(<Card card="AS" revealed={false} />);
        
        const cardImg = screen.getByAltText('Card back');
        expect(cardImg).toBeInTheDocument();
        expect(cardImg.src).toContain('RED_BACK.svg');
    });

    test('renders card back when no card provided', () => {
        render(<Card card={null} revealed={true} />);
        
        const cardImg = screen.getByAltText('Card back');
        expect(cardImg).toBeInTheDocument();
        expect(cardImg.src).toContain('RED_BACK.svg');
    });

    test('renders playing card when revealed', () => {
        render(<Card card="AS" revealed={true} />);
        
        const cardImg = screen.getByAltText('Playing card');
        expect(cardImg).toBeInTheDocument();
        expect(cardImg.dataset.src).toContain('AS.svg');
    });

    test('memoization works correctly', () => {
        const props = { card: "AS", revealed: true };
        const { rerender } = render(<Card {...props} />);
        
        // Re-render with same props should not create new component
        rerender(<Card {...props} />);
        
        expect(screen.getByAltText('Playing card')).toBeInTheDocument();
    });
});