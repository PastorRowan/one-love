
/*
    File: src/components/AudioController/AudioController.test.js
    Description:
        Unit tests for the AudioController component,
        which interacts with the AudioPlayerContext to handle audio playback.
        These tests ensure proper rendering of UI elements like the play/pause button, volume slider, and playback slider, as well as the correct functionality of audio controls such as play, pause, and volume adjustments.
*/

// mock the AudioPlayerContext
jest.mock('../../context/AudioPlayerContext/AudioPlayerContext', () => {
    const actualContext = jest.requireActual('../../context/AudioPlayerContext/AudioPlayerContext');
    return {
      ...actualContext,
      useAudioPlayer: jest.fn(),
      AudioPlayerProvider: ({ children }) => <div>{children}</div> // mock implementation of AudioPlayerProvider
    };
  });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioPlayerProvider, useAudioPlayer } from '../../context/AudioPlayerContext/AudioPlayerContext';
import AudioController from './AudioController';

const renderWithProvider = (component) => {
    return render(
      <AudioPlayerProvider>
        {component}
      </AudioPlayerProvider>
    );
  };

  describe('AudioController', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('should render and display play/pause button', () => {
      useAudioPlayer.mockReturnValue({
        play: jest.fn(),
        pause: jest.fn(),
        toggle: jest.fn(),
        changeSrc: jest.fn(),
        isPlaying: false,
        volume: 0.5,
        setVolume: jest.fn(),
        currentTime: 0,
        setCurrentTime: jest.fn(),
        duration: 100,
      });
  
      renderWithProvider(<AudioController />);
  
      const playPauseButton = screen.getByTestId('playPauseButton');
      expect(playPauseButton).toBeInTheDocument();
    });
  
    it('should toggle play/pause button image when toggled', () => {
      useAudioPlayer.mockReturnValue({
        play: jest.fn(),
        pause: jest.fn(),
        toggle: jest.fn(),
        changeSrc: jest.fn(),
        isPlaying: false,
        volume: 0.5,
        setVolume: jest.fn(),
        currentTime: 0,
        setCurrentTime: jest.fn(),
        duration: 100,
      });
  
      renderWithProvider(<AudioController />);
  
      const playPauseButton = screen.getByTestId('playPauseButton');
      fireEvent.click(playPauseButton);
  
      expect(useAudioPlayer().toggle).toHaveBeenCalled();
    });
  
    it('should update volume when volume slider is changed', () => {
      const setVolume = jest.fn();
  
      useAudioPlayer.mockReturnValue({
        play: jest.fn(),
        pause: jest.fn(),
        toggle: jest.fn(),
        changeSrc: jest.fn(),
        isPlaying: false,
        volume: 0.5,
        setVolume,
        currentTime: 0,
        setCurrentTime: jest.fn(),
        duration: 100,
      });
  
      renderWithProvider(<AudioController />);
  
      const volumeSlider = screen.getByTestId('volumeSlider');
      fireEvent.change(volumeSlider, { target: { value: '0.8' } });
  
      expect(setVolume).toHaveBeenCalledWith(0.8);
    });
  
    it('should update playback time when playback slider is changed', () => {
      const setCurrentTime = jest.fn();
  
      useAudioPlayer.mockReturnValue({
        play: jest.fn(),
        pause: jest.fn(),
        toggle: jest.fn(),
        changeSrc: jest.fn(),
        isPlaying: false,
        volume: 0.5,
        setVolume: jest.fn(),
        currentTime: 0,
        setCurrentTime,
        duration: 100,
      });
  
      renderWithProvider(<AudioController />);
  
      const playbackSlider = screen.getByTestId('playbackSlider');
      fireEvent.change(playbackSlider, { target: { value: '30' } });
  
      expect(setCurrentTime).toHaveBeenCalledWith(30);
    });
  });
