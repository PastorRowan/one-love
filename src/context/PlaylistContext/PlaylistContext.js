
/*
    File: src/context/PlaylistContext/PlaylistContext.js
    Description:
        Defines the PlaylistTracksContext and its provider for managing playlist track data in a React application.
        Provides functionalities to access and update the list of tracks in a playlist through a context API.
        Initializes with an empty array and allows updating through the `setPlaylistTracksArr` function.
*/

// general
import React, { createContext, useState, useContext } from 'react';

const PlaylistTracksContext = createContext({
    playlistTracksArr: [],
    setPlaylistTracksArr: () => {}
});

export const PlaylistTracksProvider  = ({ children }) => {

    const [playlistTracksArr, setPlaylistTracksArr] = useState(
        [
        /* example track
        { 
          trackId: '1',
          trackName: 'One love',
          trackArtist1Name: 'Bob Marley',
          trackArtist1Id: '1'
          preview_url: https:/example.com
        }
        */
        ]
    );

    return (
    <PlaylistTracksContext.Provider value={{ 
        playlistTracksArr,
        setPlaylistTracksArr
    }}>
        {children}
    </PlaylistTracksContext.Provider>
  );
};

export const usePlaylistTracks = () => {
    const context = useContext(PlaylistTracksContext);
    if (context === undefined) {
        throw new Error('usePlaylistTracks must be used within a PlaylistTracksProvider');
    };
    return context;
};
