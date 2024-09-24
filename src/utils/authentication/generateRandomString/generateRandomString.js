
/*
    File: src/utils/authentication/generateRandomString/generateRandomString.js
    Description:
        This utility function generates a random string of a specified length. 
        It uses cryptographically secure random values from the Web Crypto API 
        to ensure the randomness of characters. The generated string consists 
        of uppercase letters, lowercase letters, and digits, selected uniformly 
        from the defined character set.
*/

// refer to spotify API for more information on this functions purpose within the oAuthentication flow: https://developer.spotify.com/documentation/web-api

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export default generateRandomString;
