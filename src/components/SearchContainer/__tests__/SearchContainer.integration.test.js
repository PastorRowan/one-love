
/*
    File: src/components/SearchContainer/__tests__/SearchContainer.integration.test.js
    Description:
        Unit tests for the SearchContainer component, ensuring that it renders properly within its context providers.
        These tests verify that the input field and the search button are rendered correctly.
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchContainer from '../SearchContainer';
import { QueryProvider } from '../../../context/QueryContext/QueryContext';
import { SearchResultsProvider } from '../../../context/SearchResultsContext/SearchResultsContext';

// render the component within its context providers
const renderWithContext = (component) => {
  return render(
    <QueryProvider>
      <SearchResultsProvider>
        {component}
      </SearchResultsProvider>
    </QueryProvider>
  );
};

describe('SearchContainer', () => {
  test('renders without crashing', () => {
    renderWithContext(<SearchContainer />);
  });

  test('renders the input field', () => {
    renderWithContext(<SearchContainer />);
    const inputElement = screen.getByPlaceholderText(/What do you want to play?/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('renders the search button', () => {
    renderWithContext(<SearchContainer />);
    const buttonElement = screen.getByText(/Search/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
