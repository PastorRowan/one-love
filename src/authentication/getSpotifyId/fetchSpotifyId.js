
/*
    File: src/authentication/getSpotifyId/fetchSpotifyId.js
    Description:
        Fetches the Spotify user ID by making an authenticated request to the Spotify API.
        It uses the access token stored in localStorage to authorize the request.
*/

async function fetchSpotifyId() {
    try {
      const url = 'https://api.spotify.com/v1/me';
      const payload = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      };
      const response = await fetch(url, payload);

      if (!response.ok) {
        throw new Error('Network Error');
      };
      const data = await response.json();
      console.log(data);
      return data.id;
    } catch(err) {
      console.error(`Error during spotify id fetch: ${err.message}`, err);
      return null;
    };
};

export default fetchSpotifyId;
