
/*
  File: src/context/AudioPlayerContext/AudioPlayerContext.test.js
  Description: ...
*/

import React, { useEffect } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AudioPlayerProvider, useAudioPlayer } from './AudioPlayerContext';

describe('AudioPlayerProvider', () => {
  it('should render without crashing', () => {
    render(
      <AudioPlayerProvider>
        <div>Test Content</div>
      </AudioPlayerProvider>
    );
  });

  it('should provide context values and functions', () => {
    const TestComponent = () => {
      const { play, pause, toggle, changeSrc, isPlaying, volume, setVolume, currentTime, setCurrentTime, duration } = useAudioPlayer();
      
      // verify that the context provides the functions and state
      expect(play).toBeInstanceOf(Function);
      expect(pause).toBeInstanceOf(Function);
      expect(toggle).toBeInstanceOf(Function);
      expect(changeSrc).toBeInstanceOf(Function);
      expect(isPlaying).toBe(false);
      expect(volume).toBe(0.5);
      expect(setVolume).toBeInstanceOf(Function);
      expect(currentTime).toBe(0);
      expect(setCurrentTime).toBeInstanceOf(Function);
      expect(duration).toBe(0);

      return <div>Test Content</div>;
    };

    render(
      <AudioPlayerProvider>
        <TestComponent />
      </AudioPlayerProvider>
    );
  });

  it('should call play, pause, toggle, and changeSrc functions correctly', async () => {
    const TestComponent = () => {
      const { play, pause, toggle, changeSrc, isPlaying, setVolume, setCurrentTime } = useAudioPlayer();
  
      useEffect(() => {
        act(() => {
          play();
        });
        waitFor(() => expect(isPlaying).toBe(true));
  
        act(() => {
          pause();
        });
        waitFor(() => expect(isPlaying).toBe(false));
  
        act(() => {
          toggle();
        });
        waitFor(() => expect(isPlaying).toBe(true));
  
        act(() => {
          changeSrc('http://example.com/track.mp3');
        });
        waitFor(() => {
          const audioElement = screen.getByTestId('audio');
          expect(audioElement.src).toBe('http://example.com/track.mp3');
        });
  
        act(() => {
          setVolume(0.8);
          setCurrentTime(30);
        });
      }, []);
  
      return <div>Test Content</div>;
    };
  
    // Render the provider and test component
    render(
      <AudioPlayerProvider>
        <TestComponent />
      </AudioPlayerProvider>
    );
  
    // Wait for all async operations to complete
    await waitFor(() => {
      const audioElement = screen.getByTestId('audio');
      expect(audioElement).toBeInTheDocument();
    });
  });

  it('should debounce play/pause functionality', () => {
    const TestComponent = () => {
      const { play, pause, changeSrc } = useAudioPlayer();
      const audio = document.createElement('audio');
      audio.play = jest.fn();
      audio.pause = jest.fn();

      // simulate changing source and play
      act(() => {
        changeSrc('http://example.com/track.mp3');
        play();
      });

      // wait for debounce timeout
      setTimeout(() => {
        expect(audio.play).toHaveBeenCalled();
      }, 300); // matching debounce timeout

      return <div>Test Content</div>;
    };

    render(
      <AudioPlayerProvider>
        <TestComponent />
      </AudioPlayerProvider>
    );
  });
});
