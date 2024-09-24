
/*
  File: src/context/SearchResultsContext/SearchResultsContext.test.js
  Description: ...
*/

// general
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchResultsProvider, useSearchTracks } from './SearchResultsContext';

function TestComponent() {
    const { searchTracks, setSearchTracks } = useSearchTracks();

    return (
        <div>
            <button
            onClick={() => {
                setSearchTracks([
                {
                    trackId: '1',
                    trackName: 'One Love',
                    trackArtist1Name: 'Bob Marley',
                    trackArtist1Id: '1',
                    preview_url: 'https://example.com'
                }
            ])}}
            >
                Add Track
            </button>
            <div data-testid="search-tracks">
                {searchTracks.map(track => (
                    <div key={track.trackId}>
                        <span>{track.trackName}</span>
                        <span>{track.trackArtist1Name}</span>
                    </div>
                ))}
            </div>
       </div>
    );
};

describe('SearchResultsContext', () => {

    it('should provide and update the search playlist tracks correctly', () => {

        // render screen
        render(
            <SearchResultsProvider>
                <TestComponent />
            </SearchResultsProvider>
        );

        // initially, the track list should be empty
        expect(screen.queryByTestId('search-tracks').children.length).toBe(0);

        // click the button to add a track
        fireEvent.click(screen.getByText('Add Track'));

        // verify that the track is added
        expect(screen.getByText('One Love')).toBeInTheDocument();
        expect(screen.getByText('Bob Marley')).toBeInTheDocument();

    });

});
