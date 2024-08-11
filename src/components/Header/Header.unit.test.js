
/*
  File: src/components/Header/Header.unit.test.js
  Description: ...
*/

import { render, screen } from '@testing-library/react';

// components
import Header from './Header';

describe('Header component', () => {

    test('renders Header component with all subcomponents and content present', () => {

        // renders header
        render(<Header />);

        // gets components
        const headerContainer = screen.getByTestId('headerContainer');
        const header = screen.getByTestId('header');
        const title = screen.getByText('One Love');
        
        // tests if they are in dom with correct text
        expect(headerContainer).toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });

});
