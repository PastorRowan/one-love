
/*
  File: src/authentication/isTokenValid/isTokenValid.test.js
  Description: ...
  Tests the `isTokenValid` function to ensure it correctly determines if the access token is valid, expired, or missing.
*/

import isTokenValid from "./isTokenValid";

describe('isTokenValid', () => {

    // helper function to set up localStorage for tests
    const setupLocalStorage = (storage) => {
        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: jest.fn((key) => storage[key] || null),
                setItem: jest.fn((key, value) => { storage[key] = value; }),
                removeItem: jest.fn((key) => { delete storage[key]; }),
                clear: jest.fn(() => { for (const key in storage) { delete storage[key]; } }),
            },
            writable: true,
        });
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if the token is valid and not about to expire', () => {
        const now = Date.now();
        const storage = {
            access_token: 'valid_token',
            token_type: 'Bearer',
            expires_in: '3600',
            refresh_token: 'refresh_token',
            expires_at: (now + 3600 * 1000).toString()
        };

        setupLocalStorage(storage);

        expect(isTokenValid()).toBe(true);
    });

    it('should return false if the token is expired', () => {
        const now = Date.now();
        const storage = {
            access_token: 'valid_token',
            token_type: 'Bearer',
            expires_in: '3600',
            refresh_token: 'refresh_token',
            expires_at: (now - 3600 * 1000).toString(), // expired 1 hour ago
        };

        setupLocalStorage(storage);

        expect(isTokenValid()).toBe(false);
    });

    it('should return false if the token is about to expire', () => {
        const now = Date.now();
        const storage = {
            access_token: 'valid_token',
            token_type: 'Bearer',
            expires_in: '3600',
            refresh_token: 'refresh_token',
            expires_at: (now + 4 * 60 * 1000).toString(), // expires in 4 minutes (less than refreshThreshold)
        };

        setupLocalStorage(storage);

        expect(isTokenValid()).toBe(false);
    });

    it('should return false if any required field is missing', () => {
        const now = Date.now();
        const storage = {
            access_token: 'valid_token',
            token_type: 'Bearer',
            expires_in: '3600',
            refresh_token: 'refresh_token',
            expires_at: (now + 3600 * 1000).toString(),
        };

        // test missing access_token
        delete storage.access_token;
        setupLocalStorage(storage);
        expect(isTokenValid()).toBe(false);

        // test missing token_type
        storage.access_token = 'valid_token';
        delete storage.token_type;
        setupLocalStorage(storage);
        expect(isTokenValid()).toBe(false);

        // test invalid expires_in
        storage.token_type = 'Bearer';
        storage.expires_in = 'invalid';
        setupLocalStorage(storage);
        expect(isTokenValid()).toBe(false);

        // test missing refresh_token
        storage.expires_in = '3600';
        delete storage.refresh_token;
        setupLocalStorage(storage);
        expect(isTokenValid()).toBe(false);
    });

    it('should return false if access_token is "undefined"', () => {
        const now = Date.now();
        const storage = {
            access_token: 'undefined',
            token_type: 'Bearer',
            expires_in: '3600',
            refresh_token: 'refresh_token',
            expires_at: (now + 3600 * 1000).toString(),
        };

        setupLocalStorage(storage);

        expect(isTokenValid()).toBe(false);
    });

    it('should return false if token_type is "undefined"', () => {
        const now = Date.now();
        const storage = {
            access_token: 'valid_token',
            token_type: 'undefined',
            expires_in: '3600',
            refresh_token: 'refresh_token',
            expires_at: (now + 3600 * 1000).toString(),
        };

        setupLocalStorage(storage);

        expect(isTokenValid()).toBe(false);
    });

    it('should return false if refresh_token is "undefined"', () => {
        const now = Date.now();
        const storage = {
            access_token: 'valid_token',
            token_type: 'Bearer',
            expires_in: '3600',
            refresh_token: 'undefined',
            expires_at: (now + 3600 * 1000).toString(),
        };

        setupLocalStorage(storage);

        expect(isTokenValid()).toBe(false);
    });
});
