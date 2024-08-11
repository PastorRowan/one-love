
describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {

      cy.mockLogin();

      cy.get('[data-testid="App"]');

      cy.mockSearch();

      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track One');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Two');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Three');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Four');

      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track One').click();
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Two').click();

      // verify that both tracks are now in the playlist
      cy.get('[data-testid="playlistTrackTextContainer"]').contains('Track One');
      cy.get('[data-testid="playlistTrackTextContainer"]').contains('Track Two');

      cy.get('[data-testid="playlistTrackCont"]')
        .eq(0)
        .find('[data-testid="playButton"]') // find the play button within the container
        .should('be.visible') // ensure the button is visible
        .click(); // click the play button

      // assert that the audio src has changed
      cy.get('[data-testid="audio"]').should('have.attr', 'src', 'http://example.com/track1-preview.mp3');
    });
});
