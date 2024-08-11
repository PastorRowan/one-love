
describe('should authorise and login', () => {
    it('should authorise and login', () => {

      cy.login();

      cy.window().then((win) => {
        const accessToken = win.localStorage.getItem('access_token');
        expect(accessToken).to.not.be.null;
        expect(accessToken).to.not.be.undefined;

        const tokenType = win.localStorage.getItem('token_type');
        expect(tokenType).to.not.be.null;
        expect(tokenType).to.not.be.undefined;

        const expiresIn = win.localStorage.getItem('expires_in');
        expect(expiresIn).to.not.be.null;
        expect(expiresIn).to.not.be.undefined;

        const expiresAt = win.localStorage.getItem('expires_at');
        expect(expiresAt).to.not.be.null;
        expect(expiresAt).to.not.be.undefined;

        const refreshToken = win.localStorage.getItem('refresh_token');
        expect(refreshToken).to.not.be.null;
        expect(refreshToken).to.not.be.undefined;

        const scope = win.localStorage.getItem('scope');
        expect(scope).to.not.be.null;
        expect(scope).to.not.be.undefined;

      });

      cy.get('[data-testid="App"]').should('exist');

    });
});
