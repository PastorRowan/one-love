
describe('should authorise and login', () => {
    it('should authorise and login', () => {

      cy.login();

      cy.get('[data-testid="App"]').should('exist');

      cy.search();

      cy.get('[data-testid="searchTrackCont"]').should('have.length', 12);

    });
});
