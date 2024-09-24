
/*
    File: src/components/PlaylistTracksCont/__tests__/UnitTests/addItemsToPlaylist.test.js
    Description:
        Unit tests for the addItemsToPlaylist function, which ensures the correct handling of API requests to add tracks to a playlist.
        The tests cover successful fetch requests, fetch errors, and handling non-OK responses.
*/

import addItemsToPlaylist from "../../addItemsToPlaylist";

describe('addItemsToPlaylist', () => {
    beforeEach(() => {
        // clear any previous mocks
        global.fetch = jest.fn();
    });

    it('should handle successful fetch requests', async () => {
        // mock fetch to resolve with a successful response
        global.fetch.mockResolvedValueOnce({
            ok: true,
            statusText: 'OK'
        });

        await expect(addItemsToPlaylist('playlistId', [{ trackId: '123' }])).resolves.not.toThrow();
    });

    it('should handle fetch errors', async () => {
        // mock fetch to reject with an error
        global.fetch.mockRejectedValueOnce(new Error('Fetch error'));

        await expect(addItemsToPlaylist('playlistId', [{ trackId: '123' }])).rejects.toThrow('Error during playlist update:');
    });

    it('should handle non-OK responses', async () => {
        // mock fetch to resolve with a non-OK response
        global.fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Bad Request'
        });

        await expect(addItemsToPlaylist('playlistId', [{ trackId: '123' }])).rejects.toThrow('Error: Bad Request');
    });
});
