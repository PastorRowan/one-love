
/*
  File: src/components/Footer/Footer.unit.test.js
  Description: ...
*/

import { render, screen } from '@testing-library/react';

// components
import Footer from './Footer';

describe('Header component', () => {

    test('renders footer component with all subcomponents and content present', () => {

        // renders footer
        render(<Footer />);

        // gets components
        const footerContainer = screen.getByTestId('footerContainer');
        const footer = screen.getByTestId('footer');
        const myName = screen.getByText('Rowan Van Zyl');
        const ContactMe = screen.getByText('Contact Me');
        const CV = screen.getByText('CV');

        // tests if they are in dom with correct content
        expect(footerContainer).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
        expect(myName).toBeInTheDocument();
        expect(ContactMe).toBeInTheDocument();
        expect(CV).toBeInTheDocument();
    });

});
