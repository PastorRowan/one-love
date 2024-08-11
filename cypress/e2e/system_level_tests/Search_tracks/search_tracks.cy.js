
describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {

      cy.mockLogin();

      cy.get('[data-testid="App"]').should('exist');

      cy.mockSearch();

      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track One').should('exist');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Two').should('exist');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Three').should('exist');
      cy.get('[data-testid="SearchTrackTextContainer"]').contains('Track Four').should('exist');
    });
});