describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {
      
      // log in and interact with the application as before
      cy.login();
      cy.get('[data-testid="App"]');
      cy.search();
      cy.get('[data-testid="SearchTrackTextContainer"]').eq(0).click();
      cy.get('[data-testid="SearchTrackTextContainer"]').eq(1).click();
  
      // intercept and spy on real API requests
      cy.intercept('POST', 'https://api.spotify.com/v1/users/*/playlists').as('createPlaylist');
      cy.intercept('POST', 'https://api.spotify.com/v1/playlists/*/tracks').as('addItemsToPlaylist');
  
      // trigger the action that causes the API requests
      cy.contains('button', 'Save to Spotify').click();
  
      // wait for and verify the createPlaylist request
      cy.wait('@createPlaylist').then(interception => {
        // verify that the request was made to the correct endpoint
        expect(interception.request.url).to.include('https://api.spotify.com/v1/users/');
        expect(interception.response.statusCode).to.eq(201);
        // additional assertions can be made based on the actual response from the API
      });

      // wait for and verify the addItemsToPlaylist request
      cy.wait('@addItemsToPlaylist').then(interception => {
        // verify that the request was made to the correct endpoint
        expect(interception.request.url).to.include('https://api.spotify.com/v1/playlists/');
        expect(interception.response.statusCode).to.eq(201);
        // additional assertions can be made based on the actual response from the API
      });

    });
  });
