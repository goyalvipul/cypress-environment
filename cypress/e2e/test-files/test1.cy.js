/// <reference types="cypress" />


context('This is your test suite title', () => {


// -- Start: Cypress Tests --

it('Testing API Request', () => {
    cy.query(Cypress.env("baseUrl")+'/auth', 
    'POST', 
    {
        "username": "admin",
        "password": "password123"
    }).then(response => {
        cy.log(" RESSSSSSS -- "+ response.body.token)
    })
})


it('fetch all the booking ids', () => {
    cy.query(Cypress.env("baseUrl")+'/booking',
    'GET').then(response => {
        cy.log("BOOKINGS -- "+JSON.stringify(response.body))
    })
});

})



