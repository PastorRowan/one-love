
/*
    File: File: src/authentication/handleAuthorisation/handleAuthorisation.test.js
    Description:

*/

// mock variables
jest.mock('../../utils/authentication/generateRandomString/generateRandomString');

jest.mock('../../utils/authentication/sha256/sha256');

jest.mock('../../utils/authentication/base64encode/base64encode');

// test function
import handleAuthorisation from "./handleAuthorisation";

// helper functions
import generateRandomString from "../../utils/authentication/generateRandomString/generateRandomString"; //sync
import sha256 from "../../utils/authentication/sha256/sha256"; // async 
import base64encode from "../../utils/authentication/base64encode/base64encode"; //sync

describe('handleAuthorisation', () => {

    const setupMocks = (code, mockStorage) => {
        jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(param => param === 'code' ? code : null);

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

    it('should return null if code in url search params is there', async ()=> {
        const mockStorage = {

        };

        setupMocks('code', mockStorage);

        const result = await handleAuthorisation();
        expect(result).toBeNull();
        expect(URLSearchParams.prototype.get).toHaveBeenCalled();
    });
    /*
    it('calls generateRandomString, sha256, then base64encode in that order', async ()=> {

        // tbh this is a pretty poor test I would actually ideally want to test the output of all the steps being called together
        // but I dont understand these functions enough and they have built in randomness and they use browser api calls which
        // currently idk how to simulate in node maybe another test library would help for those functions and then udnerstanding
        // how to control their inherent randomness through mocks

        // set up mock implementations to track call order
        const mockGenerateRandomString = generateRandomString;
        const mockSha256 = sha256;
        const mockBase64encode = base64encode;

        const mockStorage = {};
        setupMocks(null, mockStorage);

        await handleAuthorisation();

        // verify the functions were called
        expect(mockGenerateRandomString).toHaveBeenCalled();
        expect(mockSha256).toHaveBeenCalled();
        expect(mockBase64encode).toHaveBeenCalled();

        // check the order of calls
        const callOrder = [
            mockGenerateRandomString,
            mockSha256,
            mockBase64encode
        ];
  
        for (let i = 0; i < callOrder.length - 1; i++) {
            expect(callOrder[i]).toHaveBeenCalledBefore(callOrder[i + 1]);
        };
    });
    */

    it('should call localStorage.setItem with correct parameters', async () => {
        const mockStorage = {};
        
        // mock generateRandomString to return 'test_code_verifier'
        generateRandomString.mockReturnValue('test_code_verifier');

        setupMocks(null, mockStorage);

        // trigger the function
        await handleAuthorisation();

        // verify localStorage.setItem was called with correct parameters
        expect(localStorage.setItem).toHaveBeenCalledWith('code_verifier', 'test_code_verifier');
    });


    it('should set window.location.href with correct search parameters', async () => {
        // mock window.location
        const originalLocation = window.location;
        delete window.location;
        window.location = { href: '' };

        const clientId = 'e1f18649e0d34c5598d545cc48487593';
        const codeChallenge = 'test_code_challenge';
        const redirectUri = 'http://localhost:3000';
        const scope = 'user-read-email user-read-private playlist-modify-public playlist-modify-private';

        generateRandomString.mockReturnValue('test_code_verifier');
        sha256.mockResolvedValue('test_sha256');
        base64encode.mockReturnValue('test_code_challenge');

        setupMocks(null, {});

        await handleAuthorisation();

        const params = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        };

        const expectedUrl = new URL("https://accounts.spotify.com/authorize");
        expectedUrl.search = new URLSearchParams(params).toString();
        const expectedHref = expectedUrl.toString();

        expect(window.location.href).toBe(expectedHref);

        // restore the original window.location
        window.location = originalLocation;
    });
});



