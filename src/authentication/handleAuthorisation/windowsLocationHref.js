
/*
    File: src/authentication/handleAuthorisation/windowsLocationHref.js
    Description:
        This module exports a function that updates the current window location to a specified URL.
        It is typically used to redirect the user to a different page or resource, such as an authorization endpoint in the context of authentication flows.
*/

function windowsLocationHref(url) {
    window.location.href = url;
};

export default windowsLocationHref;
