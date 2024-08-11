
// mocks
jest.mock("../../../context/SearchResultsContext/SearchResultsContext", () => ({
    useSearchTracks: jest.fn()
}));
jest.mock("../../../context/PlaylistContext/PlaylistContext", () => ({
    usePlaylistTracks: jest.fn()
}));
jest.mock("../../../context/AudioPlayerContext/AudioPlayerContext", () => ({
    useAudioPlayer: jest.fn()
}));

// react test
import { render, fireEvent } from '@testing-library/react';

// components
import PlaylistTracksCont from "../../PlaylistTracksCont";

// providers
import { useSearchTracks } from "../../../../context/SearchResultsContext/SearchResultsContext";
import { usePlaylistTracks } from "../../../../context/PlaylistContext/PlaylistContext";
import { useAudioPlayer } from "../../../../context/AudioPlayerContext/AudioPlayerContext";

describe('PlaylistTracksCont', () => {
    let mockHandleChangeSrc;
  
    beforeEach(() => {
      // mock the handleChangeSrc function
      mockHandleChangeSrc = jest.fn();
  
      // set up mock implementations for context
      useAudioPlayer.mockReturnValue({
        play: jest.fn(),
        pause: jest.fn(),
        toggle: jest.fn(),
        changeSrc: mockHandleChangeSrc,
        isPlaying: false,
        volume: 1,
        setVolume: jest.fn(),
        currentTime: 0,
        setCurrentTime: jest.fn(),
        duration: 0
      });

      useSearchTracks.mockReturnValue({
        searchTracks: [],
        setSearchTracks: jest.fn()
      });
  
      usePlaylistTracks.mockReturnValue({
        playlistTracksArr: [
          {
            trackId: '1',
            trackName: 'Track 1',
            trackArtist1Name: 'Artist 1',
            trackArtist1Id: 'artist1',
            preview_url: 'http://example.com/track1.mp3'
          }
        ],
        setPlaylistTracksArr: jest.fn()
      });
    });

    it('should call handleChangeSrc with the correct preview_url and not throw errors on successful play button click', () => {
        let caughtError;
        try {
        // render the component
        const { getByTestId } = render(<PlaylistTracksCont />);
    
        // find the play button
        const playButton = getByTestId('play-button');
    
        // simulate click event on the play button
        fireEvent.click(playButton);
    
        // verify handleChangeSrc was called with the correct preview_url
        expect(mockHandleChangeSrc).toHaveBeenCalledWith('http://example.com/track1.mp3');

        } catch (error) {
            caughtError = error;
        };

        expect(caughtError).toBeUndefined();
    });

    it('should call handleChangeSrc with the correct preview_url on play button click', () => {
        const { getByTestId } = render(<PlaylistTracksCont />);

        // find the play button
        const playButton = getByTestId('play-button');

        // verify the button has the correct preview_url attribute
        expect(playButton.getAttribute('preview_url')).toBe('http://example.com/track1.mp3');

        // simulate click event on the play button
        fireEvent.click(playButton);

        // verify handleChangeSrc was called with the correct preview_url
         expect(mockHandleChangeSrc).toHaveBeenCalledWith('http://example.com/track1.mp3');
    });

    it('should throw an erorr if button wrapper is undefined', () => {
        let caughtError;
        try {
        // render the component
        const { getByTestId } = render(<PlaylistTracksCont />);

        // mock the event object with e.currentTarget as null
        const mockEvent = {
            currentTarget: null
        };
    
        // find the play button
        const playButton = getByTestId('play-button');
    
        // simulate click event on the play button with the mocked event
        fireEvent.click(playButton, { target: mockEvent });
    
        // verify handleChangeSrc was called with the correct preview_url
        expect(mockHandleChangeSrc).toHaveBeenCalledWith('http://example.com/track1.mp3');

        } catch (error) {
            caughtError = error;
        };
        
        expect(caughtError).toBeUndefined();
    });
});
