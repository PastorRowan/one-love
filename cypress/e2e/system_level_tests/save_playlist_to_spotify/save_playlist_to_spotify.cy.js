
describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {
      
      cy.mockLogin();

      cy.get('[data-testid="App"]')

      cy.mockSearch();

      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track One');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Two');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Three');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Four');
      
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track One').click();
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Two').click();

      // verify that both tracks are now in the playlist
      cy.get('[data-testid="playlistTrackTextContainer"]').contains('Track One')
      cy.get('[data-testid="playlistTrackTextContainer"]').contains('Track Two')

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
