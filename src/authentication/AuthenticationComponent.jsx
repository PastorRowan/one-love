
/*
  File: src/authentication/AuthenticationComponent.js
  Description:
  Handles user authentication with Spotify, including token retrieval, authorization checks, and token refresh setup.
*/

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext/AuthContext';

// CSS
import styles from './AuthenticationComponent.module.css';

// changes window
import handleAuthorisation from './handleAuthorisation/handleAuthorisation';

// fetch requests
import getToken from './getToken/getToken';
import refreshToken from './refreshToken/refreshToken';
import setupTokenRefreshTimer from './setupTokenRefreshTimer/setupTokenRefreshTimer';
import fetchSpotifyId from './getSpotifyId/fetchSpotifyId';

// components
import Header from '../components/Header/Header';

// helper
import isTokenValid from './isTokenValid/isTokenValid';

function AuthenticationComponent() {
  const { hasSearchParamAuthorisationCode, setHasSearchParamAuthorisationCode,
          hasValidAccessToken, setHasValidAccessToken,
          loading } = useAuth();;

  const [currentLoadingSymbol, setCurrentLoadingSymbol] = useState('/');

  function loadingAnimation() {
    setCurrentLoadingSymbol(prevSymbol => {
      switch (prevSymbol) {
        case '/':
          return '-';
        case '-':
          return '\\';
        case '\\':
          return '|';
        case '|':
          return '/';
      };
    });
  };

  async function handleClick() {
    try {
      await getToken();
      const userId = await fetchSpotifyId();
      console.log(userId);
      localStorage.setItem('user_id', userId);
      setupTokenRefreshTimer(() => {
        setHasValidAccessToken(true)
      });
  } catch (err) {
      console.error('Error during token handling and/or fetching spotify id:', err);
  };
  };

  const intervalIds = [];

  useEffect(() => {

    if (loading) return; // skip logic if still loading

    if (intervalIds.length === 0) {
        const intervalId = setInterval(loadingAnimation, 1000);
        intervalIds.push(intervalId);
      };
      if (intervalIds.length > 1) {
        const removedIntervalId = intervalIds.splice(1);
        removedIntervalId.forEach(intervalId => {
        clearInterval(intervalId);
        });
      };
      console.log(hasSearchParamAuthorisationCode);
      console.log(hasValidAccessToken);
      if (!hasSearchParamAuthorisationCode && !hasValidAccessToken) {
        handleAuthorisation();
      };

    // cleanup function to clear intervals
    return () => {
      intervalIds.forEach(clearInterval);
    };
    }, [loading]);

    if (loading) {
      return <div>Loading...</div>; // Display loading indicator
    };

  return (
    <>
    <main className={styles.main}>
    <Header />
        <div className={styles.authContainer}>
          <h3>authentication steps:</h3>
          <p>1. authorise the application to have access to spotify account</p>
          <p>2. press I have authorised to get access token and use the application</p>
            <div className={styles.authCheckCont}>
                <div className={styles.authCheckPCont}>
                    <p className={styles.authCheckPContP}>is authorised:</p>
                    <div className={styles.loadingSymbolCont} data-testid='is-authorised-loading-symbol'>
                      {hasSearchParamAuthorisationCode ? '√' : currentLoadingSymbol}
                    </div>
                </div>
            </div>
            <div className={styles.authCheckCont}>
               <div className={styles.authCheckPCont}>
                   <p className={styles.authCheckPContP}>access token:</p>
                   <div className={styles.loadingSymbolCont} data-testid='has-access-token-loading-symbol'>
                     {hasValidAccessToken ? '√' : currentLoadingSymbol}
                    </div>
                   <button onClick={handleClick}>get token</button>
                </div>
            </div>
            <div className={styles.authCheckCont}>
                <div className={styles.authCheckPCont}>
                   <p className={styles.authCheckPContP}>refresh timer:</p>
                   <div className={styles.loadingSymbolCont} data-testid='refresh-timer-loading-symbol'>
                     {currentLoadingSymbol}
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
  );
};

export default AuthenticationComponent;
