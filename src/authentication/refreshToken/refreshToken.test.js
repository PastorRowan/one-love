
/*
  File: src/authentication/refreshToken/refreshToken.test.js
  Description:
  Tests the `refreshToken` function to ensure it correctly handles token refreshing, errors, and calls to helper functions.
*/

// mock helpers
jest.mock("../setupTokenRefreshTimer/setupTokenRefreshTimer");
jest.mock("../storeTokenData/storeTokenData");

// test function
import refreshToken from "./refreshToken";

// helper functions
import setupTokenRefreshTimer from "../setupTokenRefreshTimer/setupTokenRefreshTimer";
import storeTokenData from "../storeTokenData/storeTokenData";

describe('refreshToken', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        // cleanup global mocks and timers
        jest.useRealTimers();
    });

    const setupMocks = (fetchResponse, mockStorage) => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: fetchResponse.ok,
                status: fetchResponse.status,
                statusText: fetchResponse.statusText,
                json: () => Promise.resolve(fetchResponse.json)
            })
        );

        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: jest.fn(key => mockStorage[key] || null),
                setItem: jest.fn((key, value) => { mockStorage[key] = value; }),
                removeItem: jest.fn(key => { delete mockStorage[key]; }),
                clear: jest.fn(() => { for (const key in mockStorage) { delete mockStorage[key]; } }),
            },
            writable: true,
        });
    };

    it('should refresh the token and call setupTokenRefreshTimer and storeTokenData on success', async () => {
        const mockData = { 
                           access_token: 'new_access_token', 
                           refresh_token: 'new_refresh_token', 
                           expires_in: 3600
                         };
        const mockResponse = { 
                               ok: true,
                               statusText: 'ok',
                               json: mockData
                            };

        const mockStorage = {
            refresh_token: 'old_refresh_token',
        };
        setupMocks(mockResponse, mockStorage);

        await refreshToken();

        expect(fetch).toHaveBeenCalledWith("https://accounts.spotify.com/api/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: 'old_refresh_token',
                client_id: 'e1f18649e0d34c5598d545cc48487593'
            })
        });
        expect(storeTokenData).toHaveBeenCalledWith(mockData);
        expect(setupTokenRefreshTimer).toHaveBeenCalled();
    });

    it('should handle non-ok responses gracefully', async () => {
        const mockData = { 
            access_token: 'new_access_token', 
            refresh_token: 'new_refresh_token', 
            expires_in: 3600
          };
        const mockResponse = { 
                ok: false,
                status: 'Bad Request',
                json: mockData
             };
        const mockStorage = {
            refresh_token: 'old_refresh_token',
            };
        setupMocks(mockResponse, mockStorage);

        await expect(refreshToken()).rejects.toThrow('HTTP error! Status: Bad Request');

        expect(fetch).toHaveBeenCalledWith("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: 'old_refresh_token',
          client_id: 'e1f18649e0d34c5598d545cc48487593'
        })
        });


        expect(storeTokenData).not.toHaveBeenCalled();
        expect(setupTokenRefreshTimer).not.toHaveBeenCalled();
        });

    it('should handle missing refresh_token in localStorage', async () => {
        const mockData = { 
            access_token: 'new_access_token', 
            refresh_token: 'new_refresh_token', 
            expires_in: 3600
          };
        const mockResponse = { 
                ok: true,
                status: 'ok',
                json: mockData
             };
        const mockStorage = {
            };
        setupMocks(mockResponse, mockStorage);

        await expect(refreshToken()).rejects.toThrow("Error: refresh_token not in local storage");

        expect(fetch).not.toHaveBeenCalled();
        expect(storeTokenData).not.toHaveBeenCalled();
        expect(setupTokenRefreshTimer).not.toHaveBeenCalled();
    });
});

