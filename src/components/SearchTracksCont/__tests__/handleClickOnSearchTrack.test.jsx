
/*
  File: src/components/SearchTracksCont/__tests__/handleClickOnSearchTrack.test.jsx
  Description: Unit tests for handleClickOnSearchTrack function.
*/

// mocks
jest.mock('../../../context/SearchResultsContext/SearchResultsContext', () => ({
    useSearchTracks: jest.fn()
  }));
  jest.mock('../../../context/PlaylistContext/PlaylistContext', () => ({
    usePlaylistTracks: jest.fn()
  }));
  jest.mock('../../../context/AudioPlayerContext/AudioPlayerContext', () => ({
    useAudioPlayer: jest.fn()
  }));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import SearchTracksCont from '../SearchTracksCont';
import { useSearchTracks } from '../../../context/SearchResultsContext/SearchResultsContext';
import { usePlaylistTracks } from '../../../context/PlaylistContext/PlaylistContext';
import { useAudioPlayer } from '../../../context/AudioPlayerContext/AudioPlayerContext';

describe('handleClickOnSearchTrack function', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('should add track to playlist and remove from search tracks on click', () => {
      const mockResults = [
        { trackId: 1, trackName: 'Track 1', trackArtist1Name: 'Artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' },
        { trackId: 2, trackName: 'Track 2', trackArtist1Name: 'Artist 2', trackArtist1Id: '1234', preview_url: 'http://example.com/track2' },
      ];
  
      const mockSetSearchTracks = jest.fn();
      const mockSetPlaylistTracksArr = jest.fn();
  
      useSearchTracks.mockReturnValue({ searchTracks: mockResults, setSearchTracks: mockSetSearchTracks });
      usePlaylistTracks.mockReturnValue({ playlistTracksArr: [], setPlaylistTracksArr: mockSetPlaylistTracksArr });
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
  
      render(<SearchTracksCont />);
  
      // simulate clicking on a track to add it to the playlist
      fireEvent.click(screen.getByText('Track 1'));
  
      // ensure the track is added to the playlist
      expect(mockSetPlaylistTracksArr).toHaveBeenCalledWith(expect.any(Function));
      const setPlaylistTracksArrCallback = mockSetPlaylistTracksArr.mock.calls[0][0];
      expect(setPlaylistTracksArrCallback([])).toEqual([mockResults[0]]);
  
      // ensure the track is removed from search tracks
      expect(mockSetSearchTracks).toHaveBeenCalledWith(expect.arrayContaining([
        expect.not.objectContaining({ trackId: 1 })
      ]));
    });

    it('should handle errors correctly', () => {
      const mockResults = [
        { trackId: 1, trackName: 'Track 1', trackArtist1Name: 'Artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' },
      ];
  
      const mockSetSearchTracks = jest.fn();
      const mockSetPlaylistTracksArr = jest.fn();
  
      useSearchTracks.mockReturnValue({ searchTracks: mockResults, setSearchTracks: mockSetSearchTracks });
      usePlaylistTracks.mockReturnValue({ playlistTracksArr: [], setPlaylistTracksArr: mockSetPlaylistTracksArr });
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
  
    render(<SearchTracksCont />);

    // simulate clicking on a track without data-index attribute
    const trackContainer = screen.getByText('Track 1').closest('div');
    if (trackContainer) {
      trackContainer.removeAttribute('data-index'); // remove data-index to trigger the error
    };

    const mockConsoleError = jest.fn();

    const originalConsoleError = console.error;
    console.error = mockConsoleError;
  
    fireEvent.click(screen.getByText('Track 1'));

    expect(mockConsoleError).toHaveBeenCalled();

    // expect(mockConsoleError).toHaveBeenCalledWith('Error handling click on playlist track:', expect.any(Error));

    // restore the original console.error
    console.error = originalConsoleError;
    });

    it('should log an error when data-index is not found', () => {
        const mockSearchTracks = [
          { trackId: 1, trackName: 'Track 1', trackArtist1Name: 'Artist 1', trackArtist1Id: '1234', preview_url: 'http://example.com/track1' }
        ];
    
        const mockSetSearchTracks = jest.fn();
        const mockSetPlaylistTracksArr = jest.fn();
    
        useSearchTracks.mockReturnValue({ searchTracks: mockSearchTracks, setSearchTracks: mockSetSearchTracks });
        usePlaylistTracks.mockReturnValue({ playlistTracksArr: [], setPlaylistTracksArr: mockSetPlaylistTracksArr });
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
    
        render(<SearchTracksCont />);
    
        // simulate clicking on a track without data-index attribute
        const trackContainer = screen.getByText('Track 1').closest('div');
        if (trackContainer) {
          // remove data-index to trigger the error
          trackContainer.removeAttribute('data-index');
        };

        const mockConsoleError = jest.fn();

        const originalConsoleError = console.error;
        console.error = mockConsoleError;
    
        fireEvent.click(trackContainer);

        // verify that console.error was called with the correct error
        expect(mockConsoleError).toHaveBeenCalledWith('Error handling click on search track:', expect.any(Error));
        expect(mockConsoleError.mock.calls[0][1].message).toBe('Index attribute not found');

        // restore the original console.error
        console.error = originalConsoleError;
      });
  });
