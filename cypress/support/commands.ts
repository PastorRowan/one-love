
    // Add typings for the custom command
    declare global {
        namespace Cypress {
            interface Chainable {
                drag: (dragSelector: string, dropSelector: string) => Chainable;
            }
        }
    }
    // Finally add the custom command
    Cypress.Commands.add('drag', drag);

