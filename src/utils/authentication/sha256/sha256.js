
/*
    File: src/utils/authentication/sha256/sha256.js
    Description: ...
*/

const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
};

export default sha256;
