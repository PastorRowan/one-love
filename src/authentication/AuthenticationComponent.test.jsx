
/*
  File: src/authentication/AuthenticationComponent.test.js
  Description:
  ...
*/

// mocking dependencies
jest.mock('../context/AuthContext/AuthContext', () => ({
    useAuth: jest.fn(),
  }));

jest.mock('./handleAuthorisation/handleAuthorisation', () => jest.fn());
jest.mock('./getToken/getToken', () => jest.fn());
jest.mock('./refreshToken/refreshToken', () => jest.fn());
jest.mock('./setupTokenRefreshTimer/setupTokenRefreshTimer', () => jest.fn());
jest.mock('./getSpotifyId/fetchSpotifyId', () => jest.fn());
jest.mock('./isTokenValid/isTokenValid', () => jest.fn());

// general
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthenticationComponent from './AuthenticationComponent';
import { useAuth } from '../context/AuthContext/AuthContext';

// changes window
import handleAuthorisation from './handleAuthorisation/handleAuthorisation';    

// fetch requests
import getToken from './getToken/getToken';
import refreshToken from './refreshToken/refreshToken';
import setupTokenRefreshTimer from './setupTokenRefreshTimer/setupTokenRefreshTimer';
import fetchSpotifyId from './getSpotifyId/fetchSpotifyId';

// helper
import isTokenValid from './isTokenValid/isTokenValid';

describe('AuthenticationComponent', () => {
  
    beforeEach(() => {
        useAuth.mockReturnValue({
            hasSearchParamAuthorisationCode: false,
            setHasSearchParamAuthorisationCode: jest.fn(),
            hasValidAccessToken: false,
            setHasValidAccessToken: jest.fn(),
            loading: false,
          });
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllTimers();
      });

    it('renders loading indicator when loading is true', () => {
        useAuth.mockReturnValue({
          hasSearchParamAuthorisationCode: false,
          setHasSearchParamAuthorisationCode: jest.fn(),
          hasValidAccessToken: false,
          setHasValidAccessToken: jest.fn(),
          loading: true,
        });

        render(<AuthenticationComponent />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    }); 

    it('renders UI elements correctly', () => {
        render(<AuthenticationComponent />);
    
        expect(screen.getByText('authentication steps:')).toBeInTheDocument();
        expect(screen.getByText('1. authorise the application to have access to spotify account')).toBeInTheDocument();
        expect(screen.getByText('2. press I have authorised to get access token and use the application')).toBeInTheDocument();
        expect(screen.getByText('is authorised:')).toBeInTheDocument();
        expect(screen.getByText('access token:')).toBeInTheDocument();
        expect(screen.getByText('refresh timer:')).toBeInTheDocument();
      });

    it('calls handleClick and updates localStorage on success', async () => {
        getToken.mockResolvedValueOnce();
        fetchSpotifyId.mockResolvedValueOnce('user123');
        setupTokenRefreshTimer.mockImplementationOnce((callback) => callback());

        render(<AuthenticationComponent />);

        fireEvent.click(screen.getByText('get token'));

        await waitFor(() => {
            expect(getToken).toHaveBeenCalled();
            expect(fetchSpotifyId).toHaveBeenCalled();
            expect(localStorage.getItem('user_id')).toBe('user123');
            expect(setupTokenRefreshTimer).toHaveBeenCalled();
          });
    });

    it('does not call handleAuthorisation if loading is true', () => {
        jest.useFakeTimers();
        useAuth.mockReturnValue({
          hasSearchParamAuthorisationCode: false,
          setHasSearchParamAuthorisationCode: jest.fn(),
          hasValidAccessToken: false,
          setHasValidAccessToken: jest.fn(),
          loading: true,
        });
        render(<AuthenticationComponent />);
        expect(handleAuthorisation).not.toHaveBeenCalled();
    });

    it('initialises loading animation correctly', () => {
        //  rather manual test whether this is working manual, automaic testing is too complicated and redundant because you are
        //  gonna have to look and see that the animation is running correctly anyways and if it doesnt work its not the biggest
        //  deal in the world
        jest.useFakeTimers();
        render(<AuthenticationComponent />);
        expect(screen.getByTestId('is-authorised-loading-symbol')).toHaveTextContent('/');
        expect(screen.getByTestId('has-access-token-loading-symbol')).toHaveTextContent('/');
        expect(screen.getByTestId('refresh-timer-loading-symbol')).toHaveTextContent('/');
    });
});
