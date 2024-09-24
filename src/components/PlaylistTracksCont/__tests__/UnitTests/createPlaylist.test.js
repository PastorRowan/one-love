
/*
    File: src/components/PlaylistTracksCont/__tests__/UnitTests/createPlaylist.test.js
    Description:
        Unit tests for the createPlaylist function, which ensures proper handling of API requests to create a playlist.
        The tests cover successful fetch requests, fetch errors, and handling non-OK responses.
*/

import createPlaylist from "../../createPlaylist";

describe('createPlaylist', () => {
    beforeEach(() => {
        // clear any previous mocks
        global.fetch = jest.fn();
    });

    it('should handle successful fetch requests', async () => {
        // mock fetch to resolve with a successful response
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: '1234' // The playlistId you want to return
            })
        });

        await expect(createPlaylist('userId', 'One Love')).resolves.toEqual('1234');
    });

    it('should handle fetch errors', async () => {
        // mock fetch to reject with an error
        global.fetch.mockRejectedValueOnce(new Error('Fetch error'));

        await expect(createPlaylist('userId', 'One Love')).rejects.toThrow('Error during playlist creation:');
    });

    it('should handle non-OK responses', async () => {
        // mock fetch to resolve with a non-OK response
        global.fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Bad Request'
        });

        await expect(createPlaylist('userId', 'One Love')).rejects.toThrow('Error: Bad Request');
    });
});
