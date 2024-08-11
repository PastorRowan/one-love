
/*
  File: src/utils/authentication/generateRandomString/generateRandomString.js
  Description: ...
*/

/*
  original function:
  crypto.getRandomValues is only avaiable in a browser like envirment which we cant test for using node.js so this is the original
  function used for the application which unfortunately cannot be automatically tesed.
*/

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export default generateRandomString;
