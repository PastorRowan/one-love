
/*
    File: src/components/SearchContainer/SearchContainer.js
    Description:
        Component provides a search interface for querying tracks from Spotify.
        Uses the `QueryContext` to manage the search query and the `SearchResultsContext` to update the search results.
        Component includes an input field for users to enter their search query and a button to initiate the search.
        `handleSearch` function fetches track data based on the query using the `fetchQueryTracks` fetch request function.
        Updates the search results state.
        Handles cases where the query is empty and provides user feedback in case of errors.
*/

    import React, { useState } from 'react';

    // CSS
    import Styles from './SearchContainer.module.css';

    // context
    import { useQuery } from '../../context/QueryContext/QueryContext';
    import { useSearchTracks } from '../../context/SearchResultsContext/SearchResultsContext';

    // fetch requests
    import fetchQueryTracks from './fetchQueryTracks';

    function SearchContainer() {

        const { query, setQuery } = useQuery();
        const { setSearchTracks } = useSearchTracks();

        async function handleSearch() {

            if (!query || query.trim() === '') {
                alert('Please enter something into search query');
                return null;
            };

            try {
                // fetch the tracks based on the query
                const newSearchTracks = await fetchQueryTracks(query);

                // check if newSearchTracks is an array and has elements
                if (!Array.isArray(newSearchTracks)) {
                    throw new Error('The fetched data is not in the expected format');
                };

                console.log(newSearchTracks);

                // update the state with the new search tracks
                setSearchTracks(newSearchTracks);

            } catch (error) {
                // log the error for debugging
                console.error('Error during the search operation:', error);

                // provide user feedback
                alert('There was a problem with the search operation. Please try again.');
            };
        };

        function handleChange(e) {
            setQuery(e.target.value);
        };

        return (
            <div className={Styles.searchContainer}>
                <div className={Styles.searchBarContainer}>
                <input className={Styles.searchBarInput} type="text" value={query} onChange={handleChange} placeholder="What do you want to play?"/>
                </div>
                <div className={Styles.searchButtonContainer}>
                <button onClick={handleSearch} className={Styles.searchButton}>Search</button>
                </div>
            </div>
        );
    };

    export default SearchContainer;
