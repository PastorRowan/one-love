
/*
  File: src/components/SearchTracksCont/__tests__/UnitTests/handleClickOnPlayButton.test.js
  Description:
  ...
*/

// mock context
jest.mock('../../../../context/SearchResultsContext/SearchResultsContext', () => ({
  useSearchTracks: jest.fn()
}));

jest.mock('../../../../context/PlaylistContext/PlaylistContext', () => ({
  usePlaylistTracks: jest.fn()
}));

jest.mock('../../../../context/AudioPlayerContext/AudioPlayerContext', () => ({
  useAudioPlayer: jest.fn()
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchTracks } from '../../../context/SearchResultsContext/SearchResultsContext';
import { usePlaylistTracks } from '../../../context/PlaylistContext/PlaylistContext';
import { useAudioPlayer } from '../../../context/AudioPlayerContext/AudioPlayerContext';
import SearchTracksCont from '../SearchTracksCont';

describe('SearchTracksCont', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call handleChangeSrc with the correct URL when play button is clicked', () => {
    const mockChangeSrc = jest.fn();
    useAudioPlayer.mockReturnValue({
      play: jest.fn(),
      pause: jest.fn(),
      toggle: jest.fn(),
      changeSrc: mockChangeSrc,
      isPlaying: false,
      volume: 0.5,
      setVolume: jest.fn(),
      currentTime: 0,
      setCurrentTime: jest.fn(),
      duration: 100,
    });

    useSearchTracks.mockReturnValue({
      searchTracks: [
      { trackId: 1, trackName: 'Track 1', trackArtist1Name: 'artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' },
      { trackId: 2, trackName: 'Track 2', trackArtist1Name: 'artist 2', trackArtist1Id: '12345', preview_url: 'http://example.com/track2' }
      ],
      setSearchTracks: jest.fn(),
    });

    usePlaylistTracks.mockReturnValue({
      playlistTracksArr: [],
      setPlaylistTracksArr: jest.fn(),
    });

    render(<SearchTracksCont />);

    const playButton = screen.getAllByTestId('playButton');
    const firstPlaybutton = playButton[0];
    fireEvent.click(firstPlaybutton);

    expect(mockChangeSrc).toHaveBeenCalledWith('http://example.com/track1');
  });

  // the fucntion logs errors but my fucking god its hard to test whether errors have been thrown or not. I am probably just gonna
  // make a try catch block with the original function which sucks because I want to simulate user input but its just too difficult

  it('should log an error if handleClickOnPlayButton encounters an issue', () => {
    const mockChangeSrc = jest.fn();
    useAudioPlayer.mockReturnValue({
      play: jest.fn(),
      pause: jest.fn(),
      toggle: jest.fn(),
      changeSrc: mockChangeSrc,
      isPlaying: false,
      volume: 0.5,
      setVolume: jest.fn(),
      currentTime: 0,
      setCurrentTime: jest.fn(),
      duration: 100,
    });

    useSearchTracks.mockReturnValue({
      searchTracks: [
      { trackId: 1, trackName: 'Track 1', trackArtist1Name: 'artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' },
      { trackId: 2, trackName: 'Track 2', trackArtist1Name: 'artist 2', trackArtist1Id: '12345', preview_url: 'http://example.com/track2' }
      ],
      setSearchTracks: jest.fn(),
    });

    usePlaylistTracks.mockReturnValue({
      playlistTracksArr: [],
      setPlaylistTracksArr: jest.fn(),
    });

    render(<SearchTracksCont />);

    const playButton = screen.getAllByTestId('playButton');
    const firstPlayButton = playButton[0];

    // simulate an error by setting `preview_url` to null
    firstPlayButton.getAttribute = jest.fn(() => null);

    const mockConsoleError = jest.fn();

    const originalConsoleError = console.error;
    console.error = mockConsoleError;

    fireEvent.click(firstPlayButton);
  
    expect(mockConsoleError).toHaveBeenCalled();

     // restore the original console.error
    console.error = originalConsoleError;
  });
});
