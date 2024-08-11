
/*
  File: src/context/PlaylistContext/PlaylistContext.test.js
  Description: ...
*/

// general
import { render, screen, fireEvent } from '@testing-library/react';
import { PlaylistTracksProvider, usePlaylistTracks } from './PlaylistContext';

function TestComponent() {
    const { playlistTracksArr, setPlaylistTracksArr } = usePlaylistTracks();

    return (
        <div>
           <button
           onClick={() => {
           setPlaylistTracksArr([
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
          <div data-testid="playlist-tracks">
            {playlistTracksArr.map(track => (
            <div key={track.trackId}>
              <span>{track.trackName}</span>
              <span>{track.trackArtist1Name}</span>
            </div>
            ))}
           </div>
       </div>
    );
};

describe('PlaylistTracksContext', () => {

    it('should provide and update the playlist tracks correctly', () => {
        // render screen
        render(
          <PlaylistTracksProvider>
            <TestComponent />
          </PlaylistTracksProvider>
        );

        // initially, the playlist should be empty
        expect(screen.queryByTestId('playlist-tracks').children.length).toBe(0);

        // click the button to add a track
        fireEvent.click(screen.getByText('Add Track'));

        // verify that the track is added
        expect(screen.getByText('One Love')).toBeInTheDocument();
        expect(screen.getByText('Bob Marley')).toBeInTheDocument();
    });

});
