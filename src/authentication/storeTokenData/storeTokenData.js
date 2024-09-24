
/*
    File: src/authentication/storeTokenData/storeTokenData.js
    Description:
        Stores the token data received from the Spotify API into localStorage.
*/

function storeTokenData(data) {

  // example input:
  /*
  json object
  {
  access_token: 'BQBLuPRYBQ...BP8stIv5xr-Iwaf4l8eg',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: 'AQAQfyEFmJJuCvAFh...cG_m-2KTgNDaDMQqjrOa3',
  scope: 'user-read-email user-read-private'
  }
  */

  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('token_type', data.token_type);
  localStorage.setItem('expires_in', data.expires_in * 1000);
  localStorage.setItem('expires_at',  Date.now() + data.expires_in * 1000);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('scope', data.scope);

  console.log(localStorage.getItem('access_token'));
  console.log(localStorage.getItem('token_type'));
  console.log(localStorage.getItem('expires_in'));
  console.log(localStorage.getItem('expires_at'));
  console.log(localStorage.getItem('refresh_token'));
  console.log(localStorage.getItem('scope'));


};

export default storeTokenData;
