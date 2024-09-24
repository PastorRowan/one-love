
/*
    File: src/authentication/refreshToken/refreshToken.js
    Description:
        Handles the process of refreshing the access token using a refresh token.
        Stores the new token data and sets up a timer for future refreshes.
*/

// helpers
import setupTokenRefreshTimer from "../setupTokenRefreshTimer/setupTokenRefreshTimer";
import storeTokenData from "../storeTokenData/storeTokenData";
//import isTokenValid from "../isTokenValid/isTokenValid";

async function refreshToken() {

  const clientId = 'e1f18649e0d34c5598d545cc48487593';

  console.log('your token has expired now refreshing');

  try {
    const refresh_Token =  localStorage.getItem('refresh_token');

    if (!refresh_Token) {
      throw new Error('Error: refresh_token not in local storage');
    };

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_Token,
        client_id: clientId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    };

    const data = await response.json();

    console.log(data);

    storeTokenData(data);
    setupTokenRefreshTimer();

  } catch(err) {
    console.error('Error refreshing token:', err);
    throw err;
  };
  };

export default refreshToken;
