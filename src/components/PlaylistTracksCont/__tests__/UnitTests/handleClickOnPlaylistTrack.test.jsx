
/*
  File: src/components/PlaylistTracksCont/__tests__/UnitTests/handleClickOnPlaylistTrack.test.jsx
  Description: Unit test for handleClickOnPlaylistTrack function to check error handling and console.error calls.
*/

// mock context hooks
jest.mock('../../../../context/SearchResultsContext/SearchResultsContext', () => ({
    useSearchTracks: jest.fn()
  }));
  jest.mock('../../../../context/PlaylistContext/PlaylistContext', () => ({
    usePlaylistTracks: jest.fn()
  }));
  jest.mock('../../../../context/AudioPlayerContext/AudioPlayerContext', () => ({
    useAudioPlayer: jest.fn()
  }));

// imports
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlaylistTracksCont from '../../PlaylistTracksCont';
import { useSearchTracks } from '../../../../context/SearchResultsContext/SearchResultsContext';
import { usePlaylistTracks } from '../../../../context/PlaylistContext/PlaylistContext';
import { useAudioPlayer } from '../../../../context/AudioPlayerContext/AudioPlayerContext';

describe('handleClickOnPlaylistTrack Error Handling', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should log an error when data-index is not found or other errors occur', () => {
    const mockResults = [
      { trackId: 1, trackName: 'Track 1', trackArtist1Name: 'Artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' }
    ];

    const mockSetSearchTracks = jest.fn();
    const mockSetPlaylistTracksArr = jest.fn();

    useSearchTracks.mockReturnValue({ searchTracks: [], setSearchTracks: mockSetSearchTracks });
    usePlaylistTracks.mockReturnValue({ playlistTracksArr: mockResults, setPlaylistTracksArr: mockSetPlaylistTracksArr });
    useAudioPlayer.mockReturnValue({
      play: jest.fn(),
      pause: jest.fn(),
      toggle: jest.fn(),
      changeSrc: jest.fn(),
      isPlaying: jest.fn(),
      volume: 0.5,
      setVolume: jest.fn(),
      currentTime: 0,
      setCurrentTime: jest.fn(),
      duration: 0
    });

    render(<PlaylistTracksCont />);

    // simulate clicking on a track without data-index attribute
    const trackContainer = screen.getByText('Track 1').closest('div');
    if (trackContainer) {
        // remove data-index to trigger the error
        trackContainer.removeAttribute('data-index');
    };

    const mockConsoleError = jest.fn();

    const originalConsoleError = console.error;
    console.error = mockConsoleError;

    fireEvent.click(screen.getByText('Track 1'));

    // verify that console.error was called with the correct error
    expect(mockConsoleError).toHaveBeenCalledWith('Error handling click on playlist track:', expect.any(Error));
    expect(mockConsoleError.mock.calls[0][1].message).toBe('Index attribute not found');

    // restore the original console.error
    console.error = originalConsoleError;
  });

  it('should log an error if index is not a number or track is not found', () => {
    const mockResults = [
        { trackId: 1, trackName: 'Track 1', trackArtist1Name: 'Artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' }
      ];
  
      const mockSetSearchTracks = jest.fn();
      const mockSetPlaylistTracksArr = jest.fn();
  
      useSearchTracks.mockReturnValue({ searchTracks: [], setSearchTracks: mockSetSearchTracks });
      usePlaylistTracks.mockReturnValue({ playlistTracksArr: mockResults, setPlaylistTracksArr: mockSetPlaylistTracksArr });
      useAudioPlayer.mockReturnValue({
        play: jest.fn(),
        pause: jest.fn(),
        toggle: jest.fn(),
        changeSrc: jest.fn(),
        isPlaying: jest.fn(),
        volume: 0.5,
        setVolume: jest.fn(),
        currentTime: 0,
        setCurrentTime: jest.fn(),
        duration: 0
      });
  
      render(<PlaylistTracksCont />);
  
      // simulate clicking on a track without data-index attribute
      const trackContainer = screen.getByText('Track 1').closest('div');
      if (trackContainer) {
          // set an invalid index to trigger the error
          trackContainer.setAttribute('data-index', 'not-a-number');
      };
  
      const mockConsoleError = jest.fn();
  
      const originalConsoleError = console.error;
      console.error = mockConsoleError;
  
      fireEvent.click(screen.getByText('Track 1'));
  
      // verify that console.error was called with the correct error
      expect(mockConsoleError).toHaveBeenCalledWith('Error handling click on playlist track:', expect.any(Error));
      expect(mockConsoleError.mock.calls[0][1].message).toBe('Invalid index number');
  
      // restore the original console.error
      console.error = originalConsoleError;
  });
});
