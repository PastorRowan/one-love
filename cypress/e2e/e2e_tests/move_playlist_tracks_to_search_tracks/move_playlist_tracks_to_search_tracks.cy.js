
describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {

      cy.login();

      cy.get('[data-testid="App"]').should('exist');
  
      cy.search();
      
      cy.get('[data-testid="SearchTrackTextContainer"]').eq(0).click();
      cy.get('[data-testid="SearchTrackTextContainer"]').eq(1).click();

      cy.get('[data-testid="playlistTrackTextContainer"]').eq(0).click();
      cy.get('[data-testid="playlistTrackTextContainer"]').eq(0).click();

      cy.get('[data-testid="SearchTrackTextContainer"]').eq(10).should('exist');
      cy.get('[data-testid="SearchTrackTextContainer"]').eq(11).should('exist');

    });
});
