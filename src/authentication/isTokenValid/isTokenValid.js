
/*
    File: src/authentication/isTokenValid/isTokenValid.js
    Description:
    Checks if the stored access token is valid and has not expired or is about to expire.
    Returns `true` if the token is valid, otherwise `false`.
*/

function isTokenValid() {
    const accessToken = localStorage.getItem('access_token');
    const tokenType = localStorage.getItem('token_type');
    const expiresIn = parseInt(localStorage.getItem('expires_in'), 10);
    const refreshToken = localStorage.getItem('refresh_token');
    const expiresAt = parseInt(localStorage.getItem('expires_at'), 10);
    const now = Date.now();
    const refreshThreshold =  5 * 60 * 1000; // refresh token 5 minutes before expiration
    
    if (!accessToken || accessToken === 'undefined' ||
        !tokenType || tokenType === 'undefined' ||
        isNaN(expiresIn) || isNaN(expiresAt) ||
        !refreshToken || refreshToken === 'undefined') {
      return false;
    };

    // check if token is expired or about to expire
    const timeUntilRefresh = expiresAt - now - refreshThreshold;
    console.log(timeUntilRefresh);
    return timeUntilRefresh > 0;
  };

export default isTokenValid;
