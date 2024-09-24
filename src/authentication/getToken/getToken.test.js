
/*
    File: src/authentication/getToken/getToken.test.js
    Description:
        This file contains unit tests for the getToken function, which retrieves an access token from the Spotify API using an authorization code.
        It tests various scenarios, including missing authorization codes, network errors, and bad requests, ensuring that the function handles these situations gracefully.
        TODO: Add a test case to handle the situation when there is no code verifier in local storage.
*/

jest.mock('../storeTokenData/storeTokenData');

import storeTokenData from "../storeTokenData/storeTokenData";
import getToken from "./getToken";

describe('getToken', () => {

    const mockResponse = {
        Response: {
            body: '',
            bodyUsed: true,
            headers: {},
            ok: true,
            redirected: false,
            status: 200,
            statusText: "",
            type: "cors",
            url: "https://accounts.spotify.com/api/token",
            Prototype : {}
        }
    };
    
    const mockData = {
        "access_token": "BQDKp2LtIVCnPaaapTClwho2gT5Msu5Sjnct2pQayEU40Di2BQuZuJMFiagRqXNbLshXTtq5BocGJ1nKQDpFfPAx5DBPnO4Ge3469ag8SgUtyDwibSVGY74fdFubPvscm5PNapjEoV_SzaoFC0l5cZ2ZhoSoEb4GNWvzz9kCZTuHc9qTMezsJdMdnY9LU3nO83PGMlfqW-Lrjs_Pd9pRtcTMA52lwZJkuEYvPPrx0laIDIxVwp_HhwTCieYdBbmeNyEwnVsZ8nbqOyo0Cg",
        "token_type": "Bearer",
        "expires_in": 3600,
        "refresh_token": "AQDdiDYl1RbZRjs6-egiWcEN3oMBo--BTIlJ21hmCII5wT8gEP3_nCkO0fG-cg1MKlcCNvvY10a4MNJr3jlX-N5W-ISZg0EyI2vbIgthubPiiQ1heWzjLjm66S0U2M3bJz4",
        "scope": "playlist-modify-private playlist-modify-public user-read-email user-read-private"
    };

    const setupMocks = (code, fetchResponse, mockStorage) => {
        jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(param => param === 'code' ? code : null);

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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return null when Authorsation code is missing', async () => {
        const mockStorage = {
            code_verifier: 'code_verifier',
        };
        setupMocks(null, { ok: true, status: 200, statusText: '', json: mockData }, mockStorage);
        
        const result = await getToken()

        expect(storeTokenData).not.toHaveBeenCalled();
        expect(result).toBeNull();
        expect(URLSearchParams.prototype.get).toHaveBeenCalled();

    });

    it('should handle network error gracefully', async () => {
        const mockStorage = {
            code_verifier: 'code_verifier',
        };
        setupMocks('code', { ok: false, status: 400, statusText: 'Network Error', json: { error: 'Network Error' } }, mockStorage);

    const expectedPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
        client_id: 'e1f18649e0d34c5598d545cc48487593',
        grant_type: 'authorization_code',
        code: 'code',
        redirect_uri: 'http://localhost:3000',
        code_verifier: 'code_verifier',
        }),
    };

    // call your function which makes the fetch request
    await expect(getToken()).rejects.toThrow('Network Error');
    expect(global.fetch).toHaveBeenCalledWith("https://accounts.spotify.com/api/token", expectedPayload);
    expect(storeTokenData).not.toHaveBeenCalled();
    expect(URLSearchParams.prototype.get).toHaveBeenCalled();

    });

    it('should handle bad requests gracefully', async () => {
        const mockStorage = {
            code_verifier: 'code_verifier',
        };
        setupMocks('code', { ok: false, status: 400, statusText: 'Bad Request', json: { error: 'Invalid request' } }, mockStorage);

        const expectedPayload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
            client_id: 'e1f18649e0d34c5598d545cc48487593',
            grant_type: 'authorization_code',
            code: 'code',
            redirect_uri: 'http://localhost:3000',
            code_verifier: 'code_verifier',
            }),
        };

        // call your function which makes the fetch request
        await expect(getToken()).rejects.toThrow('Bad Request');
        expect(global.fetch).toHaveBeenCalledWith("https://accounts.spotify.com/api/token", expectedPayload);
        expect(storeTokenData).not.toHaveBeenCalled();
        expect(URLSearchParams.prototype.get).toHaveBeenCalled();

        });

});
