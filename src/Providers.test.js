
/*
  File: src/Providers.test.js
  Description:
  ...
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import Providers from './Providers';

// mock components to test if Providers renders them correctly
const MockComponent = () => <div>Test Component</div>;

describe('Providers Component', () => {
  it('should render children within all context providers', () => {
    render(
      <Providers>
        <MockComponent />
      </Providers>
    );
    // verify that the mock component is rendered, indicating that Providers is working
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
