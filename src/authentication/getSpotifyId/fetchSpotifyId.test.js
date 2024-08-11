
/*
  File: src/authentication/getSpotifyId/fetchSpotifyId.test.js
  Description: ...
*/

import fetchSpotifyId from './fetchSpotifyId';

describe('fetchSpotifyId', () => {
  beforeEach(() => {
    // clear any mocks and localStorage before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should return Spotify user ID on successful fetch', async () => {
    const mockUserId = 'spotify_user_id';
    const mockResponse = { id: mockUserId };

    // mock localStorage and fetch
    localStorage.setItem('access_token', 'mock_access_token');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    // call the function and assert the result
    const userId = await fetchSpotifyId();
    expect(userId).toBe(mockUserId);
    expect(global.fetch).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer mock_access_token',
      },
    });
  });

  it('should handle fetch errors', async () => {
    // mock localStorage and fetch
    localStorage.setItem('access_token', 'mock_access_token');
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    );

    // call the function and assert the result
    const userId = await fetchSpotifyId();
    expect(userId).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer mock_access_token',
      },
    });
  });

  it('should handle non-OK responses', async () => {
    // mock localStorage and fetch
    localStorage.setItem('access_token', 'mock_access_token');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      })
    );

    // call the function and assert the result
    const userId = await fetchSpotifyId();
    expect(userId).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer mock_access_token',
      },
    });
  });
});
