
/*
  File: src/context/AudioPlayerContext/AudioPlayerContext.js
  Description:
  Defines the AudioPlayerContext and its provider for managing audio playback state in a React application.
  Provides functionalities to play, pause, toggle, and change the audio source, and maintains state for volume, current time, and duration.
  Includes debounce logic for playback control and event handling for updating time and duration.
*/

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioPlayerContext = createContext({
  play: () => {},
  pause: () => {},
  toggle: () => {},
  changeSrc: () => {},
  isPlaying: false,
  volume: 0.5,
  setVolume: () => {},
  currentTime: 0,
  setCurrentTime: () => {},
  changeTime: 0,
  setChangeTime: () => {},
  duration: 0
});

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};

export const AudioPlayerProvider = ({ children }) => {
  const [src, setSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // volume range 0.0 to 1.0 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [changeTime, setChangeTime] = useState(0);
  const audioRef = useRef(null);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const toggle = () => setIsPlaying(prev => !prev);

  const changeSrc = (newSrc) => {
    setSrc(newSrc);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      const handlePlayback = async () => {
        if (isPlaying) {
          try {
            await audioRef.current.play();
          } catch (error) {
            console.error('Playback error:', error);
          }
        } else {
          audioRef.current.pause();
        };
      };
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      };
      const timeout = setTimeout(() => {
        handlePlayback();
      }, 300); // adjust debounce delay as needed
      setDebounceTimeout(timeout);

      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      };
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      };
    };
  }, [isPlaying, src, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = changeTime;
    };
  }, [changeTime]);

  return (
    <AudioPlayerContext.Provider
      value={{ play,
               pause,
               toggle,
               changeSrc,
               isPlaying,
               volume,
               setVolume,
               currentTime,
               setCurrentTime,
               changeTime,
               setChangeTime,
               duration
              }}
    >
      <audio ref={audioRef} src={src} data-testid="audio"/>
      {children}
    </AudioPlayerContext.Provider>
  );
};
