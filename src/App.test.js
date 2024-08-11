
/*
  File: src/App.test.js
  Description: Tests for the `App` component to ensure it renders all child components.
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// mock the child components to simplify the test
jest.mock('./components/Header/Header', () => () => <div>Header</div>);
jest.mock('./Main', () => () => <div>Main</div>);
jest.mock('./components/Footer/Footer', () => () => <div>Footer</div>);
jest.mock('./components/AudioController/AudioController', () => () => <div>AudioController</div>);

describe('App Component', () => {
  it('renders Header, Main, AudioController, and Footer components', () => {
    render(<App />);

    // check that each child component is rendered
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('AudioController')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
