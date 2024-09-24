
/*
    File: src/components/PlaylistTracksCont/PlaylistTracksCont.js
    Description:
        Component displays a list of tracks that can be added to a playlist.
        Allows users to play tracks, remove them from the playlist, and save the playlist to a new Spotify playlist.
        Integrates with the Spotify API to create a playlist and add tracks.
        Component uses React hooks for managing state and side effects.
        Employs context providers for managing audio playback and track information.
*/

import { useState, useEffect } from 'react';

// CSS
import styles from './PlaylistTracksCont.module.css';
import trackStyles from '../../styles/tracks.module.css';

// providers
import { useSearchTracks } from '../../context/SearchResultsContext/SearchResultsContext';
import { usePlaylistTracks } from '../../context/PlaylistContext/PlaylistContext';
import { useAudioPlayer } from '../../context/AudioPlayerContext/AudioPlayerContext';

// fetch requests
import createPlaylist from './createPlaylist';
import addItemsToPlaylist from './addItemsToPlaylist';

function PlaylistTracksCont() {

  const {searchTracks, setSearchTracks} = useSearchTracks();
  const {playlistTracksArr, setPlaylistTracksArr} = usePlaylistTracks();
  const [playlistContainerWelcomeMessage, setPlaylistContainerWelcomeMessage] = useState(null);

  const { play,
    pause,
    toggle,
    changeSrc,
    isPlaying,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    duration
  } = useAudioPlayer();

  const handlePlay = () => play();
  const handlePause = () => pause();
  const handleToggle = () => toggle();
  const handleChangeSrc = (newSrc) => changeSrc(newSrc);

  function handleClickOnPlayButton(e) {
    try {
      const buttonWrapper = e.currentTarget;

      if (!buttonWrapper) {
        console.log('an erorr has occured');
        throw new Error('Error handling click on track play button: Button wrapper not found');
      };

      // check if previewUrl is null or empty
      const previewUrl = buttonWrapper.getAttribute('preview_url');
      if (!previewUrl) {
        console.log('an erorr has occured');
        console.warn('Preview URL is empty or null');
        return null;
      };

      // call handleChangeSrc with the previewUrl
      handleChangeSrc(previewUrl);
    } catch (err) {
      console.log('an erorr has occured');
      console.error(`Error handling click on track play button: ${err.message}`, err);
    };
    };

  function handleClickOnPlaylistTrack(e) {
    try {
      const trackContainer = e.currentTarget;
      if (!trackContainer) {
        throw new Error('Track container not found');
      };

      const index = trackContainer.getAttribute('data-index');
      if (index === null) {
        throw new Error('Index attribute not found');
      };

      const indexNum = Number(index);
      if (isNaN(indexNum)) {
        throw new Error('Invalid index number');
      };

      const newTrackContainer = playlistTracksArr[indexNum];
      if (!newTrackContainer) {
        throw new Error('Track not found in playlistTracksArr');
      };

      const updatedTracks = playlistTracksArr.filter((_, i) => i !== indexNum);
      setPlaylistTracksArr(updatedTracks);
      setSearchTracks(prevSelectTracksArr => [
        ...prevSelectTracksArr,
        newTrackContainer
      ]);
  } catch(err) {
    console.error('Error handling click on playlist track:', err);
  };
  };

  // atm just creates a playlist
  async function handleSaveToSpotify(e) {
    try {
      const name = 'One Love';
      // creates playlist
      const playlistId = await createPlaylist(localStorage.getItem('user_id'), name);
      console.log(playlistId);

      // creates
      const tracks = playlistTracksArr;

      // adds tracks to playlist
      const data = await addItemsToPlaylist(playlistId, tracks);

    } catch (err) {
      // log the error for debugging
      console.error('Error playlist creation and/or appending tracks to playlist:', err);
    };
  };

    useEffect(() => {
        if (playlistTracksArr.length === 0) {
          setPlaylistContainerWelcomeMessage(
            <div className={trackStyles.trackContainer}>
              <div className={trackStyles.trackTextContainer}>
                <h2>Click on a track</h2>
                <p>To add it to your playlist</p>
              </div>
            </div>
          );
        } else {
          setPlaylistContainerWelcomeMessage(null);
        };
      }, [playlistTracksArr]);




      return (
        <div 
          className={styles.playlistContainer}
          data-testid="playlistContainer"
        >
          {playlistContainerWelcomeMessage}
          {playlistTracksArr.map((trackObj, index) => {
            const { trackId,
                    trackName,
                    trackArtist1Name,
                    trackArtist1Id,
                    preview_url
                   } = trackObj;
            return (
              <div
                key={index}
                className={trackStyles.trackContainer}
                data-index={index}
                data-testid="playlistTrackCont"
              >
                {preview_url && (
                <div className={trackStyles.playTrackButtonContainer}>
                  <button 
                    className={trackStyles.playTrackButtonWrapper}
                    onClick={handleClickOnPlayButton}
                    preview_url={preview_url}
                    data-testid="playButton"
                  >
                  <img className={trackStyles.playTrackIcon} src="trackContainerAssets/play_button.jpg" alt="Play"/>
                  </button>
                </div>
              )}
                <div
                key={index} 
                className={trackStyles.trackTextContainer}
                data-index={index}
                preview_url={preview_url}
                onClick={handleClickOnPlaylistTrack}
                data-testid="playlistTrackTextContainer"
                >
                  <h2 className={trackStyles.ellipsis}>{trackName}</h2>
                  <p className={trackStyles.ellipsis}>{trackArtist1Name}</p>
                </div>
              </div>
            );
          })}
          <button
            className={styles.saveToSpotifyButton}
            onClick={handleSaveToSpotify}
          >
            Save to Spotify
          </button>
        </div>
      );
      
};

export default PlaylistTracksCont;


        /*
        <div className={styles.playlistContainer}>
          {playlistContainerWelcomeMessage}
          {playlistTracksArr.map((trackObj, index) => {
            const { trackId,
                    trackName,
                    trackArtist1Name,
                    trackArtist1Id,
                    preview_url
                   } = trackObj;
            return (
              <div
                key={index}
                className={trackStyles.trackContainer}
                data-index={index}
              >
                {preview_url && (
                <div className={trackStyles.playTrackButtonContainer}>
                  <button 
                    className={trackStyles.playTrackButtonWrapper}
                    onClick={handleClickOnPlayButton}
                    preview_url={preview_url}
                    data-testid="play-button"
                  >
                  <img className={trackStyles.playTrackIcon} src="trackContainerAssets/play_button.jpg" alt="Play"/>
                  </button>
                </div>
              )}
                <div
                key={index} 
                className={trackStyles.trackTextContainer}
                data-index={index}
                preview_url={preview_url}
                onClick={handleClickOnPlaylistTrack}
                >
                  <h2 className={trackStyles.ellipsis}>{trackName}</h2>
                  <p className={trackStyles.ellipsis}>{trackArtist1Name}</p>
                </div>
              </div>
            );
          })}
          <button
            className={styles.saveToSpotifyButton}
            onClick={handleSaveToSpotify}
          >
            Save to Spotify
          </button>
        </div>
        */
