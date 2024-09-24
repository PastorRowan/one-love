
/*
    File: src/utils/authentication/sha256/sha256.js
    Description:
        This utility function computes the SHA-256 hash of a given plaintext input. 
        It utilizes the Web Crypto API to ensure secure hashing.
        The function takes a string as input, encodes it using a `TextEncoder`, and returns a Promise that resolves to the SHA-256 hash of the input data.
        This function is used in authentication flows, to produce a secure tokens Spotify API.
        Refer to the Spotify API documentation for more information on this function's purpose within the OAuth authentication flow: 
        https://developer.spotify.com/documentation/web-api
*/

const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
};

export default sha256;
