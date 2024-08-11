
describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {
      
      cy.mockLogin();

      cy.get('[data-testid="App"]')

      // set the volume slider value
      cy.get('[data-testid="volumeSlider"]')
        .invoke('val', 0.2) // min and max is between 0 and 1
        .trigger('input')
        .then(($slider) => {
            // assert that the value has been updated
            expect($slider.val()).to.equal('0.2');
          });
    });
});
