
// File: src/components/SearchContainer/fetchQueryTracks.js
// Description:
// Function handles the process of searching for tracks on Spotify based on a given query.
// Constructs a search URL with the query parameters, makes a GET request to the Spotify API, and processes the response.
// The function maps the response data to an array of track objects with relevant properties such as track ID, name, artist, and preview URL.
// If the query is empty or if an error occurs, it handles these cases appropriately.

async function fetchQueryTracks(query) {

    if (!query || query.trim() === '') {
        alert('Please enter something into search query');
        return null;
    };

    try {
        const params = new URLSearchParams({
            q: query,
            type: 'track',
            limit: '12'
          });

        const searchUrl = `https://api.spotify.com/v1/search?${params.toString()}`;

        const payload =  {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            };

        const response = await fetch(searchUrl, payload);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        };

        const data = await response.json();

        console.log(data);

        // Destructure the tracks array from the response
        const { items: tracksArr } = data.tracks;

        return tracksArr.map(trackObj => ({
          trackId: trackObj.id,
          trackName: trackObj.name,
          trackArtist1Name: trackObj.artists[0]?.name || 'Unknown',
          trackArtist1Id: trackObj.artists[0]?.id || 'Unknown',
          preview_url: trackObj.preview_url || ''
      }));
    } catch(err) {
      console.error('Error during search query tracks fetch:', err);
    };
};

export default fetchQueryTracks;
