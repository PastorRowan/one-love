
/*
  File: File: src/authentication/handleAuthorisation/handleAuthorisation.js
  Description:
  Handles the process of initiating the Spotify authorization flow.
  It generates a code verifier and challenge for PKCE, then redirects the user to Spotify's authorization page.
*/

// helper functions
import generateRandomString from "../../utils/authentication/generateRandomString/generateRandomString";
import sha256 from "../../utils/authentication/sha256/sha256";
import base64encode from "../../utils/authentication/base64encode/base64encode";
import windowsLocationHref from "./windowsLocationHref";

/*
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
  };

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
*/

const handleAuthorisation = async () => {
  try {
  // wait for the URL parameter check to complete
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');

  if (code) {
    console.log('CODE EXISTS returned null');
    return null;
  };

  const code_verifier = generateRandomString(64);
  const hashed = await sha256(code_verifier);
  const codeChallenge = base64encode(hashed);

  const clientId = 'e1f18649e0d34c5598d545cc48487593';
  const redirectUri = 'http://localhost:3000';
  const scope = 'user-read-email user-read-private playlist-modify-public playlist-modify-private';
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  window.localStorage.setItem('code_verifier', code_verifier);
  const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256', // 'S256'
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();

  // window.location.href = authUrl.toString();
  // window.windowsLocationHref(authUrl.toString());

  window.windowsLocationHref(authUrl.toString());

  } catch(err) {
    console.log('Authorization is not required at this time.');
  }
};

export default handleAuthorisation;
