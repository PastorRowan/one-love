
/*
    File: src/Providers.test.js
    Description:
        This file contains unit tests for the Providers component.
        It verifies that the Providers component correctly renders its child components within all context providers.
        The tests utilize React Testing Library to ensure that the expected mock component appears in the document when wrapped inside the Providers component.
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
