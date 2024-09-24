
/*
    File: src/context/AuthContext/AuthContext.test.js
    Description:
        Unit tests for the `AuthProvider` component.
        These tests verify that the provider initializes context values correctly,
        handles URL parameters to manage authorization codes, and checks the validity of access tokens.
        The tests also ensure the correct loading state is reflected based on the context values.
*/

import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext'; // Adjust the import path if needed
import isTokenValid from '../../authentication/isTokenValid/isTokenValid';

// mock the isTokenValid function
jest.mock('../../authentication/isTokenValid/isTokenValid', () => jest.fn());

const TestComponent = () => {
  const { 
    hasSearchParamAuthorisationCode, 
    hasValidAccessToken, 
    loading 
  } = useAuth();

  return (
    <div>
      <div data-testid="auth-code">
        {hasSearchParamAuthorisationCode ? 'Code Present' : 'No Code'}
      </div>
      <div data-testid="access-token">
        {hasValidAccessToken ? 'Token Valid' : 'Token Invalid'}
      </div>
      <div data-testid="loading">
        {loading ? 'Loading...' : 'Loaded'}
      </div>
    </div>
  );
};

describe('AuthProvider', () => {

  it('should initialize context values correctly', async () => {
  // mock isTokenValid to return false initially
  isTokenValid.mockReturnValue(false);
    
  // render the provider and test component
  render(
   <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
    
  // verify final state after loading
  await waitFor(() => {
  expect(screen.getByTestId('loading').textContent).toBe('Loaded');
  expect(screen.getByTestId('auth-code').textContent).toBe('No Code');
  expect(screen.getByTestId('access-token').textContent).toBe('Token Invalid');
    });
  });

  it('should handle URL parameters correctly', async () => {
    // mock isTokenValid to return true
    isTokenValid.mockReturnValue(true);

    // set up URL parameters
    window.history.pushState({}, 'Test Page', '?code=12345');

    // render the provider and test component
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // wait for the effects to complete and state to update
    await waitFor(() => {
      // the context values should be updated based on URL parameters and token validity
      expect(screen.getByTestId('loading').textContent).toBe('Loaded');
      expect(screen.getByTestId('auth-code').textContent).toBe('Code Present');
      expect(screen.getByTestId('access-token').textContent).toBe('Token Valid');
    });
  });
});
