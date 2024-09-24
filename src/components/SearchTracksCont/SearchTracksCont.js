
/*
    File: src/components/SearchTracksCont/SearchTracksCont.js
    Description:
        Component displays a list of search results from Spotify.
        Allows users to interact with each track by either playing it or adding it to a playlist.
        Component uses React hooks for state management and side effects, and utilizes context providers for managing search results and playlist tracks.
        Integrates with an audio player context to control playback.
        Component updates its display based on the presence of search results and playlist tracks...
        showing appropriate welcome messages when there are no tracks or when only playlist tracks are present.
*/

import { useState, useEffect } from 'react';

// CSS
import styles from './SearchTracksCont.module.css';
import trackStyles from '../../styles/tracks.module.css'

// providers
import { useSearchTracks } from '../../context/SearchResultsContext/SearchResultsContext';
import { usePlaylistTracks } from '../../context/PlaylistContext/PlaylistContext';
import { useAudioPlayer } from '../../context/AudioPlayerContext/AudioPlayerContext';

function SearchTracksCont() {

  const {searchTracks, setSearchTracks} = useSearchTracks();
  const {playlistTracksArr, setPlaylistTracksArr} = usePlaylistTracks();
  const [searchResultsContainerWelcomeMessage, setSearchResultsContainerWelcomeMessage] = useState(null);

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
          throw new Error('Button wrapper not found');
        };

        // extract preview_url from the buttonWrapper
        const previewUrl = buttonWrapper.getAttribute('preview_url');
        if (!previewUrl) {
          throw new Error('preview_url is null or undefined, this shouldnt be happening');
        };

        // call handleChangeSrc with the previewUrl
        handleChangeSrc(previewUrl);
      } catch (err) {
        console.error('Error handling click on track play button:', err);
      };
      };

    function handleClickOnSearchTrack(e) {
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
        const newTrackContainer = searchTracks[indexNum];
        if (!newTrackContainer) {
          throw new Error('Track not found in searchTracks');
        };
        const updatedTracks = searchTracks.filter((_, i) => i !== indexNum);
        setSearchTracks(updatedTracks);
        setPlaylistTracksArr(prevSelectTracksArr => [
          ...prevSelectTracksArr,
          newTrackContainer
        ]);
      } catch(err) {
        console.error('Error handling click on search track:', err);
      };
      };

    useEffect(() => {
      if (searchTracks.length === 0 && playlistTracksArr.length === 0) {
        setSearchResultsContainerWelcomeMessage(
          <div className={trackStyles.trackContainer}>
            <div className={trackStyles.trackTextContainer}>
              <h2>Welcome</h2>
              <p>Press search to get songs</p>
            </div>
          </div>
        );
      } else if (searchTracks.length === 0 && playlistTracksArr.length !== 0) {
        setSearchResultsContainerWelcomeMessage(
          <div className={trackStyles.trackContainer}>
            <div className={trackStyles.trackTextContainer}>
              <h2>Press search again</h2>
              <p>To continue your musical journey</p>
            </div>
          </div>
        );
      } else {
        setSearchResultsContainerWelcomeMessage(null);
      };
    }, [searchTracks, playlistTracksArr]);

    return (
        <div className={styles.searchResultsContainer}>
          <h2 className={styles.searchResultsContainerH2}>Results</h2>
            {searchResultsContainerWelcomeMessage}
            {searchTracks.map((trackObj, index) => {
              const {
                trackId,
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
                preview_url={preview_url}
                data-testid="searchTrackCont"
              >
              {preview_url && (
                <div 
                  className={trackStyles.playTrackButtonContainer}
                >
                  <button 
                    className={trackStyles.playTrackButtonWrapper}
                    onClick={handleClickOnPlayButton}
                    preview_url={preview_url}
                    data-testid="playButton"
                    alt="play button"
                  >
                    <img className={trackStyles.playTrackIcon} src="trackContainerAssets/play_button.jpg" alt="play"/>
                  </button>
                </div>
              )}

                <div
                  key={index}
                  className={trackStyles.trackTextContainer}
                  data-index={index}
                  preview_url={preview_url}
                  onClick={handleClickOnSearchTrack}
                  data-testid="SearchTrackTextContainer"
                >
                  <h2 className={trackStyles.ellipsis}>{trackName}</h2>
                  <p className={trackStyles.ellipsis}>{trackArtist1Name}</p>
                </div>
              </div>
              );
            })
            }
      </div>
    );
};

export default SearchTracksCont;
