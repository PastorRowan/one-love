
/*
    File: src/components/AudioController/AudioController.js
    Description:
        Components renders audio controls fixed to the bottom of the main page.
        Includes play/pause buttons, a playback slider, and a volume control slider.
        Styles are applied from the associated CSS module.
        Component utilizes context from `AudioPlayerContext` for managing audio playback and volume.
*/

// context
import { useAudioPlayer } from '../../context/AudioPlayerContext/AudioPlayerContext';

// CSS
import styles from './AudioController.module.css';

const AudioController = () => {
  const { play,
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
        } = useAudioPlayer();

  const handlePlay = () => play();
  const handlePause = () => pause();
  const handleToggle = () => toggle();
  const handleChangeSrc = (newSrc) => changeSrc(newSrc);

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlaybackChange = (e) => {
      setChangeTime(parseFloat(e.target.value));
    };
  
  // widths are in percentages
  const progressWidth = (currentTime / duration) * 100;
  const volumeWidth = volume * 100;

  return (
    <div className={styles.audioControllerCont}>
      <div className={styles.middleSecCont}>
      <img className={styles.playPauseButton} onClick={handleToggle} data-testid="playPauseButton" src={isPlaying ? '/AudioControllerAssets/pause_button.webp' : '/AudioControllerAssets/play_button.png'}/>
      <div className={styles.playbackSliderCont}>
        {/* progress bar */}
        <div
            className={styles.progressBar}
            style={{ width: `${progressWidth}%` }} // set width based on progress
        >
        </div>
        {/* playback slider */}
        <input
          id="playback-slider"
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handlePlaybackChange}
          className={styles.playbackSlider}
          data-testid="playbackSlider"
        />
        {/* <span>{Math.floor(currentTime)} / {Math.floor(duration)}</span> */}
      </div>
      </div>
      <div className={styles.volumeSliderOuterCont}>
        <div className={styles.volumeSliderInnerCont}>
        {/* volume bar */}
        <div
            className={styles.volumeBar}
            style={{ width: `${volumeWidth}%` }} // set width based on progress
        >
        </div>
        {/* volume bar */}
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
          data-testid="volumeSlider"
        />
        </div>
      </div>
    </div>
  );
};

export default AudioController;
