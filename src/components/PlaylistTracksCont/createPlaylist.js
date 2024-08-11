
// File: src/components/PlaylistTracksCont/createPlaylist.js
// Description:
// Function creates a new playlist for a specified Spotify user using the Spotify Web API.
// Sends a POST request to the API with playlist details, including name.
// Handles any errors that occur during the request.
// Function returns the ID of the newly created playlist.

async function createPlaylist(userId, name) {

  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

  const body = JSON.stringify({
    name,
    public: false,
    collaborative: false,
    description: ''
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

    const data = await response.json();
    const playlistId = data.id;
    console.log('playlist created successfully, data:', data);
    console.log('playlist created successfully: playlistId', playlistId);
    return playlistId;
  } catch(err) {
    throw new Error(`Error during playlist creation: ${err.message}`, err);
  };
};

export default createPlaylist;
