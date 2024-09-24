
/*
    File: src/Main.test.js
    Description:
    ...
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
