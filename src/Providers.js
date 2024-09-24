
/*
    File: src/Providers.js
    Description:
        Component provides context providers for the application, wrapping its children components with necessary context providers for managing global state and functionalities.
*/

// general
import React from 'react';

// providers
import { AuthProvider } from './context/AuthContext/AuthContext';
import { AudioPlayerProvider } from './context/AudioPlayerContext/AudioPlayerContext';
import { QueryProvider } from './context/QueryContext/QueryContext';
import { PlaylistTracksProvider } from './context/PlaylistContext/PlaylistContext';
import { SearchResultsProvider } from './context/SearchResultsContext/SearchResultsContext';

const Providers = ({ children }) => {
    return (
    <SearchResultsProvider>
        <PlaylistTracksProvider>
            <QueryProvider>
                <AudioPlayerProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </AudioPlayerProvider>
            </QueryProvider>
        </PlaylistTracksProvider>
    </SearchResultsProvider>
    );
};

export default Providers;
