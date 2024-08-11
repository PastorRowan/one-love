
/*
  File: src/authentication/setupTokenRefreshTimer/setupTokenRefreshTimer.js
  Description:
  Sets up a timer to refresh the access token before it expires.
  Optionally, it can execute a callback function after the token is refreshed.
*/

// helper
import refreshToken from "../refreshToken/refreshToken";

function setupTokenRefreshTimer(onTokenRefreshed) {
  const expires_in = parseInt(localStorage.getItem('expires_in'), 10);
  const expires_at = parseInt(localStorage.getItem('expires_at'), 10);
  const refreshThreshold =  5 * 60 * 1000; // refresh token 5 minutes before expiration

  if (!expires_at) {
    throw new Error('Error: No expiration time found');
  };

  const now = Date.now();
  const timeUntilRefresh = expires_at - now - refreshThreshold;

  // console.log(timeUntilRefresh);
  
  if (timeUntilRefresh <= 0) {
    refreshToken();
    if (onTokenRefreshed) {
      onTokenRefreshed();
    };
  } else {
    console.log('time', Date.now());
    console.log(`refresh has been scheduled at ${timeUntilRefresh}`);
    // refreshToken is supposed to go in there
    setTimeout(refreshToken, timeUntilRefresh);
    if (onTokenRefreshed) {
      onTokenRefreshed();
    };
  };
};

export default setupTokenRefreshTimer;



/*
  console.log('-------------------------------');
  console.log('expires_in type: ', typeof expires_in);
  console.log('expires_at: ', expires_at);
  console.log('Date.now(): ', Date.now());
  console.log('expires_at - Date.now(): ', expires_at - Date.now());
  console.log('-------------------------------');
*/