
describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {
      
      cy.mockLogin();

      cy.get('[data-testid="App"]').should('exist');

    });
});
