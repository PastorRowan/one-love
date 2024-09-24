
/* 
   File: src/index.js
   Description:
       This is the entry point of the React application. It initializes and renders the main components of the app, including context providers and conditional rendering based on authentication status.

        - Imports:
            - React and ReactDOM for rendering the app.
            - `reportWebVitals` for measuring performance metrics.
            - CSS for global styles.
            - Providers component to wrap the application with context providers.
            - `AuthenticationComponent` for handling user authentication.
            - `App` component as the main application component.
            - `useAuth` hook for accessing authentication context.

        - Main Function Component:
            - `Main`: Uses the `useAuth` hook to check if the user has a valid access token.
                - If `hasValidAccessToken` is true, it renders the `App` component.
                - If `hasValidAccessToken` is false, it renders the `AuthenticationComponent`.

        - Rendering:
            - Creates a root element using `ReactDOM.createRoot`.
            - Renders the `Main` component wrapped in `Providers` to provide context to the app.
            - `reportWebVitals` is called to measure and report performance metrics.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// CSS
import './index.css';

// context provider
import Providers from './Providers';

// components
import AuthenticationComponent from './authentication/AuthenticationComponent';
import App from './App';

// authentication context
import { useAuth } from './context/AuthContext/AuthContext';

// testing functions in browser enviroment :

import windowsLocationHref from './authentication/handleAuthorisation/windowsLocationHref';
import base64encode from './utils/authentication/base64encode/base64encode';
import generateRandomString from './utils/authentication/generateRandomString/generateRandomString';
import sha256 from './utils/authentication/sha256/sha256';

window.windowsLocationHref = windowsLocationHref;
window.base64encode = base64encode;
window.generateRandomString = generateRandomString;
window.sha256 = sha256;

export function Main() {

    const { hasValidAccessToken } = useAuth();

    window.hasValidAccessToken = hasValidAccessToken;

    if (window.hasValidAccessToken) {
        <App />
    };

    return (
        <>
            {hasValidAccessToken ? <App /> : <AuthenticationComponent />}
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Providers>
        <Main />
    </Providers>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
