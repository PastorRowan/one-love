
/*
  File: src/components/PlaylistTracksCont/__tests__/createPlaylist.test.js
  Description: ...
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
