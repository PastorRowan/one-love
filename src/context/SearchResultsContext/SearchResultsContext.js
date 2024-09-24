
/*
    File: src/context/SearchResultsContext/SearchResultsContext.js
    Description:
        Defines the SearchResultsContext and its provider for managing search result tracks in a React application.
        Provides functionalities to access and update the list of search tracks through a context API.
*/

// general
import React, { createContext, useState, useContext } from 'react';

const SearchResultsContext = createContext({
    searchTracks: [],
    setSearchTracks: () => {}
});

export const SearchResultsProvider = ({ children }) => {

    const [searchTracks, setSearchTracks] = useState(
        [
        /* example track
        { 
          trackId: '1',
          trackName: 'One love',
          trackArtist1Name: 'Bob Marley',
          trackArtist1Id: '1'
        }
        */
        ]
      );

  return (
    <SearchResultsContext.Provider value={{ 
        searchTracks,
        setSearchTracks
    }}>
        {children}
    </SearchResultsContext.Provider>
  );
};

export const useSearchTracks = () => {
    const context = useContext(SearchResultsContext);
    if (context === undefined) {
        throw new Error('useSearchTracks must be used within a SearchResultsProvider');
    };
    return context;
};
