
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
      cy.get('[data-testid="playlistTrackTextContainer"]').contains('Track One').should('exist');
      cy.get('[data-testid="playlistTrackTextContainer"]').contains('Track Two').should('exist');
    });
});
