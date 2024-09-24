
/*
    File: src/Main.test.js
    Description:
        This file contains unit tests for the Main component.
        It verifies that the Main component correctly renders its child components: 
            SearchContainer, SearchTracksCont, and PlaylistTracksCont.
        The tests utilize Jest and React Testing Library to ensure that the expected components appear in the document when the Main component is rendered.
*/

// mock the child components
jest.mock('./components/SearchContainer/SearchContainer', () => () => <div>SearchContainer Component</div>);
jest.mock('./components/SearchTracksCont/SearchTracksCont', () => () => <div>SearchTracksCont Component</div>);
jest.mock('./components/PlaylistTracksCont/PlaylistTracksCont', () => () => <div>PlaylistTracksCont Component</div>);

import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main component', () => {
    it('renders SearchContainer, SearchTracksCont, and PlaylistTracksCont components', () => {
      // render the Main component
      render(<Main />);

      // check if the child components are in the document
      expect(screen.getByText('SearchContainer Component')).toBeInTheDocument();
      expect(screen.getByText('SearchTracksCont Component')).toBeInTheDocument();
      expect(screen.getByText('PlaylistTracksCont Component')).toBeInTheDocument();
    });
  });
