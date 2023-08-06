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



Cypress.Commands.add(
    'query',
    ({ tenantName }, query, values = '', failOnStatusCode = true) => {
      cy.getTenant(tenantName).then((tenantData) => {
        const { subdomain } = tenantData;
        const baseUrl = protocol + subdomain + domain + port;
        const adminPath = `${baseUrl}/api/graphql`;
  
        const options = {
          url: adminPath,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            query,
            variables: {
              ...values,
            },
          },
          failOnStatusCode,
          followRedirect: true,
        };
        cy.request(options).then((response) => {
          if (JSON.stringify(response.body).includes('"userErrors":[{"code":"')) {
            cy.addContext('~~~~~~~~~~ REQUEST FAILURE ~~~~~~~~~~');
            cy.addContext(`Request Query: ${query}`);
            cy.addContext(`Request Variables: ${JSON.stringify(values)}`);
            cy.addContext(`Request Response: ${JSON.stringify(response.body)}`);
            cy.addContext('~~~~~~~~~~ ~~~~~~~~~~ ~~~~~~~~~~');
            cy.log('~~~~~~~~~~ REQUEST FAILURE ~~~~~~~~~~');
            cy.log(`Request Query: ${query}`);
            cy.log(`Request Variables: ${JSON.stringify(values)}`);
            cy.log(`Request Response: ${JSON.stringify(response.body)}`);
          }
          cy.addContext('~~~~~~~~~~ REQUEST DETAILS ~~~~~~~~~~');
          cy.addContext(`Request Query: ${query}`);
          cy.addContext(`Request Variables: ${JSON.stringify(values)}`);
          cy.addContext(`Request Response: ${JSON.stringify(response.body)}`);
          cy.addContext('~~~~~~~~~~ ~~~~~~~~~~ ~~~~~~~~~~');
          cy.wrap(JSON.stringify(response.body));
        });
      });
    }
  );
  Cypress.Commands.add('addContext', (context) => {
    cy.once('test:after:run', (test) => addContext({ test }, context));
  });

