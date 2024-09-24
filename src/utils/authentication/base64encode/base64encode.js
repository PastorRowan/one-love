
/*
    File: src/utils/authentication/base64encode/base64encode.js
    Description:
        This utility function encodes a given input into a Base64 format suitable for URL encoding.
        It converts the input to a Uint8Array, applies Base64 encoding using the `btoa` function.
        Replaces certain characters to ensure the output is safe for use in URLs by removing padding characters and replacing '+' with '-' and '/' with '_'.
*/

// refer to spotify API for more information on this functions purpose within the oAuthentication flow: https://developer.spotify.com/documentation/web-api

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

export default base64encode;
