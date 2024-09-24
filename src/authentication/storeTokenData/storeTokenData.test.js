
/*
    File: src/authentication/storeTokenData/storeTokenData.test.js
    Description:
        Unit tests for the storeTokenData function,
        which is responsible for storing authentication token data in localStorage.
        These tests ensure that token data is correctly saved and the expiration time (expires_at) is calculated properly.
*/

import storeTokenData from "./storeTokenData";

describe('storeTokenData', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        const mockStorage = {};
        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: jest.fn(key => mockStorage[key] || null),
                setItem: jest.fn((key, value) => { mockStorage[key] = value.toString(); }),
                removeItem: jest.fn(key => { delete mockStorage[key]; }),
                clear: jest.fn(() => { for (const key in mockStorage) { delete mockStorage[key]; } }),
            },
            writable: true,
        });
    });

    afterAll(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
      });
  
    it('should store token data correctly in localStorage', () => {

      const tokenData = {
        access_token: 'BQBLuPRYBQ...BP8stIv5xr-Iwaf4l8eg',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'AQAQfyEFmJJuCvAFh...cG_m-2KTgNDaDMQqjrOa3',
        scope: 'user-read-email user-read-private'
      };

      const beforeCall = Date.now() + tokenData.expires_in * 1000;
      storeTokenData(tokenData);
      const afterCall = Date.now() + tokenData.expires_in * 1000;

      const expiresAt = parseInt(localStorage.getItem('expires_at'), 10);

      expect(expiresAt).toBeGreaterThanOrEqual(beforeCall);
      expect(expiresAt).toBeLessThanOrEqual(afterCall);

      expect(localStorage.getItem('access_token')).toBe(tokenData.access_token);
      expect(localStorage.getItem('token_type')).toBe(tokenData.token_type);
      expect(localStorage.getItem('expires_in')).toBe((tokenData.expires_in * 1000).toString());
      expect(localStorage.getItem('refresh_token')).toBe(tokenData.refresh_token);
      expect(localStorage.getItem('scope')).toBe(tokenData.scope);
    });
  
    it('should calculate expires_at as the current time plus expires_in', () => {

      const tokenData = {
        access_token: 'BQBLuPRYBQ...BP8stIv5xr-Iwaf4l8eg',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'AQAQfyEFmJJuCvAFh...cG_m-2KTgNDaDMQqjrOa3',
        scope: 'user-read-email user-read-private'
      };
  
      const now = Date.now();
      storeTokenData(tokenData);
  
      // the expires_at value should be within a small margin of the current time + expires_in
      const expiresAt = parseInt(localStorage.getItem('expires_at'), 10);
      expect(expiresAt).toBeGreaterThan(now + (tokenData.expires_in - 1) * 1000);
      expect(expiresAt).toBeLessThan(now + (tokenData.expires_in + 1) * 1000);
    });
  });
