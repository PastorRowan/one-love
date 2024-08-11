
describe('sha256 Function', () => {
    it('should compute SHA-256 hash of a string correctly', () => {
      cy.visit('http://localhost:3000/'); // replace with your app's URL
  
      cy.window().then(async (win) => {

        // preventing window change to make test more lightweight
        cy.stub(win, 'windowsLocationHref').as('windowsLocationHref');

        // define the input string and expected hash
        const inputString = 'Hello';
        const expectedHash = '185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969'; // replace with actual expected hash
  
        // call the sha256 function and get the result
        const hashBuffer = await win.sha256(inputString); // call the function
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  
        // convert byte array to hex string
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
        // assert the result
        expect(hashHex).to.equal(expectedHash);
      });
    });
  });
  