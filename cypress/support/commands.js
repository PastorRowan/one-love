// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

// system level commands
Cypress.Commands.add('mockLogin', () => {

    cy.intercept('POST', 'https://accounts.spotify.com/api/token', {
        statusCode: 200,
        body: {
          access_token: 'mocked-access-token',
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_token: 'mocked-refresh-token',
          scope: 'scope',
          state: 'undefined'
        }
      }).as('mockedApiTokenRequest');
    
    cy.intercept('GET', 'https://api.spotify.com/v1/me', {
      statusCode: 200,
      body: {
        id: 'user_id'
    }
    }).as('mockedFetchSpotifyId');

    cy.visit('http://localhost:3000/');

    // intercept the login request and mock the response
    cy.window().then((win) => {
        // stub the `windowsLocationHref` function on the window object
        cy.stub(win, 'windowsLocationHref').callsFake((_) => {
          // simulate URL change and page reload
          const url = 'http://mocked_url';
          win.location.href = url;
          win.location.href = 'http://localhost:3000/?code=mocked_code';
        }).as('windowsLocationHref');
      });


    // wait for the stubbed `windowsLocationHref` to be called
    cy.get('@windowsLocationHref').should('have.been.called');
      // ensure the URL contains the expected query parameter
      cy.url().should('include', 'code=mocked_code');
    
      // simulate clicking the button to get the token
      cy.contains('button', 'get token').click();

      // ensure that the `App` component is rendered
      cy.get('[data-testid="App"]').should('exist');
});

Cypress.Commands.add('mockSearch', () => {

    cy.get('input[placeholder="What do you want to play?"]').focus().type('bob');

    // intercept the fetch request for searching tracks
    cy.intercept('GET', '**/v1/search*', {
      statusCode: 200,
      body: {
        tracks: {
          items: [
                 {
                    id: 'track1',
                    name: 'Track One',
                    artists: [{ name: 'Artist One', id: 'artist1' }],
                    preview_url: 'http://example.com/track1-preview.mp3'
                 },
                 {
                    id: 'track2',
                    name: 'Track Two',
                    artists: [{ name: 'Artist Two', id: 'artist2' }],
                    preview_url: 'http://example.com/track2-preview.mp3'
                 },
                 {
                    id: 'track3',
                    name: 'Track Three',
                    artists: [{ name: 'Artist Three', id: 'artist3' }],
                    preview_url: 'http://example.com/track3-preview.mp3'
                 },
                 {
                    id: 'track4',
                    name: 'Track Four',
                    artists: [{ name: 'Artist Four', id: 'artist4' }],
                    preview_url: 'http://example.com/track4-preview.mp3'
                 }
                  // add more mock tracks if needed
                ]
              }
        }
    }).as('mockedFetchQueryTracks');

    cy.contains('button', 'Search').click();

    // verify that the mocked fetch request was made
    cy.wait('@mockedFetchQueryTracks');
});


// end to end commands
Cypress.Commands.add('login', () => {

    cy.visit('http://localhost:3000/');

    cy.window().then((win) => {
        // create a spy on `windowsLocationHref`
        cy.spy(win, 'windowsLocationHref').as('spyWindowsLocationHref');

        // create a stub for `localStorage.setItem` that calls the original implementation
        const originalSetItem = win.localStorage.setItem;
        cy.stub(win.localStorage, 'setItem').callsFake((key, value) => {
            originalSetItem.call(win.localStorage, key, value); // call the original method
        }).as('stubSetItem');

    });

    // wait for the stubbed `windowsLocationHref` to be called
    cy.get('@spyWindowsLocationHref').should('have.been.called');

    // handle interactions on the Spotify login page
    cy.origin('https://accounts.spotify.com', () => {
    // adjust the selectors and actions for the Spotify login page
      cy.get('input[type="text"]').type('endtoendtestcypress@gmail.com');
      cy.get('input[type="password"]').type('testpassword1234!');
      cy.contains('Log In').click();
      cy.wait(5000);
      cy.contains('Agree').click();
    });

    cy.url().should('include', 'code=');
    cy.contains('button', 'get token').click();
    cy.get('[data-testid="App"]').should('exist');
});

Cypress.Commands.add('search', () => {

    cy.window().then((win) => {
        // spy on the fetch method
        cy.spy(win, 'fetch').as('fetchSpy');
    });

    cy.get('input[placeholder="What do you want to play?"]').focus().type('bob');
    cy.contains('button', 'Search').click();

    // wait for the fetch request to be called
    cy.get('@fetchSpy').should('have.been.called');
    cy.get('@fetchSpy').should('have.been.calledWithMatch', /v1\/search/); // adjust the URL pattern as needed
    
});
