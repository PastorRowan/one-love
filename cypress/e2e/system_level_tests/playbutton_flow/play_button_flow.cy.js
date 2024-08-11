
describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {
      
      cy.mockLogin();

      cy.get('[data-testid="App"]').should('exist');

      cy.mockSearch();

      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track One').should('exist');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Two').should('exist');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Three').should('exist');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Four').should('exist');

      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track One').click();
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Two').click();

        // verify that both tracks are now in the playlist
        cy.get('[data-testid="playlistTrackTextContainer"]').contains('Track One').should('exist');
        cy.get('[data-testid="playlistTrackTextContainer"]').contains('Track Two').should('exist');

        cy.get('[data-testid="SearchTrackTextContainer"]')
        .eq(0)
        .parents('[data-testid="searchTrackCont"]')
        .find('[data-testid="playButton"]') // find the play button within the container
        .should('be.visible') // ensure the button is visible
        .click(); // click the play button

        // assert that the audio src has changed
        cy.get('[data-testid="audio"]').should('have.attr', 'src', 'http://example.com/track3-preview.mp3'); // replace with the expected src value

        cy.get('[data-testid="playlistTrackCont"]')
        .eq(0)
        .find('[data-testid="playButton"]') // find the play button within the container
        .should('be.visible') // ensure the button is visible
        .click(); // click the play button

        // assert that the audio src has changed
        cy.get('[data-testid="audio"]').should('have.attr', 'src', 'http://example.com/track1-preview.mp3');

        cy.get('[data-testid="playlistTrackCont"]').contains('Track Two').click();

        cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Two').should('exist');

        // set the volume slider value
        cy.get('[data-testid="volumeSlider"]')
          .invoke('val', 0.2) // min and max is between 0 and 1
          .trigger('input');

        // set the playback slider value
        cy.get('[data-testid="volumeSlider"]')
          .invoke('val', 3) // min is 0 and max is duration of the song
          .trigger('input');

          // intercept the request to create a playlist
        cy.intercept('POST', 'https://api.spotify.com/v1/users/*/playlists', {
          statusCode: 200,
          body: {
          id: 'mock-playlist-id',
          name: 'Mock Playlist',
          public: false,
          collaborative: false,
          description: ''
        }
        }).as('createPlaylist');

        cy.intercept('POST', 'https://api.spotify.com/v1/playlists/*/tracks', {
          statusCode: 200,
          body: {}
        }).as('addItemsToPlaylist');

        cy.contains('button', 'Save to Spotify').click();

        // wait for and verify the createPlaylist request
        cy.wait('@createPlaylist').then(interception => {
          expect(interception.response.statusCode).to.eq(200);
          expect(interception.response.body.id).to.eq('mock-playlist-id');
        });

        // wait for and verify the addItemsToPlaylist request
        cy.wait('@addItemsToPlaylist').then(interception => {
          expect(interception.response.statusCode).to.eq(200);
        });
    });
});
