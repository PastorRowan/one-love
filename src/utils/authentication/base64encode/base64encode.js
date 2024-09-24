
/*
    File: src/utils/authentication/base64encode/base64encode.js
    Description: ...
*/

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

export default base64encode;
