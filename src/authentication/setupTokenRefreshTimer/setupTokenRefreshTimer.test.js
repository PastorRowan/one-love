
/*
  File: src/authentication/setupTokenRefreshTimer/setupTokenRefreshTimer.test.js
  Description: ...
*/

jest.mock('../refreshToken/refreshToken');

import setupTokenRefreshTimer from './setupTokenRefreshTimer';
import refreshToken from '../refreshToken/refreshToken';

describe('setupTokenRefreshTimer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should throw an error if no expiration time is found', () => {
    expect(() => setupTokenRefreshTimer()).toThrow('Error: No expiration time found');
  });

  test('should call refreshToken immediately if the token is expired', () => {
    localStorage.setItem('expires_at', Date.now() - 1000);
    setupTokenRefreshTimer();
    expect(refreshToken).toHaveBeenCalled();
  });

  test('should schedule token refresh correctly if the token is not yet expired', () => {
    global.setTimeout = jest.fn();
    const now = Date.now();
    const expires_at = now + 10 * 60 * 1000; // 10 minutes from now
    localStorage.setItem('expires_at', expires_at.toString());
    setupTokenRefreshTimer();
    expect(global.setTimeout).toHaveBeenCalledTimes(1);
    expect(global.setTimeout).toHaveBeenLastCalledWith(expect.any(Function), expires_at - now - 5 * 60 * 1000);
  });

  test('should call onTokenRefreshed callback function if provided', () => {
    const onTokenRefreshed = jest.fn();
    localStorage.setItem('expires_at', Date.now() - 1000);
    setupTokenRefreshTimer(onTokenRefreshed);
    expect(onTokenRefreshed).toHaveBeenCalled();
  });

  test('should call onTokenRefreshed callback function when scheduled token refresh', () => {
    const now = Date.now();
    const expires_at = now + 10 * 60 * 1000; // 10 minutes from now
    localStorage.setItem('expires_at', expires_at.toString());
    const onTokenRefreshed = jest.fn();
    jest.useFakeTimers();
    setupTokenRefreshTimer(onTokenRefreshed);
    jest.runAllTimers();
    expect(onTokenRefreshed).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
