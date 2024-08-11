
// this test assumes that generateRandomString is exposed globally or tested within a running application

describe('generateRandomString Function', () => {
    it('should generate a random string of the specified length and only include allowed characters', () => {
      cy.visit('http://localhost:3000/'); // replace with your app's URL
  
      cy.window().then((win) => {

        // preventing window change to make test more lightweight
        cy.stub(win, 'windowsLocationHref').as('windowsLocationHref');

        const length = 10;
        const result = win.generateRandomString(length); // assuming the function is exposed globally
  
        // assert the length of the result
        expect(result).to.have.length(length);
  
        // define the set of possible characters
        const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
        // check if each character in the result is within the set of possible characters
        const allCharactersValid = result.split('').every(char => possibleCharacters.includes(char));
        expect(allCharactersValid).to.be.true;
  
        // alternatively, you can use a regular expression for validation
        const validCharacterPattern = new RegExp(`^[${possibleCharacters}]+$`);
        expect(result).to.match(validCharacterPattern);
      });
    });
});
