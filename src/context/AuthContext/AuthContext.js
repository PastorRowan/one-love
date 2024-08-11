
/*
  File: src/context/AuthContext/AuthContext.js
  Description:
  Defines the AuthContext and its provider for managing authentication state in a React application.
  Provides functionalities to check and update the presence of an authorization code and the validity of an access token.
  Manages a loading state that is initially set to true and is updated based on the token validity and URL parameters.
*/

// general
import React, { createContext, useState, useContext, useEffect } from 'react';

// helpers
import isTokenValid from '../../authentication/isTokenValid/isTokenValid';

const AuthContext = createContext({
  hasSearchParamAuthorisationCode: false,
  setHasSearchParamAuthorisationCode: () => {},
  hasValidAccessToken: false,
  setHasValidAccessToken: () => {},
  loading: true,
  setLoading: () => {}
});

export const AuthProvider = ({ children }) => {

  const [hasSearchParamAuthorisationCode, setHasSearchParamAuthorisationCode] = useState(false);
  const [hasValidAccessToken, setHasValidAccessToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  // initialize hasSearchParamAuthorisationCode
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  console.log();
  console.log(!!code);
  setHasSearchParamAuthorisationCode(!!code);

  // initialize hasValidAccessToken
  setHasValidAccessToken(isTokenValid());

  setLoading(false);

  }, []);

  return (
    <AuthContext.Provider value={{ 
      hasSearchParamAuthorisationCode,
      setHasSearchParamAuthorisationCode,
      hasValidAccessToken,
      setHasValidAccessToken,
      loading,
      setLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
