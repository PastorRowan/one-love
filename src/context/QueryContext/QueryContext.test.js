
/*
    File: src/context/QueryContext/QueryContext.test.js
    Description:
        This file contains unit tests for the QueryContext.
        It verifies the functionality of the query state management by simulating user interactions with a test component that uses the QueryContext.
        The tests ensure that the query state updates correctly when the user types in the input field.
*/

// general
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryProvider, useQuery } from './QueryContext';

// TestComponent simulates user interaction with the query input field.
function TestComponent() {
    const { query, setQuery } = useQuery();

    return (
        <div>
          <input
          type="text"
          data-testid="text-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
          <p data-testid="query-display">{query}</p>
       </div>
    );
};

describe('QueryContext', () => {

    it('should update the query state when the user types in the input field', () => {

        // render the QueryProvider with the TestComponent to access the context
        render(
            <QueryProvider>
                <TestComponent />
             </QueryProvider>
        );

        // assert that the input field and displayed query are initially empty
        expect(screen.getByTestId('text-input').value).toBe('');
        expect(screen.getByTestId('query-display').textContent).toBe('');

        // Simulate user typing 'test-query' into the input field
        fireEvent.change(screen.getByTestId('text-input'), { target: { value: 'test-query' } });

        // assert that the input field and displayed query have been updated
        expect(screen.getByTestId('text-input').value).toBe('test-query');
        expect(screen.getByTestId('query-display').textContent).toBe('test-query');

    });
});
