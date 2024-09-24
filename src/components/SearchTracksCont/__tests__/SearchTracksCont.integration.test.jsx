
/*
    File: src/components/SearchTracksCont/__tests__/SearchTracksCont.integration.test.jsx
    Description:
        Integration tests for the `SearchTracksCont` component.
        These tests check the interaction of the component with various contexts, including search results, playlist tracks, and the audio player.
        They ensure that search results are displayed correctly, track interactions (like play and add to playlist) are functioning as expected, and appropriate messages are shown based on the state of search and playlist tracks.
*/

// mocks
jest.mock('../../SearchContainer/fetchQueryTracks');
jest.mock('../../../context/QueryContext/QueryContext', () => ({
    QueryProvider: ({ children }) => <div>{children}</div>,
    useQuery: jest.fn()
}));
jest.mock('../../../context/SearchResultsContext/SearchResultsContext', () => ({
    SearchResultsProvider: ({ children }) => <div>{children}</div>,
    useSearchTracks: jest.fn()
}));
jest.mock('../../../context/PlaylistContext/PlaylistContext', () => ({
  PlaylistTracksProvider: ({ children }) => <div>{children}</div>,
  usePlaylistTracks: jest.fn()
}));
jest.mock('../../../context/AudioPlayerContext/AudioPlayerContext', () => ({
  AudioPlayerProvider: ({ children }) => <div>{children}</div>,
  useAudioPlayer: jest.fn()
}));

// mock the fetchQueryTracks function
import React, { useEffect } from 'react';
import { render, screen, fireEvent, waitFor, cleanup  } from '@testing-library/react';
import { QueryProvider, useQuery } from '../../../context/QueryContext/QueryContext';
import { SearchResultsProvider, useSearchTracks } from '../../../context/SearchResultsContext/SearchResultsContext';
import { PlaylistTracksProvider, usePlaylistTracks } from '../../../context/PlaylistContext/PlaylistContext';
import { AudioPlayerProvider, useAudioPlayer } from '../../../context/AudioPlayerContext/AudioPlayerContext';
import SearchTracksCont from '../SearchTracksCont';
import fetchQueryTracks from '../../SearchContainer/fetchQueryTracks';

const renderWithProviders = (component) => {
  return render(
    <QueryProvider>
      <SearchResultsProvider>
        <PlaylistTracksProvider>
          <AudioPlayerProvider>
            {component}
          </AudioPlayerProvider>
        </PlaylistTracksProvider>
      </SearchResultsProvider>
    </QueryProvider>
  );
};

describe('SearchTracksCont Integration Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display search results and handle track interactions correctly', async () => {
    const mockResults = [
      { trackId: 1, trackName: 'Track 1', trackArtist1Name: 'Artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' },
      { trackId: 2, trackName: 'Track 2', trackArtist1Name: 'Artist 2', trackArtist1Id: '1234', preview_url: 'http://example.com/track2' },
    ];

    const mockSetSearchTracks = jest.fn();
    const mockSetPlaylistTracksArr = jest.fn();
    const mockHandleChangeSrc = jest.fn();

    fetchQueryTracks.mockResolvedValue(mockResults);

    useSearchTracks.mockReturnValue({ searchTracks: mockResults, setSearchTracks: mockSetSearchTracks });
    usePlaylistTracks.mockReturnValue({ playlistTracksArr: [], setPlaylistTracksArr: mockSetPlaylistTracksArr });
    useAudioPlayer.mockReturnValue({
        play: jest.fn(),
        pause: jest.fn(),
        toggle: jest.fn(),
        changeSrc: mockHandleChangeSrc,
        isPlaying: jest.fn(),
        volume: 0.5,
        setVolume: jest.fn(),
        currentTime: 0,
        setCurrentTime: jest.fn(),
        duration: 0
    });

    // capture the function passed to setPlaylistTracksArr
    let updateFunction;
    mockSetPlaylistTracksArr.mockImplementation((fn) => {
      updateFunction = fn;
    });

    // render the component
    renderWithProviders(<SearchTracksCont />);

    // verify search results are displayed
    await waitFor(() => {
      expect(screen.getByText('Track 1')).toBeInTheDocument();
      expect(screen.getByText('Track 2')).toBeInTheDocument();
    });

    // simulate clicking on the play button
    const playButtons = screen.getAllByTestId('playButton');
    const firstPlaybutton = playButtons[0];
    fireEvent.click(firstPlaybutton);
    
    expect(mockHandleChangeSrc).toHaveBeenCalledWith('http://example.com/track1');

    // simulate clicking on a track to add it to the playlist
    fireEvent.click(screen.getByText('Track 1'));

    // I am basically trying to mock the setSearchTracks function where you can take the previous track and insert it into an anonomous
    // function then create a new array from the previous array basically its not a very good test but it is quite difficult to immitate
    // that function within an automated testing enviroment but here probably is a better solution

    // call the captured function with a test array
    const previousArray = [];
    const newTrack = mockResults[0];
    const resultArray = updateFunction(previousArray, newTrack);

    // verify the result
    expect(resultArray).toEqual([newTrack]);
  });

  it('should display appropriate welcome messages based on search and playlist states', async () => {

    useSearchTracks.mockReturnValue({ searchTracks: [], setSearchTracks: jest.fn() });
    usePlaylistTracks.mockReturnValue({ playlistTracksArr: [], setPlaylistTracksArr: jest.fn() });
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

    // render the component with no search results and playlist tracks
    renderWithProviders(<SearchTracksCont />);

    // verify welcome message for no search results and playlist tracks
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Press search to get songs')).toBeInTheDocument();

    cleanup();

    await useSearchTracks.mockReturnValue({ searchTracks: [{ trackId: 1, trackName: 'Track 1', trackArtist1Name: 'Artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' },], setSearchTracks: jest.fn() });
    await usePlaylistTracks.mockReturnValue({ playlistTracksArr: [], setPlaylistTracksArr: jest.fn() });
    // render the component with search results
    renderWithProviders(<SearchTracksCont />);

    await waitFor(() => {
        expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
        expect(screen.queryByText('Press search to get songs')).not.toBeInTheDocument();
      });
  });
});
