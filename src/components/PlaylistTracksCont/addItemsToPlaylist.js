
/*
    File: src/components/PlaylistTracksCont/addItemsToPlaylist.js
    Description:
        Function adds a list of tracks to a specified Spotify playlist using the Spotify Web API.
        It constructs the appropriate API request, including setting the authorization header with a token from local storage.
        Handles errors that occur during the fetch operation.
*/

async function addItemsToPlaylist(playlistId, tracks) {

    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    const urisList = tracks.map(trackObj => {
        return `spotify:track:${trackObj.trackId}`;
    });

    const body = JSON.stringify({
        uris: urisList,
    });

    try {
      const payload = {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: body
      };

      const response = await fetch(url, payload);

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        };

    } catch(err) {
      throw new Error(`Error during playlist update: ${err.message}`); // add err see if test still sucess?
    };
};

export default addItemsToPlaylist;
