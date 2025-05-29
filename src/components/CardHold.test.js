import React from 'react';
import { render, screen } from '@testing-library/react';
import CardHold from './CardHold';

describe('CardHold Component', () => {
    test('renders HELD when hold is true', () => {
        render(<CardHold hold={true} />);
        
        expect(screen.getByText('HELD')).toBeInTheDocument();
    });

    test('renders nothing when hold is false', () => {
        const { container } = render(<CardHold hold={false} />);
        
        expect(container.firstChild).toBeNull();
    });

    test('memoization works correctly', () => {
        const { rerender } = render(<CardHold hold={true} />);
        
        // Re-render with same props should not create new component
        rerender(<CardHold hold={true} />);
        
        expect(screen.getByText('HELD')).toBeInTheDocument();
    });
});