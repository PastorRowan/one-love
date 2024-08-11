
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SearchContainer from '../../SearchContainer';
import { QueryProvider } from '../../../../context/QueryContext/QueryContext';

// cleanup after each test
afterEach(cleanup);

const renderWithContext = (component) => {
    return render(
      <QueryProvider>
          {component}
      </QueryProvider>
    );
  };

describe('SearchContainer', () => {
    test('sets the query to whatever is typed in the input field', () => {

        // render the component with the necessary context
        renderWithContext(<SearchContainer />);

        // get the input field element
        const inputElement = screen.getByPlaceholderText(/What do you want to play?/i);

        // simulate user typing into the input field
        fireEvent.change(inputElement, { target: { value: 'Test Query' } });

        // Verify the input field value has been updated
        expect(inputElement.value).toBe('Test Query');

    });
});
