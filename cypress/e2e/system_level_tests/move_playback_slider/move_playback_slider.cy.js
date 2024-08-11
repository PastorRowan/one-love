
describe('Search tracks user flow', () => {
    it('should call windowsLocationHref to change windows and display App', () => {
      
      cy.mockLogin();

      cy.get('[data-testid="App"]')

      // set the playback slider value
      cy.get('[data-testid="volumeSlider"]')
        .invoke('val', 3) // adjust this value based on the slider's range and the song's duration
        .trigger('input')
        .then(($slider) => {
        // assert that the slider's value has been set correctly
        expect($slider.val()).to.equal('3'); // ensure this matches the slider's value
      });
    });
});
