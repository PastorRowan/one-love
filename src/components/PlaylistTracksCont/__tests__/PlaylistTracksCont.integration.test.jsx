
/*
  File: src/components/PlaylistTracksCont/__tests__/PlaylistTracksCont.integration.test.jsx
  Description:
  ...
*/

// mock context hooks
jest.mock('../../../context/SearchResultsContext/SearchResultsContext', () => ({
    useSearchTracks: jest.fn(),
  }));
  
  jest.mock('../../../context/PlaylistContext/PlaylistContext', () => ({
    usePlaylistTracks: jest.fn(),
  }));
  
  jest.mock('../../../context/AudioPlayerContext/AudioPlayerContext', () => ({
    useAudioPlayer: jest.fn(),
  }));
  
  jest.mock('../createPlaylist', () => jest.fn());
  jest.mock('../addItemsToPlaylist', () => jest.fn());

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlaylistTracksCont from '../PlaylistTracksCont';
import { useSearchTracks } from '../../../context/SearchResultsContext/SearchResultsContext';
import { usePlaylistTracks } from '../../../context/PlaylistContext/PlaylistContext';
import { useAudioPlayer } from '../../../context/AudioPlayerContext/AudioPlayerContext';
import createPlaylist from '../createPlaylist';
import addItemsToPlaylist from '../addItemsToPlaylist';

// helper functions to setup context mocks
const setupMocks = (playlistTracks = [], searchTracks = [], mockStorage = {}) => {
    const setPlaylistTracksArr = jest.fn();
    const setSearchTracks = jest.fn();

    Object.defineProperty(global, 'localStorage', {
        value: {
            getItem: jest.fn(key => mockStorage[key] || null),
            setItem: jest.fn((key, value) => { mockStorage[key] = value; }),
            removeItem: jest.fn(key => { delete mockStorage[key]; }),
            clear: jest.fn(() => { for (const key in mockStorage) { delete mockStorage[key]; } }),
        },
        writable: true,
    });

    usePlaylistTracks.mockReturnValue({
      playlistTracksArr: playlistTracks,
      setPlaylistTracksArr,
    });
  
    useSearchTracks.mockReturnValue({
      searchTracks: searchTracks,
      setSearchTracks,
    });
  
    useAudioPlayer.mockReturnValue({
      play: jest.fn(),
      pause: jest.fn(),
      toggle: jest.fn(),
      changeSrc: jest.fn(),
      isPlaying: false,
      volume: 1,
      setVolume: jest.fn(),
      currentTime: 0,
      setCurrentTime: jest.fn(),
      duration: 0,
    });
  
    createPlaylist.mockResolvedValue('mock-playlist-id');
    addItemsToPlaylist.mockResolvedValue({});

    return { setPlaylistTracksArr, setSearchTracks };
  };



describe('PlaylistTracksCont Integration Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders tracks and allows interaction with playlist tracks', async () => {
    const playlistTracks = [
        {
          trackId: '1',
          trackName: 'Track 1',
          trackArtist1Name: 'Artist 1',
          preview_url: 'http://example.com/track1',
        },
        {
          trackId: '2',
          trackName: 'Track 2',
          trackArtist1Name: 'Artist 2',
          preview_url: 'http://example.com/track2',
        },
      ];

    const { setPlaylistTracksArr, setSearchTracks } = setupMocks(playlistTracks);

    render(<PlaylistTracksCont />);

    // check that tracks are rendered
    expect(screen.getByText('Track 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Track 2')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();

    // simulate clicking on a track to move it to search tracks
    const trackTextContainer = screen.getAllByTestId('trackTextContainer')[0];
    fireEvent.click(trackTextContainer);
    
    // check that the track has been removed from the playlist
    await waitFor(() => expect(usePlaylistTracks().setPlaylistTracksArr).toHaveBeenCalledWith([
        playlistTracks[1],
      ]));

    // check that the track has been added to search tracks
    await waitFor(() => {
        expect(setSearchTracks).toHaveBeenCalledWith(expect.any(Function));
        
        // extract the function call argument and check its result
        const fn = setSearchTracks.mock.calls[0][0];
        const result = fn(playlistTracks);
        expect(result).toEqual([
          ...playlistTracks,
          playlistTracks[0],
        ]);
      });
      // very lovely code here
    });

    it('handles saving to Spotify', async () => {
        setupMocks([
          {
            trackId: '1',
            trackName: 'Track 1',
            trackArtist1Name: 'Artist 1',
            preview_url: 'http://example.com/track1',
          },
        ],
        [],
        {
            user_id: '1234'
        }
        );
    
        render(<PlaylistTracksCont />);
    
        // simulate clicking the "Save to Spotify" button
        fireEvent.click(screen.getByText('Save to Spotify'));
    
        // check that createPlaylist and addItemsToPlaylist are called
        await waitFor(() => expect(createPlaylist).toHaveBeenCalledWith('1234', 'One Love'));
        await waitFor(() => expect(addItemsToPlaylist).toHaveBeenCalledWith('mock-playlist-id', [
          {
            trackId: '1',
            trackName: 'Track 1',
            trackArtist1Name: 'Artist 1',
            preview_url: 'http://example.com/track1',
          },
        ]));
      });
});
