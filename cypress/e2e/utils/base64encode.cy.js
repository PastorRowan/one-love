
describe('base64encode Function', () => {
  before(() => {
    // visit the page where the function is accessible
    cy.visit('http://localhost:3000/'); // Replace with your app's URL
  });

  it('should encode Uint8Array to base64 correctly', () => {
    cy.window().then((win) => {

      // preventing window change to make test more lightweight
      cy.stub(win, 'windowsLocationHref').as('windowsLocationHref');

      // access the base64encode function from the global window object
      const base64encode = win.base64encode;

      // test case 1: simple input
      const input1 = new Uint8Array([72, 101, 108, 108, 111]); // ASCII for "Hello"
      const expectedOutput1 = 'SGVsbG8'; // base64 encoded "Hello" without padding
      const result1 = base64encode(input1);
      expect(result1).to.equal(expectedOutput1);

      // Test case 2: empty input
      const input2 = new Uint8Array([]);
      const expectedOutput2 = ''; // base64 encoded empty string
      const result2 = base64encode(input2);
      expect(result2).to.equal(expectedOutput2);

      // Test case 3: complex input
      const input3 = new Uint8Array([255, 254, 253]); // binary data
      const expectedOutput3 = '__79'; // base64 encoded binary data without padding
      const result3 = base64encode(input3);
      expect(result3).to.equal(expectedOutput3);
    });
  });
});
