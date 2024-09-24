
/*
    File: src/authentication/getToken/getToken.js
    Description:
        Handles the process of retrieving an access token from the Spotify API using an authorization code.
        The token is then stored using a helper function.
*/

// helper
import storeTokenData from "../storeTokenData/storeTokenData";

const getToken = async () => {

  console.log('GET TOKEN IS RUNNING');

  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');

  if (!code) {
    console.log('Authorization code is missing in the URL, returned null');
    return null;
  };

  const clientId = 'e1f18649e0d34c5598d545cc48487593';
  const redirectUri = 'http://localhost:3000';
  const url = 'https://accounts.spotify.com/api/token';

  try {
    let codeVerifier = localStorage.getItem('code_verifier');
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const response = await fetch(url, payload);

    if (!response.ok) {
      throw new Error(response.statusText);
    };

    const data = await response.json();
    console.log(data);
    storeTokenData(data);
  } catch(err) {
    console.error('Error during token fetch: ', err);
    throw err;
  };
};

export default getToken;
